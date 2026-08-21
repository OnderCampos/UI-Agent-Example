/**
 * Product Service
 * Orchestrates product operations across Commercetools and Algolia
 */

import * as commercetools from "@/integrations/commercetools";
import * as algolia from "@/integrations/algolia";
import type { Product, ProductListItem, ProductQuery, Category } from "@/types/product";
import type { SearchResponse } from "@/types/api";
import { logger } from "@/lib/logger";
import { USE_MOCKS } from "@/lib/constants";

const log = logger.child("ProductService");

/**
 * Product service class
 */
export class ProductService {
  /**
   * Get product by ID
   */
  async getProductById(
    id: string,
    options: { locale?: string; currency?: string } = {}
  ): Promise<Product> {
    log.debug("Fetching product by ID", { id });

    if (USE_MOCKS) {
      return this.getMockProduct(id);
    }

    return commercetools.getProductById(id, options);
  }

  /**
   * Get product by slug
   */
  async getProductBySlug(
    slug: string,
    options: { locale?: string; currency?: string } = {}
  ): Promise<Product> {
    log.debug("Fetching product by slug", { slug });

    if (USE_MOCKS) {
      return this.getMockProduct("mock-product-1", slug);
    }

    return commercetools.getProductBySlug(slug, options);
  }

  /**
   * Search products using Algolia
   */
  async searchProducts(
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
    log.debug("Searching products", { query, options });

    if (USE_MOCKS) {
      return this.getMockSearchResults(query, options);
    }

    return algolia.searchProducts(query, options);
  }

