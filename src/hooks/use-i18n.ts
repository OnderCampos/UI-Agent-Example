"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
  createElement,
} from "react";
import {
  type Locale,
  type TranslationParams,
  type CountryConfig,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  t,
  formatCurrency,
  formatNumber,
  formatDate,
  formatRelativeTime,
  getBrowserLocale,
  getLocaleMetadata,
  getLocaleOptions,
  getCountryConfig,
  getCountryOptions,
  formatPriceForCountry,
} from "@/lib/i18n";

/**
 * i18n Context
 */
interface I18nContextValue {
  locale: Locale;
  country: string;
  setLocale: (locale: Locale) => void;
  setCountry: (country: string) => void;
  t: (key: string, params?: TranslationParams) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  formatRelativeTime: (date: Date | string) => string;
  formatPrice: (amount: number) => string;
  localeOptions: ReturnType<typeof getLocaleOptions>;
  countryOptions: ReturnType<typeof getCountryOptions>;
  countryConfig: CountryConfig | null;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * i18n Provider Props
 */
interface I18nProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
  defaultCountry?: string;
}

/**
 * i18n Provider Component
 */
export function I18nProvider({
  children,
  defaultLocale,
  defaultCountry = "US",
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale || DEFAULT_LOCALE);
  const [country, setCountryState] = useState<string>(defaultCountry);

  // Initialize from localStorage or browser on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    const savedCountry = localStorage.getItem("country");

    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else if (!defaultLocale) {
      setLocaleState(getBrowserLocale());
    }

    if (savedCountry) {
      setCountryState(savedCountry);
    }
  }, [defaultLocale]);

  // Set locale and persist
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  // Set country and persist
  const setCountry = useCallback((newCountry: string) => {
    setCountryState(newCountry);
    localStorage.setItem("country", newCountry);
    
    // Also update locale based on country
    const config = getCountryConfig(newCountry);
    if (config) {
      setLocale(config.locale);
    }
  }, [setLocale]);

  // Translation function
  const translate = useCallback(
    (key: string, params?: TranslationParams) => t(locale, key, params),
    [locale]
  );

  // Currency formatting
  const formatCurrencyFn = useCallback(
    (amount: number, currency?: string) => formatCurrency(amount, currency, locale),
    [locale]
  );

  // Number formatting
  const formatNumberFn = useCallback(
    (value: number, options?: Intl.NumberFormatOptions) =>
      formatNumber(value, locale, options),
    [locale]
  );

  // Date formatting
  const formatDateFn = useCallback(
    (date: Date | string, options?: Intl.DateTimeFormatOptions) =>
      formatDate(date, locale, options),
    [locale]
  );

  // Relative time formatting
  const formatRelativeTimeFn = useCallback(
    (date: Date | string) => formatRelativeTime(date, locale),
    [locale]
  );

  // Price formatting for current country
  const formatPrice = useCallback(
    (amount: number) => formatPriceForCountry(amount, country, locale),
    [country, locale]
  );

  // Country config
  const countryConfig = useMemo(() => getCountryConfig(country), [country]);

  // Locale options
  const localeOptions = useMemo(() => getLocaleOptions(), []);

  // Country options
  const countryOptions = useMemo(() => getCountryOptions(), []);

  const value: I18nContextValue = {
    locale,
    country,
    setLocale,
    setCountry,
    t: translate,
    formatCurrency: formatCurrencyFn,
    formatNumber: formatNumberFn,
    formatDate: formatDateFn,
    formatRelativeTime: formatRelativeTimeFn,
    formatPrice,
    localeOptions,
    countryOptions,
    countryConfig,
  };

  return createElement(I18nContext.Provider, { value }, children);
}

/**
 * Hook to use i18n context
 */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}

/**
 * Simple hook for translations only (no context required)
 */
export function useTranslation(locale?: Locale) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(
    locale || DEFAULT_LOCALE
  );

  useEffect(() => {
    if (!locale) {
      const saved = localStorage.getItem("locale") as Locale | null;
      if (saved && SUPPORTED_LOCALES.includes(saved)) {
        setCurrentLocale(saved);
      } else {
        setCurrentLocale(getBrowserLocale());
      }
    }
  }, [locale]);

  const translate = useCallback(
    (key: string, params?: TranslationParams) => t(currentLocale, key, params),
    [currentLocale]
  );

  return {
    t: translate,
    locale: currentLocale,
  };
}

/**
 * Hook for locale metadata
 */
export function useLocaleMetadata(locale?: Locale) {
  const { locale: contextLocale } = useI18n();
  return getLocaleMetadata(locale || contextLocale);
}
