"use client";

import type { CartTotals } from "@/types/cart";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CartSummaryProps {
  totals: CartTotals;
  className?: string;
}

export function CartSummary({ totals, className }: CartSummaryProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span>{totals.subtotal.formatted}</span>
      </div>

      {totals.shipping && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>
            {totals.shipping.amount === 0 ? "Free" : totals.shipping.formatted}
          </span>
        </div>
      )}

      {totals.tax && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span>{totals.tax.formatted}</span>
        </div>
      )}

      {totals.discount && totals.discount.amount > 0 && (
        <div className="flex justify-between text-sm text-green-600">
          <span>Discount</span>
          <span>-{totals.discount.formatted}</span>
        </div>
      )}

      <Separator />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{totals.total.formatted}</span>
      </div>
    </div>
  );
}
