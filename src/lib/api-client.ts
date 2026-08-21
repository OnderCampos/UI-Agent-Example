import {
  AppError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  RateLimitError,
  ValidationError,
  ExternalServiceError,
} from "./errors";

/**
 * API Client Configuration
 */
export interface ApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

/**
 * Request options extending standard fetch options
 */
export interface RequestOptions extends Omit<RequestInit, "body" | "headers"> {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

/**
 * Creates an API client with the given configuration
 */
export function createApiClient(config: ApiClientConfig) {
  const { baseUrl, headers: defaultHeaders = {}, timeout = 30000 } = config;

  /**
   * Builds URL with query parameters
   */
  function buildUrl(
    path: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    const url = new URL(path, baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Handles response errors and converts to AppError
   */
  async function handleResponseError(response: Response): Promise<never> {
    let errorData: unknown;

    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }

    const message =
      (errorData as { message?: string })?.message ||
      `HTTP ${response.status}: ${response.statusText}`;

    switch (response.status) {
      case 400:
        throw new ValidationError(
          message,
          (errorData as { errors?: Record<string, string[]> })?.errors
        );
      case 401:
        throw new AuthenticationError(message);
      case 403:
        throw new AuthorizationError(message);
      case 404:
        throw new NotFoundError("Resource", message);
      case 429:
        const retryAfter = response.headers.get("Retry-After");
        throw new RateLimitError(
          message,
          retryAfter ? parseInt(retryAfter, 10) : undefined
        );
      default:
        throw new AppError(message, "API_ERROR", response.status);
    }
  }

  /**
   * Core request function
   */
  async function request<T>(
    method: string,
    path: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      body,
      params,
      timeout: requestTimeout = timeout,
      headers: requestHeaders = {},
      ...fetchOptions
    } = options;

    const url = buildUrl(path, params);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...defaultHeaders,
      ...requestHeaders,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), requestTimeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        ...fetchOptions,
      });

      if (!response.ok) {
        await handleResponseError(response);
      }

      // Handle empty responses
      const contentType = response.headers.get("Content-Type");
      let data: T;

      if (
        contentType?.includes("application/json") &&
        response.status !== 204
      ) {
        data = await response.json();
      } else {
        data = null as T;
      }

      return {
        data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        throw new ExternalServiceError(
          baseUrl,
          `Request timeout after ${requestTimeout}ms`
        );
      }

      throw new ExternalServiceError(
        baseUrl,
        error instanceof Error ? error.message : "Unknown error",
        error
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return {
    /**
     * GET request
     */
    get: <T>(path: string, options?: RequestOptions) =>
      request<T>("GET", path, options),

    /**
     * POST request
     */
    post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
      request<T>("POST", path, { ...options, body }),

    /**
     * PUT request
     */
    put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
      request<T>("PUT", path, { ...options, body }),

    /**
     * PATCH request
     */
    patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
      request<T>("PATCH", path, { ...options, body }),

    /**
     * DELETE request
     */
    delete: <T>(path: string, options?: RequestOptions) =>
      request<T>("DELETE", path, options),

    /**
     * Set default header
     */
    setHeader: (key: string, value: string) => {
      defaultHeaders[key] = value;
    },

    /**
     * Remove default header
     */
    removeHeader: (key: string) => {
      delete defaultHeaders[key];
    },
  };
}

/**
 * Type for the API client instance
 */
export type ApiClient = ReturnType<typeof createApiClient>;
