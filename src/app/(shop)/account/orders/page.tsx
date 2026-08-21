"use client";

import { useState, useEffect } from "react";
import { Package, Search, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderCard } from "@/components/features/order";

// Mock orders data
const mockOrders = [
  {
    id: "order-1",
    orderNumber: "PS-ABC123",
    status: "delivered" as const,
    createdAt: "2024-01-15T10:30:00Z",
    total: { amount: 15999, formatted: "$159.99" },
    items: [
      { id: "item-1", name: "Organic Coffee Beans", quantity: 2, image: { url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100", alt: "Coffee" } },
      { id: "item-2", name: "Almond Butter", quantity: 1, image: { url: "https://images.unsplash.com/photo-1612187209234-567b6e9a1439?w=100", alt: "Almond Butter" } },
    ],
    itemCount: 5,
  },
  {
    id: "order-2",
    orderNumber: "PS-DEF456",
    status: "shipped" as const,
    createdAt: "2024-01-20T14:45:00Z",
    total: { amount: 8999, formatted: "$89.99" },
    items: [
      { id: "item-3", name: "Wireless Headphones", quantity: 1, image: { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100", alt: "Headphones" } },
    ],
    itemCount: 1,
  },
  {
    id: "order-3",
    orderNumber: "PS-GHI789",
    status: "processing" as const,
    createdAt: "2024-01-22T09:15:00Z",
    total: { amount: 24599, formatted: "$245.99" },
    items: [
      { id: "item-4", name: "Smart Watch", quantity: 1, image: { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100", alt: "Watch" } },
      { id: "item-5", name: "Charging Cable", quantity: 2 },
    ],
    itemCount: 3,
  },
];

export default function OrdersPage() {
  const [orders, _setOrders] = useState(mockOrders);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#0052a1]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        <p className="text-gray-600">View and track your past orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by order number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        <div className="flex gap-2">
          {["all", "processing", "shipped", "delivered"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={statusFilter === status ? "bg-[#0052a1] hover:bg-[#003d7a]" : ""}
            >
              {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery || statusFilter !== "all" ? "No orders found" : "No orders yet"}
          </h3>
          <p className="text-gray-600">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "When you place orders, they will appear here"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
