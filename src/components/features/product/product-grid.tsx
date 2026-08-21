"use client";

import type { ProductListItem } from "@/types/product";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: ProductListItem[];
  columns?: 2 | 3 | 4;
  className?: string;
  onAddToCart?: (productId: string) => void;
}

export function ProductGrid({
  products,
  columns = 4,
  className,
  onAddToCart,
}: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
