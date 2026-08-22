"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, AlertTriangle, Search, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function MembershipPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleNewMembership = () => {
    router.push("/membership/new");
  };

  const handlePendingProcess = () => {
    router.push("/membership/pending");
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSearching(false);
    router.push(`/membership/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 lg:py-12 max-w-7xl">
          {/* Action Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <Card
              onClick={handleNewMembership}
              className="cursor-pointer bg-[#f5f6f7] border-transparent hover:shadow-md transition-shadow rounded-xl"
            >
              <CardContent className="flex items-center justify-center gap-4 py-10 lg:py-12">
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#0052a1] text-[#0052a1]">
                  <CreditCard className="w-7 h-7" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 flex items-center justify-center bg-[#f5f6f7] rounded-full text-[#0052a1] text-base font-bold leading-none">+</span>
                </div>
                <span className="text-2xl font-medium text-[#003d7a]">New Membership</span>
              </CardContent>
            </Card>

            <Card
              onClick={handlePendingProcess}
              className="cursor-pointer bg-white border-gray-200 hover:shadow-md transition-shadow rounded-xl"
            >
              <CardContent className="flex items-center justify-center gap-4 py-10 lg:py-12">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#0052a1] text-[#0052a1]">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <span className="text-2xl font-medium text-[#003d7a]">Pending process</span>
              </CardContent>
            </Card>
          </section>

          <hr className="my-12 lg:my-16 border-gray-200" />

          {/* Search Section */}
          <section className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-medium text-[#003d7a] mb-4">
              Search for membership
            </h2>
            <p className="text-base lg:text-lg text-[#003d7a] mb-10 leading-relaxed">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
            </p>

            <form onSubmit={handleSearch} className="space-y-6">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search by name, mobile phone, email or membership number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-13 pr-5 rounded-xl border border-gray-300 text-base text-gray-900 placeholder:text-gray-500 focus-visible:ring-[#0052a1] focus-visible:ring-2"
                />
              </div>

              <Button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="h-12 px-8 bg-[#f5f6f7] text-gray-500 hover:bg-[#e5e7ea] hover:text-gray-700 disabled:opacity-60 rounded-lg text-base font-medium"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
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
      <Footer />
    </div>
  );
}
