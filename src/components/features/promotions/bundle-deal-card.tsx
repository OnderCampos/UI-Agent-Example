"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, ShoppingCart, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BundleDeal, BundleProduct } from "@/types/promotion";

interface BundleDealCardProps {
  bundle: BundleDeal;
  onAddToCart?: () => void;
  className?: string;
}

export function BundleDealCard({
  bundle,
  onAddToCart,
  className,
}: BundleDealCardProps) {
  const savingsPercentage = Math.round(
    ((bundle.originalPrice - bundle.bundlePrice) / bundle.originalPrice) * 100
  );

  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 overflow-hidden",
      "hover:shadow-lg transition-shadow",
      className
    )}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0052a1] to-[#003d7a] p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            <span className="font-semibold">Bundle Deal</span>
          </div>
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            Save {savingsPercentage}%
          </Badge>
        </div>
        <h3 className="text-lg font-bold mt-2">{bundle.title}</h3>
        {bundle.description && (
          <p className="text-sm text-white/80 mt-1">{bundle.description}</p>
        )}
      </div>

      {/* Products */}
      <div className="p-4">
        <div className="space-y-3">
          {bundle.products.map((product, index) => (
            <div key={product.productId}>
              <BundleProductItem product={product} />
              {index < bundle.products.length - 1 && (
                <div className="flex items-center justify-center my-2">
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Regular price:</span>
            <span className="text-gray-400 line-through">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: bundle.currency,
              }).format(bundle.originalPrice)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">Bundle price:</span>
            <span className="text-2xl font-bold text-[#0052a1]">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: bundle.currency,
              }).format(bundle.bundlePrice)}
            </span>
          </div>
          <div className="flex items-center justify-end mt-1">
            <span className="text-sm font-medium text-green-600">
              You save {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: bundle.currency,
              }).format(bundle.savings)}
            </span>
          </div>
        </div>

        {/* Add to Cart */}
        <Button
          onClick={onAddToCart}
          className="w-full mt-4 bg-[#0052a1] hover:bg-[#003d7a]"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add Bundle to Cart
        </Button>
      </div>
    </div>
  );
}

function BundleProductItem({ product }: { product: BundleProduct }) {
  return (
    <Link
      href={`/products/${product.productSlug}`}
      className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
    >
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
        <Image
          src={product.productImage}
          alt={product.productName}
          fill
          className="object-cover"
        />
        {product.quantity > 1 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#0052a1] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {product.quantity}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.productName}
        </h4>
        <p className="text-xs text-gray-500 mt-0.5">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(product.originalPrice)}
          {product.quantity > 1 && ` x ${product.quantity}`}
        </p>
      </div>
    </Link>
  );
}

/**
 * Compact bundle card for grid display
 */
export function BundleDealCompact({
  bundle,
  onAddToCart,
  className,
}: BundleDealCardProps) {
  const savingsPercentage = Math.round(
    ((bundle.originalPrice - bundle.bundlePrice) / bundle.originalPrice) * 100
  );

  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 overflow-hidden group",
      "hover:shadow-lg transition-shadow",
      className
    )}>
      {/* Product images preview */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
          {bundle.products.slice(0, 4).map((product, i) => (
            <div key={product.productId} className="relative">
              <Image
                src={product.productImage}
                alt={product.productName}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Overlay badge */}
        <div className="absolute top-2 left-2">
          <Badge className="bg-[#0052a1] text-white hover:bg-[#0052a1]">
            <Package className="w-3 h-3 mr-1" />
            {bundle.products.length} items
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <div className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            Save {savingsPercentage}%
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {bundle.title}
        </h3>
        
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#0052a1]">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: bundle.currency,
            }).format(bundle.bundlePrice)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: bundle.currency,
            }).format(bundle.originalPrice)}
          </span>
        </div>

        <Button
          onClick={onAddToCart}
          size="sm"
          className="w-full mt-3 bg-[#0052a1] hover:bg-[#003d7a]"
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          Add Bundle
        </Button>
      </div>
    </div>
  );
}

/**
 * Bundle deal benefits list
 */
export function BundleBenefits({
  savings,
  currency = "USD",
  itemCount,
  className,
}: {
  savings: number;
  currency?: string;
  itemCount: number;
  className?: string;
}) {
  const benefits = [
    `Save ${new Intl.NumberFormat("en-US", { style: "currency", currency }).format(savings)}`,
    `${itemCount} items included`,
    "Free shipping on bundles",
  ];

  return (
    <ul className={cn("space-y-2", className)}>
      {benefits.map((benefit, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
          <Check className="w-4 h-4 text-green-500" />
          {benefit}
        </li>
      ))}
    </ul>
  );
}
