/**
 * Base External API Adapter
 * Provides common functionality for all external API integrations
 */

import { createApiClient, type ApiClient } from "@/lib/api-client";
import { ExternalServiceError } from "@/lib/errors";
import { logger, type ChildLogger } from "@/lib/logger";

/**
 * Base configuration for external APIs
 */
export interface ExternalApiConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Base class for external API adapters
 */
export abstract class ExternalApiAdapter<TConfig extends ExternalApiConfig> {
  protected client: ApiClient;
  protected config: TConfig;
  protected log: ChildLogger;

  constructor(
    serviceName: string,
    config: TConfig
  ) {
    this.config = config;
    this.log = logger.child(serviceName);

    if (!config.baseUrl) {
      throw new ExternalServiceError(
        serviceName,
        `${serviceName} base URL is not configured`
      );
    }

    const headers: Record<string, string> = {
      ...config.headers,
    };

    if (config.apiKey) {
      headers["X-API-Key"] = config.apiKey;
    }

    this.client = createApiClient({
      baseUrl: config.baseUrl,
      headers,
      timeout: config.timeout || 30000,
    });
  }

  /**
   * Health check for the service
   */
  async healthCheck(): Promise<{
    healthy: boolean;
    latencyMs: number;
    error?: string;
  }> {
    const start = Date.now();

    try {
      await this.client.get("/health");
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
}

/**
 * Creates a simple external API client without extending the base class
 */
export function createExternalApiClient(
  serviceName: string,
  config: ExternalApiConfig
): ApiClient {
  if (!config.baseUrl) {
    throw new ExternalServiceError(
      serviceName,
      `${serviceName} base URL is not configured`
    );
  }

  const headers: Record<string, string> = {
    ...config.headers,
  };

  if (config.apiKey) {
    headers["X-API-Key"] = config.apiKey;
  }

  return createApiClient({
    baseUrl: config.baseUrl,
    headers,
    timeout: config.timeout || 30000,
  });
}
