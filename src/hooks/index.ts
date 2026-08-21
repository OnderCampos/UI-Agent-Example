/**
 * Custom Hooks Index
 */

export { useCart } from "./use-cart";
export { useAuth } from "./use-auth";
export { useSearch } from "./use-search";
export { useProduct, useProducts, useCategories } from "./use-product";
export { useWishlist } from "./use-wishlist";
export { usePWA, useOnlineStatus } from "./use-pwa";
export {
  useAnalytics,
  useProductTracking,
  useCartTracking,
  useCheckoutTracking,
  useSearchTracking,
  useEngagementTracking,
  usePromotionTracking,
  useStoreTracking,
  useVideoTracking,
  useUserTracking,
  useEventTracking,
  useProductImpression,
} from "./use-analytics";
export { I18nProvider, useI18n, useTranslation, useLocaleMetadata } from "./use-i18n";

// Re-export the toast hook from shadcn
export { useToast, toast } from "./use-toast";
