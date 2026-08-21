/**
 * Algolia API Client
 */

import { createApiClient, type ApiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { ExternalServiceError } from "@/lib/errors";

const log = logger.child("Algolia");

/**
 * Algolia client configuration
 */
export interface AlgoliaConfig {
  appId: string;
  searchApiKey: string;
  adminApiKey?: string;
  indexName: string;
}

/**
 * Gets configuration from environment variables
 */
export function getAlgoliaConfig(): AlgoliaConfig {
  return {
    appId: process.env.ALGOLIA_APP_ID || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
    searchApiKey: process.env.ALGOLIA_SEARCH_API_KEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || "",
    adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
    indexName: process.env.ALGOLIA_INDEX_NAME || process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || "products",
  };
}

/**
 * Validates the configuration
 */
export function validateConfig(config: AlgoliaConfig): boolean {
  return !!(config.appId && config.searchApiKey && config.indexName);
}

/**
 * Creates an Algolia search client
 */
export function createAlgoliaSearchClient(config?: AlgoliaConfig): ApiClient {
  const cfg = config || getAlgoliaConfig();

  if (!validateConfig(cfg)) {
    throw new ExternalServiceError(
      "Algolia",
      "Invalid Algolia configuration. Check environment variables."
    );
  }

  const baseUrl = `https://${cfg.appId}-dsn.algolia.net`;

  log.debug("Creating Algolia search client", { appId: cfg.appId });

  return createApiClient({
    baseUrl,
    headers: {
      "X-Algolia-Application-Id": cfg.appId,
      "X-Algolia-API-Key": cfg.searchApiKey,
    },
    timeout: 10000,
  });
}

/**
 * Creates an Algolia admin client (for indexing operations)
 */
export function createAlgoliaAdminClient(config?: AlgoliaConfig): ApiClient {
  const cfg = config || getAlgoliaConfig();

  if (!cfg.adminApiKey) {
    throw new ExternalServiceError(
      "Algolia",
      "Admin API key required for indexing operations"
    );
  }

  const baseUrl = `https://${cfg.appId}.algolia.net`;

  log.debug("Creating Algolia admin client", { appId: cfg.appId });

  return createApiClient({
    baseUrl,
    headers: {
      "X-Algolia-Application-Id": cfg.appId,
      "X-Algolia-API-Key": cfg.adminApiKey,
    },
    timeout: 30000,
  });
}

/**
 * Health check for Algolia connection
 */
export async function checkAlgoliaHealth(): Promise<{
  healthy: boolean;
  latencyMs: number;
  error?: string;
}> {
  const start = Date.now();

  try {
    const config = getAlgoliaConfig();
    const client = createAlgoliaSearchClient(config);
    
    // Simple search with empty query to check connection
    await client.post(`/1/indexes/${config.indexName}/query`, {
      params: "query=&hitsPerPage=0",
    });

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
 * Gets index name with optional suffix for replicas
 */
export function getIndexName(suffix?: string): string {
  const config = getAlgoliaConfig();
  return suffix ? `${config.indexName}_${suffix}` : config.indexName;
}
