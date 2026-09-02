"use client";

import { useState } from "react";
import { AlertTriangle, BadgePlus, Search } from "lucide-react";

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
  const [query, setQuery] = useState("Treviño");

  return (
    <div className="min-h-[calc(100vh-220px)] bg-[#F8FAFC] -m-6 p-6 md:p-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Card
                key={action.title}
                className={`rounded-[10px] border border-[#E2E8F0] px-8 py-9 shadow-none ${
                  action.emphasized ? "bg-[#F1F5F9]" : "bg-white"
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-6 text-left transition-opacity hover:opacity-90"
                >
                  <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-2 border-[#4F6EDB] text-[#4F6EDB]">
                    <Icon className="h-7 w-7 stroke-[1.8]" />
                  </span>
                  <span className="text-[26px] font-bold tracking-[-0.02em] text-[#233876] md:text-[28px]">
                    {action.title}
                  </span>
                </button>
              </Card>
            );
          })}
        </div>

        <Separator className="my-6 bg-[#E2E8F0]" />

        <section className="px-2 pb-4 pt-12 md:px-6">
          <div className="max-w-5xl">
            <h1 className="text-[26px] font-medium tracking-[-0.02em] text-[#233876] md:text-[28px]">
              Search for membership
            </h1>
            <p className="mt-2 text-base leading-7 text-[#475569]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <form className="mt-7 flex flex-col items-center gap-4" role="search">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#64748B]" />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-10 rounded-[10px] border-[#CBD5E1] bg-white pl-11 pr-4 text-[15px] text-[#334155] shadow-none placeholder:text-[#94A3B8] focus-visible:ring-1 focus-visible:ring-[#6366F1]"
              />
            </div>
            <Button
              type="submit"
              className="h-10 rounded-[6px] bg-[#233876] px-6 text-[15px] font-semibold text-white hover:bg-[#1D2F66]"
            >
              Search Membership
            </Button>
          </form>

          <Card className="mx-auto mt-6 max-w-[980px] rounded-none border-0 bg-[#F8FAFC] p-0 shadow-none">
            <div className="rounded-[2px] bg-[#F8FAFC] px-6 py-10 text-center md:px-12">
              <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#233876]">
                No matching profiles found
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-8 text-[#64748B]">
                We couldn&apos;t find any records with the information provided. Please verify the data or create a new membership.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-6 h-10 rounded-[6px] border-[#60A5FA] bg-white px-6 text-[15px] font-semibold text-[#3B82F6] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
              >
                Create new membership
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
