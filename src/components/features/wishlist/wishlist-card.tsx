"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, MoreHorizontal, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WishlistItem, WishlistSummary } from "@/types/wishlist";

interface WishlistItemCardProps {
  item: WishlistItem;
  onRemove?: (itemId: string) => Promise<void> | void;
  onMoveToCart?: (itemId: string) => Promise<void> | void;
  className?: string;
}

export function WishlistItemCard({
  item,
  onRemove,
  onMoveToCart,
  className,
}: WishlistItemCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      const result = onRemove?.(item.id);
      if (result) await result;
    } finally {
      setIsRemoving(false);
    }
  };

  const handleMoveToCart = async () => {
    setIsMoving(true);
    try {
      const result = onMoveToCart?.(item.id);
      if (result) await result;
    } finally {
      setIsMoving(false);
    }
  };

  return (
    <div className={cn(
      "flex gap-4 p-4 bg-white rounded-xl border border-gray-200",
      className
    )}>
      {/* Product Image */}
      <Link href={`/products/${item.product.slug}`} className="shrink-0">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={item.product.image?.url || "/placeholder.png"}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.product.slug}`}>
          <h3 className="font-medium text-gray-900 hover:text-[#0052a1] transition-colors line-clamp-2">
            {item.product.name}
          </h3>
        </Link>
        <p className="text-lg font-bold text-[#0052a1] mt-1">
          {item.product.price.formatted}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Added {new Date(item.addedAt).toLocaleDateString()}
        </p>
        {item.note && (
          <p className="text-sm text-gray-600 mt-2 italic">
            "{item.note}"
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 shrink-0">
        <Button
          size="sm"
          onClick={handleMoveToCart}
          disabled={!item.product.isAvailable || isMoving}
          className="bg-[#0052a1] hover:bg-[#003d7a]"
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          {isMoving ? "Adding..." : "Add to Cart"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleRemove}
          disabled={isRemoving}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Remove
        </Button>
      </div>

      {/* Stock Status */}
      {!item.product.isAvailable && (
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
            Out of Stock
          </span>
        </div>
      )}
    </div>
  );
}

interface WishlistSummaryCardProps {
  wishlist: WishlistSummary;
  onClick?: () => void;
  onShare?: () => void;
  className?: string;
}

export function WishlistSummaryCard({
  wishlist,
  onClick,
  onShare,
  className,
}: WishlistSummaryCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow",
        className
      )}
    >
      {/* Preview Images */}
      <button type="button" onClick={onClick} className="w-full">
        <div className="aspect-[4/3] bg-gray-100 relative">
          {wishlist.previewImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-0.5 absolute inset-0">
              {wishlist.previewImages.slice(0, 4).map((img, index) => (
                <div key={index} className="relative">
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              No items yet
            </div>
          )}
        </div>
      </button>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{wishlist.name}</h3>
            <p className="text-sm text-gray-500">
              {wishlist.itemCount} {wishlist.itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {wishlist.isPublic && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare?.();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Share wishlist"
              >
                <Share2 className="w-4 h-4 text-gray-500" />
              </button>
            )}
            <button type="button" className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
