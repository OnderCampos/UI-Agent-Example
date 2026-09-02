"use client";

import { AlertTriangle, CreditCard, Globe, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const actionCards = [
  {
    title: "New Membership",
    icon: CreditCard,
    featured: true,
  },
  {
    title: "Pending process",
    icon: AlertTriangle,
    featured: false,
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#0f172a]">
      <header className="border-b border-[#1f4aa8] bg-[#142a66] text-white">
        <div className="mx-auto flex h-[60px] w-full max-w-[1080px] items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[18px] font-bold tracking-[-0.02em]">
            <span className="text-[#ff6b35]">✦</span>
            <span>PriceSmart</span>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <div className="flex items-center gap-2 text-white/95">
              <MapPin className="h-4 w-4" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2 text-white/95">
              <span className="text-base leading-none">🌎</span>
              <span>Guatemala</span>
            </div>
            <div className="flex items-center gap-2 text-white/95">
              <Globe className="h-4 w-4" />
              <span>English</span>
            </div>
          </div>
        </div>
        <div className="h-[38px] bg-[#1f49b6]" />
      </header>

      <main className="mx-auto max-w-[1080px] px-6 pb-24 pt-6 lg:px-8 lg:pt-8">
        <section className="grid gap-6 md:grid-cols-2">
          {actionCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                type="button"
                className={[
                  "flex min-h-[124px] items-center gap-6 rounded-lg border px-8 text-left transition-colors",
                  card.featured
                    ? "border-transparent bg-[#ececef]"
                    : "border-[#d6dae3] bg-white hover:bg-[#fafbfc]",
                ].join(" ")}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2f63d7] text-[#2f63d7]">
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </span>
                <span className="text-[20px] font-semibold tracking-[-0.02em] text-[#213a7a]">
                  {card.title}
                </span>
              </button>
            );
          })}
        </section>

        <div className="mt-6 border-t border-[#d8dde6]" />

        <section className="px-6 py-16 md:px-8 md:py-20">
          <div className="max-w-[820px]">
            <h1 className="text-[26px] font-medium tracking-[-0.03em] text-[#223a7a] md:text-[28px]">
              Search for membership
            </h1>
            <p className="mt-2 max-w-[820px] text-[16px] leading-7 text-[#485a88]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s
              last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-5">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6b7280]" />
              <Input
                type="text"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-10 rounded-[10px] border-[#cfd6e2] bg-white pl-11 pr-4 text-[15px] text-[#213a7a] shadow-none placeholder:text-[#7b879f] focus-visible:ring-1 focus-visible:ring-[#6366F1]"
              />
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-[8px] border-[#d9dee8] bg-[#eef1f5] px-6 text-[15px] font-semibold text-[#8a97ad] hover:bg-[#e5e9f0] hover:text-[#6f7d95]"
            >
              Search Membership
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
