"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CreditCard, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MembershipHubPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Placeholder for future membership search integration.
      console.log("Searching membership for:", query.trim());
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Brand blue bar under header */}
      <div className="h-12 bg-[#0052a1]" />

      <div className="container mx-auto px-4 py-10">
        {/* Quick-action cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <button
            type="button"
            onClick={() => router.push("/membership/new")}
            className="group flex items-center justify-center gap-5 rounded-xl border border-gray-200 bg-[#f7f9fb] p-10 transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052a1]"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#0052a1] bg-white text-[#0052a1] transition group-hover:bg-[#e6f0fa]">
              <CreditCard className="h-7 w-7" />
              <span className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f5a623] text-[10px] font-bold text-white">
                +
              </span>
            </div>
            <span className="text-2xl font-semibold text-[#002d5c]">New Membership</span>
          </button>

          <button
            type="button"
            className="group flex items-center justify-center gap-5 rounded-xl border border-gray-200 bg-white p-10 transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052a1]"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#0052a1] bg-white text-[#0052a1] transition group-hover:bg-[#e6f0fa]">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <span className="text-2xl font-semibold text-[#002d5c]">Pending process</span>
          </button>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Search section */}
        <section className="py-14 text-center">
          <h1 className="text-3xl font-medium text-[#002d5c] mb-4">
            Search for membership
          </h1>
          <p className="text-base text-[#4a5568] mb-10 max-w-3xl mx-auto">
            Search for an existing profile before creating a new membership. Enter the
            customer&apos;s last name, phone number, email, or membership ID.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by name, mobile phone, email or membership number"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 pl-12 pr-4 text-base border-gray-300 rounded-xl text-[#002d5c] placeholder:text-gray-400 focus-visible:ring-[#0052a1]"
              />
            </div>
            <Button
              type="submit"
              variant="outline"
              className="h-12 px-8 text-base font-medium border-gray-300 text-gray-500 hover:bg-[#e6f0fa] hover:text-[#0052a1] hover:border-[#0052a1] rounded-lg disabled:opacity-50"
              disabled={!query.trim()}
            >
              Search Membership
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
