"use client";

import { useRouter } from "next/navigation";
import { CreditCard, AlertTriangle } from "lucide-react";

import { MembershipActionCard } from "@/components/features/membership/membership-action-card";
import { MembershipSearchForm } from "@/components/features/membership/membership-search-form";
import { APP_ROUTES } from "@/lib/constants";

export default function MembershipPage() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    // Future integration: call membership search service
    console.log("Search membership by", query);
    router.push(`${APP_ROUTES.MEMBERSHIP}/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-4rem)]">
      {/* Sub-header brand bar */}
      <div className="bg-[#0052a1] h-14" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Action cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <MembershipActionCard
            icon={CreditCard}
            label="New Membership"
            variant="filled"
            onClick={() => router.push(APP_ROUTES.NEW_MEMBERSHIP)}
          />
          <MembershipActionCard
            icon={AlertTriangle}
            label="Pending process"
            variant="outlined"
            onClick={() => router.push(APP_ROUTES.PENDING_MEMBERSHIP)}
          />
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-16" />

        {/* Search form */}
        <MembershipSearchForm
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
}
