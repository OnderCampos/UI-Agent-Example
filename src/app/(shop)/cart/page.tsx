"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowLeft, 
  Loader2,
  Tag,
  X,
  Bookmark,
  ShoppingCart,
  AlertCircle,
  Truck,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { 
    cart, 
    isLoading, 
    updateItem, 
    removeItem, 
    isUpdating,
    isUpdatingItem,
    // Promo
    promoCode,
    promoDiscount,
    promoError,
    applyPromoCode,
    removePromoCode,
    // Saved for later
    savedForLater,
    saveForLater,
    moveToCart,
    removeSavedItem,
    totalsWithPromo,
  } = useCart();
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [promoInput, setPromoInput] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    
    setIsApplyingPromo(true);
    try {
      await applyPromoCode(promoInput.trim().toUpperCase());
      toast({
        title: "Promo code applied!",
        description: "Your discount has been applied to the order.",
      });
    } catch {
      // Error is handled in hook
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleRemovePromo = async () => {
    await removePromoCode();
    setPromoInput("");
    toast({
      title: "Promo code removed",
      description: "The discount has been removed from your order.",
    });
  };

  const handleSaveForLater = async (lineItemId: string) => {
    await saveForLater(lineItemId);
    toast({
      title: "Item saved",
      description: "The item has been saved for later.",
    });
  };

  const handleMoveToCart = async (savedItemId: string) => {
    await moveToCart(savedItemId);
    toast({
      title: "Item added to cart",
      description: "The item has been moved back to your cart.",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0052a1]" />
      </div>
    );
  }

  const isEmpty = !cart || cart.lineItems.length === 0;

  if (isEmpty && savedForLater.length === 0) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-[#f5f5f5]">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added any items to your cart yet.
            Start shopping to find great deals!
          </p>
          <Link href="/products">
            <Button className="bg-[#0052a1] hover:bg-[#003d7a]" size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="text-sm text-gray-600 hover:text-[#0052a1] inline-flex items-center mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          {cart && (
            <p className="text-gray-600">
              {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"} in your cart
            </p>
          )}
        </div>

        {isEmpty && savedForLater.length > 0 ? (
          // Only saved items, no cart items
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-6 mb-6 text-center">
              <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Your cart is empty, but you have saved items below.</p>
            </div>
            
            {/* Saved for Later Section */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[#0052a1]" />
                Saved for Later ({savedForLater.length})
              </h2>
              <div className="space-y-4">
                {savedForLater.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <Link
                      href={`/products/${item.slug}`}
                      className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0"
                    >
                      {item.image ? (
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No image
                        </div>
                      )}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-medium text-gray-900 hover:text-[#0052a1] line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      <p className="font-semibold text-[#0052a1] mt-1">{item.price.formatted}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleMoveToCart(item.id)}
                        className="bg-[#0052a1] hover:bg-[#003d7a]"
                        disabled={isUpdating}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSavedItem(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Cart Items List */}
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <h2 className="font-semibold text-gray-900">Cart Items</h2>
                </div>
                <div className="divide-y">
                  {cart?.lineItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex gap-4 p-4 transition-opacity ${
                        isUpdatingItem(item.id) ? "opacity-50" : ""
                      }`}
                    >
                      {/* Image */}
                      <Link
                        href={`/products/${item.slug}`}
                        className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0"
                      >
                        {item.image ? (
                          <Image
                            src={item.image.url}
                            alt={item.image.alt || item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No image
                          </div>
                        )}
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-semibold text-gray-900 hover:text-[#0052a1] transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                        <p className="text-sm font-medium mt-1">
                          {item.unitPrice.formatted} each
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateItem(item.id, Math.max(1, item.quantity - 1))
                              }
                              disabled={item.quantity <= 1 || isUpdating}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateItem(item.id, item.quantity + 1)}
                              disabled={isUpdating}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-[#0052a1]"
                            onClick={() => handleSaveForLater(item.id)}
                            disabled={isUpdating}
                          >
                            <Bookmark className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeItem(item.id)}
                            disabled={isUpdating}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{item.totalPrice.formatted}</p>
                        {isUpdatingItem(item.id) && (
                          <Loader2 className="w-4 h-4 animate-spin text-[#0052a1] ml-auto mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved for Later */}
              {savedForLater.length > 0 && (
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="p-4 border-b bg-gray-50">
                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Bookmark className="w-5 h-5 text-[#0052a1]" />
                      Saved for Later ({savedForLater.length})
                    </h2>
                  </div>
                  <div className="divide-y">
                    {savedForLater.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4">
                        <Link
                          href={`/products/${item.slug}`}
                          className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0"
                        >
                          {item.image ? (
                            <Image
                              src={item.image.url}
                              alt={item.image.alt || item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              No image
                            </div>
                          )}
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.slug}`}
                            className="font-medium text-gray-900 hover:text-[#0052a1] line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <p className="font-semibold text-[#0052a1]">{item.price.formatted}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMoveToCart(item.id)}
                            disabled={isUpdating}
                            className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1] hover:text-white"
                          >
                            Move to Cart
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSavedItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-4">
                  {promoCode ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-700">{promoCode}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemovePromo}
                        className="text-green-600 hover:text-green-700 hover:bg-green-100 h-7 px-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter promo code"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                          className="h-10"
                          onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                        />
                        <Button
                          variant="outline"
                          onClick={handleApplyPromo}
                          disabled={isApplyingPromo || !promoInput.trim()}
                          className="shrink-0"
                        >
                          {isApplyingPromo ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Apply"
                          )}
                        </Button>
                      </div>
                      {promoError && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {promoError}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{cart?.totals.subtotal.formatted}</span>
                  </div>
                  {promoDiscount && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span>-{promoDiscount.formatted}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {cart?.totals.shipping?.formatted || "Calculated at checkout"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">
                      {cart?.totals.tax?.formatted || "Calculated at checkout"}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span className="text-gray-900">Total</span>
                  <span className="text-[#0052a1]">
                    {totalsWithPromo?.total.formatted || cart?.totals.total.formatted}
                  </span>
                </div>

                {!isAuthenticated && (
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <Link href="/login?redirect=/checkout" className="font-medium underline">
                        Sign in
                      </Link>{" "}
                      to access member prices and save your cart.
                    </p>
                  </div>
                )}

                <Link href={isAuthenticated ? "/checkout" : "/login?redirect=/checkout"}>
                  <Button className="w-full bg-[#0052a1] hover:bg-[#003d7a] h-12 text-base font-semibold">
                    Proceed to Checkout
                  </Button>
                </Link>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Trust Badges */}
                <div className="mt-6 pt-4 border-t space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="w-5 h-5 text-[#0052a1]" />
                    <span>Free shipping on orders over $99</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-[#0052a1]" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
