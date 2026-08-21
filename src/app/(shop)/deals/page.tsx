import Link from "next/link";
import { Tag, Flame, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today's Deals | PriceSmart",
  description: "Shop limited-time offers and member savings across top categories.",
};

const dealHighlights = [
  {
    title: "Limited-time savings",
    description: "Fresh deals updated daily across popular categories.",
    icon: Flame,
  },
  {
    title: "Member-only pricing",
    description: "Extra value reserved for PriceSmart members.",
    icon: Tag,
  },
  {
    title: "Hand-picked offers",
    description: "Curated promotions featuring trusted brands.",
    icon: Sparkles,
  },
];

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f5a623] to-[#d4900f] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Flame className="w-4 h-4" />
              Today&apos;s Deals
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Savings you can count on
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Discover new deals every day on the products our members love most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button className="bg-white text-[#0052a1] hover:bg-gray-100">
                  Shop all products
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
            {dealHighlights.map((item) => {
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
          <div className="bg-gradient-to-br from-[#0052a1] to-[#003d7a] rounded-2xl text-white p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Ready to save?
                </h2>
                <p className="text-white/80">
                  Explore the latest offers and shop your favorites now.
                </p>
              </div>
              <Link href="/products">
                <Button className="bg-[#f5a623] hover:bg-[#d4900f] text-white">
                  Explore products
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
