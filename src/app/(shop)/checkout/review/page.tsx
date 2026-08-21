"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  CreditCard,
  Truck,
  Building2,
  Clock,
  ChevronLeft,
  Loader2,
  Check,
  Edit2,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckoutProgress } from "@/components/features/checkout";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface ShippingData {
  method: "delivery" | "pickup";
  addressId: string | null;
  deliveryWindowId: string | null;
  pickupLocationId: string | null;
  shippingCost: number;
}

interface PaymentData {
  cardId: string | null;
  newCard: { last4: string; brand: string } | null;
  sameAsShipping: boolean;
}

// Mock data (would come from API in real app)
const mockAddress = {
  id: "addr-1",
  label: "Home",
  firstName: "John",
  lastName: "Doe",
  streetAddress: "123 Main Street",
  streetAddress2: "Apt 4B",
  city: "San Jose",
  state: "San Jose",
  postalCode: "10101",
  country: "Costa Rica",
};

const mockDeliveryWindow = {
  id: "dw-1",
  date: "Tomorrow",
  time: "9:00 AM - 1:00 PM",
};

const mockPickupLocation = {
  id: "loc-1",
  name: "PriceSmart Escazu",
  address: "San Rafael de Escazu, San Jose",
};

export default function CheckoutReviewPage() {
  const router = useRouter();
  const { cart, promoCode, promoDiscount, clearCart } = useCart();
  const { toast } = useToast();

  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Load checkout data from session
  useEffect(() => {
    const savedShipping = sessionStorage.getItem("checkoutShipping");
    const savedPayment = sessionStorage.getItem("checkoutPayment");

    if (!savedShipping || !savedPayment) {
      router.push("/checkout");
      return;
    }

    setShippingData(JSON.parse(savedShipping));
    setPaymentData(JSON.parse(savedPayment));
  }, [router]);

  const handlePlaceOrder = async () => {
    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "Please accept terms",
        description: "You must accept the terms and conditions to place your order.",
      });
      return;
    }

    setIsPlacingOrder(true);

    try {
      // In real app, call API to:
      // 1. Validate inventory
      // 2. Calculate tax
      // 3. Process payment
      // 4. Create order in Commercetools
      // 5. Submit to OMS

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate order ID
      const orderId = `PS-${Date.now().toString(36).toUpperCase()}`;

      // Clear checkout data
      sessionStorage.removeItem("checkoutShipping");
      sessionStorage.removeItem("checkoutPayment");
      
      // Store order info for confirmation page
      sessionStorage.setItem("lastOrder", JSON.stringify({
        id: orderId,
        total: cart?.totals.total.formatted,
        itemCount: cart?.itemCount,
      }));

      // Clear cart
      clearCart();

      // Redirect to confirmation
      router.push(`/checkout/confirmation?order=${orderId}`);
    } catch (_err) {
      toast({
        variant: "destructive",
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!cart || !shippingData || !paymentData) return null;

  // Calculate totals
  const subtotal = cart.totals.subtotal.amount;
  const discount = promoDiscount?.amount || 0;
  const shipping = shippingData.shippingCost;
  const taxRate = 0.13; // 13% Costa Rica tax
  const taxableAmount = subtotal - discount;
  const tax = Math.round(taxableAmount * taxRate);
  const total = subtotal - discount + shipping + tax;

  return (
    <div className="max-w-6xl mx-auto">
      <CheckoutProgress currentStep="review" />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Summary */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Shipping
              </h2>
              <Link
                href="/checkout"
                className="text-sm text-[#0052a1] hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Link>
            </div>

            {shippingData.method === "delivery" ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0052a1]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#0052a1]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {mockAddress.firstName} {mockAddress.lastName}
                    </p>
                    <p className="text-gray-600">
                      {mockAddress.streetAddress}
                      {mockAddress.streetAddress2 && `, ${mockAddress.streetAddress2}`}
                    </p>
                    <p className="text-gray-600">
                      {mockAddress.city}, {mockAddress.state} {mockAddress.postalCode}
                    </p>
                    <p className="text-gray-600">{mockAddress.country}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4 border-t">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Home Delivery</p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {mockDeliveryWindow.date}, {mockDeliveryWindow.time}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      ${(shippingData.shippingCost / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0052a1]/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#0052a1]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Club Pickup</p>
                  <p className="text-gray-600">{mockPickupLocation.name}</p>
                  <p className="text-gray-600">{mockPickupLocation.address}</p>
                  <p className="text-sm text-green-600 font-medium mt-1">
                    Free pickup
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Payment
              </h2>
              <Link
                href="/checkout/payment"
                className="text-sm text-[#0052a1] hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gradient-to-br from-[#0052a1] to-[#003d7a] rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {paymentData.newCard
                    ? `${paymentData.newCard.brand} ending in ${paymentData.newCard.last4}`
                    : "Visa ending in 4242"}
                </p>
                <p className="text-sm text-gray-500">
                  Billing: {paymentData.sameAsShipping ? "Same as shipping" : "Different address"}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Items ({cart.itemCount})
            </h2>
            <div className="space-y-4">
              {cart.lineItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
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
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} x {item.unitPrice.formatted}
                    </p>
                  </div>
                  <p className="font-medium text-gray-900">
                    {item.totalPrice.formatted}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Terms and Place Order */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-6">
              <Checkbox
                id="acceptTerms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-0.5 data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
              />
              <Label
                htmlFor="acceptTerms"
                className="text-sm text-gray-700 cursor-pointer leading-relaxed"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-[#0052a1] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#0052a1] hover:underline">
                  Privacy Policy
                </Link>
                . I authorize the charge of ${(total / 100).toFixed(2)} to my payment method.
              </Label>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/checkout/payment")}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder || !acceptTerms}
                className="flex-1 bg-[#0052a1] hover:bg-[#003d7a] h-12 text-base font-semibold"
              >
                {isPlacingOrder ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Place Order
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal ({cart.itemCount} items)
                </span>
                <span className="text-gray-900">
                  {cart.totals.subtotal.formatted}
                </span>
              </div>

              {promoCode && promoDiscount && (
                <div className="flex justify-between text-green-600">
                  <span>Promo ({promoCode})</span>
                  <span>-{promoDiscount.formatted}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {shippingData.shippingCost > 0
                    ? `$${(shippingData.shippingCost / 100).toFixed(2)}`
                    : "Free"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax (13%)</span>
                <span className="text-gray-900">${(tax / 100).toFixed(2)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-xl font-bold text-[#0052a1]">
                ${(total / 100).toFixed(2)}
              </span>
            </div>

            {/* Member Savings */}
            <div className="mt-4 p-3 bg-[#f5a623]/10 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-[#f5a623]">Member Savings:</span>{" "}
                You&apos;re saving $12.50 on this order!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
