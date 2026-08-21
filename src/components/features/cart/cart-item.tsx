"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartLineItem } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CartItemProps {
  item: CartLineItem;
  onUpdateQuantity?: (lineItemId: string, quantity: number) => void;
  onRemove?: (lineItemId: string) => void;
  isUpdating?: boolean;
  className?: string;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating,
  className,
}: CartItemProps) {
  return (
    <div
      className={cn(
        "flex gap-4 py-4",
        isUpdating && "opacity-50 pointer-events-none",
        className
      )}
    >
      {/* Image */}
      <Link
        href={`/products/${item.slug}`}
        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted"
      >
        {item.image ? (
          <Image
            src={item.image.url}
            alt={item.image.alt || item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link
              href={`/products/${item.slug}`}
              className="font-medium hover:underline line-clamp-1"
            >
              {item.name}
            </Link>
            {Object.keys(item.attributes).length > 0 && (
              <p className="mt-0.5 text-sm text-muted-foreground">
                {Object.entries(item.attributes)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="font-medium">{item.totalPrice.formatted}</p>
            {item.discountedPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {item.unitPrice.formatted}
              </p>
            )}
          </div>
        </div>

        {/* Quantity controls */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))
              }
              disabled={isUpdating || item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
              disabled={
                isUpdating ||
                (item.availability.maxQuantity !== undefined &&
                  item.quantity >= item.availability.maxQuantity)
              }
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove?.(item.id)}
            disabled={isUpdating}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
