/**
 * Algolia Indexing Operations
 * Used for syncing products to Algolia
 */

import { createAlgoliaAdminClient, getIndexName } from "./client";
import type {
  AlgoliaProductRecord,
  AlgoliaIndexSettings,
} from "./types";
import type { Product } from "@/types/product";
import type { BatchResult } from "@/types/api";
import { ExternalServiceError } from "@/lib/errors";
import { logger } from "@/lib/logger";

const log = logger.child("Algolia-Index");

/**
 * Converts Product to AlgoliaProductRecord
 */
function toAlgoliaRecord(product: Product): AlgoliaProductRecord {
  const variant = product.masterVariant;

  return {
    objectID: product.id,
    sku: product.sku,
    name: product.name,
    slug: product.slug,
    description: product.description,
    brand: product.brand,
    categories: product.categories.map((c) => c.name),
    categoryIds: product.categories.map((c) => c.id),
    price: variant.price.amount / 100, // Convert from cents
    compareAtPrice: variant.compareAtPrice
      ? variant.compareAtPrice.amount / 100
      : undefined,
    currency: variant.price.currency,
    image: variant.images[0]?.url,
    images: variant.images.map((img) => img.url),
    inStock: variant.availability.isAvailable,
    quantity: variant.availability.quantity,
    attributes: variant.attributes,
    createdAt: new Date(product.createdAt).getTime(),
    updatedAt: new Date(product.updatedAt).getTime(),
  };
}

/**
 * Index a single product
 */
export async function indexProduct(product: Product): Promise<{ taskID: number }> {
  log.debug("Indexing product", { productId: product.id });

  try {
    const client = createAlgoliaAdminClient();
    const indexName = getIndexName();
    const record = toAlgoliaRecord(product);

    const response = await client.put<{ taskID: number }>(
      `/1/indexes/${indexName}/${record.objectID}`,
      record
    );

    return { taskID: response.data.taskID };
  } catch (error) {
    throw new ExternalServiceError("Algolia", "Indexing failed", error);
  }
}

/**
 * Index multiple products in batch
 */
