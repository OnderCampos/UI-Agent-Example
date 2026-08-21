/**
 * Search Service
 * Orchestrates search operations using Algolia
 */

import * as algolia from "@/integrations/algolia";
import type { ProductListItem } from "@/types/product";
import type { SearchResponse, SearchFacet } from "@/types/api";
import { logger } from "@/lib/logger";
import { USE_MOCKS } from "@/lib/constants";

const log = logger.child("SearchService");

/**
 * Search options
 */
export interface SearchOptions {
  page?: number;
  hitsPerPage?: number;
  filters?: Record<string, string | string[]>;
  facets?: string[];
  sortBy?: "relevance" | "price_asc" | "price_desc" | "newest";
  userToken?: string;
}

/**
 * Search service class
 */
export class SearchService {
  /**
   * Search products
   */
  async searchProducts(
    query: string,
    options: SearchOptions = {}
  ): Promise<SearchResponse<ProductListItem>> {
    log.debug("Searching products", { query, options });

    if (USE_MOCKS) {
      return this.getMockSearchResults(query, options);
    }

    const sortByMap: Record<string, string | undefined> = {
      relevance: undefined,
      price_asc: "price_asc",
      price_desc: "price_desc",
      newest: "newest",
    };

    return algolia.searchProducts(query, {
      page: options.page,
      hitsPerPage: options.hitsPerPage,
      filters: options.filters,
      facets: options.facets,
      sortBy: sortByMap[options.sortBy || "relevance"],
      userToken: options.userToken,
    });
  }

  /**
   * Get search suggestions (autocomplete)
   */
  async getSuggestions(
    query: string,
    options: { limit?: number } = {}
  ): Promise<string[]> {
    log.debug("Getting search suggestions", { query });

    if (USE_MOCKS) {
      return this.getMockSuggestions(query);
    }

    return algolia.getSearchSuggestions(query, options);
  }

  /**
   * Get facet values for filtering
   */
  async getFacetValues(
    facetName: string,
    options: {
      query?: string;
      maxHits?: number;
      filters?: Record<string, string | string[]>;
    } = {}
  ): Promise<{ value: string; count: number }[]> {
    log.debug("Getting facet values", { facetName, options });

    if (USE_MOCKS) {
      return this.getMockFacetValues(facetName);
    }

    return algolia.getFacetValues(facetName, {
      query: options.query,
      maxFacetHits: options.maxHits,
      filters: options.filters,
    });
  }

  /**
   * Get available facets configuration
   */
  getAvailableFacets(): SearchFacet[] {
    return [
      { attribute: "categories", label: "Categories", type: "list" },
      { attribute: "brand", label: "Brand", type: "list" },
      { attribute: "price", label: "Price", type: "range" },
      { attribute: "inStock", label: "Availability", type: "boolean" },
    ];
  }

  /**
   * Track search click (for Algolia analytics)
   */
  async trackClick(params: {
    queryID: string;
    objectID: string;
    position: number;
    userToken: string;
  }): Promise<void> {
    log.debug("Tracking search click", params);

    if (USE_MOCKS) {
      return;
    }

    // In production, send click event to Algolia Insights API
    // algolia.sendEvent({
    //   eventType: 'click',
    //   eventName: 'Product Clicked',
    //   ...params
    // });
  }

  /**
   * Track conversion (for Algolia analytics)
   */
  async trackConversion(params: {
    queryID?: string;
    objectIDs: string[];
    userToken: string;
  }): Promise<void> {
    log.debug("Tracking conversion", params);

    if (USE_MOCKS) {
      return;
    }

    // In production, send conversion event to Algolia Insights API
    // algolia.sendEvent({
    //   eventType: 'conversion',
    //   eventName: 'Product Purchased',
    //   ...params
    // });
  }

  // ============================================
  // Mock implementations
  // ============================================

  private getMockSearchResults(
    query: string,
    options: SearchOptions
  ): SearchResponse<ProductListItem> {
    const { page = 0, hitsPerPage = 20 } = options;

    const mockProducts: ProductListItem[] = Array.from(
      { length: hitsPerPage },
      (_, i) => ({
        id: `product-${page}-${i + 1}`,
        sku: `SKU-${page}${i + 1}`,
        name: query
          ? `${query} Product ${page * hitsPerPage + i + 1}`
          : `Product ${page * hitsPerPage + i + 1}`,
        slug: `product-${page * hitsPerPage + i + 1}`,
        shortDescription: "A great product matching your search",
        brand: ["Brand A", "Brand B", "Brand C"][i % 3],
        price: {
          amount: 1999 + i * 500,
          currency: "USD",
          formatted: `$${((1999 + i * 500) / 100).toFixed(2)}`,
        },
        image: {
          id: "img-1",
          url: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400`,
          alt: `Product ${i + 1}`,
          isDefault: true,
        },
        isAvailable: i % 5 !== 0,
        hasVariants: i % 3 === 0,
        categories: [
          {
            id: "cat-1",
            name: ["Electronics", "Clothing", "Home"][i % 3],
            slug: ["electronics", "clothing", "home"][i % 3],
          },
        ],
      })
    );

    return {
      hits: mockProducts,
      query,
      totalHits: 100,
      page,
      hitsPerPage,
      totalPages: Math.ceil(100 / hitsPerPage),
      processingTimeMs: 15,
      facets: {
        categories: {
          Electronics: 45,
          Clothing: 30,
          Home: 25,
        },
        brand: {
          "Brand A": 40,
          "Brand B": 35,
          "Brand C": 25,
        },
        price: {},
        inStock: {
          true: 80,
          false: 20,
        },
      },
    };
  }

  private getMockSuggestions(query: string): string[] {
    if (!query || query.length < 2) return [];

    const suggestions = [
      "wireless headphones",
      "wireless earbuds",
      "wireless speaker",
      "wireless charger",
      "wireless keyboard",
      "wireless mouse",
      "bluetooth headphones",
      "bluetooth speaker",
      "noise cancelling headphones",
      "gaming headset",
    ];

    return suggestions
      .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }

  private getMockFacetValues(
    facetName: string
  ): { value: string; count: number }[] {
    const facets: Record<string, { value: string; count: number }[]> = {
      categories: [
        { value: "Electronics", count: 150 },
        { value: "Clothing", count: 120 },
        { value: "Home & Garden", count: 80 },
        { value: "Sports", count: 60 },
        { value: "Books", count: 40 },
      ],
      brand: [
        { value: "Brand A", count: 80 },
        { value: "Brand B", count: 70 },
        { value: "Brand C", count: 60 },
        { value: "Brand D", count: 50 },
        { value: "Brand E", count: 40 },
      ],
      inStock: [
        { value: "true", count: 400 },
        { value: "false", count: 50 },
      ],
    };

    return facets[facetName] || [];
  }
}

// Export singleton instance
let searchServiceInstance: SearchService | null = null;

export function getSearchService(): SearchService {
  if (!searchServiceInstance) {
    searchServiceInstance = new SearchService();
  }
  return searchServiceInstance;
}
