"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  image?: { url: string; alt?: string };
}

interface OrderCardProps {
  order: {
    id: string;
    orderNumber: string;
    status: "processing" | "shipped" | "delivered" | "cancelled";
    createdAt: string;
    total: { amount: number; formatted: string };
    items: OrderItem[];
    itemCount: number;
  };
}

const statusConfig = {
  processing: {
    label: "Processing",
    color: "bg-yellow-100 text-yellow-800",
  },
  shipped: {
    label: "Shipped",
    color: "bg-blue-100 text-blue-800",
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
  },
};

export function OrderCard({ order }: OrderCardProps) {
  const status = statusConfig[order.status];
  const displayItems = order.items.slice(0, 3);
  const remainingCount = order.itemCount - displayItems.length;

  return (
    <div className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Order</p>
            <p className="font-semibold text-gray-900">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Placed</p>
            <p className="font-medium text-gray-700">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
            <p className="font-semibold text-gray-900">{order.total.formatted}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Items Preview */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {displayItems.map((item, index) => (
              <div
                key={item.id}
                className="relative w-12 h-12 rounded-lg border-2 border-white overflow-hidden bg-gray-100"
                style={{ zIndex: displayItems.length - index }}
              >
                {item.image ? (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="relative w-12 h-12 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  +{remainingCount}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600">
              {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
            </p>
            <p className="text-sm text-gray-500 line-clamp-1">
              {displayItems.map((item) => item.name).join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex flex-wrap gap-2">
        <Link href={`/account/orders/${order.id}`}>
          <Button variant="outline" size="sm" className="text-[#0052a1] border-[#0052a1]">
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
        {order.status === "delivered" && (
          <Button variant="outline" size="sm">
            Reorder
          </Button>
        )}
        {order.status === "shipped" && (
          <Button variant="outline" size="sm">
            Track Package
          </Button>
        )}
      </div>
    </div>
  );
}
