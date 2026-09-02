"use client";

import { Search, AlertTriangle, BadgePlus, WalletCards } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const quickActions = [
  {
    title: "New Membership",
    icon: BadgePlus,
    emphasized: true,
  },
  {
    title: "Pending process",
    icon: AlertTriangle,
    emphasized: false,
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-[calc(100vh-220px)] bg-[#f5f6f8] -m-6 p-6 md:p-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Card
                key={action.title}
                className={`rounded-xl border-[#d7dce5] px-8 py-10 shadow-none ${
                  action.emphasized ? "bg-[#eef0f3]" : "bg-white"
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-5 text-left transition-opacity hover:opacity-85"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#335ec9] text-[#335ec9]">
                    <Icon className="h-7 w-7 stroke-[1.75]" />
                  </span>
                  <span className="text-[28px] font-bold tracking-[-0.02em] text-[#233f88] md:text-[30px]">
                    {action.title}
                  </span>
                </button>
              </Card>
            );
          })}
        </div>

        <Separator className="my-8 bg-[#d7dce5]" />

        <section className="px-2 pt-10 md:px-6">
          <div className="max-w-4xl">
            <h1 className="text-[26px] font-medium tracking-[-0.02em] text-[#233f88] md:text-[28px]">
              Search for membership
            </h1>
            <p className="mt-3 max-w-4xl text-base leading-7 text-[#4c5d84]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <form className="mt-12 flex flex-col items-center gap-5" role="search">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7a859c]" />
              <Input
                type="search"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-14 rounded-xl border-[#cfd6e2] bg-white pl-12 pr-4 text-[15px] text-[#0f172a] placeholder:text-[#7a859c] focus-visible:ring-1 focus-visible:ring-[#6366F1]"
              />
            </div>
            <Button
              type="submit"
              disabled
              className="h-11 rounded-xl bg-[#e8ebf1] px-8 text-[17px] font-semibold text-[#8a95ab] hover:bg-[#e8ebf1]"
            >
              <WalletCards className="h-4 w-4 opacity-0" />
              Search Membership
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
