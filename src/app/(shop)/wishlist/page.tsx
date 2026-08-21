"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Share2, ShoppingCart, Plus, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WishlistItemCard } from "@/components/features/wishlist";
import type { Wishlist } from "@/types/wishlist";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await fetch("/api/wishlist");
        const data = await response.json();

        if (data.success && data.data.defaultWishlist) {
          setWishlist(data.data.defaultWishlist);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  const handleRemove = async (itemId: string) => {
    if (!wishlist) return;

    try {
      await fetch(`/api/wishlist/${wishlist.id}/items/${itemId}`, {
        method: "DELETE",
      });

      setWishlist((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          items: prev.items.filter((i) => i.id !== itemId),
        };
      });
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleMoveToCart = async (itemId: string) => {
    if (!wishlist) return;

    try {
      await fetch(`/api/wishlist/${wishlist.id}/items/${itemId}/move-to-cart`, {
        method: "POST",
      });

      setWishlist((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          items: prev.items.filter((i) => i.id !== itemId),
        };
      });
    } catch (error) {
      console.error("Failed to move to cart:", error);
    }
  };

  const handleShare = async () => {
    if (!wishlist) return;

    try {
      const response = await fetch(`/api/wishlist/${wishlist.id}/share`, {
        method: "POST",
      });
      const data = await response.json();

      if (data.success) {
        setShareUrl(data.data.shareUrl);
      }
    } catch (error) {
      console.error("Failed to share wishlist:", error);
    }
  };

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddAllToCart = async () => {
    if (!wishlist) return;

    for (const item of wishlist.items) {
      await handleMoveToCart(item.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              My Wishlist
            </h1>
            <p className="text-gray-600 mt-1">
              {wishlist?.items.length || 0} saved items
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleShare}
              disabled={!wishlist || wishlist.items.length === 0}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={handleAddAllToCart}
              disabled={!wishlist || wishlist.items.length === 0}
              className="bg-[#0052a1] hover:bg-[#003d7a]"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add All to Cart
            </Button>
          </div>
        </div>

        {/* Share URL */}
        {shareUrl && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Share your wishlist:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
              />
              <Button
                variant="outline"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Wishlist Items */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : wishlist && wishlist.items.length > 0 ? (
          <div className="space-y-4">
            {wishlist.items.map((item) => (
              <WishlistItemCard
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onMoveToCart={handleMoveToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Save items you love by clicking the heart icon on any product. 
              Your saved items will appear here.
            </p>
            <Link href="/products">
              <Button className="bg-[#0052a1] hover:bg-[#003d7a]">
                <Plus className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 p-4 bg-[#e6f0fa] rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-2">Wishlist Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>- Click the heart icon on any product to add it to your wishlist</li>
            <li>- Share your wishlist with friends and family</li>
            <li>- Get notified when items go on sale (coming soon)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
