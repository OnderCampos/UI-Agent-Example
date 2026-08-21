/**
 * Translations Index
 */

import { en, type Translations } from "./en";
import { es } from "./es";
import type { Locale } from "../types";

export { en, es };
export type { Translations };

/**
 * All translations
 */
export const translations: Record<Locale, Translations> = {
  en,
  es,
};
