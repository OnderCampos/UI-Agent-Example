"use client";

import { useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/hooks/use-i18n";

interface LanguageSelectorProps {
  variant?: "dropdown" | "buttons" | "minimal";
  showFlags?: boolean;
  showNames?: boolean;
  className?: string;
}

export function LanguageSelector({
  variant = "dropdown",
  showFlags = true,
  showNames = true,
  className,
}: LanguageSelectorProps) {
  const { locale, setLocale, localeOptions } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = localeOptions.find((l) => l.code === locale);

  if (variant === "buttons") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {localeOptions.map((option) => (
          <button
            key={option.code}
            onClick={() => setLocale(option.code)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              locale === option.code
                ? "bg-[#0052a1] text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {showFlags && <span className="mr-1">{option.flag}</span>}
            {showNames ? option.nativeName : option.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <button
        onClick={() => {
          const currentIndex = localeOptions.findIndex((l) => l.code === locale);
          const nextIndex = (currentIndex + 1) % localeOptions.length;
          setLocale(localeOptions[nextIndex].code);
        }}
        className={cn(
          "flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-900",
          className
        )}
      >
        <Globe className="w-4 h-4" />
        {currentLocale?.code.toUpperCase()}
      </button>
    );
  }

  // Dropdown variant (default)
  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg",
          "border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        )}
      >
        {showFlags && currentLocale && (
          <span className="text-base">{currentLocale.flag}</span>
        )}
        <span className="text-gray-700">
          {showNames ? currentLocale?.nativeName : currentLocale?.code.toUpperCase()}
        </span>
        <ChevronDown className={cn(
          "w-4 h-4 text-gray-400 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[160px]">
            {localeOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => {
                  setLocale(option.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 text-sm text-left",
                  "hover:bg-gray-50 transition-colors",
                  locale === option.code && "bg-[#e6f0fa]"
                )}
              >
                {showFlags && <span className="text-base">{option.flag}</span>}
                <span className={cn(
                  "flex-1",
                  locale === option.code ? "text-[#0052a1] font-medium" : "text-gray-700"
                )}>
                  {showNames ? option.nativeName : option.code.toUpperCase()}
                </span>
                {locale === option.code && (
                  <Check className="w-4 h-4 text-[#0052a1]" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Country selector with currencies
 */
export function CountrySelector({
  variant = "dropdown",
  showCurrency = true,
  className,
}: {
  variant?: "dropdown" | "buttons";
  showCurrency?: boolean;
  className?: string;
}) {
  const { country, setCountry, countryOptions, countryConfig } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "buttons") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {countryOptions.map((option) => (
          <button
            key={option.code}
            onClick={() => setCountry(option.code)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              country === option.code
                ? "bg-[#0052a1] text-white"
                : "text-gray-600 hover:bg-gray-100 border border-gray-200"
            )}
          >
            {option.name}
            {showCurrency && (
              <span className="ml-1 opacity-70">({option.currency})</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Dropdown variant
  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg",
          "border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        )}
      >
        <span className="text-gray-700">
          {countryConfig?.name || country}
        </span>
        {showCurrency && countryConfig && (
          <span className="text-gray-400">({countryConfig.currency})</span>
        )}
        <ChevronDown className={cn(
          "w-4 h-4 text-gray-400 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[220px] max-h-[300px] overflow-y-auto">
            {countryOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => {
                  setCountry(option.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 text-sm text-left",
                  "hover:bg-gray-50 transition-colors",
                  country === option.code && "bg-[#e6f0fa]"
                )}
              >
                <span className={cn(
                  "flex-1",
                  country === option.code ? "text-[#0052a1] font-medium" : "text-gray-700"
                )}>
                  {option.name}
                </span>
                {showCurrency && (
                  <span className="text-gray-400 text-xs">
                    {option.currency}
                  </span>
                )}
                {country === option.code && (
                  <Check className="w-4 h-4 text-[#0052a1]" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Combined language and country selector
 */
export function LocaleSelector({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">{t("common.language")}</label>
        <LanguageSelector variant="dropdown" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">{t("common.country")}</label>
        <CountrySelector variant="dropdown" />
      </div>
    </div>
  );
}
