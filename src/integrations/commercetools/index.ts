/**
 * Commercetools Integration
 * Re-exports all Commercetools operations
 */

// Client
export {
  createCommercetoolsClient,
  getCommercetoolsConfig,
  validateConfig,
  clearTokenCache,
  checkCommercetoolsHealth,
  type CommercetoolsConfig,
} from "./client";

// Products
export {
  getProductById,
  getProductBySlug,
  queryProducts,
  getProductsByCategory,
  getCategories,
  getCategoryById,
  getCategoryBySlug,
} from "./products";

// Cart
export {
  createCart,
  getCartById,
  getCartByCustomerId,
  addToCart,
  updateCartItem,
  removeFromCart,
  applyDiscountCode,
  removeDiscountCode,
  clearCart,
  deleteCart,
} from "./cart";

// Orders
export {
  createOrderFromCart,
  getOrderById,
  getOrderByNumber,
  getOrdersByCustomerId,
  updateOrderStatus,
  cancelOrder,
} from "./orders";

// Types
export * from "./types";
