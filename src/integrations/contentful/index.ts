/**
 * Contentful Integration
 * Re-exports all Contentful operations
 */

// Client
export {
  createContentfulClient,
  getContentfulConfig,
  validateConfig,
  checkContentfulHealth,
  type ContentfulConfig,
  type ContentfulQueryParams,
} from "./client";

// Content operations
export {
  getPageBySlug,
  getAllPages,
  getActiveBanners,
  getNavigationMenu,
  getSiteSettings,
  getEntriesByType,
} from "./content";

// Types
export * from "./types";
