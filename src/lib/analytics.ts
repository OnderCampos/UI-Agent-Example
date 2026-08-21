/**
 * Analytics Utilities
 * Google Analytics 4 integration and tracking helpers
 */

// GA4 Measurement ID from environment
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Check if analytics is enabled
 */
export function isAnalyticsEnabled(): boolean {
  return Boolean(GA_MEASUREMENT_ID) && typeof window !== "undefined";
}

/**
 * Initialize Google Analytics
 */
export function initGA(): void {
  if (!isAnalyticsEnabled()) return;

  // Load gtag script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: false, // We'll send page views manually for SPA
  });
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "page_view", {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, unknown>
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", eventName, parameters);
}

/**
 * Track exception/error
 */
export function trackException(description: string, fatal = false): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "exception", {
    description,
    fatal,
  });
}

// ============================================
// E-Commerce Events (GA4 Enhanced Ecommerce)
// ============================================

/**
 * View item list (product listing, search results)
 */
export function trackViewItemList(
  listId: string,
  listName: string,
  items: ProductItem[]
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "view_item_list", {
    item_list_id: listId,
    item_list_name: listName,
    items: items.map((item, index) => ({
      ...formatProductItem(item),
      index,
    })),
  });
}

/**
 * Select/click an item from a list
 */
export function trackSelectItem(
  listId: string,
  listName: string,
  item: ProductItem
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "select_item", {
    item_list_id: listId,
    item_list_name: listName,
    items: [formatProductItem(item)],
  });
}

/**
 * View item detail page
 */
export function trackViewItem(item: ProductItem): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "view_item", {
    currency: item.currency || "USD",
    value: item.price,
    items: [formatProductItem(item)],
  });
}

/**
 * Add item to cart
 */
export function trackAddToCart(item: ProductItem, quantity = 1): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "add_to_cart", {
    currency: item.currency || "USD",
    value: item.price * quantity,
    items: [{ ...formatProductItem(item), quantity }],
  });
}

/**
 * Remove item from cart
 */
export function trackRemoveFromCart(item: ProductItem, quantity = 1): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "remove_from_cart", {
    currency: item.currency || "USD",
    value: item.price * quantity,
    items: [{ ...formatProductItem(item), quantity }],
  });
}

/**
 * View cart
 */
export function trackViewCart(items: ProductItem[], value: number, currency = "USD"): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "view_cart", {
    currency,
    value,
    items: items.map((item) => formatProductItem(item)),
  });
}

/**
 * Begin checkout
 */
export function trackBeginCheckout(
  items: ProductItem[],
  value: number,
  currency = "USD",
  coupon?: string
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "begin_checkout", {
    currency,
    value,
    coupon,
    items: items.map((item) => formatProductItem(item)),
  });
}

/**
 * Add shipping info
 */
export function trackAddShippingInfo(
  items: ProductItem[],
  value: number,
  shippingTier: string,
  currency = "USD"
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "add_shipping_info", {
    currency,
    value,
    shipping_tier: shippingTier,
    items: items.map((item) => formatProductItem(item)),
  });
}

/**
 * Add payment info
 */
export function trackAddPaymentInfo(
  items: ProductItem[],
  value: number,
  paymentType: string,
  currency = "USD"
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "add_payment_info", {
    currency,
    value,
    payment_type: paymentType,
    items: items.map((item) => formatProductItem(item)),
  });
}

/**
 * Purchase completed
 */
export function trackPurchase(
  transactionId: string,
  items: ProductItem[],
  value: number,
  shipping: number,
  tax: number,
  currency = "USD",
  coupon?: string
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "purchase", {
    transaction_id: transactionId,
    currency,
    value,
    shipping,
    tax,
    coupon,
    items: items.map((item) => formatProductItem(item)),
  });
}

/**
 * Refund
 */
export function trackRefund(
  transactionId: string,
  items?: ProductItem[],
  value?: number,
  currency = "USD"
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "refund", {
    transaction_id: transactionId,
    currency,
    value,
    items: items?.map((item) => formatProductItem(item)),
  });
}

// ============================================
// User Engagement Events
// ============================================

/**
 * Search
 */
export function trackSearch(searchTerm: string): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "search", {
    search_term: searchTerm,
  });
}

/**
 * View search results
 */
export function trackViewSearchResults(
  searchTerm: string,
  resultsCount: number
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "view_search_results", {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

/**
 * Add to wishlist
 */
export function trackAddToWishlist(item: ProductItem): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "add_to_wishlist", {
    currency: item.currency || "USD",
    value: item.price,
    items: [formatProductItem(item)],
  });
}

/**
 * Share content
 */
export function trackShare(
  method: string,
  contentType: string,
  itemId: string
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "share", {
    method,
    content_type: contentType,
    item_id: itemId,
  });
}

/**
 * Login
 */
export function trackLogin(method: string): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "login", {
    method,
  });
}

/**
 * Sign up
 */
export function trackSignUp(method: string): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "sign_up", {
    method,
  });
}

/**
 * Generate lead (e.g., newsletter signup)
 */
export function trackGenerateLead(value?: number, currency = "USD"): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "generate_lead", {
    currency,
    value,
  });
}

// ============================================
// Custom Events
// ============================================

/**
 * Track promotion view
 */
export function trackPromotionView(
  promotionId: string,
  promotionName: string,
  creativeName?: string,
  creativeSlot?: string
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "view_promotion", {
    promotions: [
      {
        promotion_id: promotionId,
        promotion_name: promotionName,
        creative_name: creativeName,
        creative_slot: creativeSlot,
      },
    ],
  });
}

/**
 * Track promotion click
 */
export function trackPromotionClick(
  promotionId: string,
  promotionName: string,
  creativeName?: string,
  creativeSlot?: string
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "select_promotion", {
    promotions: [
      {
        promotion_id: promotionId,
        promotion_name: promotionName,
        creative_name: creativeName,
        creative_slot: creativeSlot,
      },
    ],
  });
}

/**
 * Track store locator interaction
 */
export function trackStoreLocator(
  action: "search" | "view" | "directions",
  storeId?: string,
  storeName?: string
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", `store_locator_${action}`, {
    store_id: storeId,
    store_name: storeName,
  });
}

/**
 * Track video engagement
 */
export function trackVideoEngagement(
  action: "start" | "progress" | "complete",
  videoId: string,
  videoTitle?: string,
  percentage?: number
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", `video_${action}`, {
    video_id: videoId,
    video_title: videoTitle,
    video_percent: percentage,
  });
}

// ============================================
// User Properties
// ============================================

/**
 * Set user ID
 */
export function setUserId(userId: string | null): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("set", { user_id: userId });
}

/**
 * Set user properties
 */
export function setUserProperties(properties: Record<string, unknown>): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("set", "user_properties", properties);
}

// ============================================
// Types and Helpers
// ============================================

/**
 * Product item for analytics
 */
export interface ProductItem {
  id: string;
  name: string;
  price: number;
  currency?: string;
  brand?: string;
  category?: string;
  variant?: string;
  quantity?: number;
  listId?: string;
  listName?: string;
}

/**
 * Format product item for GA4
 */
function formatProductItem(item: ProductItem): Record<string, unknown> {
  return {
    item_id: item.id,
    item_name: item.name,
    price: item.price,
    currency: item.currency || "USD",
    item_brand: item.brand,
    item_category: item.category,
    item_variant: item.variant,
    quantity: item.quantity || 1,
    item_list_id: item.listId,
    item_list_name: item.listName,
  };
}

// ============================================
// Global Type Declarations
// ============================================

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
