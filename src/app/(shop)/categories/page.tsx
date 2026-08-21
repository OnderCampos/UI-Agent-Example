"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ChevronRight, Layers } from "lucide-react";
import type { Category } from "@/types/product";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/categories");
        const data = await res.json();

        if (data.success) {
          setCategories(data.data);
        } else {
          setError(data.error?.message || "Failed to load categories");
        }
      } catch {
        setError("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  // Separate parent and child categories
  const parentCategories = categories.filter((c) => !c.parentId);
  const childCategories = categories.filter((c) => c.parentId);

  const getCategoryChildren = (parentId: string) => {
    return childCategories.filter((c) => c.parentId === parentId);
  };

  // Color palette for category cards
  const colors = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-cyan-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
    "from-rose-500 to-pink-600",
    "from-indigo-500 to-blue-600",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-muted-foreground">
          Browse our product categories
        </p>
      </div>

      {/* Categories Grid */}
      {parentCategories.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Layers className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No categories available</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parentCategories.map((category, index) => {
            const children = getCategoryChildren(category.id);
            const colorClass = colors[index % colors.length];

            return (
              <div
                key={category.id}
                className="group border rounded-2xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300"
              >
                {/* Category Header */}
                <Link
                  href={`/products?category=${category.slug}`}
                  className={`block relative h-32 bg-gradient-to-br ${colorClass} p-6`}
                >
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  {category.productCount !== undefined && (
                    <p className="text-white/80 text-sm mt-1">
                      {category.productCount} products
                    </p>
                  )}
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-white/50 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Subcategories */}
                {children.length > 0 && (
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                      Subcategories
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {children.map((child) => (
                        <Link
                          key={child.id}
                          href={`/products?category=${child.slug}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-muted hover:bg-muted/80 transition-colors"
                        >
                          {child.name}
                          {child.productCount !== undefined && (
                            <span className="ml-1.5 text-muted-foreground">
                              ({child.productCount})
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* View All Link */}
                <div className="px-4 pb-4">
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="text-sm text-violet-600 hover:text-violet-700 font-medium inline-flex items-center"
                  >
                    View all {category.name}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
