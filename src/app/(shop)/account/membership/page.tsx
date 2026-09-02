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
    <div className="min-h-screen bg-[#f6f7fb] text-[#0f172a]">
      <header className="bg-[#162d67] text-white">
        <div className="mx-auto flex h-[60px] w-full max-w-[1080px] items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[18px] font-bold tracking-[-0.02em]">
            <span className="text-[#ef5b2a]">✦</span>
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
        <div className="h-[39px] bg-[#1844b2]" />
      </header>

      <main className="mx-auto max-w-[1080px] px-6 pb-24 pt-6 lg:px-8 lg:pt-6">
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
                    ? "border-transparent bg-[#efeff1]"
                    : "border-[#d6dbe5] bg-[#f9fafc] hover:bg-white",
                ].join(" ")}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#3163db] text-[#3163db]">
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </span>
                <span className="text-[20px] font-semibold tracking-[-0.02em] text-[#233f86]">
                  {card.title}
                </span>
              </button>
            );
          })}
        </section>

        <div className="mt-6 border-t border-[#d8dee8]" />

        <section className="px-6 py-16 md:px-6 md:py-16">
          <div className="max-w-[880px]">
            <h1 className="text-[24px] font-medium tracking-[-0.03em] text-[#223d83] md:text-[25px]">
              Search for membership
            </h1>
            <p className="mt-2 text-[15px] leading-7 text-[#495b86]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s
              last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6b7280]" />
              <Input
                type="text"
                defaultValue="Treviño"
                className="h-10 rounded-[10px] border-[#ccd4e0] bg-white pl-11 pr-4 text-[15px] text-[#213a7a] shadow-none placeholder:text-[#7b879f] focus-visible:ring-1 focus-visible:ring-[#6366F1]"
              />
            </div>

            <Button
              type="button"
              className="h-9 rounded-[6px] bg-[#263f88] px-6 text-[15px] font-semibold text-white hover:bg-[#1c3270]"
            >
              Search Membership
            </Button>
          </div>

          <div className="mt-6 rounded-sm bg-[#f7f7fb] px-8 py-16 text-center">
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#233f86]">
              No matching profiles found
            </h2>
            <p className="mx-auto mt-4 max-w-[620px] text-[16px] leading-8 text-[#65748b]">
              We couldn&apos;t find any records with the information provided. Please verify the data or
              create a new membership.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-6 h-9 rounded-[8px] border-[#4c7de5] bg-white px-7 text-[15px] font-semibold text-[#3f73dc] hover:bg-[#f8fbff] hover:text-[#2f63d7]"
            >
              Create new membership
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