  /**
   * Get products by category (uses Commercetools for browsing)
   */
  async getProductsByCategory(
    categoryId: string,
    options: {
      locale?: string;
      currency?: string;
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    } = {}
  ): Promise<{
    products: ProductListItem[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    log.debug("Fetching products by category", { categoryId, options });

    if (USE_MOCKS) {
      return this.getMockProductList(options.page, options.limit);
    }

    const query: ProductQuery = {
      categoryId,
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy as ProductQuery["sortBy"],
      sortOrder: options.sortOrder,
    };

    return commercetools.queryProducts(query, {
      locale: options.locale,
      currency: options.currency,
    });
  }

  /**
   * Get search suggestions (autocomplete)
   */
  async getSearchSuggestions(
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
   * Get all categories
   */
  async getCategories(
    options: { locale?: string; parentId?: string } = {}
  ): Promise<Category[]> {
    log.debug("Fetching categories", options);

    if (USE_MOCKS) {
      return this.getMockCategories();
    }

    return commercetools.getCategories(options);
  }

  /**
   * Get category by ID
   */
  async getCategoryById(
    id: string,
    options: { locale?: string } = {}
  ): Promise<Category> {
    log.debug("Fetching category by ID", { id });

    if (USE_MOCKS) {
      return this.getMockCategory(id);
    }

    return commercetools.getCategoryById(id, options);
  }

  /**
   * Get category by slug
   */
  async getCategoryBySlug(
    slug: string,
    options: { locale?: string } = {}
  ): Promise<Category> {
    log.debug("Fetching category by slug", { slug });

    if (USE_MOCKS) {
      return this.getMockCategory("mock-cat-1", slug);
    }

    return commercetools.getCategoryBySlug(slug, options);
  }

  // ============================================
  // Mock implementations
  // ============================================

  private getMockProduct(id: string, slug?: string): Product {
    return {
      id,
      sku: "SKU-12345",
      name: "Premium Wireless Headphones",
      slug: slug || "premium-wireless-headphones",
      description:
        "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.",
      shortDescription: "Crystal-clear audio with active noise cancellation",
      brand: "AudioTech",
      categories: [
        { id: "cat-1", name: "Electronics", slug: "electronics" },
        { id: "cat-2", name: "Headphones", slug: "headphones" },
      ],
      masterVariant: {
        id: "1",
        sku: "SKU-12345-BLK",
        name: "Black",
        price: {
          amount: 29999,
          currency: "USD",
          formatted: "$299.99",
        },
        compareAtPrice: {
          amount: 34999,
          currency: "USD",
          formatted: "$349.99",
        },
        attributes: {
          color: "Black",
          wireless: true,
          noiseCancelling: true,
        },
        images: [
          {
            id: "img-1",
            url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
            alt: "Premium Wireless Headphones - Black",
            width: 800,
            height: 800,
            isDefault: true,
          },
        ],
        availability: {
          isAvailable: true,
          quantity: 50,
          isBackorderable: false,
          isPreorder: false,
        },
        isDefault: true,
      },
      variants: [
        {
          id: "2",
          sku: "SKU-12345-WHT",
          name: "White",
          price: {
            amount: 29999,
            currency: "USD",
            formatted: "$299.99",
          },
          attributes: {
            color: "White",
            wireless: true,
            noiseCancelling: true,
          },
          images: [
            {
              id: "img-2",
              url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
              alt: "Premium Wireless Headphones - White",
              width: 800,
              height: 800,
              isDefault: true,
            },
          ],
          availability: {
            isAvailable: true,
            quantity: 30,
            isBackorderable: false,
            isPreorder: false,
          },
          isDefault: false,
        },
      ],
      images: [
        {
          id: "img-1",
          url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
          alt: "Premium Wireless Headphones",
          width: 800,
          height: 800,
          isDefault: true,
        },
      ],
      attributes: {
        wireless: true,
        noiseCancelling: true,
        batteryLife: 30,
      },
      metaTitle: "Premium Wireless Headphones | AudioTech",
      metaDescription:
        "Shop Premium Wireless Headphones with active noise cancellation and 30-hour battery.",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: new Date().toISOString(),
    };
  }

  private getMockProductList(
    page = 1,
    limit = 20
  ): {
    products: ProductListItem[];
    total: number;
    page: number;
    totalPages: number;
  } {
    const products: ProductListItem[] = Array.from({ length: limit }, (_, i) => ({
      id: `product-${page}-${i + 1}`,
      sku: `SKU-${page}${i + 1}`,
      name: `Product ${page * limit - limit + i + 1}`,
      slug: `product-${page * limit - limit + i + 1}`,
      shortDescription: "A great product for everyday use",
      brand: "Brand Name",
      price: {
        amount: 1999 + i * 500,
        currency: "USD",
        formatted: `$${((1999 + i * 500) / 100).toFixed(2)}`,
      },
      image: {
        id: "img-1",
        url: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80`,
        alt: `Product ${i + 1}`,
        isDefault: true,
      },
      isAvailable: true,
      hasVariants: i % 3 === 0,
      categories: [{ id: "cat-1", name: "Category", slug: "category" }],
    }));

    return {
      products,
      total: 100,
      page,
      totalPages: Math.ceil(100 / limit),
    };
  }

  private getMockSearchResults(
    query: string,
    options: { page?: number; hitsPerPage?: number } = {}
  ): SearchResponse<ProductListItem> {
    const { page = 0, hitsPerPage = 20 } = options;
    const mockList = this.getMockProductList(page + 1, hitsPerPage);

    return {
      hits: mockList.products,
      query,
      totalHits: mockList.total,
      page,
      hitsPerPage,
      totalPages: mockList.totalPages,
      processingTimeMs: 15,
      facets: {
        categories: { Electronics: 45, Clothing: 30, Home: 25 },
        brand: { "Brand A": 40, "Brand B": 35, "Brand C": 25 },
        price: {},
      },
    };
  }

  private getMockSuggestions(query: string): string[] {
    const suggestions = [
      "wireless headphones",
      "wireless earbuds",
      "wireless speaker",
      "wireless charger",
      "wireless keyboard",
    ];

    return suggestions.filter((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    );
  }

  private getMockCategories(): Category[] {
    return [
      {
        id: "cat-electronics",
        name: "Electronics",
        slug: "electronics",
        description: "Electronic devices and accessories",
        productCount: 150,
      },
      {
        id: "cat-clothing",
        name: "Clothing",
        slug: "clothing",
        description: "Apparel and fashion",
        productCount: 200,
      },
      {
        id: "cat-home",
        name: "Home & Garden",
        slug: "home-garden",
        description: "Home improvement and garden supplies",
        productCount: 100,
      },
    ];
  }

  private getMockCategory(id: string, slug?: string): Category {
    return {
      id,
      name: "Electronics",
      slug: slug || "electronics",
      description: "Electronic devices and accessories",
      productCount: 150,
    };
  }
}

// Export singleton instance
let productServiceInstance: ProductService | null = null;

export function getProductService(): ProductService {
  if (!productServiceInstance) {
    productServiceInstance = new ProductService();
  }
  return productServiceInstance;
}
