"use client";

import { useState, useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  variant?: "icon" | "button" | "minimal";
  size?: "sm" | "default" | "lg";
  className?: string;
  onToggle?: (isInWishlist: boolean) => void;
}

export function WishlistButton({
  productId,
  variant = "icon",
  size = "default",
  className,
  onToggle,
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Check if product is in wishlist on mount
  useEffect(() => {
    async function checkWishlist() {
      try {
        const response = await fetch(`/api/wishlist/check?productId=${productId}`);
        const data = await response.json();
        setIsInWishlist(data.data?.inWishlist || false);
      } catch {
        // Ignore errors during check
      } finally {
        setIsChecking(false);
      }
    }

    checkWishlist();
  }, [productId]);

  const handleToggle = async () => {
    setIsLoading(true);

    try {
      if (isInWishlist) {
        // Remove from wishlist
        await fetch(`/api/wishlist/items/${productId}`, {
          method: "DELETE",
        });
        setIsInWishlist(false);
        onToggle?.(false);
      } else {
        // Add to wishlist
        await fetch("/api/wishlist/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });
        setIsInWishlist(true);
        onToggle?.(true);
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    default: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    default: "w-5 h-5",
    lg: "w-6 h-6",
  };

  if (isChecking) {
    return variant === "icon" ? (
      <div className={cn(
        "rounded-full bg-white shadow-md flex items-center justify-center",
        sizeClasses[size],
        className
      )}>
        <Loader2 className={cn("animate-spin text-gray-400", iconSizes[size])} />
      </div>
    ) : null;
  }

  if (variant === "minimal") {
    return (
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={cn(
          "p-1 hover:scale-110 transition-transform",
          className
        )}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isLoading ? (
          <Loader2 className={cn("animate-spin text-gray-400", iconSizes[size])} />
        ) : (
          <Heart
            className={cn(
              iconSizes[size],
              isInWishlist
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-500"
            )}
          />
        )}
      </button>
    );
  }

  if (variant === "button") {
    return (
      <Button
        variant={isInWishlist ? "default" : "outline"}
        size={size}
        onClick={handleToggle}
        disabled={isLoading}
        className={cn(
          isInWishlist && "bg-red-500 hover:bg-red-600 border-red-500",
          className
        )}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Heart
            className={cn(
              "w-4 h-4 mr-2",
              isInWishlist && "fill-current"
            )}
          />
        )}
        {isInWishlist ? "Saved" : "Save to Wishlist"}
      </Button>
    );
  }

  // Icon variant (default)
  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        "rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform",
        sizeClasses[size],
        className
      )}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isLoading ? (
        <Loader2 className={cn("animate-spin text-gray-400", iconSizes[size])} />
      ) : (
        <Heart
          className={cn(
            iconSizes[size],
            isInWishlist
              ? "fill-red-500 text-red-500"
              : "text-gray-400 hover:text-red-500"
          )}
        />
      )}
    </button>
  );
}
