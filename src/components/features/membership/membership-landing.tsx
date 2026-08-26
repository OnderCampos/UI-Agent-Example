import { AlertTriangle, CreditCard, Globe, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const membershipActions = [
  {
    title: "New Membership",
    icon: CreditCard,
    emphasized: true,
  },
  {
    title: "Pending process",
    icon: AlertTriangle,
    emphasized: false,
  },
];

export function MembershipLanding() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#243b7a]">
      <div className="bg-[#192b63] text-white">
        <div className="mx-auto flex h-[58px] w-full max-w-[1120px] items-center justify-between px-5 sm:px-8">
          <div className="text-[20px] font-bold tracking-[-0.02em]">
            Price<span className="text-[#ff6b2c]">Smart</span>
          </div>

          <div className="hidden items-center gap-7 text-[14px] font-medium md:flex">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[16px]">🌎</span>
              <span>Guatemala</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[39px] bg-[#1543b7]" />

      <main className="mx-auto max-w-[1120px] px-5 pb-20 pt-6 sm:px-8 sm:pt-6">
        <section className="grid gap-6 md:grid-cols-2">
          {membershipActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                type="button"
                className={`flex min-h-[124px] items-center gap-5 rounded-[8px] border px-8 py-8 text-left transition-colors ${
                  action.emphasized
                    ? "border-transparent bg-[#ededee]"
                    : "border-[#d7dbe3] bg-[#f7f7f8]"
                }`}
              >
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border-2 border-[#2f5ed3] text-[#2f5ed3]">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <span className="text-[20px] font-semibold tracking-[-0.02em] text-[#223a7a]">
                  {action.title}
                </span>
              </button>
            );
          })}
        </section>

        <div className="mt-22 border-t border-[#d8dadd]" />

        <section className="mx-auto mt-16 max-w-[915px]">
          <h1 className="text-[24px] font-medium tracking-[-0.02em] text-[#253b80] sm:text-[27px]">
            Search for membership
          </h1>
          <p className="mt-3 max-w-[890px] text-[16px] leading-6 text-[#425179] sm:text-[15px]">
            Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
          </p>

          <div className="mx-auto mt-8 max-w-[446px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-14 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7b8499]" strokeWidth={2} />
              <Input
                type="text"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-[42px] rounded-[10px] border-[#cfd5df] bg-white pl-[62px] pr-4 text-[14px] text-[#374151] shadow-none placeholder:text-[#7f879c] focus-visible:ring-1"
              />
            </div>

            <div className="mt-20 flex justify-center">
              <Button
                type="button"
                disabled
                className="h-[36px] rounded-[7px] bg-[#eef0f4] px-6 text-[14px] font-semibold text-[#8e97ab] hover:bg-[#eef0f4]"
              >
                Search Membership
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
