import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS merge support
 * @param inputs - Class values to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price value to currency string
 * @param amount - The price amount in cents
 * @param currency - The currency code (default: USD)
 * @param locale - The locale for formatting (default: en-US)
 * @returns Formatted price string
 */
export function formatPrice(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount / 100);
}

/**
 * Formats a date to localized string
 * @param date - The date to format
 * @param locale - The locale for formatting (default: en-US)
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  locale: string = "en-US"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
}

/**
 * Truncates a string to specified length
 * @param str - The string to truncate
 * @param length - Maximum length
 * @returns Truncated string with ellipsis if needed
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/**
 * Generates a slug from a string
 * @param str - The string to slugify
 * @returns URL-safe slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Delays execution for specified milliseconds
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Checks if code is running on the server
 * @returns true if server-side
 */
export function isServer(): boolean {
  return typeof window === "undefined";
}

/**
 * Generates a unique ID
 * @returns Unique string ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
