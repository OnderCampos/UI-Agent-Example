import Link from "next/link";
import { Star, Crown, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member's Selection | PriceSmart",
  description: "Exclusive picks and special savings curated for PriceSmart members.",
};

const memberBenefits = [
  {
    title: "Exclusive member picks",
    description: "A curated collection of top products at member-only prices.",
    icon: Star,
  },
  {
    title: "Premium quality",
    description: "Trusted brands and standout value selected by our teams.",
    icon: ShieldCheck,
  },
  {
    title: "Member perks",
    description: "More savings and early access to select offers.",
    icon: Crown,
  },
];

export default function MembersSelectionPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003d7a] to-[#0052a1] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Member&apos;s Selection
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Exclusive picks for members
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Discover featured products with special savings reserved for PriceSmart members.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/categories/members-selection">
                <Button className="bg-[#f5a623] hover:bg-[#d4900f] text-white">
                  Shop the collection
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/membership">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Become a member
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberBenefits.map((item) => {
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
                  Explore more member savings
                </h2>
                <p className="text-gray-600">
                  See the full product catalog and find more member favorites.
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
