"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, CreditCard, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedIcon } from "@/components/ui/animated-icon";

export default function MembershipSearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    // Simulate search request; in a real app this would call an API.
    setTimeout(() => {
      setIsSearching(false);
      router.push(`/account/membership?search=${encodeURIComponent(query.trim())}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Blue sub-header matching the reference */}
      <div className="bg-[#0052a1] h-12" />

      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* Action cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <Link
            href="/membership/new"
            className="group flex items-center justify-center gap-6 rounded-xl bg-[#f4f6f8] hover:bg-[#e8edf2] transition-colors p-8 md:p-10"
          >
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#0052a1] text-[#0052a1] group-hover:scale-105 transition-transform">
              <AnimatedIcon
                icon={CreditCard}
                className="w-9 h-9"
                hoverAnimation="none"
              />
              <span className="absolute text-[#f5a623] font-bold text-2xl right-3 bottom-3">
                +
              </span>
            </div>
            <span className="text-2xl md:text-3xl font-medium text-[#003d7a]">
              New Membership
            </span>
          </Link>

          <button
            type="button"
            className="group flex items-center justify-center gap-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors p-8 md:p-10"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#0052a1] text-[#0052a1] group-hover:scale-105 transition-transform">
              <AnimatedIcon
                icon={AlertTriangle}
                className="w-9 h-9"
                hoverAnimation="none"
              />
            </div>
            <span className="text-2xl md:text-3xl font-medium text-[#003d7a]">
              Pending process
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Search section */}
        <section className="pt-12 md:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl md:text-4xl font-normal text-[#003d7a] mb-4">
              Search for membership
            </h1>
            <p className="text-[#003d7a] text-base md:text-lg mb-10">
              Search for an existing profile before creating a new membership. Enter
              the customer&apos;s last name, phone number, email, or membership ID.
            </p>

            <form onSubmit={handleSearch} className="space-y-6">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search by name, mobile phone, email or membership number"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-14 pl-14 pr-5 rounded-xl border-gray-300 text-[#003d7a] placeholder:text-gray-400 focus-visible:ring-[#0052a1] focus-visible:ring-2 focus-visible:ring-offset-0"
                />
              </div>

              <Button
                type="submit"
                disabled={!query.trim() || isSearching}
                variant="outline"
                className="h-12 px-8 rounded-lg border-gray-200 bg-gray-100 text-gray-400 hover:bg-gray-200 disabled:opacity-100 disabled:cursor-not-allowed"
              >
                {isSearching ? "Searching..." : "Search Membership"}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
