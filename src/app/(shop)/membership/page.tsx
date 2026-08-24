"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, AlertTriangle, MapPin, Globe, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const countries = [
  { code: "GT", name: "Guatemala", flag: "🇬🇹" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
  { code: "PA", name: "Panama", flag: "🇵🇦" },
  { code: "SV", name: "El Salvador", flag: "🇸🇻" },
  { code: "HN", name: "Honduras", flag: "🇭🇳" },
];

interface Club {
  id: string;
  name: string;
}

const clubs: Club[] = [
  { id: "miraflores", name: "Miraflores" },
  { id: "zona10", name: "Zona 10" },
  { id: "san-cristobal", name: "San Cristóbal" },
];

export default function MembershipSearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedClub, setSelectedClub] = useState(clubs[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isClubOpen, setIsClubOpen] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSearching(false);

    // In a real app this would route to results
    router.push(`/membership/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-white">
      {/* Thin blue decorative bar below header */}
      <div className="h-12 bg-[#0052a1]" />

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Action cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
          <Link href="/membership/new" className="block">
            <ActionCard
              icon={
                <div className="relative">
                  <svg
                    className="w-7 h-7 text-[#0052a1]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="6" width="18" height="12" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M16 14v4" />
                    <path d="M14 16h4" />
                  </svg>
                </div>
              }
              title="New Membership"
              variant="primary"
            />
          </Link>

          <Link href="/membership/pending" className="block">
            <ActionCard
              icon={<AlertTriangle className="w-7 h-7 text-[#0052a1]" strokeWidth={1.75} />}
              title="Pending process"
              variant="outline"
            />
          </Link>
        </div>

        {/* Divider */}
        <div className="max-w-6xl mx-auto">
          <div className="border-t border-gray-200" />
        </div>

        {/* Search section */}
        <section className="max-w-4xl mx-auto pt-12 lg:pt-16">
          <h1 className="text-3xl lg:text-4xl font-semibold text-[#003d7a] mb-4">
            Search for membership
          </h1>
          <p className="text-[#003d7a]/80 text-base lg:text-lg mb-10">
            Search for an existing profile before creating a new membership. Enter the customer&apos;s
            last name, phone number, email, or membership ID.
          </p>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by name, mobile phone, email or membership number"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-14 pl-14 pr-5 text-base rounded-xl border-gray-300 text-[#003d7a] placeholder:text-gray-400 focus-visible:ring-[#0052a1] focus-visible:ring-2"
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={!query.trim() || isSearching}
                className="h-12 px-8 rounded-lg bg-[#f5f5f5] text-gray-400 hover:bg-[#0052a1] hover:text-white disabled:opacity-100 disabled:hover:bg-[#f5f5f5] disabled:hover:text-gray-400 transition-colors font-semibold text-base"
              >
                {isSearching ? "Searching..." : "Search Membership"}
              </Button>
            </div>
          </form>
        </section>
      </div>

      {/* Top-right selectors (contextual controls) */}
      <div className="fixed top-12 right-0 z-40 hidden xl:flex items-center gap-4 px-6 py-2.5 bg-[#003d7a] text-white text-sm rounded-bl-xl">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsClubOpen(!isClubOpen)}
            className="flex items-center gap-2 hover:text-[#f5a623] transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>{selectedClub.name}</span>
            <ChevronDown className={cn("w-3 h-3 transition-transform", isClubOpen && "rotate-180")} />
          </button>
          {isClubOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2">
              {clubs.map((club) => (
                <button
                  key={club.id}
                  type="button"
                  onClick={() => {
                    setSelectedClub(club);
                    setIsClubOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#0052a1] transition-colors",
                    selectedClub.id === club.id && "bg-blue-50 text-[#0052a1] font-medium"
                  )}
                >
                  {club.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsCountryOpen(!isCountryOpen)}
            className="flex items-center gap-2 hover:text-[#f5a623] transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
            <ChevronDown className={cn("w-3 h-3 transition-transform", isCountryOpen && "rotate-180")} />
          </button>
          {isCountryOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border py-2">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(country);
                    setIsCountryOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#0052a1] transition-colors flex items-center gap-3",
                    selectedCountry.code === country.code && "bg-blue-50 text-[#0052a1] font-medium"
                  )}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  variant?: "primary" | "outline";
}

function ActionCard({ icon, title, variant = "primary" }: ActionCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md cursor-pointer h-full",
        variant === "primary"
          ? "bg-[#f7f7f7] border-transparent hover:bg-[#f0f0f0]"
          : "bg-white border-gray-200 hover:border-[#0052a1]/30"
      )}
    >
      <CardContent className="flex items-center justify-center gap-5 py-10">
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center border-2",
            variant === "primary" ? "border-[#0052a1]" : "border-[#0052a1]"
          )}
        >
          {icon}
        </div>
        <span className="text-xl lg:text-2xl font-semibold text-[#003d7a]">{title}</span>
      </CardContent>
    </Card>
  );
}
