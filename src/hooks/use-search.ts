"use client";

import { useState, useCallback } from "react";
import type { ProductListItem } from "@/types/product";

interface SearchFilters {
  categories?: string[];
  brand?: string[];
  inStock?: boolean;
}

interface SearchOptions {
  page?: number;
  hitsPerPage?: number;
  filters?: SearchFilters;
  sortBy?: string;
}

interface SearchFacets {
  categories?: Record<string, number>;
  brand?: Record<string, number>;
}

export function useSearch() {
  const [results, setResults] = useState<ProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facets, setFacets] = useState<SearchFacets | null>(null);
  const [totalHits, setTotalHits] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const search = useCallback(
    async (query: string, options: SearchOptions = {}) => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (options.page !== undefined) params.set("page", String(options.page));
        if (options.hitsPerPage) params.set("hitsPerPage", String(options.hitsPerPage));
        if (options.sortBy) params.set("sortBy", options.sortBy);
        
        // Add filters
        if (options.filters?.categories?.length) {
          options.filters.categories.forEach((cat) => {
            params.append("categories", cat);
          });
        }
        if (options.filters?.brand?.length) {
          options.filters.brand.forEach((b) => {
            params.append("brand", b);
          });
        }
        if (options.filters?.inStock !== undefined) {
          params.set("inStock", String(options.filters.inStock));
        }

        const res = await fetch(`/api/search?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          setResults(data.data.hits || []);
          setFacets(data.data.facets || null);
          setTotalHits(data.data.totalHits || 0);
          setTotalPages(data.data.totalPages || 0);
          setCurrentPage(data.data.page || 0);
        } else {
          // Fallback to products API if search fails
          const productsRes = await fetch(`/api/products?${params.toString()}`);
          const productsData = await productsRes.json();
          
          if (productsData.success) {
            setResults(productsData.data || []);
            // Create mock facets from results
            const categoryFacets: Record<string, number> = {};
            productsData.data?.forEach((product: ProductListItem) => {
              product.categories?.forEach((cat) => {
                categoryFacets[cat.name] = (categoryFacets[cat.name] || 0) + 1;
              });
            });
            setFacets({ categories: categoryFacets });
            setTotalHits(productsData.data?.length || 0);
          } else {
            setError(productsData.error?.message || "Search failed");
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearResults = useCallback(() => {
    setResults([]);
    setFacets(null);
    setTotalHits(0);
    setTotalPages(0);
    setCurrentPage(0);
    setError(null);
  }, []);

  return {
    results,
    isLoading,
    error,
    search,
    clearResults,
    facets,
    totalHits,
    totalPages,
    currentPage,
  };
}
