import { AlertTriangle, BadgePlus, Search } from "lucide-react";

import { MembershipActionTile } from "@/components/features/membership/membership-action-tile";
import { MembershipDashboardHeader } from "@/components/features/membership/membership-dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MembershipLandingPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#243d80]">
      <MembershipDashboardHeader />

      <main className="mx-auto max-w-[1120px] px-6 pb-16 pt-6 lg:px-8">
        <section className="grid gap-6 md:grid-cols-2">
          <MembershipActionTile icon={BadgePlus} title="New Membership" active />
          <MembershipActionTile icon={AlertTriangle} title="Pending process" />
        </section>

        <div className="mt-6 border-t border-[#d8dbe2]" />

        <section className="px-6 py-16 md:px-8">
          <h1 className="text-[24px] font-medium tracking-[-0.01em] text-[#1f3a81]">Search for membership</h1>
          <p className="mt-3 max-w-[880px] text-[15px] leading-6 text-[#4b5f92]">
            Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
          </p>

          <div className="mx-auto mt-7 flex max-w-[446px] flex-col items-center gap-5">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-14 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6f7788]" strokeWidth={2} />
              <Input
                type="text"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-[42px] rounded-[10px] border-[#cfd4dd] bg-white pl-[74px] pr-4 text-[14px] text-[#34456e] placeholder:text-[#7d8598] focus-visible:ring-[#3159c6]"
              />
            </div>

            <Button
              type="button"
              disabled
              className="h-[36px] rounded-md bg-[#efeff1] px-10 text-[14px] font-semibold text-[#8893aa] hover:bg-[#efeff1]"
            >
              Search Membership
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
