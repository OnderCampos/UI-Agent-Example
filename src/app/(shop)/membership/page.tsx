"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, IdCard, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuickActionCard } from "@/components/features/membership/quick-action-card";

export default function MembershipPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/membership/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header strip */}
      <div className="bg-[#003d7a] py-3" />

      <div className="container mx-auto px-4 py-10 lg:px-8">
        {/* Quick actions */}
        <section className="grid gap-6 md:grid-cols-2">
          <QuickActionCard
            href="/membership/new"
            icon={<IdCard className="h-7 w-7" />}
            title="New Membership"
            variant="filled"
          />
          <QuickActionCard
            href="/membership/pending"
            icon={<AlertTriangle className="h-7 w-7" />}
            title="Pending process"
            variant="outlined"
          />
        </section>

        {/* Divider */}
        <hr className="my-12 border-gray-200" />

        {/* Search form */}
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="mb-3 text-3xl font-semibold text-[#002d5c]">
            Search for membership
          </h1>
          <p className="mb-8 text-base text-[#4a5568]">
            Search for an existing profile before creating a new membership.
            Enter the customer&apos;s last name, phone number, email, or membership ID.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative w-full max-w-2xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-14 w-full rounded-lg border-gray-300 pl-12 pr-4 text-base text-[#002d5c] placeholder:text-gray-400 focus-visible:ring-[#0052a1]"
              />
            </div>
            <Button
              type="submit"
              disabled={!query.trim()}
              className="h-12 px-8 text-base font-medium rounded-lg bg-[#e9eef5] text-[#8793a5] hover:bg-[#0052a1] hover:text-white disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:bg-[#e9eef5] disabled:hover:text-[#8793a5]"
            >
              Search Membership
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
