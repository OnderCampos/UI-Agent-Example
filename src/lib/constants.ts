/**
 * Application constants
 */

// ============================================
// Feature Flags
// ============================================

export const FEATURES = {
  SEARCH_AUTOCOMPLETE:
    process.env.NEXT_PUBLIC_FEATURE_SEARCH_AUTOCOMPLETE === "true",
  PRODUCT_RECOMMENDATIONS:
    process.env.NEXT_PUBLIC_FEATURE_PRODUCT_RECOMMENDATIONS === "true",
  QUICK_VIEW: process.env.NEXT_PUBLIC_FEATURE_QUICK_VIEW === "true",
  WISHLIST: process.env.NEXT_PUBLIC_FEATURE_WISHLIST === "true",
} as const;

// ============================================
// Mock Mode
// ============================================

// Default to mock mode when external services are not configured
const hasCommercetoolsConfig = !!(
  process.env.COMMERCETOOLS_PROJECT_KEY &&
  process.env.COMMERCETOOLS_CLIENT_ID &&
  process.env.COMMERCETOOLS_CLIENT_SECRET
);

export const USE_MOCKS = 
  process.env.NEXT_PUBLIC_USE_MOCKS === "true" || 
  (!hasCommercetoolsConfig && process.env.NEXT_PUBLIC_USE_MOCKS !== "false");

// ============================================
// Cache TTL (in seconds)
// ============================================

export const CACHE_TTL = {
  PRODUCT: parseInt(process.env.PRODUCT_CACHE_TTL || "300", 10), // 5 minutes
  CONTENT: parseInt(process.env.CONTENT_CACHE_TTL || "3600", 10), // 1 hour
  CATEGORY: 1800, // 30 minutes
  SEARCH: 60, // 1 minute
  CART: 0, // No cache
} as const;

// ============================================
// Pagination
// ============================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// ============================================
// API Routes
// ============================================

export const API_ROUTES = {
  // Auth
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REGISTER: "/api/auth/register",
    ME: "/api/auth/me",
    REFRESH: "/api/auth/refresh",
  },
  // Products
  PRODUCTS: {
    LIST: "/api/products",
    DETAIL: (id: string) => `/api/products/${id}`,
    BY_CATEGORY: (categoryId: string) =>
      `/api/products?categoryId=${categoryId}`,
  },
  // Categories
  CATEGORIES: {
    LIST: "/api/categories",
    DETAIL: (id: string) => `/api/categories/${id}`,
  },
  // Cart
  CART: {
    GET: "/api/cart",
    ADD: "/api/cart/items",
    UPDATE: (lineItemId: string) => `/api/cart/items/${lineItemId}`,
    REMOVE: (lineItemId: string) => `/api/cart/items/${lineItemId}`,
    CLEAR: "/api/cart/clear",
  },
  // Checkout
  CHECKOUT: {
    CREATE: "/api/checkout",
    SHIPPING: "/api/checkout/shipping",
    PAYMENT: "/api/checkout/payment",
    COMPLETE: "/api/checkout/complete",
  },
  // Search
  SEARCH: {
    QUERY: "/api/search",
    SUGGESTIONS: "/api/search/suggestions",
  },
  // Content
  CONTENT: {
    PAGE: (slug: string) => `/api/content/pages/${slug}`,
    BANNER: "/api/content/banners",
  },
  // Orders
  ORDERS: {
    LIST: "/api/orders",
    DETAIL: (id: string) => `/api/orders/${id}`,
  },
  // User
  USER: {
    PROFILE: "/api/user/profile",
    ADDRESSES: "/api/user/addresses",
    MEMBERSHIP: "/api/user/membership",
  },
} as const;

// ============================================
// App Routes
// ============================================

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PRODUCTS: "/products",
  PRODUCT: (slug: string) => `/products/${slug}`,
  CATEGORIES: "/categories",
  CATEGORY: (slug: string) => `/categories/${slug}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  PROFILE: "/profile",
  ORDERS: "/orders",
  ORDER: (id: string) => `/orders/${id}`,
  MEMBERSHIP: "/membership",
} as const;

// ============================================
// HTTP Status Codes
// ============================================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// ============================================
// Currency & Locale
// ============================================

export const DEFAULT_CURRENCY = "USD";
export const DEFAULT_LOCALE = "en-US";

// ============================================
// Order Statuses
// ============================================

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

// ============================================
// Payment Statuses
// ============================================

export const PAYMENT_STATUS = {
  PENDING: "pending",
  AUTHORIZED: "authorized",
  CAPTURED: "captured",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
