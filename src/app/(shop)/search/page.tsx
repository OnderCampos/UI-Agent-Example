"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Loader2,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchFilters } from "@/components/features/search/search-filters";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

// Mock filter configuration
const filterConfig = [
  {
    id: "category",
    name: "Category",
    type: "checkbox" as const,
    options: [
      { value: "grocery", label: "Grocery", count: 234 },
      { value: "electronics", label: "Electronics", count: 89 },
      { value: "home", label: "Home & Garden", count: 156 },
      { value: "health", label: "Health & Beauty", count: 78 },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    type: "checkbox" as const,
    options: [
      { value: "kirkland", label: "Kirkland", count: 145 },
      { value: "organic", label: "Organic Valley", count: 67 },
      { value: "samsung", label: "Samsung", count: 34 },
      { value: "lg", label: "LG", count: 28 },
    ],
  },
  {
    id: "price",
    name: "Price Range",
    type: "range" as const,
    options: [],
  },
  {
    id: "rating",
    name: "Rating",
    type: "rating" as const,
    options: [
      { value: "4", label: "4 Stars & Up", count: 320 },
      { value: "3", label: "3 Stars & Up", count: 412 },
      { value: "2", label: "2 Stars & Up", count: 456 },
    ],
  },
  {
    id: "availability",
    name: "Availability",
    type: "checkbox" as const,
    options: [
      { value: "inStock", label: "In Stock", count: 389 },
      { value: "memberOnly", label: "Member Exclusive", count: 45 },
    ],
  },
];

// Mock search results
const mockResults = [
  {
    id: "prod-1",
    name: "Organic Coffee Beans - Premium Blend",
    slug: "organic-coffee-beans",
    price: { amount: 2499, formatted: "$24.99" },
    image: { url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400", alt: "Coffee" },
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
  },
  {
    id: "prod-2",
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-headphones",
    price: { amount: 8999, formatted: "$89.99" },
    originalPrice: { amount: 12999, formatted: "$129.99" },
    image: { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", alt: "Headphones" },
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
  },
  {
    id: "prod-3",
    name: "Extra Virgin Olive Oil - 1L",
    slug: "olive-oil",
    price: { amount: 1899, formatted: "$18.99" },
    image: { url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400", alt: "Olive Oil" },
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: "prod-4",
    name: "Smart Watch Series 5",
    slug: "smart-watch",
    price: { amount: 29999, formatted: "$299.99" },
    image: { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", alt: "Watch" },
    rating: 4.7,
    reviewCount: 312,
    inStock: false,
  },
  {
    id: "prod-5",
    name: "Organic Almond Butter",
    slug: "almond-butter",
    price: { amount: 1299, formatted: "$12.99" },
    image: { url: "https://images.unsplash.com/photo-1612187209234-567b6e9a1439?w=400", alt: "Almond Butter" },
    rating: 4.6,
    reviewCount: 67,
    inStock: true,
  },
  {
    id: "prod-6",
    name: "LED Smart TV 55\"",
    slug: "smart-tv",
    price: { amount: 49999, formatted: "$499.99" },
    originalPrice: { amount: 59999, formatted: "$599.99" },
    image: { url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400", alt: "TV" },
    rating: 4.4,
    reviewCount: 178,
    inStock: true,
  },
];

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { addToCart, isAddingProduct } = useCart();
  const { toast } = useToast();

  const [results, setResults] = useState(mockResults);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Simulate search
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Filter and sort results based on query and filters
      let filtered = mockResults;
      
      if (query) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Apply sort
      switch (sortBy) {
        case "price-asc":
          filtered.sort((a, b) => a.price.amount - b.price.amount);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price.amount - a.price.amount);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
      }

      setResults(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, sortBy, selectedFilters]);

  const handleFilterChange = (filterId: string, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: values,
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    setPriceRange({ min: 0, max: 1000 });
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart({ productId, quantity: 1 });
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add item to cart.",
      });
    }
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {query ? `Search results for "${query}"` : "All Products"}
          </h1>
          <p className="text-gray-600">
            {isLoading ? "Searching..." : `${results.length} results found`}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>
              <SearchFilters
                filters={filterConfig}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearFilters}
                priceRange={priceRange}
                onPriceRangeChange={(min, max) => setPriceRange({ min, max })}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-[#0052a1] text-white text-xs rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </Button>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 text-sm cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-[#0052a1] text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-[#0052a1] text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Results */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#0052a1]" />
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl overflow-hidden border hover:shadow-lg transition-shadow group"
                  >
                    <Link href={`/products/${product.slug}`}>
                      <div className="relative aspect-square bg-gray-100">
                        <Image
                          src={product.image.url}
                          alt={product.image.alt || product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        {product.originalPrice && (
                          <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                            SALE
                          </span>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-medium">Out of Stock</span>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-[#0052a1] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[#f5a623]">
                          {"★".repeat(Math.floor(product.rating))}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({product.reviewCount})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-bold text-[#0052a1]">
                          {product.price.formatted}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {product.originalPrice.formatted}
                          </span>
                        )}
                      </div>
                      <Button
                        className="w-full mt-3 bg-[#0052a1] hover:bg-[#003d7a]"
                        size="sm"
                        disabled={!product.inStock || isAddingProduct(product.id)}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        {isAddingProduct(product.id) ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl p-4 flex gap-4 border hover:shadow-md transition-shadow"
                  >
                    <Link href={`/products/${product.slug}`}>
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={product.image.url}
                          alt={product.image.alt || product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-medium text-gray-900 hover:text-[#0052a1] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[#f5a623]">
                          {"★".repeat(Math.floor(product.rating))}
                        </span>
                        <span className="text-sm text-gray-500">
                          {product.rating} ({product.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xl font-bold text-[#0052a1]">
                          {product.price.formatted}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {product.originalPrice.formatted}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <Button
                        className="bg-[#0052a1] hover:bg-[#003d7a]"
                        disabled={!product.inStock || isAddingProduct(product.id)}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        {isAddingProduct(product.id) ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Mobile Filter Drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowFilters(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <SearchFilters
                filters={filterConfig}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearFilters}
                priceRange={priceRange}
                onPriceRangeChange={(min, max) => setPriceRange({ min, max })}
              />
              <div className="mt-6 pt-6 border-t">
                <Button
                  className="w-full bg-[#0052a1] hover:bg-[#003d7a]"
                  onClick={() => setShowFilters(false)}
                >
                  Show Results
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0052a1]" />
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
