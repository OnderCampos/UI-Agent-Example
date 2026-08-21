/**
 * Algolia Search Operations
 */

import { createAlgoliaSearchClient, getAlgoliaConfig, getIndexName } from "./client";
import type {
  AlgoliaSearchParams,
  AlgoliaSearchResponse,
  AlgoliaProductRecord,
  AlgoliaSuggestion,
  AlgoliaHit,
} from "./types";
import type { ProductListItem, Price } from "@/types/product";
import type { SearchResponse, SearchFacet } from "@/types/api";
import { ExternalServiceError } from "@/lib/errors";
import { logger } from "@/lib/logger";

const log = logger.child("Algolia-Search");

/**
 * Converts Algolia hit to ProductListItem
 */
function toProductListItem(hit: AlgoliaHit<AlgoliaProductRecord>): ProductListItem {
  const formatPrice = (amount: number, currency: string): Price => ({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    formatted: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount),
  });

  return {
    id: hit.objectID,
    sku: hit.sku,
    name: hit.name,
    slug: hit.slug,
    shortDescription: hit.description?.slice(0, 150),
    brand: hit.brand,
    price: formatPrice(hit.price, hit.currency),
    compareAtPrice: hit.compareAtPrice
      ? formatPrice(hit.compareAtPrice, hit.currency)
      : undefined,
    image: hit.image
      ? {
          id: "img-0",
          url: hit.image,
          alt: hit.name,
          isDefault: true,
        }
      : null,
    isAvailable: hit.inStock,
    hasVariants: false,
    categories: hit.categories.map((name, index) => ({
      id: hit.categoryIds[index] || `cat-${index}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    })),
  };
}

/**
 * Builds Algolia filter string from facet filters
 */
function buildFilterString(
  filters: Record<string, string | string[]>
): string {
  const parts: string[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // OR condition for multiple values in same facet
      const orParts = value.map((v) => `${key}:"${v}"`);
      if (orParts.length > 0) {
        parts.push(`(${orParts.join(" OR ")})`);
      }
    } else if (value) {
      parts.push(`${key}:"${value}"`);
    }
  });

  return parts.join(" AND ");
}

/**
 * Search products
 */
export async function searchProducts(
  query: string,
  options: {
    page?: number;
    hitsPerPage?: number;
    filters?: Record<string, string | string[]>;
    facets?: string[];
    sortBy?: string;
    userToken?: string;
  } = {}
): Promise<SearchResponse<ProductListItem>> {
  const {
    page = 0,
    hitsPerPage = 20,
    filters = {},
    facets = ["categories", "brand", "price"],
    sortBy,
    userToken,
  } = options;

  log.debug("Searching products", { query, page, hitsPerPage, filters });

  try {
    const client = createAlgoliaSearchClient();
    const indexName = sortBy ? getIndexName(sortBy) : getIndexName();

    const searchParams: AlgoliaSearchParams = {
      query,
      page,
      hitsPerPage,
      facets,
      clickAnalytics: true,
      analytics: true,
    };

    // Add filters
    const filterString = buildFilterString(filters);
    if (filterString) {
      searchParams.filters = filterString;
    }

    // Add user token for personalization
    if (userToken) {
      searchParams.userToken = userToken;
      searchParams.enablePersonalization = true;
    }

    const response = await client.post<AlgoliaSearchResponse<AlgoliaProductRecord>>(
      `/1/indexes/${indexName}/query`,
      searchParams
    );

    const data = response.data;

    return {
      hits: data.hits.map(toProductListItem),
      query: data.query,
      totalHits: data.nbHits,
      page: data.page,
      hitsPerPage: data.hitsPerPage,
      totalPages: data.nbPages,
      processingTimeMs: data.processingTimeMS,
      facets: data.facets,
    };
  } catch (error) {
    throw new ExternalServiceError("Algolia", "Search failed", error);
  }
}

/**
 * Get search suggestions (autocomplete)
 */
export async function getSearchSuggestions(
  query: string,
  options: { limit?: number } = {}
): Promise<string[]> {
  const { limit = 5 } = options;

  if (!query || query.length < 2) {
    return [];
  }

  log.debug("Getting search suggestions", { query, limit });

  try {
    const client = createAlgoliaSearchClient();
    const config = getAlgoliaConfig();
    const suggestionsIndex = `${config.indexName}_query_suggestions`;

    const response = await client.post<AlgoliaSearchResponse<AlgoliaSuggestion>>(
      `/1/indexes/${suggestionsIndex}/query`,
      {
        query,
        hitsPerPage: limit,
        attributesToRetrieve: ["query"],
        attributesToHighlight: ["query"],
      }
    );

    return response.data.hits.map((hit) => hit.query);
  } catch (error) {
    // Suggestions index might not exist - fall back to empty
    log.warn("Suggestions search failed", { error });
    return [];
  }
}

/**
 * Get facet values for a specific attribute
 */
export async function getFacetValues(
  attribute: string,
  options: {
    query?: string;
    maxFacetHits?: number;
    filters?: Record<string, string | string[]>;
  } = {}
): Promise<{ value: string; count: number }[]> {
  const { query = "", maxFacetHits = 100, filters = {} } = options;

  log.debug("Getting facet values", { attribute, query });

  try {
    const client = createAlgoliaSearchClient();
    const indexName = getIndexName();

    const searchParams: Record<string, unknown> = {
      query,
      facets: [attribute],
      maxValuesPerFacet: maxFacetHits,
      hitsPerPage: 0,
    };

    const filterString = buildFilterString(filters);
    if (filterString) {
      searchParams.filters = filterString;
    }

    const response = await client.post<AlgoliaSearchResponse>(
      `/1/indexes/${indexName}/query`,
      searchParams
    );

    const facetValues = response.data.facets?.[attribute] || {};

    return Object.entries(facetValues)
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    throw new ExternalServiceError("Algolia", "Facet search failed", error);
  }
}

/**
 * Multi-index search (for searching products and suggestions simultaneously)
 */
export async function multiSearch(
  queries: {
    indexName: string;
    query: string;
    params?: Partial<AlgoliaSearchParams>;
  }[]
): Promise<AlgoliaSearchResponse[]> {
  log.debug("Multi-index search", { queries: queries.length });

  try {
    const client = createAlgoliaSearchClient();

    const response = await client.post<{ results: AlgoliaSearchResponse[] }>(
      "/1/indexes/*/queries",
      {
        requests: queries.map((q) => ({
          indexName: q.indexName,
          query: q.query,
          params: q.params,
        })),
      }
    );

    return response.data.results;
  } catch (error) {
    throw new ExternalServiceError("Algolia", "Multi-search failed", error);
  }
}

/**
 * Browse all records in an index (for syncing/exporting)
 */
export async function browseIndex(
  options: {
    filters?: string;
    attributesToRetrieve?: string[];
    cursor?: string;
    hitsPerPage?: number;
  } = {}
): Promise<{
  hits: AlgoliaProductRecord[];
  cursor?: string;
}> {
  const { filters, attributesToRetrieve, cursor, hitsPerPage = 1000 } = options;

  log.debug("Browsing index", { cursor, hitsPerPage });

  try {
    const client = createAlgoliaSearchClient();
    const indexName = getIndexName();

    const params: Record<string, unknown> = {
      hitsPerPage,
    };

    if (filters) params.filters = filters;
    if (attributesToRetrieve) params.attributesToRetrieve = attributesToRetrieve;
    if (cursor) params.cursor = cursor;

    const response = await client.post<{
      hits: AlgoliaProductRecord[];
      cursor?: string;
    }>(`/1/indexes/${indexName}/browse`, params);

    return {
      hits: response.data.hits,
      cursor: response.data.cursor,
    };
  } catch (error) {
    throw new ExternalServiceError("Algolia", "Browse failed", error);
  }
}

/**
 * Default facet configuration for product search
 */
export const DEFAULT_FACETS: SearchFacet[] = [
  { attribute: "categories", label: "Categories", type: "list" },
  { attribute: "brand", label: "Brand", type: "list" },
  { attribute: "price", label: "Price", type: "range" },
  { attribute: "inStock", label: "Availability", type: "boolean" },
];
