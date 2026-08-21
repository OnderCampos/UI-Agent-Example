"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "@/hooks/use-search";
import { useCart } from "@/hooks/use-cart";
import type { ProductListItem } from "@/types/product";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoadingFallback />}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsLoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    </div>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const { results, isLoading, search, facets } = useSearch();
  const { addToCart, isAddingProduct } = useCart();
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Load products on mount or when query changes
    const filters: Record<string, string[]> = {};
    if (selectedCategory) {
      filters.categories = [selectedCategory];
    }
    search(initialQuery, { filters });
  }, [initialQuery, selectedCategory, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = searchInput ? `/products?q=${encodeURIComponent(searchInput)}` : "/products";
    window.history.pushState({}, "", url);
    search(searchInput);
  };

  const handleAddToCart = async (product: ProductListItem) => {
    await addToCart({ productId: product.id, quantity: 1 });
  };

  const categoryFacets = facets?.categories || {};

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">
          {results.length > 0
            ? `Showing ${results.length} products`
            : "Browse our collection"}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Search */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </h3>
              <form onSubmit={handleSearch}>
                <div className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <Button type="submit" size="icon" variant="secondary">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    !selectedCategory
                      ? "bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100"
                      : "hover:bg-muted"
                  }`}
                >
                  All Categories
                </button>
                {Object.entries(categoryFacets).map(([category, count]) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100"
                        : "hover:bg-muted"
                    }`}
                  >
                    {category}
                    <span className="text-muted-foreground ml-2">({count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No products found</p>
              <Button variant="outline" onClick={() => search("")}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  isAddingToCart={isAddingProduct(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onAddToCart,
  isAddingToCart,
}: {
  product: ProductListItem;
  onAddToCart: () => void;
  isAddingToCart: boolean;
}) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice.amount > product.price.amount;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price.amount / product.compareAtPrice!.amount) * 100)
    : 0;

  return (
    <div className="group border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-muted">
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        {hasDiscount && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
            -{discountPercent}%
          </Badge>
        )}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary">Out of Stock</Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {product.brand && (
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {product.brand}
          </p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.shortDescription && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold">{product.price.formatted}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {product.compareAtPrice!.formatted}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
          disabled={!product.isAvailable || isAddingToCart}
          onClick={onAddToCart}
        >
          {isAddingToCart ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>
    </div>
  );
}
