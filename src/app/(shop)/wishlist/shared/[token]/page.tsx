import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWishlistService } from "@/services/wishlist.service";
import type { Metadata } from "next";

interface SharedWishlistPageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: SharedWishlistPageProps): Promise<Metadata> {
  const { token } = await params;
  const wishlistService = getWishlistService();
  const wishlist = await wishlistService.getWishlistByToken(token);

  if (!wishlist) {
    return { title: "Wishlist Not Found" };
  }

  return {
    title: `${wishlist.name} | Shared Wishlist`,
    description: `View ${wishlist.items.length} items in this shared wishlist`,
  };
}

export default async function SharedWishlistPage({ params }: SharedWishlistPageProps) {
  const { token } = await params;
  const wishlistService = getWishlistService();
  const wishlist = await wishlistService.getWishlistByToken(token);

  if (!wishlist || !wishlist.isPublic) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#e6f0fa] flex items-center justify-center">
              <User className="w-6 h-6 text-[#0052a1]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                {wishlist.name}
              </h1>
              <p className="text-gray-500">
                {wishlist.items.length} {wishlist.items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>

          <p className="text-gray-600">
            Someone shared their wishlist with you! Browse the items below and add them to your cart.
          </p>
        </div>

        {/* Items */}
        {wishlist.items.length > 0 ? (
          <div className="space-y-4">
            {wishlist.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200"
              >
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
                  {item.note && (
                    <p className="text-sm text-gray-600 mt-2 italic">
                      Note: "{item.note}"
                    </p>
                  )}
                  {!item.product.isAvailable && (
                    <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <div className="shrink-0">
                  <Link href={`/products/${item.product.slug}`}>
                    <Button
                      size="sm"
                      disabled={!item.product.isAvailable}
                      className="bg-[#0052a1] hover:bg-[#003d7a]"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">This wishlist is empty</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Want to create your own wishlist?
          </p>
          <Link href="/register">
            <Button className="bg-[#0052a1] hover:bg-[#003d7a]">
              Create an Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
