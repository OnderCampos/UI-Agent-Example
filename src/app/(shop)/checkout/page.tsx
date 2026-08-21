"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Check, 
  Truck, 
  Building2,
  Clock,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CheckoutProgress, OrderSummary } from "@/components/features/checkout";
import { AddressForm, type AddressFormData } from "@/components/features/address";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import type { UserAddress } from "@/types/user";

// Mock delivery windows
const deliveryWindows = [
  { id: "dw-1", date: "Tomorrow", time: "9:00 AM - 1:00 PM", price: 599 },
  { id: "dw-2", date: "Tomorrow", time: "1:00 PM - 5:00 PM", price: 599 },
  { id: "dw-3", date: "Tomorrow", time: "5:00 PM - 9:00 PM", price: 799 },
  { id: "dw-4", date: "Day After Tomorrow", time: "9:00 AM - 1:00 PM", price: 499 },
  { id: "dw-5", date: "Day After Tomorrow", time: "1:00 PM - 5:00 PM", price: 499 },
];

// Mock pickup locations
const pickupLocations = [
  { 
    id: "loc-1", 
    name: "PriceSmart Escazu", 
    address: "San Rafael de Escazu, San Jose",
    distance: "2.5 km",
    hours: "Mon-Sat: 8AM-9PM, Sun: 9AM-7PM",
  },
  { 
    id: "loc-2", 
    name: "PriceSmart Zapote", 
    address: "Zapote, San Jose",
    distance: "5.8 km",
    hours: "Mon-Sat: 8AM-9PM, Sun: 9AM-7PM",
  },
  { 
    id: "loc-3", 
    name: "PriceSmart Heredia", 
    address: "Heredia Centro",
    distance: "12.3 km",
    hours: "Mon-Sat: 8AM-9PM, Sun: 9AM-7PM",
  },
];

// Mock addresses
const mockAddresses: UserAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    firstName: "John",
    lastName: "Doe",
    streetAddress: "123 Main Street",
    streetAddress2: "Apt 4B",
    city: "San Jose",
    state: "San Jose",
    postalCode: "10101",
    country: "CR",
    phone: "+506 8888-1234",
    isDefault: true,
    isDefaultShipping: true,
    isDefaultBilling: true,
  },
  {
    id: "addr-2",
    label: "Work",
    firstName: "John",
    lastName: "Doe",
    streetAddress: "456 Business Ave",
    city: "Escazu",
    state: "San Jose",
    postalCode: "10201",
    country: "CR",
    isDefault: false,
    isDefaultShipping: false,
    isDefaultBilling: false,
  },
];

type DeliveryMethod = "delivery" | "pickup";

