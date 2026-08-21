"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Package,
  Mail,
  Printer,
  ArrowRight,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface OrderData {
  id: string;
  total: string;
  itemCount: number;
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Load order data from session
    const savedOrder = sessionStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
      // Clear after loading
      sessionStorage.removeItem("lastOrder");
    }
  }, []);

  // Estimated delivery date (mock)
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 1);
  const deliveryDate = estimatedDelivery.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-2xl shadow-lg border p-6 mb-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <div>
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="text-xl font-bold text-gray-900">{orderId || "PS-XXXXX"}</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
        </div>

        {/* Order Summary */}
        <div className="py-4 border-b">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Items</span>
            <span className="font-medium">{orderData?.itemCount || 3} items</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-600">Total</span>
            <span className="font-bold text-[#0052a1]">{orderData?.total || "$XX.XX"}</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="py-4">
          <h3 className="font-semibold text-gray-900 mb-3">Delivery Details</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#0052a1] mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Home Delivery</p>
                <p className="text-sm text-gray-600">123 Main Street, Apt 4B</p>
                <p className="text-sm text-gray-600">San Jose, San Jose 10101</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#0052a1]" />
              <div>
                <p className="font-medium text-gray-900">Estimated Delivery</p>
                <p className="text-sm text-gray-600">{deliveryDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#0052a1]" />
              <div>
                <p className="font-medium text-gray-900">Delivery Window</p>
                <p className="text-sm text-gray-600">9:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Confirmation */}
      <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3 mb-6">
        <Mail className="w-5 h-5 text-[#0052a1] mt-0.5" />
        <div>
          <p className="font-medium text-gray-900">Confirmation Email Sent</p>
          <p className="text-sm text-gray-600">
            We&apos;ve sent the order details to your email address. Please check your inbox.
          </p>
        </div>
      </div>

      {/* What's Next */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">What&apos;s Next?</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#0052a1] text-white flex items-center justify-center font-semibold text-sm shrink-0">
              1
            </div>
            <div>
              <p className="font-medium text-gray-900">Order Processing</p>
              <p className="text-sm text-gray-600">
                We&apos;re preparing your order for shipment.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold text-sm shrink-0">
              2
            </div>
            <div>
              <p className="font-medium text-gray-900">Shipping</p>
              <p className="text-sm text-gray-600">
                You&apos;ll receive tracking information once shipped.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold text-sm shrink-0">
              3
            </div>
            <div>
              <p className="font-medium text-gray-900">Delivery</p>
              <p className="text-sm text-gray-600">
                Your order will arrive at your doorstep!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/account/orders" className="flex-1">
          <Button variant="outline" className="w-full h-12">
            <Package className="w-5 h-5 mr-2" />
            Track Order
          </Button>
        </Link>
        <Link href="/products" className="flex-1">
          <Button className="w-full h-12 bg-[#0052a1] hover:bg-[#003d7a]">
            Continue Shopping
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Help */}
      <p className="text-center text-sm text-gray-500 mt-8">
        Questions about your order?{" "}
        <Link href="/contact" className="text-[#0052a1] hover:underline">
          Contact us
        </Link>{" "}
        or call{" "}
        <a href="tel:+50622019600" className="text-[#0052a1] hover:underline">
          +506 2201-9600
        </a>
      </p>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="animate-pulse">Loading order details...</div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
