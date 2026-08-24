"use client";

import { useState, FormEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MembershipSearchFormProps {
  title?: string;
  description?: string;
  placeholder?: string;
  submitLabel?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function MembershipSearchForm({
  title = "Search for membership",
  description = "Search for an existing profile before creating a new membership. Enter the customer's last name, phone number, email, or membership ID.",
  placeholder = "Search by name, mobile phone, email or membership number",
  submitLabel = "Search Membership",
  onSearch,
  className,
}: MembershipSearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className={cn("space-y-8", className)}>
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-medium text-[#003d7a]">{title}</h2>
        <p className="text-base text-[#6b7280] max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-14 w-full rounded-xl border-[#d1d5db] pl-14 pr-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus-visible:ring-[#0052a1] focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!query.trim()}
            className="h-12 rounded-lg bg-[#f3f4f6] px-6 text-base font-medium text-[#9ca3af] hover:bg-[#e5e7eb] disabled:opacity-100"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </section>
  );
}
