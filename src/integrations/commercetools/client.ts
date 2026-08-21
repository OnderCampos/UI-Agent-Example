/**
 * Commercetools API Client
 * Handles authentication and request management
 */

import { createApiClient, type ApiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { ExternalServiceError } from "@/lib/errors";

/**
 * Commercetools client configuration
 */
export interface CommercetoolsConfig {
  projectKey: string;
  clientId: string;
  clientSecret: string;
  apiUrl: string;
  authUrl: string;
  scopes: string;
}

/**
 * OAuth token response
 */
interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

/**
 * Token cache
 */
interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

/**
 * Gets configuration from environment variables
 */
export function getCommercetoolsConfig(): CommercetoolsConfig {
  return {
    projectKey: process.env.COMMERCETOOLS_PROJECT_KEY || "",
    clientId: process.env.COMMERCETOOLS_CLIENT_ID || "",
    clientSecret: process.env.COMMERCETOOLS_CLIENT_SECRET || "",
    apiUrl: process.env.COMMERCETOOLS_API_URL || "https://api.us-central1.gcp.commercetools.com",
    authUrl: process.env.COMMERCETOOLS_AUTH_URL || "https://auth.us-central1.gcp.commercetools.com",
    scopes: process.env.COMMERCETOOLS_SCOPES || "manage_project",
  };
}

/**
 * Validates the configuration
 */
export function validateConfig(config: CommercetoolsConfig): boolean {
  return !!(
    config.projectKey &&
    config.clientId &&
    config.clientSecret &&
    config.apiUrl &&
    config.authUrl
  );
}

/**
 * Gets an access token from Commercetools
 */
async function getAccessToken(config: CommercetoolsConfig): Promise<string> {
  const log = logger.child("Commercetools");

  // Check cache
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  log.debug("Fetching new access token");

  const credentials = Buffer.from(
    `${config.clientId}:${config.clientSecret}`
  ).toString("base64");

  try {
    const response = await fetch(
      `${config.authUrl}/oauth/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          scope: `${config.scopes}:${config.projectKey}`,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new ExternalServiceError(
        "Commercetools",
        `Authentication failed: ${error}`
      );
    }

    const data: TokenResponse = await response.json();

    // Cache token with 5 minute buffer before expiry
    tokenCache = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 300) * 1000,
    };

    log.debug("Access token obtained successfully");
    return data.access_token;
  } catch (error) {
    log.error("Failed to get access token", error as Error);
    throw new ExternalServiceError(
      "Commercetools",
      "Failed to authenticate with Commercetools",
      error
    );
  }
}

/**
 * Creates an authenticated Commercetools API client
 */
export async function createCommercetoolsClient(
  config?: CommercetoolsConfig
): Promise<ApiClient> {
  const cfg = config || getCommercetoolsConfig();

  if (!validateConfig(cfg)) {
    throw new ExternalServiceError(
      "Commercetools",
      "Invalid Commercetools configuration. Check environment variables."
    );
  }

  const token = await getAccessToken(cfg);
  const baseUrl = `${cfg.apiUrl}/${cfg.projectKey}`;

  return createApiClient({
    baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 30000,
  });
}

/**
 * Clears the token cache (useful for testing or forced re-authentication)
 */
export function clearTokenCache(): void {
  tokenCache = null;
}

/**
 * Health check for Commercetools connection
 */
export async function checkCommercetoolsHealth(): Promise<{
  healthy: boolean;
  latencyMs: number;
  error?: string;
}> {
  const start = Date.now();

  try {
    const client = await createCommercetoolsClient();
    await client.get("/");
    return {
      healthy: true,
      latencyMs: Date.now() - start,
    };
  } catch (error) {
    return {
      healthy: false,
      latencyMs: Date.now() - start,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
