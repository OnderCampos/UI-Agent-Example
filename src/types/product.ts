/**
 * Product-related types
 * These types represent the application's product domain model
 * Adapters map external service data to these types
 */

/**
 * Product variant (e.g., size, color combinations)
 */
export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price: Price;
  compareAtPrice?: Price;
  attributes: Record<string, string | number | boolean>;
  images: ProductImage[];
  availability: ProductAvailability;
  isDefault: boolean;
}

/**
 * Price with currency
 */
export interface Price {
  amount: number; // In cents
  currency: string;
  formatted: string;
}

/**
 * Product image
 */
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  isDefault: boolean;
}

/**
 * Product video
 */
export interface ProductVideo {
  id: string;
  url: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  duration?: number; // in seconds
  type: "youtube" | "vimeo" | "mp4" | "hls";
  isDefault: boolean;
}

/**
 * Product availability / inventory
 */
export interface ProductAvailability {
  isAvailable: boolean;
  quantity?: number;
  isBackorderable: boolean;
  backorderDate?: string;
  isPreorder: boolean;
  preorderDate?: string;
}

/**
 * Product category reference
 */
export interface CategoryReference {
  id: string;
  name: string;
  slug: string;
}

/**
 * Full product entity
 */
export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  brand?: string;
  categories: CategoryReference[];
  masterVariant: ProductVariant;
  variants: ProductVariant[];
  images: ProductImage[];
  videos?: ProductVideo[];
  attributes: Record<string, string | number | boolean>;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Product list item (lighter version for listings)
 */
export interface ProductListItem {
  id: string;
  sku: string;
  name: string;
  slug: string;
  shortDescription?: string;
  brand?: string;
  price: Price;
  compareAtPrice?: Price;
  image: ProductImage | null;
  isAvailable: boolean;
  hasVariants: boolean;
  categories: CategoryReference[];
}

/**
 * Product query parameters
 */
export interface ProductQuery {
  categoryId?: string;
  categorySlug?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  attributes?: Record<string, string | string[]>;
  sortBy?: ProductSortField;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

/**
 * Available sort fields for products
 */
export type ProductSortField =
  | "name"
  | "price"
  | "createdAt"
  | "relevance"
  | "popularity";

/**
 * Category entity
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: ProductImage;
  parentId?: string;
  children?: Category[];
  productCount?: number;
  metaTitle?: string;
  metaDescription?: string;
}

/**
 * Category tree (for navigation)
 */
export interface CategoryTree {
  categories: Category[];
  total: number;
}
