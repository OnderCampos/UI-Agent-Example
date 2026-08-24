"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MembershipSearchFormProps {
  onSearch?: (query: string) => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  placeholder?: string;
  submitLabel?: string;
}

export function MembershipSearchForm({
  onSearch,
  isLoading = false,
  title = "Search for membership",
  description = "Search for an existing profile before creating a new membership. Enter the customer's last name, phone number, email, or membership ID.",
  placeholder = "Search by name, mobile phone, email or membership number",
  submitLabel = "Search Membership",
}: MembershipSearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSearch?.(query.trim());
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-[#003d7a] mb-4">{title}</h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">{description}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full h-14 pl-12 pr-4 text-base rounded-xl border-gray-300 focus-visible:ring-[#0052a1] focus-visible:ring-2"
          />
        </div>

        <Button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="bg-[#003d7a] hover:bg-[#002d5c] disabled:bg-gray-300 disabled:text-gray-500 text-white h-12 px-8 rounded-lg font-semibold"
        >
          {isLoading ? "Searching..." : submitLabel}
        </Button>
      </form>
    </div>
  );
}
