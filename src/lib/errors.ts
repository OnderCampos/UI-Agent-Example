/**
 * Custom error types for the application
 * Provides standardized error handling across all services
 */

/**
 * Base application error class
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = "INTERNAL_ERROR",
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
    };
  }
}

/**
 * Validation error - for invalid input data
 */
export class ValidationError extends AppError {
  public readonly errors: Record<string, string[]>;

  constructor(
    message: string = "Validation failed",
    errors: Record<string, string[]> = {}
  ) {
    super(message, "VALIDATION_ERROR", 400);
    this.errors = errors;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      errors: this.errors,
    };
  }
}

/**
 * Authentication error - user not authenticated
 */
export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, "AUTHENTICATION_ERROR", 401);
  }
}

/**
 * Authorization error - user not authorized for action
 */
export class AuthorizationError extends AppError {
  constructor(message: string = "Access denied") {
    super(message, "AUTHORIZATION_ERROR", 403);
  }
}

/**
 * Not found error - resource doesn't exist
 */
export class NotFoundError extends AppError {
  public readonly resource: string;

  constructor(resource: string = "Resource", message?: string) {
    super(message || `${resource} not found`, "NOT_FOUND", 404);
    this.resource = resource;
  }
}

/**
 * Conflict error - resource state conflict
 */
export class ConflictError extends AppError {
  constructor(message: string = "Resource conflict") {
    super(message, "CONFLICT", 409);
  }
}

/**
 * Rate limit error - too many requests
 */
export class RateLimitError extends AppError {
  public readonly retryAfter?: number;

  constructor(message: string = "Too many requests", retryAfter?: number) {
    super(message, "RATE_LIMIT", 429);
    this.retryAfter = retryAfter;
  }
}

/**
 * External service error - third-party API failure
 */
export class ExternalServiceError extends AppError {
  public readonly service: string;
  public readonly originalError?: unknown;

  constructor(service: string, message?: string, originalError?: unknown) {
    super(
      message || `External service error: ${service}`,
      "EXTERNAL_SERVICE_ERROR",
      502
    );
    this.service = service;
    this.originalError = originalError;
  }
}

/**
 * Insufficient inventory error - product out of stock
 */
export class InsufficientInventoryError extends AppError {
  public readonly productId: string;
  public readonly requested: number;
  public readonly available: number;

  constructor(productId: string, requested: number, available: number) {
    super(
      `Insufficient inventory for product ${productId}. Requested: ${requested}, Available: ${available}`,
      "INSUFFICIENT_INVENTORY",
      400
    );
    this.productId = productId;
    this.requested = requested;
    this.available = available;
  }
}

/**
 * Payment error - payment processing failure
 */
export class PaymentError extends AppError {
  public readonly paymentCode?: string;

  constructor(message: string = "Payment failed", paymentCode?: string) {
    super(message, "PAYMENT_ERROR", 402);
    this.paymentCode = paymentCode;
  }
}

/**
 * Type guard to check if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Extracts error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred";
}

/**
 * Converts any error to AppError
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }
  return new AppError(getErrorMessage(error));
}
