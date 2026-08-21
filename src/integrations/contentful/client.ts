/**
 * Contentful API Client
 */

import { createApiClient, type ApiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { ExternalServiceError } from "@/lib/errors";

const log = logger.child("Contentful");

/**
 * Contentful client configuration
 */
export interface ContentfulConfig {
  spaceId: string;
  accessToken: string;
  previewToken?: string;
  environment: string;
  host?: string;
}

/**
 * Gets configuration from environment variables
 */
export function getContentfulConfig(): ContentfulConfig {
  return {
    spaceId: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
    previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    host: "cdn.contentful.com",
  };
}

/**
 * Validates the configuration
 */
export function validateConfig(config: ContentfulConfig): boolean {
  return !!(config.spaceId && config.accessToken);
}

/**
 * Creates a Contentful API client
 */
export function createContentfulClient(
  options: { preview?: boolean; config?: ContentfulConfig } = {}
): ApiClient {
  const { preview = false, config = getContentfulConfig() } = options;

  if (!validateConfig(config)) {
    throw new ExternalServiceError(
      "Contentful",
      "Invalid Contentful configuration. Check environment variables."
    );
  }

  const host = preview ? "preview.contentful.com" : config.host || "cdn.contentful.com";
  const token = preview ? config.previewToken || config.accessToken : config.accessToken;

  const baseUrl = `https://${host}/spaces/${config.spaceId}/environments/${config.environment}`;

  log.debug("Creating Contentful client", { preview, host });

  return createApiClient({
    baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 15000,
  });
}

/**
 * Health check for Contentful connection
 */
export async function checkContentfulHealth(): Promise<{
  healthy: boolean;
  latencyMs: number;
  error?: string;
}> {
  const start = Date.now();

  try {
    const client = createContentfulClient();
    await client.get("/content_types", { params: { limit: 1 } });
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

/**
 * Query parameters for Contentful
 */
export interface ContentfulQueryParams {
  content_type?: string;
  "fields.slug"?: string;
  "sys.id"?: string;
  include?: number;
  limit?: number;
  skip?: number;
  order?: string;
  select?: string;
  locale?: string;
  [key: string]: string | number | boolean | undefined;
}
