/**
 * API-related types
 * Common response formats and utility types
 */

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * API success response
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

/**
 * API error response
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

/**
 * Union type for API responses
 */
export type ApiResult<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Search results response
 */
export interface SearchResponse<T> {
  hits: T[];
  query: string;
  totalHits: number;
  page: number;
  hitsPerPage: number;
  totalPages: number;
  processingTimeMs: number;
  facets?: Record<string, FacetValues>;
}

/**
 * Facet values for search filtering
 */
export interface FacetValues {
  [value: string]: number;
}

/**
 * Search facet configuration
 */
export interface SearchFacet {
  attribute: string;
  label: string;
  type: "list" | "range" | "boolean";
}

/**
 * Health check response
 */
export interface HealthCheckResponse {
  status: "healthy" | "degraded" | "unhealthy";
  version: string;
  timestamp: string;
  services: {
    name: string;
    status: "up" | "down" | "degraded";
    latencyMs?: number;
  }[];
}

/**
 * Batch operation result
 */
export interface BatchResult<T> {
  successful: T[];
  failed: {
    item: unknown;
    error: string;
  }[];
  total: number;
  successCount: number;
  failureCount: number;
}

/**
 * Webhook payload
 */
export interface WebhookPayload<T = unknown> {
  id: string;
  type: string;
  timestamp: string;
  data: T;
  signature?: string;
}

/**
 * Rate limit info
 */
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Cache control options
 */
export interface CacheOptions {
  ttl: number;
  staleWhileRevalidate?: number;
  tags?: string[];
}

/**
 * Request context (for middleware)
 */
export interface RequestContext {
  requestId: string;
  userId?: string;
  sessionId?: string;
  locale: string;
  currency: string;
  ip?: string;
  userAgent?: string;
}
