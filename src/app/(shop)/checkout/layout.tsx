"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { cart, isLoading: cartLoading } = useCart();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
  }, [authLoading, isAuthenticated, router]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && (!cart || cart.lineItems.length === 0)) {
      router.push("/cart");
    }
  }, [cartLoading, cart, router]);

  // Show loading state
  if (authLoading || cartLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading checkout...</div>
      </div>
    );
  }

  // Don't render if not authenticated or cart is empty
  if (!isAuthenticated || !cart || cart.lineItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Checkout Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Back to Cart */}
            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-600 hover:text-[#0052a1] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Cart</span>
            </Link>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1">
              <span className="text-xl font-bold text-[#0052a1]">Price</span>
              <span className="text-xl font-bold text-[#f5a623]">Smart</span>
            </Link>

            {/* Secure Badge */}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Checkout Footer */}
      <footer className="bg-white border-t py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>Your payment information is encrypted and secure.</p>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-[#0052a1]">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-[#0052a1]">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-[#0052a1]">
                Help
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
