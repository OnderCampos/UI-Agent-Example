"use client";

import Image from "next/image";
import Link from "next/link";
import { Zap, ShoppingCart, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CountdownInline } from "./countdown-timer";
import type { FlashSaleProduct } from "@/types/promotion";

interface FlashSaleCardProps {
  product: FlashSaleProduct;
  endDate: string;
  onAddToCart?: () => void;
  className?: string;
}

export function FlashSaleCard({
  product,
  endDate,
  onAddToCart,
  className,
}: FlashSaleCardProps) {
  const stockPercentage = product.stockLimit
    ? Math.max(0, 100 - (product.soldCount / product.stockLimit) * 100)
    : null;
  const isLowStock = stockPercentage !== null && stockPercentage < 20;
  const isSoldOut = stockPercentage !== null && stockPercentage <= 0;

  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 overflow-hidden group relative",
      "hover:shadow-lg transition-shadow",
      className
    )}>
      {/* Flash Sale Badge */}
      <div className="absolute top-3 left-3 z-10">
        <Badge className="bg-red-500 text-white hover:bg-red-500 gap-1">
          <Zap className="w-3 h-3 fill-current" />
          Flash Sale
        </Badge>
      </div>

      {/* Discount Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-[#0052a1] text-white px-2 py-1 rounded-md text-sm font-bold">
          -{product.discountPercentage}%
        </div>
      </div>

      {/* Product Image */}
      <Link href={`/products/${product.productSlug}`}>
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={product.productImage}
            alt={product.productName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">SOLD OUT</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <Link href={`/products/${product.productSlug}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-[#0052a1] transition-colors">
            {product.productName}
          </h3>
        </Link>

        {/* Prices */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold text-red-600">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: product.currency,
            }).format(product.salePrice)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: product.currency,
            }).format(product.originalPrice)}
          </span>
        </div>

        {/* Stock Progress */}
        {stockPercentage !== null && !isSoldOut && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={cn(
                "font-medium",
                isLowStock ? "text-red-600" : "text-gray-600"
              )}>
                {isLowStock ? "Almost gone!" : `${product.soldCount} sold`}
              </span>
              <span className="text-gray-500">
                {Math.ceil(stockPercentage)}% left
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isLowStock ? "bg-red-500" : "bg-[#0052a1]"
                )}
                style={{ width: `${stockPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Countdown & Actions */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <CountdownInline endDate={endDate} prefix="Ends" className="text-xs" />
          
          <Button
            size="sm"
            onClick={onAddToCart}
            disabled={isSoldOut}
            className="bg-[#0052a1] hover:bg-[#003d7a]"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Flash Sale Section Header
 */
export function FlashSaleHeader({
  title = "Flash Sale",
  endDate,
  viewAllUrl,
  className,
}: {
  title?: string;
  endDate: string;
  viewAllUrl?: string;
  className?: string;
}) {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className="bg-red-500 p-2 rounded-lg">
          <Zap className="w-6 h-6 text-white fill-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <CountdownInline 
            endDate={endDate} 
            prefix="Ends in" 
            className="text-sm"
          />
        </div>
      </div>
      
      {viewAllUrl && (
        <Link href={viewAllUrl}>
          <Button variant="outline">
            View All Deals
          </Button>
        </Link>
      )}
    </div>
  );
}

/**
 * Flash Sale Progress Bar (for section header)
 */
export function FlashSaleProgress({
  soldCount,
  stockLimit,
  className,
}: {
  soldCount: number;
  stockLimit: number;
  className?: string;
}) {
  const percentage = Math.min(100, (soldCount / stockLimit) * 100);
  const remaining = stockLimit - soldCount;

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 flex items-center gap-1">
          <TrendingDown className="w-4 h-4 text-red-500" />
          {soldCount} sold
        </span>
        <span className="font-medium text-[#0052a1]">
          {remaining > 0 ? `${remaining} left` : "Sold out"}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
