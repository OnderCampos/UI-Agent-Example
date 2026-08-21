"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Tag } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import type { Cart } from "@/types/cart";

interface OrderSummaryProps {
  cart: Cart;
  promoCode?: string | null;
  promoDiscount?: { amount: number; formatted: string } | null;
  shippingCost?: { amount: number; formatted: string } | null;
  taxAmount?: { amount: number; formatted: string } | null;
  showItems?: boolean;
}

export function OrderSummary({
  cart,
  promoCode,
  promoDiscount,
  shippingCost,
  taxAmount,
  showItems = true,
}: OrderSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate final total
  const subtotal = cart.totals.subtotal.amount;
  const discount = promoDiscount?.amount || 0;
  const shipping = shippingCost?.amount || 0;
  const tax = taxAmount?.amount || 0;
  const total = subtotal - discount + shipping + tax;

  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
        <span className="text-sm text-gray-500">{cart.itemCount} items</span>
      </div>

      {/* Collapsible Items List */}
      {showItems && (
        <div className="mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <span>{isExpanded ? "Hide" : "Show"} items</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {isExpanded && (
            <div className="space-y-3 mt-2 max-h-60 overflow-y-auto">
              {cart.lineItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No img
                      </div>
                    )}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-800 text-white text-xs rounded-full flex items-center justify-center">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">{item.sku}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.totalPrice.formatted}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Separator className="my-4" />

      {/* Totals */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">{cart.totals.subtotal.formatted}</span>
        </div>

        {promoCode && promoDiscount && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {promoCode}
            </span>
            <span>-{promoDiscount.formatted}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {shippingCost ? shippingCost.formatted : "Calculated next"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">
            {taxAmount ? taxAmount.formatted : "Calculated at review"}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-xl font-bold text-[#0052a1]">
          ${(total / 100).toFixed(2)}
        </span>
      </div>

      {/* Edit Cart Link */}
      <Link
        href="/cart"
        className="block text-center text-sm text-[#0052a1] hover:underline mt-4"
      >
        Edit cart
      </Link>
    </div>
  );
}
