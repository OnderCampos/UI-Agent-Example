/**
 * Commercetools Product Operations
 */

import { createCommercetoolsClient } from "./client";
import type {
  CTProductProjection,
  CTCategory,
  CTPagedQueryResult,
  CTLocalizedString,
} from "./types";
import type {
  Product,
  ProductListItem,
  ProductQuery,
  Category,
  ProductVariant,
  Price,
  ProductImage,
} from "@/types/product";
import { NotFoundError, ExternalServiceError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { DEFAULT_LOCALE, DEFAULT_CURRENCY } from "@/lib/constants";

const log = logger.child("CT-Products");

/**
 * Gets localized string value
 */
function getLocalizedValue(
  localizedString: CTLocalizedString | undefined,
  locale: string = DEFAULT_LOCALE
): string {
  if (!localizedString) return "";
  return localizedString[locale] || localizedString["en"] || Object.values(localizedString)[0] || "";
}

/**
 * Converts CT money to Price
 */
function toPrice(
  centAmount: number,
  currencyCode: string = DEFAULT_CURRENCY
): Price {
  return {
    amount: centAmount,
    currency: currencyCode,
    formatted: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(centAmount / 100),
  };
}

/**
 * Converts CT image to ProductImage
 */
function toProductImage(
  ctImage: { url: string; dimensions?: { w: number; h: number }; label?: string },
  index: number
): ProductImage {
  return {
    id: `img-${index}`,
    url: ctImage.url,
    alt: ctImage.label || "",
    width: ctImage.dimensions?.w,
    height: ctImage.dimensions?.h,
    isDefault: index === 0,
  };
}

/**
 * Converts CT variant to ProductVariant
 */
function toProductVariant(
  ctVariant: CTProductProjection["masterVariant"],
  locale: string = DEFAULT_LOCALE,
  currency: string = DEFAULT_CURRENCY
): ProductVariant {
  const price = ctVariant.prices?.find((p) => p.value.currencyCode === currency);
  const priceValue = price?.value.centAmount || 0;
  const discountedPrice = price?.discounted?.value.centAmount;

  const attributes: Record<string, string | number | boolean> = {};
  ctVariant.attributes?.forEach((attr) => {
    if (typeof attr.value === "string" || typeof attr.value === "number" || typeof attr.value === "boolean") {
      attributes[attr.name] = attr.value;
    } else if (typeof attr.value === "object" && attr.value !== null) {
      // Handle localized strings in attributes
      if ("label" in attr.value) {
        attributes[attr.name] = (attr.value as { label: string }).label;
      } else if (locale in attr.value) {
        attributes[attr.name] = (attr.value as CTLocalizedString)[locale];
      }
    }
  });

  return {
    id: String(ctVariant.id),
    sku: ctVariant.sku || "",
    name: ctVariant.sku || `Variant ${ctVariant.id}`,
    price: toPrice(discountedPrice || priceValue, currency),
    compareAtPrice: discountedPrice ? toPrice(priceValue, currency) : undefined,
    attributes,
    images: ctVariant.images?.map(toProductImage) || [],
    availability: {
      isAvailable: ctVariant.availability?.isOnStock ?? true,
      quantity: ctVariant.availability?.availableQuantity,
      isBackorderable: (ctVariant.availability?.restockableInDays ?? 0) > 0,
      isPreorder: false,
    },
    isDefault: ctVariant.id === 1,
  };
}

/**
 * Converts CT product projection to Product
 */
function toProduct(
  ctProduct: CTProductProjection,
  locale: string = DEFAULT_LOCALE,
  currency: string = DEFAULT_CURRENCY
): Product {
  const masterVariant = toProductVariant(ctProduct.masterVariant, locale, currency);
  const variants = ctProduct.variants.map((v) => toProductVariant(v, locale, currency));

  return {
    id: ctProduct.id,
    sku: ctProduct.masterVariant.sku || "",
    name: getLocalizedValue(ctProduct.name, locale),
    slug: getLocalizedValue(ctProduct.slug, locale),
    description: getLocalizedValue(ctProduct.description, locale),
    categories: ctProduct.categories.map((cat) => ({
      id: cat.id,
      name: "",
      slug: "",
    })),
    masterVariant,
    variants,
    images: masterVariant.images,
    attributes: masterVariant.attributes,
    metaTitle: getLocalizedValue(ctProduct.metaTitle, locale),
    metaDescription: getLocalizedValue(ctProduct.metaDescription, locale),
    createdAt: ctProduct.createdAt,
    updatedAt: ctProduct.lastModifiedAt,
  };
}

/**
 * Converts CT product projection to ProductListItem
 */
function toProductListItem(
  ctProduct: CTProductProjection,
  locale: string = DEFAULT_LOCALE,
  currency: string = DEFAULT_CURRENCY
): ProductListItem {
  const variant = ctProduct.masterVariant;
  const price = variant.prices?.find((p) => p.value.currencyCode === currency);
  const priceValue = price?.value.centAmount || 0;
  const discountedPrice = price?.discounted?.value.centAmount;

  return {
    id: ctProduct.id,
    sku: variant.sku || "",
    name: getLocalizedValue(ctProduct.name, locale),
    slug: getLocalizedValue(ctProduct.slug, locale),
    shortDescription: getLocalizedValue(ctProduct.description, locale).slice(0, 150),
    price: toPrice(discountedPrice || priceValue, currency),
    compareAtPrice: discountedPrice ? toPrice(priceValue, currency) : undefined,
    image: variant.images?.[0] ? toProductImage(variant.images[0], 0) : null,
    isAvailable: variant.availability?.isOnStock ?? true,
    hasVariants: ctProduct.variants.length > 0,
    categories: ctProduct.categories.map((cat) => ({
      id: cat.id,
      name: "",
      slug: "",
    })),
  };
}

/**
 * Converts CT category to Category
 */
function toCategory(ctCategory: CTCategory, locale: string = DEFAULT_LOCALE): Category {
  return {
    id: ctCategory.id,
    name: getLocalizedValue(ctCategory.name, locale),
    slug: getLocalizedValue(ctCategory.slug, locale),
    description: getLocalizedValue(ctCategory.description, locale),
    parentId: ctCategory.parent?.id,
  };
}

// ============================================
// Product Operations
// ============================================

/**
 * Get product by ID
 */
export async function getProductById(
  id: string,
  options: { locale?: string; currency?: string } = {}
): Promise<Product> {
  const { locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY } = options;

  log.debug("Fetching product by ID", { id });

  try {
    const client = await createCommercetoolsClient();
    const response = await client.get<CTProductProjection>(
      `/product-projections/${id}`,
      {
        params: {
          priceCurrency: currency,
          priceCountry: "US",
        },
      }
    );

    return toProduct(response.data, locale, currency);
  } catch (error) {
    if ((error as { statusCode?: number }).statusCode === 404) {
      throw new NotFoundError("Product", `Product with ID ${id} not found`);
    }
    throw new ExternalServiceError("Commercetools", "Failed to fetch product", error);
  }
}

/**
 * Get product by slug
 */
export async function getProductBySlug(
  slug: string,
  options: { locale?: string; currency?: string } = {}
): Promise<Product> {
  const { locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY } = options;

  log.debug("Fetching product by slug", { slug });

  try {
    const client = await createCommercetoolsClient();
    const response = await client.get<CTPagedQueryResult<CTProductProjection>>(
      `/product-projections`,
      {
        params: {
          where: `slug(${locale}="${slug}")`,
          priceCurrency: currency,
          limit: 1,
        },
      }
    );

    if (response.data.results.length === 0) {
      throw new NotFoundError("Product", `Product with slug ${slug} not found`);
    }

    return toProduct(response.data.results[0], locale, currency);
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new ExternalServiceError("Commercetools", "Failed to fetch product", error);
  }
}

/**
 * Search/query products
 */
export async function queryProducts(
  query: ProductQuery = {},
  options: { locale?: string; currency?: string } = {}
): Promise<{ products: ProductListItem[]; total: number; page: number; totalPages: number }> {
  const { locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY } = options;
  const { page = 1, limit = 20, categoryId, sortBy, sortOrder = "asc" } = query;

  log.debug("Querying products", { query });

  try {
    const client = await createCommercetoolsClient();

    const params: Record<string, string | number> = {
      limit,
      offset: (page - 1) * limit,
      priceCurrency: currency,
    };

    // Add category filter
    if (categoryId) {
      params.filter = `categories.id:"${categoryId}"`;
    }

    // Add sorting
    if (sortBy) {
      const sortField = sortBy === "name" ? `name.${locale}` : sortBy === "price" ? "price" : "createdAt";
      params.sort = `${sortField} ${sortOrder}`;
    }

    const response = await client.get<CTPagedQueryResult<CTProductProjection>>(
      `/product-projections/search`,
      { params }
    );

    return {
      products: response.data.results.map((p) => toProductListItem(p, locale, currency)),
      total: response.data.total || response.data.count,
      page,
      totalPages: Math.ceil((response.data.total || response.data.count) / limit),
    };
  } catch (error) {
    throw new ExternalServiceError("Commercetools", "Failed to query products", error);
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  categoryId: string,
  options: { locale?: string; currency?: string; page?: number; limit?: number } = {}
): Promise<{ products: ProductListItem[]; total: number }> {
  const result = await queryProducts({ categoryId, ...options }, options);
  return { products: result.products, total: result.total };
}

// ============================================
// Category Operations
// ============================================

/**
 * Get all categories
 */
export async function getCategories(
  options: { locale?: string; parentId?: string } = {}
): Promise<Category[]> {
  const { locale = DEFAULT_LOCALE, parentId } = options;

  log.debug("Fetching categories", { parentId });

  try {
    const client = await createCommercetoolsClient();

    const params: Record<string, string | number> = {
      limit: 500,
      sort: "orderHint asc",
    };

    if (parentId) {
      params.where = `parent(id="${parentId}")`;
    } else {
      params.where = 'parent is not defined';
    }

    const response = await client.get<CTPagedQueryResult<CTCategory>>(
      `/categories`,
      { params }
    );

    return response.data.results.map((cat) => toCategory(cat, locale));
  } catch (error) {
    throw new ExternalServiceError("Commercetools", "Failed to fetch categories", error);
  }
}

/**
 * Get category by ID
 */
export async function getCategoryById(
  id: string,
  options: { locale?: string } = {}
): Promise<Category> {
  const { locale = DEFAULT_LOCALE } = options;

  log.debug("Fetching category by ID", { id });

  try {
    const client = await createCommercetoolsClient();
    const response = await client.get<CTCategory>(`/categories/${id}`);

    return toCategory(response.data, locale);
  } catch (error) {
    if ((error as { statusCode?: number }).statusCode === 404) {
      throw new NotFoundError("Category", `Category with ID ${id} not found`);
    }
    throw new ExternalServiceError("Commercetools", "Failed to fetch category", error);
  }
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(
  slug: string,
  options: { locale?: string } = {}
): Promise<Category> {
  const { locale = DEFAULT_LOCALE } = options;

  log.debug("Fetching category by slug", { slug });

  try {
    const client = await createCommercetoolsClient();
    const response = await client.get<CTPagedQueryResult<CTCategory>>(
      `/categories`,
      {
        params: {
          where: `slug(${locale}="${slug}")`,
          limit: 1,
        },
      }
    );

    if (response.data.results.length === 0) {
      throw new NotFoundError("Category", `Category with slug ${slug} not found`);
    }

    return toCategory(response.data.results[0], locale);
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new ExternalServiceError("Commercetools", "Failed to fetch category", error);
  }
}
