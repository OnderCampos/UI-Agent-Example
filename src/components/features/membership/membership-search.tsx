"use client";

import { useState } from "react";
import { Search, Plus, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

function ActionCard({ icon, label, selected, onClick }: ActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-lg border-2 p-6 md:p-8 flex items-center justify-center gap-4 transition-all duration-200",
        selected
          ? "bg-[#e6f0fa] border-[#0052a1] shadow-sm"
          : "bg-white border-[#e0e0e0] hover:border-[#0052a1]/40 hover:shadow-sm"
      )}
    >
      <div
        className={cn(
          "w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center",
          selected ? "border-[#0052a1]" : "border-[#0052a1]"
        )}
      >
        {icon}
      </div>
      <span className="text-lg md:text-xl font-semibold text-[#003d7a]">
        {label}
      </span>
    </button>
  );
}

export function MembershipSearch() {
  const [activeAction, setActiveAction] = useState<"new" | "pending" | null>(
    null
  );
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder search behavior; wire to API as needed
    if (query.trim()) {
      // eslint-disable-next-line no-console
      console.log("Searching membership:", query.trim());
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Action cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <ActionCard
          selected={activeAction === "new"}
          onClick={() =>
            setActiveAction((prev) => (prev === "new" ? null : "new"))
          }
          icon={
            <div className="relative">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#0052a1]"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <Plus
                className="absolute -bottom-1 -right-1 w-4 h-4 text-[#f5a623]"
                strokeWidth={2.5}
              />
            </div>
          }
          label="New Membership"
        />
        <ActionCard
          selected={activeAction === "pending"}
          onClick={() =>
            setActiveAction((prev) => (prev === "pending" ? null : "pending"))
          }
          icon={
            <AlertTriangle
              className="w-7 h-7 text-[#0052a1]"
              strokeWidth={1.8}
            />
          }
          label="Pending process"
        />
      </div>

      {/* Divider */}
      <div className="my-10 md:my-12 border-t border-[#e0e0e0]" />

      {/* Search form */}
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#003d7a]">
            Search for membership
          </h1>
          <p className="text-[#616161] text-sm md:text-base max-w-3xl mx-auto">
            Search for an existing profile before creating a new membership.
            Enter the customer&apos;s last name, phone number, email, or
            membership ID.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9e9e9e]" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, mobile phone, email or membership number"
              className={cn(
                "w-full h-14 pl-12 pr-4 rounded-lg border border-[#e0e0e0] bg-white text-[#424242]",
                "placeholder:text-[#9e9e9e] focus-visible:ring-2 focus-visible:ring-[#0052a1] focus-visible:border-[#0052a1]"
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={!query.trim()}
            className="h-12 px-8 bg-[#e0e0e0] text-[#9e9e9e] hover:bg-[#d6d6d6] hover:text-[#757575] disabled:opacity-100 font-semibold rounded-lg transition-colors"
          >
            Search Membership
          </Button>
        </form>
      </div>
    </div>
  );
}
