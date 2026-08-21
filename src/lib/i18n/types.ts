/**
 * Internationalization Types
 */

/**
 * Supported locales
 */
export type Locale = "en" | "es";

/**
 * Default locale
 */
export const DEFAULT_LOCALE: Locale = "en";

/**
 * Supported locales list
 */
export const SUPPORTED_LOCALES: Locale[] = ["en", "es"];

/**
 * Locale metadata
 */
export interface LocaleMetadata {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  dateFormat: string;
  numberFormat: {
    decimal: string;
    thousands: string;
  };
}

/**
 * Locale metadata map
 */
export const LOCALE_METADATA: Record<Locale, LocaleMetadata> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    dateFormat: "MM/dd/yyyy",
    numberFormat: {
      decimal: ".",
      thousands: ",",
    },
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇲🇽",
    currency: "USD", // LATAM typically uses USD for display
    currencySymbol: "$",
    dateFormat: "dd/MM/yyyy",
    numberFormat: {
      decimal: ",",
      thousands: ".",
    },
  },
};

/**
 * Country configuration
 */
export interface CountryConfig {
  code: string;
  name: string;
  locale: Locale;
  currency: string;
  currencySymbol: string;
  taxName: string;
  taxRate: number;
}

/**
 * Supported countries
 */
export const COUNTRIES: Record<string, CountryConfig> = {
  US: {
    code: "US",
    name: "United States",
    locale: "en",
    currency: "USD",
    currencySymbol: "$",
    taxName: "Sales Tax",
    taxRate: 0.0,
  },
  MX: {
    code: "MX",
    name: "Mexico",
    locale: "es",
    currency: "MXN",
    currencySymbol: "$",
    taxName: "IVA",
    taxRate: 0.16,
  },
  CR: {
    code: "CR",
    name: "Costa Rica",
    locale: "es",
    currency: "CRC",
    currencySymbol: "₡",
    taxName: "IVA",
    taxRate: 0.13,
  },
  PA: {
    code: "PA",
    name: "Panama",
    locale: "es",
    currency: "USD",
    currencySymbol: "$",
    taxName: "ITBMS",
    taxRate: 0.07,
  },
  CO: {
    code: "CO",
    name: "Colombia",
    locale: "es",
    currency: "COP",
    currencySymbol: "$",
    taxName: "IVA",
    taxRate: 0.19,
  },
  GT: {
    code: "GT",
    name: "Guatemala",
    locale: "es",
    currency: "GTQ",
    currencySymbol: "Q",
    taxName: "IVA",
    taxRate: 0.12,
  },
  SV: {
    code: "SV",
    name: "El Salvador",
    locale: "es",
    currency: "USD",
    currencySymbol: "$",
    taxName: "IVA",
    taxRate: 0.13,
  },
  HN: {
    code: "HN",
    name: "Honduras",
    locale: "es",
    currency: "HNL",
    currencySymbol: "L",
    taxName: "ISV",
    taxRate: 0.15,
  },
  NI: {
    code: "NI",
    name: "Nicaragua",
    locale: "es",
    currency: "NIO",
    currencySymbol: "C$",
    taxName: "IVA",
    taxRate: 0.15,
  },
  DO: {
    code: "DO",
    name: "Dominican Republic",
    locale: "es",
    currency: "DOP",
    currencySymbol: "RD$",
    taxName: "ITBIS",
    taxRate: 0.18,
  },
  TT: {
    code: "TT",
    name: "Trinidad and Tobago",
    locale: "en",
    currency: "TTD",
    currencySymbol: "TT$",
    taxName: "VAT",
    taxRate: 0.125,
  },
  JM: {
    code: "JM",
    name: "Jamaica",
    locale: "en",
    currency: "JMD",
    currencySymbol: "J$",
    taxName: "GCT",
    taxRate: 0.15,
  },
};

/**
 * Translation namespace
 */
export type TranslationNamespace =
  | "common"
  | "auth"
  | "cart"
  | "checkout"
  | "product"
  | "account"
  | "errors";

/**
 * Translation key
 */
export type TranslationKey = string;

/**
 * Translation parameters
 */
export type TranslationParams = Record<string, string | number>;
