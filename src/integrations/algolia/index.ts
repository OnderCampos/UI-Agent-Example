/**
 * Algolia Integration
 * Re-exports all Algolia operations
 */

// Client
export {
  createAlgoliaSearchClient,
  createAlgoliaAdminClient,
  getAlgoliaConfig,
  validateConfig,
  checkAlgoliaHealth,
  getIndexName,
  type AlgoliaConfig,
} from "./client";

// Search operations
export {
  searchProducts,
  getSearchSuggestions,
  getFacetValues,
  multiSearch,
  browseIndex,
  DEFAULT_FACETS,
} from "./search";

// Indexing operations
export {
  indexProduct,
  indexProducts,
  deleteProduct,
  deleteProducts,
  clearIndex,
  getIndexSettings,
  updateIndexSettings,
  waitForTask,
  DEFAULT_INDEX_SETTINGS,
} from "./indexing";

// Types
export * from "./types";
