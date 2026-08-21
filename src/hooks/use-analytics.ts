"use client";

import { useEffect, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  initGA,
  trackPageView,
  trackEvent,
  trackViewItem,
  trackViewItemList,
  trackSelectItem,
  trackAddToCart,
  trackRemoveFromCart,
  trackViewCart,
  trackBeginCheckout,
  trackAddShippingInfo,
  trackAddPaymentInfo,
  trackPurchase,
  trackSearch,
  trackViewSearchResults,
  trackAddToWishlist,
  trackShare,
  trackLogin,
  trackSignUp,
  trackPromotionView,
  trackPromotionClick,
  trackStoreLocator,
  trackVideoEngagement,
  setUserId,
  setUserProperties,
  isAnalyticsEnabled,
  type ProductItem,
} from "@/lib/analytics";

/**
 * Hook to initialize analytics and track page views
 */
export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  // Initialize GA on mount
  useEffect(() => {
    if (!initialized.current) {
      initGA();
      initialized.current = true;
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    trackPageView(url);
  }, [pathname, searchParams]);
}

/**
 * Hook for product tracking
 */
export function useProductTracking() {
  const viewItem = useCallback((product: ProductItem) => {
    trackViewItem(product);
  }, []);

  const viewItemList = useCallback(
    (listId: string, listName: string, products: ProductItem[]) => {
      trackViewItemList(listId, listName, products);
    },
    []
  );

  const selectItem = useCallback(
    (listId: string, listName: string, product: ProductItem) => {
      trackSelectItem(listId, listName, product);
    },
    []
  );

  return {
    viewItem,
    viewItemList,
    selectItem,
  };
}

/**
 * Hook for cart tracking
 */
export function useCartTracking() {
  const addToCart = useCallback((product: ProductItem, quantity = 1) => {
    trackAddToCart(product, quantity);
  }, []);

  const removeFromCart = useCallback((product: ProductItem, quantity = 1) => {
    trackRemoveFromCart(product, quantity);
  }, []);

  const viewCart = useCallback(
    (products: ProductItem[], value: number, currency = "USD") => {
      trackViewCart(products, value, currency);
    },
    []
  );

  return {
    addToCart,
    removeFromCart,
    viewCart,
  };
}

/**
 * Hook for checkout tracking
 */
export function useCheckoutTracking() {
  const beginCheckout = useCallback(
    (products: ProductItem[], value: number, currency = "USD", coupon?: string) => {
      trackBeginCheckout(products, value, currency, coupon);
    },
    []
  );

  const addShippingInfo = useCallback(
    (products: ProductItem[], value: number, shippingTier: string, currency = "USD") => {
      trackAddShippingInfo(products, value, shippingTier, currency);
    },
    []
  );

  const addPaymentInfo = useCallback(
    (products: ProductItem[], value: number, paymentType: string, currency = "USD") => {
      trackAddPaymentInfo(products, value, paymentType, currency);
    },
    []
  );

  const purchase = useCallback(
    (
      transactionId: string,
      products: ProductItem[],
      value: number,
      shipping: number,
      tax: number,
      currency = "USD",
      coupon?: string
    ) => {
      trackPurchase(transactionId, products, value, shipping, tax, currency, coupon);
    },
    []
  );

  return {
    beginCheckout,
    addShippingInfo,
    addPaymentInfo,
    purchase,
  };
}

/**
 * Hook for search tracking
 */
export function useSearchTracking() {
  const search = useCallback((searchTerm: string) => {
    trackSearch(searchTerm);
  }, []);

  const viewSearchResults = useCallback((searchTerm: string, resultsCount: number) => {
    trackViewSearchResults(searchTerm, resultsCount);
  }, []);

  return {
    search,
    viewSearchResults,
  };
}

/**
 * Hook for engagement tracking
 */
export function useEngagementTracking() {
  const addToWishlist = useCallback((product: ProductItem) => {
    trackAddToWishlist(product);
  }, []);

  const share = useCallback((method: string, contentType: string, itemId: string) => {
    trackShare(method, contentType, itemId);
  }, []);

  const login = useCallback((method: string) => {
    trackLogin(method);
  }, []);

  const signUp = useCallback((method: string) => {
    trackSignUp(method);
  }, []);

  return {
    addToWishlist,
    share,
    login,
    signUp,
  };
}

/**
 * Hook for promotion tracking
 */
export function usePromotionTracking() {
  const viewPromotion = useCallback(
    (promotionId: string, promotionName: string, creativeName?: string, creativeSlot?: string) => {
      trackPromotionView(promotionId, promotionName, creativeName, creativeSlot);
    },
    []
  );

  const clickPromotion = useCallback(
    (promotionId: string, promotionName: string, creativeName?: string, creativeSlot?: string) => {
      trackPromotionClick(promotionId, promotionName, creativeName, creativeSlot);
    },
    []
  );

  return {
    viewPromotion,
    clickPromotion,
  };
}

/**
 * Hook for store locator tracking
 */
export function useStoreTracking() {
  const searchStores = useCallback(() => {
    trackStoreLocator("search");
  }, []);

  const viewStore = useCallback((storeId: string, storeName: string) => {
    trackStoreLocator("view", storeId, storeName);
  }, []);

  const getDirections = useCallback((storeId: string, storeName: string) => {
    trackStoreLocator("directions", storeId, storeName);
  }, []);

  return {
    searchStores,
    viewStore,
    getDirections,
  };
}

/**
 * Hook for video tracking
 */
export function useVideoTracking() {
  const startVideo = useCallback((videoId: string, videoTitle?: string) => {
    trackVideoEngagement("start", videoId, videoTitle);
  }, []);

  const progressVideo = useCallback(
    (videoId: string, percentage: number, videoTitle?: string) => {
      trackVideoEngagement("progress", videoId, videoTitle, percentage);
    },
    []
  );

  const completeVideo = useCallback((videoId: string, videoTitle?: string) => {
    trackVideoEngagement("complete", videoId, videoTitle);
  }, []);

  return {
    startVideo,
    progressVideo,
    completeVideo,
  };
}

/**
 * Hook for user tracking
 */
export function useUserTracking() {
  const identifyUser = useCallback((userId: string | null) => {
    setUserId(userId);
  }, []);

  const setProperties = useCallback((properties: Record<string, unknown>) => {
    setUserProperties(properties);
  }, []);

  return {
    identifyUser,
    setProperties,
  };
}

/**
 * Hook for custom event tracking
 */
export function useEventTracking() {
  const track = useCallback((eventName: string, parameters?: Record<string, unknown>) => {
    trackEvent(eventName, parameters);
  }, []);

  return { track };
}

/**
 * Product impression tracking hook with IntersectionObserver
 */
export function useProductImpression(
  products: ProductItem[],
  listId: string,
  listName: string
) {
  const trackedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!isAnalyticsEnabled() || products.length === 0) return;

    // Track all products in the list as impressions
    const untrackedProducts = products.filter(
      (p) => !trackedRef.current.has(p.id)
    );

    if (untrackedProducts.length > 0) {
      trackViewItemList(listId, listName, untrackedProducts);
      untrackedProducts.forEach((p) => trackedRef.current.add(p.id));
    }
  }, [products, listId, listName]);

  // Return function to track individual item clicks
  const trackClick = useCallback(
    (product: ProductItem) => {
      trackSelectItem(listId, listName, product);
    },
    [listId, listName]
  );

  return { trackClick };
}
