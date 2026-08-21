"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "muted";
}

function ActionCard({ href, icon, label, variant = "default" }: ActionCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-center gap-4 rounded-xl border p-8 transition-all",
        variant === "muted"
          ? "bg-[#f5f5f5] border-transparent hover:bg-[#eeeeee]"
          : "bg-white border-gray-200 hover:border-[#0052a1] hover:shadow-sm"
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full border-2 transition-colors",
          variant === "muted"
            ? "border-[#0052a1] text-[#0052a1] group-hover:bg-white"
            : "border-[#0052a1] text-[#0052a1] group-hover:bg-[#e6f0fa]"
        )}
      >
        {icon}
      </div>
      <span className="text-2xl font-semibold text-[#003d7a]">{label}</span>
    </Link>
  );
}

export default function MembershipLandingPage() {
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
      {/* Header Strip */}
      <div className="bg-[#003d7a] h-12" />

      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* Action Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <ActionCard
            href="/membership/new"
            icon={<Plus className="h-7 w-7" />}
            label="New Membership"
            variant="muted"
          />
          <ActionCard
            href="/membership/pending"
            icon={<AlertTriangle className="h-7 w-7" />}
            label="Pending process"
          />
        </div>

        {/* Divider */}
        <hr className="my-12 border-gray-200" />

        {/* Search Section */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold text-[#003d7a] mb-3">
            Search for membership
          </h1>
          <p className="text-[#0052a1] mb-10">
            Search for an existing profile before creating a new membership. Enter the
            customer&apos;s last name, phone number, email, or membership ID.
          </p>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by name, mobile phone, email or membership number"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 rounded-xl border-gray-300 pl-12 pr-4 text-base shadow-sm placeholder:text-gray-400 focus-visible:ring-[#0052a1]"
              />
            </div>
            <Button
              type="submit"
              disabled={!query.trim()}
              className="h-12 rounded-lg bg-[#e0e0e0] px-8 text-base font-medium text-gray-500 hover:bg-[#d6d6d6] disabled:opacity-100"
            >
              Search Membership
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
