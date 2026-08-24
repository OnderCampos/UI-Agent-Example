"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  title: string;
  icon: typeof Plus;
  variant?: "default" | "outline";
  onClick?: () => void;
}

function ActionCard({ title, icon: Icon, variant = "default", onClick }: ActionCardProps) {
  const isDefault = variant === "default";

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center justify-center gap-4 rounded-xl border p-8 transition-all duration-200",
        isDefault
          ? "border-transparent bg-[#f5f5f5] hover:bg-[#eeeeee]"
          : "border-[#e0e0e0] bg-white hover:border-[#0052a1] hover:shadow-sm"
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full border-2 transition-colors",
          isDefault
            ? "border-[#0052a1] bg-white text-[#0052a1] group-hover:bg-[#0052a1] group-hover:text-white"
            : "border-[#0052a1] bg-white text-[#0052a1]"
        )}
      >
        <Icon className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <span
        className={cn(
          "text-xl font-semibold",
          isDefault ? "text-[#003d7a]" : "text-[#003d7a]"
        )}
      >
        {title}
      </span>
    </button>
  );
}

export default function MembershipSearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    // Simulate API call for membership search
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSearching(false);

    // Navigate to results or show empty state
    router.push(`/membership/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleNewMembership = () => {
    router.push("/membership/new");
  };

  const handlePendingProcess = () => {
    router.push("/membership/pending");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header strip */}
      <div className="h-12 w-full bg-[#0052a1]" />

      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* Action cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <ActionCard
            title="New Membership"
            icon={Plus}
            variant="default"
            onClick={handleNewMembership}
          />
          <ActionCard
            title="Pending process"
            icon={AlertTriangle}
            variant="outline"
            onClick={handlePendingProcess}
          />
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-[#e0e0e0]" />

        {/* Search section */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold text-[#003d7a]">
            Search for membership
          </h1>
          <p className="mt-3 text-base text-[#424242]">
            Search for an existing profile before creating a new membership. Enter the
            customer&apos;s last name, phone number, email, or membership ID.
          </p>

          <form onSubmit={handleSearch} className="mt-8 space-y-5">
            <div className="relative mx-auto max-w-2xl">
              <AnimatedIcon
                icon={Search}
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9e9e9e]"
                animation="none"
                hoverAnimation="none"
                tapAnimation="none"
              />
              <Input
                type="search"
                placeholder="Search by name, mobile phone, email or membership number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 rounded-xl border-[#e0e0e0] pl-12 pr-4 text-base text-[#212121] placeholder:text-[#9e9e9e] focus-visible:ring-[#0052a1]"
              />
            </div>

            <Button
              type="submit"
              disabled={!searchQuery.trim() || isSearching}
              className="h-12 rounded-lg bg-[#e0e0e0] px-6 text-base font-medium text-[#9e9e9e] hover:bg-[#d6d6d6] disabled:opacity-100"
            >
              {isSearching ? "Searching..." : "Search Membership"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