export default function CheckoutShippingPage() {
  const router = useRouter();
  const { cart, promoCode, promoDiscount } = useCart();
  const { user } = useAuth();
  
  const [addresses, setAddresses] = useState<UserAddress[]>(mockAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("delivery");
  const [selectedDeliveryWindow, setSelectedDeliveryWindow] = useState<string | null>(null);
  const [selectedPickupLocation, setSelectedPickupLocation] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Set default address on load
  useEffect(() => {
    const defaultAddr = addresses.find((a) => a.isDefaultShipping);
    if (defaultAddr) {
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses]);

  const handleAddAddress = async (data: AddressFormData) => {
    const newAddress: UserAddress = {
      id: `addr-${Date.now()}`,
      ...data,
      isDefault: data.isDefaultShipping || data.isDefaultBilling,
    };
    setAddresses([...addresses, newAddress]);
    setSelectedAddressId(newAddress.id);
    setShowAddressForm(false);
  };

  const handleContinue = async () => {
    setIsLoading(true);
    
    // Validate selections
    if (deliveryMethod === "delivery" && (!selectedAddressId || !selectedDeliveryWindow)) {
      alert("Please select an address and delivery window");
      setIsLoading(false);
      return;
    }
    
    if (deliveryMethod === "pickup" && !selectedPickupLocation) {
      alert("Please select a pickup location");
      setIsLoading(false);
      return;
    }

    // In real app, save shipping selection to checkout session
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Store in sessionStorage for next step
    const shippingData = {
      method: deliveryMethod,
      addressId: selectedAddressId,
      deliveryWindowId: selectedDeliveryWindow,
      pickupLocationId: selectedPickupLocation,
      shippingCost: deliveryMethod === "delivery" 
        ? deliveryWindows.find((w) => w.id === selectedDeliveryWindow)?.price || 0
        : 0,
    };
    sessionStorage.setItem("checkoutShipping", JSON.stringify(shippingData));

    router.push("/checkout/payment");
  };

  if (!cart) return null;

  const selectedWindow = deliveryWindows.find((w) => w.id === selectedDeliveryWindow);
  const shippingCost = selectedWindow 
    ? { amount: selectedWindow.price, formatted: `$${(selectedWindow.price / 100).toFixed(2)}` }
    : null;

  return (
    <div className="max-w-6xl mx-auto">
      <CheckoutProgress currentStep="shipping" />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Method Selection */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Delivery Method
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => setDeliveryMethod("delivery")}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  deliveryMethod === "delivery"
                    ? "border-[#0052a1] bg-[#0052a1]/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    deliveryMethod === "delivery" ? "bg-[#0052a1] text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Home Delivery</p>
                    <p className="text-sm text-gray-500">Delivered to your address</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setDeliveryMethod("pickup")}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  deliveryMethod === "pickup"
                    ? "border-[#0052a1] bg-[#0052a1]/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    deliveryMethod === "pickup" ? "bg-[#0052a1] text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Club Pickup</p>
                    <p className="text-sm text-gray-500">Free - Pick up at store</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Delivery Address Selection */}
          {deliveryMethod === "delivery" && (
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Shipping Address
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddressForm(true)}
                  className="text-[#0052a1]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add New
                </Button>
              </div>

              {showAddressForm ? (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <AddressForm
                    onSubmit={handleAddAddress}
                    onCancel={() => setShowAddressForm(false)}
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <button
                      key={address.id}
                      onClick={() => setSelectedAddressId(address.id)}
                      className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                        selectedAddressId === address.id
                          ? "border-[#0052a1] bg-[#0052a1]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                            selectedAddressId === address.id
                              ? "border-[#0052a1] bg-[#0052a1]"
                              : "border-gray-300"
                          }`}>
                            {selectedAddressId === address.id && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">
                                {address.label || "Address"}
                              </p>
                              {address.isDefaultShipping && (
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {address.firstName} {address.lastName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.streetAddress}
                              {address.streetAddress2 && `, ${address.streetAddress2}`}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} {address.postalCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Delivery Window Selection */}
          {deliveryMethod === "delivery" && selectedAddressId && (
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Select Delivery Window
              </h2>
              <div className="space-y-3">
                {deliveryWindows.map((window) => (
                  <button
                    key={window.id}
                    onClick={() => setSelectedDeliveryWindow(window.id)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      selectedDeliveryWindow === window.id
                        ? "border-[#0052a1] bg-[#0052a1]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedDeliveryWindow === window.id
                            ? "border-[#0052a1] bg-[#0052a1]"
                            : "border-gray-300"
                        }`}>
                          {selectedDeliveryWindow === window.id && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{window.date}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {window.time}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ${(window.price / 100).toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pickup Location Selection */}
          {deliveryMethod === "pickup" && (
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Select Pickup Location
              </h2>
              <div className="space-y-3">
                {pickupLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedPickupLocation(location.id)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      selectedPickupLocation === location.id
                        ? "border-[#0052a1] bg-[#0052a1]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        selectedPickupLocation === location.id
                          ? "border-[#0052a1] bg-[#0052a1]"
                          : "border-gray-300"
                      }`}>
                        {selectedPickupLocation === location.id && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{location.name}</p>
                          <span className="text-sm text-gray-500">{location.distance}</span>
                        </div>
                        <p className="text-sm text-gray-600">{location.address}</p>
                        <p className="text-xs text-gray-500 mt-1">{location.hours}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Your order will be ready for pickup within 2 hours of order confirmation.
              </p>
            </div>
          )}

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={isLoading || (deliveryMethod === "delivery" && (!selectedAddressId || !selectedDeliveryWindow)) || (deliveryMethod === "pickup" && !selectedPickupLocation)}
            className="w-full bg-[#0052a1] hover:bg-[#003d7a] h-12 text-base font-semibold"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Continue to Payment
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <OrderSummary
              cart={cart}
              promoCode={promoCode}
              promoDiscount={promoDiscount}
              shippingCost={shippingCost}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
