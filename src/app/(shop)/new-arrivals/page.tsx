import Link from "next/link";
import { Sparkles, Truck, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Arrivals | PriceSmart",
  description: "Discover the newest products across every department.",
};

const arrivalHighlights = [
  {
    title: "Freshly stocked",
    description: "New products arrive every week for members and families.",
    icon: Sparkles,
  },
  {
    title: "Fast delivery options",
    description: "Pickup and delivery choices that fit your schedule.",
    icon: Truck,
  },
  {
    title: "Trusted quality",
    description: "Curated products from brands you already know.",
    icon: Shield,
  },
];

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0052a1] to-[#003d7a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              New Arrivals
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              The newest picks for every aisle
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Shop the latest products hand-selected for your home, business, and family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button className="bg-[#f5a623] hover:bg-[#d4900f] text-white">
                  Shop new arrivals
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {arrivalHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-gray-50 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#e6f0fa] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#0052a1]" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl border p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Need inspiration?
                </h2>
                <p className="text-gray-600">
                  Explore our full catalog to see everything available today.
                </p>
              </div>
              <Link href="/products">
                <Button className="bg-[#0052a1] hover:bg-[#003d7a] text-white">
                  View all products
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
