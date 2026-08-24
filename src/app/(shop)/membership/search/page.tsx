"use client";

import { useRouter } from "next/navigation";
import { CreditCard, AlertTriangle } from "lucide-react";
import { MembershipActionCard } from "@/components/features/membership-search/membership-action-card";
import { MembershipSearchForm } from "@/components/features/membership-search/membership-search-form";

export default function MembershipSearchPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Action cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MembershipActionCard
              icon={CreditCard}
              title="New Membership"
              variant="default"
              onClick={() => router.push("/membership/new")}
            />
            <MembershipActionCard
              icon={AlertTriangle}
              title="Pending process"
              variant="outlined"
              onClick={() => router.push("/membership/pending")}
            />
          </section>

          <hr className="border-[#e5e7eb]" />

          {/* Search section */}
          <MembershipSearchForm
            onSearch={(query) =>
              router.push(`/membership/search/results?q=${encodeURIComponent(query)}`)
            }
          />
        </div>
      </main>
    </div>
  );
}
