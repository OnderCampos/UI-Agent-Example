"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Lock,
  Check,
  ChevronRight,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckoutProgress, OrderSummary } from "@/components/features/checkout";
import { useCart } from "@/hooks/use-cart";

const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(/^[\d\s]{16,19}$/, "Invalid card number"),
  cardName: z.string().min(1, "Name on card is required"),
  expiryDate: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvv: z
    .string()
    .min(1, "CVV is required")
    .regex(/^\d{3,4}$/, "Invalid CVV"),
  saveCard: z.boolean(),
  sameAsShipping: z.boolean(),
});

type CardFormData = z.infer<typeof cardSchema>;

// Mock saved cards
const savedCards = [
  {
    id: "card-1",
    last4: "4242",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2025,
  },
];

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const { cart, promoCode, promoDiscount } = useCart();

  const [selectedCardId, setSelectedCardId] = useState<string | null>(
    savedCards.length > 0 ? savedCards[0].id : null
  );
  const [useNewCard, setUseNewCard] = useState(savedCards.length === 0);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingData, setShippingData] = useState<{
    shippingCost: number;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      saveCard: false,
      sameAsShipping: true,
    },
  });

  const sameAsShipping = watch("sameAsShipping");

  // Load shipping data from session
  useEffect(() => {
    const savedShipping = sessionStorage.getItem("checkoutShipping");
    if (!savedShipping) {
      router.push("/checkout");
      return;
    }
    setShippingData(JSON.parse(savedShipping));
  }, [router]);

  // Format card number with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setValue("cardNumber", formatted.slice(0, 19));
  };

  // Format expiry date
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      setValue("expiryDate", `${value.slice(0, 2)}/${value.slice(2, 4)}`);
    } else {
      setValue("expiryDate", value);
    }
  };

  const onSubmit = async (data: CardFormData) => {
    setIsLoading(true);

    try {
      // In real app, tokenize card with payment provider
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store payment data in session
      const paymentData = {
        cardId: useNewCard ? null : selectedCardId,
        newCard: useNewCard
          ? {
              last4: data.cardNumber.slice(-4),
              brand: "Visa", // Detect from card number
            }
          : null,
        sameAsShipping: data.sameAsShipping,
      };
      sessionStorage.setItem("checkoutPayment", JSON.stringify(paymentData));

      router.push("/checkout/review");
    } catch (_err) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseSavedCard = () => {
    setIsLoading(true);

    // Store payment data in session
    const paymentData = {
      cardId: selectedCardId,
      newCard: null,
      sameAsShipping: true,
    };
    sessionStorage.setItem("checkoutPayment", JSON.stringify(paymentData));

    setTimeout(() => {
      router.push("/checkout/review");
    }, 500);
  };

  if (!cart || !shippingData) return null;

  const shippingCost = shippingData.shippingCost
    ? {
        amount: shippingData.shippingCost,
        formatted: `$${(shippingData.shippingCost / 100).toFixed(2)}`,
      }
    : null;

  return (
    <div className="max-w-6xl mx-auto">
      <CheckoutProgress currentStep="payment" />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Saved Cards */}
          {savedCards.length > 0 && (
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Saved Payment Methods
              </h2>
              <div className="space-y-3">
                {savedCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => {
                      setSelectedCardId(card.id);
                      setUseNewCard(false);
                    }}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      selectedCardId === card.id && !useNewCard
                        ? "border-[#0052a1] bg-[#0052a1]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedCardId === card.id && !useNewCard
                            ? "border-[#0052a1] bg-[#0052a1]"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedCardId === card.id && !useNewCard && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-br from-[#0052a1] to-[#003d7a] rounded flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {card.brand} ending in {card.last4}
                          </p>
                          <p className="text-sm text-gray-500">
                            Expires {card.expiryMonth}/{card.expiryYear}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Use Saved Card Button */}
                {!useNewCard && selectedCardId && (
                  <Button
                    onClick={handleUseSavedCard}
                    disabled={isLoading}
                    className="w-full bg-[#0052a1] hover:bg-[#003d7a] h-12 text-base font-semibold mt-4"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Continue with Saved Card
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                )}

                {/* Add New Card Link */}
                <button
                  onClick={() => setUseNewCard(true)}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    useNewCard
                      ? "border-[#0052a1] bg-[#0052a1]/5"
                      : "border-dashed border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        useNewCard
                          ? "border-[#0052a1] bg-[#0052a1]"
                          : "border-gray-300"
                      }`}
                    >
                      {useNewCard && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-700">
                      Add a new card
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* New Card Form */}
          {(useNewCard || savedCards.length === 0) && (
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {savedCards.length > 0 ? "New Card" : "Payment Method"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-gray-700">
                    Card Number
                  </Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      {...register("cardNumber")}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      className={`h-12 pr-12 ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-sm text-red-500">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>

                {/* Name on Card */}
                <div className="space-y-2">
                  <Label htmlFor="cardName" className="text-gray-700">
                    Name on Card
                  </Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    {...register("cardName")}
                    className={`h-12 ${
                      errors.cardName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cardName && (
                    <p className="text-sm text-red-500">
                      {errors.cardName.message}
                    </p>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-gray-700">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      {...register("expiryDate")}
                      onChange={handleExpiryChange}
                      maxLength={5}
                      className={`h-12 ${
                        errors.expiryDate ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.expiryDate && (
                      <p className="text-sm text-red-500">
                        {errors.expiryDate.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-gray-700">
                      CVV
                    </Label>
                    <div className="relative">
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="123"
                        {...register("cvv")}
                        maxLength={4}
                        className={`h-12 ${
                          errors.cvv ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    {errors.cvv && (
                      <p className="text-sm text-red-500">{errors.cvv.message}</p>
                    )}
                  </div>
                </div>

                {/* Save Card */}
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="saveCard"
                    onCheckedChange={(checked) =>
                      setValue("saveCard", checked as boolean)
                    }
                    className="data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
                  />
                  <Label
                    htmlFor="saveCard"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Save this card for future purchases
                  </Label>
                </div>

                {/* Billing Address */}
                <div className="pt-4 border-t">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Billing Address
                  </h3>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="sameAsShipping"
                      checked={sameAsShipping}
                      onCheckedChange={(checked) =>
                        setValue("sameAsShipping", checked as boolean)
                      }
                      className="data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
                    />
                    <Label
                      htmlFor="sameAsShipping"
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      Same as shipping address
                    </Label>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="p-3 bg-gray-50 rounded-lg flex items-start gap-3">
                  <Lock className="w-5 h-5 text-green-600 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    Your payment information is encrypted and secure. We never
                    store your full card number.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/checkout")}
                    className="flex-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-[#0052a1] hover:bg-[#003d7a] h-12 text-base font-semibold"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Continue to Review
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
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