export async function indexProducts(
  products: Product[]
): Promise<BatchResult<{ objectID: string }>> {
  log.debug("Batch indexing products", { count: products.length });

  const successful: { objectID: string }[] = [];
  const failed: { item: unknown; error: string }[] = [];

  try {
    const client = createAlgoliaAdminClient();
    const indexName = getIndexName();

    // Algolia batch size limit is 1000 objects
    const batchSize = 1000;
    const batches: AlgoliaProductRecord[][] = [];

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize).map(toAlgoliaRecord);
      batches.push(batch);
    }

    for (const batch of batches) {
      const requests = batch.map((record) => ({
        action: "updateObject" as const,
        body: record,
      }));

      const response = await client.post<{
        taskID: number;
        objectIDs: string[];
      }>(`/1/indexes/${indexName}/batch`, { requests });

      response.data.objectIDs.forEach((objectID) => {
        successful.push({ objectID });
      });
    }
  } catch (error) {
    // If batch fails, mark all as failed
    products.forEach((product) => {
      failed.push({
        item: product,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    });
  }

  return {
    successful,
    failed,
    total: products.length,
    successCount: successful.length,
    failureCount: failed.length,
  };
}

/**
 * Delete a product from the index
 */
export async function deleteProduct(productId: string): Promise<{ taskID: number }> {
  log.debug("Deleting product from index", { productId });

  try {
    const client = createAlgoliaAdminClient();
    const indexName = getIndexName();

    const response = await client.delete<{ taskID: number }>(
      `/1/indexes/${indexName}/${productId}`
    );

    return { taskID: response.data.taskID };
  } catch (error) {
    throw new ExternalServiceError("Algolia", "Delete failed", error);
  }
}

/**
 * Delete multiple products from the index
 */
export async function deleteProducts(
  productIds: string[]
): Promise<{ taskID: number }> {
  log.debug("Batch deleting products from index", { count: productIds.length });

  try {
    const client = createAlgoliaAdminClient();
    const indexName = getIndexName();

    const requests = productIds.map((objectID) => ({
      action: "deleteObject" as const,
      body: { objectID },
    }));

    const response = await client.post<{ taskID: number }>(
      `/1/indexes/${indexName}/batch`,
      { requests }
    );

    return { taskID: response.data.taskID };
  } catch (error) {
    throw new ExternalServiceError("Algolia", "Batch delete failed", error);
  }
}

/**
 * Clear the entire index
 */
export async function clearIndex(): Promise<{ taskID: number }> {
  log.warn("Clearing entire index");

  try {
    const client = createAlgoliaAdminClient();
    const indexName = getIndexName();

    const response = await client.post<{ taskID: number }>(
      `/1/indexes/${indexName}/clear`
    );

    return { taskID: response.data.taskID };
  } catch (error) {
    throw new ExternalServiceError("Algolia", "Clear index failed", error);
  }
}

/**
 * Get index settings
 */
export async function getIndexSettings(): Promise<AlgoliaIndexSettings> {
  log.debug("Getting index settings");

  try {
    const client = createAlgoliaAdminClient();
    const indexName = getIndexName();

    const response = await client.get<AlgoliaIndexSettings>(
      `/1/indexes/${indexName}/settings`
    );

    return response.data;
  } catch (error) {
    throw new ExternalServiceError("Algolia", "Get settings failed", error);
  }
}

/**
 * Update index settings
 */
export async function updateIndexSettings(
  settings: Partial<AlgoliaIndexSettings>
): Promise<{ taskID: number }> {
  log.info("Updating index settings", { settings: Object.keys(settings) });

  try {
    const client = createAlgoliaAdminClient();
    const indexName = getIndexName();

    const response = await client.put<{ taskID: number }>(
      `/1/indexes/${indexName}/settings`,
      settings
    );

    return { taskID: response.data.taskID };
  } catch (error) {
    throw new ExternalServiceError("Algolia", "Update settings failed", error);
  }
}

/**
 * Wait for a task to complete
 */
export async function waitForTask(
  taskID: number,
  options: { maxRetries?: number; retryDelay?: number } = {}
): Promise<void> {
  const { maxRetries = 60, retryDelay = 1000 } = options;

  log.debug("Waiting for task", { taskID });

  try {
    const client = createAlgoliaAdminClient();
    const indexName = getIndexName();

    for (let i = 0; i < maxRetries; i++) {
      const response = await client.get<{ status: string; pendingTask: boolean }>(
        `/1/indexes/${indexName}/task/${taskID}`
      );

      if (response.data.status === "published" && !response.data.pendingTask) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }

    throw new Error(`Task ${taskID} did not complete within timeout`);
  } catch (error) {
    throw new ExternalServiceError("Algolia", "Wait for task failed", error);
  }
}

/**
 * Default index settings for product search
 */
export const DEFAULT_INDEX_SETTINGS: Partial<AlgoliaIndexSettings> = {
  searchableAttributes: [
    "name",
    "brand",
    "categories",
    "description",
    "sku",
  ],
  attributesForFaceting: [
    "categories",
    "brand",
    "filterOnly(categoryIds)",
    "searchable(attributes.color)",
    "searchable(attributes.size)",
    "price",
    "inStock",
  ],
  customRanking: [
    "desc(inStock)",
    "desc(rating)",
    "desc(reviewCount)",
  ],
  ranking: [
    "typo",
    "geo",
    "words",
    "filters",
    "proximity",
    "attribute",
    "exact",
    "custom",
  ],
  attributesToRetrieve: [
    "objectID",
    "sku",
    "name",
    "slug",
    "description",
    "brand",
    "categories",
    "categoryIds",
    "price",
    "compareAtPrice",
    "currency",
    "image",
    "images",
    "inStock",
    "quantity",
    "attributes",
    "rating",
    "reviewCount",
  ],
  highlightPreTag: "<mark>",
  highlightPostTag: "</mark>",
  hitsPerPage: 20,
  maxValuesPerFacet: 100,
  typoTolerance: true,
  minWordSizefor1Typo: 4,
  minWordSizefor2Typos: 8,
};
