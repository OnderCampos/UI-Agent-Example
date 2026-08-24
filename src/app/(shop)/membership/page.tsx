"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Globe, User, ChevronDown, Plus, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { MembershipActionCard } from "@/components/features/membership";

export default function MembershipSearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    // Simulate async search; route stays on membership search for now.
    setTimeout(() => {
      setIsSearching(false);
      console.log("Searching membership for:", query.trim());
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top action bar */}
      <div className="bg-[var(--ps-blue)] text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              Price<span className="text-[var(--ps-amber)]">Smart</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <button className="hidden sm:flex items-center gap-1.5 hover:text-[var(--ps-amber)] transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Miraflores</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-[var(--ps-amber)] transition-colors">
              <Globe className="w-4 h-4" />
              <span>Guatemala</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-1.5 hover:text-[var(--ps-amber)] transition-colors">
              <User className="w-4 h-4" />
              <span>English</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-10 md:py-14">
          {/* Action cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <MembershipActionCard
              icon={<Plus className="w-7 h-7" />}
              label="New Membership"
              onClick={() => router.push("/membership/new")}
            />
            <MembershipActionCard
              icon={<AlertTriangle className="w-7 h-7" />}
              label="Pending process"
              variant="alert"
              onClick={() => console.log("Open pending processes")}
            />
          </div>

          {/* Divider */}
          <hr className="border-slate-200 mb-12" />

          {/* Search section */}
          <section className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-medium text-[var(--ps-blue)] mb-3">
              Search for membership
            </h1>
            <p className="text-slate-600 mb-8">
              Search for an existing profile before creating a new membership. Enter the
              customer&apos;s last name, phone number, email, or membership ID.
            </p>

            <form onSubmit={handleSearch} className="space-y-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search by name, mobile phone, email or membership number"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-xl border-slate-300 text-base focus-visible:ring-[var(--ps-blue)] focus-visible:ring-2 focus-visible:ring-offset-2"
                />
              </div>

              <Button
                type="submit"
                disabled={!query.trim() || isSearching}
                className="bg-[var(--ps-blue)] hover:bg-[var(--ps-blue-dark)] disabled:bg-slate-300 disabled:text-white text-white font-medium rounded-lg px-8 h-11"
              >
                {isSearching ? (
                  <>
                    <AnimatedIcon
                      icon={Search}
                      className="w-4 h-4 mr-2"
                      animation="bounce"
                      continuous
                    />
                    Searching...
                  </>
                ) : (
                  "Search Membership"
                )}
              </Button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
