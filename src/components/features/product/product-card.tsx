"use client";

import Link from "next/link";
import Image from "next/image";
import type { ProductListItem } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductListItem;
  className?: string;
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({
  product,
  className,
  onAddToCart,
}: ProductCardProps) {
  const hasDiscount =
    product.compareAtPrice &&
    product.compareAtPrice.amount > product.price.amount;

  const discountPercentage = hasDiscount
    ? Math.round(
        (1 - product.price.amount / product.compareAtPrice!.amount) * 100
      )
    : 0;

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all hover:shadow-lg",
        className
      )}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.image ? (
            <Image
              src={product.image.url}
              alt={product.image.alt || product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}

          {!product.isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}

          {hasDiscount && product.isAvailable && (
            <Badge className="absolute left-2 top-2" variant="destructive">
              -{discountPercentage}%
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        {product.brand && (
          <p className="text-xs text-muted-foreground">{product.brand}</p>
        )}

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 font-medium leading-tight hover:underline line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold">{product.price.formatted}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {product.compareAtPrice!.formatted}
            </span>
          )}
        </div>

        {onAddToCart && product.isAvailable && (
          <Button
            className="mt-3 w-full"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product.id);
            }}
          >
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
