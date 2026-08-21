"use client";

import { useState, useCallback, useEffect } from "react";
import type { Product, ProductListItem, Category } from "@/types/product";

interface UseProductsOptions {
  categoryId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.categoryId) params.set("categoryId", options.categoryId);
      if (options.page) params.set("page", String(options.page));
      if (options.limit) params.set("limit", String(options.limit));
      if (options.sortBy) params.set("sortBy", options.sortBy);
      if (options.sortOrder) params.set("sortOrder", options.sortOrder);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
        if (data.pagination) {
          setPagination(data.pagination);
        }
      } else {
        setError(data.error?.message || "Failed to fetch products");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  }, [options.categoryId, options.page, options.limit, options.sortBy, options.sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    pagination,
    refresh: fetchProducts,
  };
}

export function useProduct(idOrSlug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!idOrSlug) return;

    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`/api/products/${idOrSlug}`);
      const data = await res.json();

      if (data.success) {
        setProduct(data.data);
      } else {
        setError(data.error?.message || "Product not found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product");
    } finally {
      setIsLoading(false);
    }
  }, [idOrSlug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    isLoading,
    error,
    refresh: fetchProduct,
  };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/categories");
      const data = await res.json();

      if (data.success) {
        setCategories(data.data);
      } else {
        setError(data.error?.message || "Failed to fetch categories");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    refresh: fetchCategories,
  };
}
