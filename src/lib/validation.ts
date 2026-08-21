import { z } from "zod";
import { ValidationError } from "./errors";

/**
 * Validates data against a Zod schema
 * Throws ValidationError with detailed field errors on failure
 */
export function validate<T extends z.ZodSchema>(
  schema: T,
  data: unknown
): z.infer<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors: Record<string, string[]> = {};

    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(issue.message);
    });

    throw new ValidationError("Validation failed", errors);
  }

  return result.data;
}

/**
 * Safe validation that returns result instead of throwing
 */
export function validateSafe<T extends z.ZodSchema>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string[]> } {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors: Record<string, string[]> = {};

    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(issue.message);
    });

    return { success: false, errors };
  }

  return { success: true, data: result.data };
}

// ============================================
// Common Validation Schemas
// ============================================

/**
 * Email validation schema
 */
export const emailSchema = z.string().email("Invalid email address");

/**
 * Password validation schema (minimum 8 chars, 1 uppercase, 1 lowercase, 1 number)
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

/**
 * UUID validation schema
 */
export const uuidSchema = z.string().uuid("Invalid UUID format");

/**
 * Pagination parameters schema
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

/**
 * Sort parameters schema
 */
export const sortSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

/**
 * Price range schema (values in cents)
 */
export const priceRangeSchema = z.object({
  min: z.coerce.number().int().nonnegative().optional(),
  max: z.coerce.number().int().positive().optional(),
});

/**
 * Address schema
 */
export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  streetAddress2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().length(2, "Country must be a 2-letter code"),
  phone: z.string().optional(),
});

/**
 * Credit card schema (basic validation, actual validation by payment provider)
 */
export const creditCardSchema = z.object({
  number: z.string().min(13).max(19),
  expiryMonth: z.coerce.number().int().min(1).max(12),
  expiryYear: z.coerce.number().int().min(new Date().getFullYear()),
  cvv: z.string().min(3).max(4),
  holderName: z.string().min(1),
});

/**
 * Cart item schema
 */
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  variantId: z.string().optional(),
  quantity: z.coerce.number().int().positive("Quantity must be positive"),
});

/**
 * Search query schema
 */
export const searchQuerySchema = z.object({
  query: z.string().min(1, "Search query is required"),
  filters: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  page: z.coerce.number().int().positive().default(1),
  hitsPerPage: z.coerce.number().int().positive().max(100).default(20),
});

// ============================================
// Type exports
// ============================================

export type Email = z.infer<typeof emailSchema>;
export type Password = z.infer<typeof passwordSchema>;
export type UUID = z.infer<typeof uuidSchema>;
export type PaginationParams = z.infer<typeof paginationSchema>;
export type SortParams = z.infer<typeof sortSchema>;
export type PriceRange = z.infer<typeof priceRangeSchema>;
export type Address = z.infer<typeof addressSchema>;
export type CreditCard = z.infer<typeof creditCardSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
