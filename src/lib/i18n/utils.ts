/**
 * i18n Utility Functions
 */

import { translations, } from "./translations";
import {
  type Locale,
  type TranslationParams,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  LOCALE_METADATA,
  COUNTRIES,
  type CountryConfig,
} from "./types";

/**
 * Get translation for a key
 */
export function t(
  locale: Locale,
  key: string,
  params?: TranslationParams
): string {
  const translation = getNestedValue(translations[locale], key);
  
  if (typeof translation !== "string") {
    // Fallback to English
    const fallback = getNestedValue(translations.en, key);
    if (typeof fallback !== "string") {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return interpolate(fallback, params);
  }
  
  return interpolate(translation, params);
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: Record<string, unknown>, key: string): unknown {
  return key.split(".").reduce((acc: unknown, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

/**
 * Interpolate parameters into translation string
 */
function interpolate(str: string, params?: TranslationParams): string {
  if (!params) return str;
  
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return params[key]?.toString() ?? `{{${key}}}`;
  });
}

/**
 * Format currency
 */
export function formatCurrency(
  amount: number,
  currency = "USD",
  locale: Locale = DEFAULT_LOCALE
): string {
  const localeString = locale === "es" ? "es-MX" : "en-US";
  
  return new Intl.NumberFormat(localeString, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format number
 */
export function formatNumber(
  value: number,
  locale: Locale = DEFAULT_LOCALE,
  options?: Intl.NumberFormatOptions
): string {
  const localeString = locale === "es" ? "es-MX" : "en-US";
  
  return new Intl.NumberFormat(localeString, options).format(value);
}

/**
 * Format date
 */
export function formatDate(
  date: Date | string,
  locale: Locale = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const localeString = locale === "es" ? "es-MX" : "en-US";
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };
  
  return new Intl.DateTimeFormat(localeString, defaultOptions).format(dateObj);
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(
  date: Date | string,
  locale: Locale = DEFAULT_LOCALE
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const localeString = locale === "es" ? "es-MX" : "en-US";
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  const rtf = new Intl.RelativeTimeFormat(localeString, { numeric: "auto" });
  
  if (diffSecs < 60) return rtf.format(-diffSecs, "second");
  if (diffMins < 60) return rtf.format(-diffMins, "minute");
  if (diffHours < 24) return rtf.format(-diffHours, "hour");
  if (diffDays < 30) return rtf.format(-diffDays, "day");
  if (diffDays < 365) return rtf.format(-Math.floor(diffDays / 30), "month");
  return rtf.format(-Math.floor(diffDays / 365), "year");
}

/**
 * Get locale from browser/navigator
 */
export function getBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  
  const browserLang = navigator.language.split("-")[0];
  
  if (SUPPORTED_LOCALES.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }
  
  return DEFAULT_LOCALE;
}

/**
 * Get locale from URL pathname
 */
export function getLocaleFromPath(pathname: string): Locale | null {
  const firstSegment = pathname.split("/")[1];
  
  if (SUPPORTED_LOCALES.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  
  return null;
}

/**
 * Add locale to path
 */
export function addLocaleToPath(pathname: string, locale: Locale): string {
  // Remove existing locale if present
  const pathWithoutLocale = removeLocaleFromPath(pathname);
  
  // Don't add default locale to path
  if (locale === DEFAULT_LOCALE) {
    return pathWithoutLocale;
  }
  
  return `/${locale}${pathWithoutLocale}`;
}

/**
 * Remove locale from path
 */
export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/");
  
  if (SUPPORTED_LOCALES.includes(segments[1] as Locale)) {
    segments.splice(1, 1);
  }
  
  return segments.join("/") || "/";
}

/**
 * Get locale metadata
 */
export function getLocaleMetadata(locale: Locale) {
  return LOCALE_METADATA[locale];
}

/**
 * Get all locale options for selector
 */
export function getLocaleOptions() {
  return SUPPORTED_LOCALES.map((code) => LOCALE_METADATA[code]);
}

/**
 * Get country config
 */
export function getCountryConfig(countryCode: string): CountryConfig | null {
  return COUNTRIES[countryCode] || null;
}

/**
 * Get all country options
 */
export function getCountryOptions() {
  return Object.values(COUNTRIES);
}

/**
 * Format price with country-specific currency
 */
export function formatPriceForCountry(
  amount: number,
  countryCode: string,
  locale?: Locale
): string {
  const country = getCountryConfig(countryCode);
  
  if (!country) {
    return formatCurrency(amount, "USD", locale);
  }
  
  return formatCurrency(amount, country.currency, locale || country.locale);
}

/**
 * Pluralize a word based on count
 */
export function pluralize(
  count: number,
  singular: string,
  plural: string,
  locale: Locale = DEFAULT_LOCALE
): string {
  // Simple pluralization - can be extended for more complex rules
  return count === 1 ? singular : plural;
}

/**
 * Get direction for locale (LTR/RTL)
 */
export function getDirection(locale: Locale): "ltr" | "rtl" {
  // All supported locales are LTR
  return "ltr";
}
