import { AlertTriangle, CreditCard, Globe, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function MembershipOptionCard({
  icon: Icon,
  title,
  muted = false,
}: {
  icon: React.ElementType;
  title: string;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      className={[
        "flex h-[124px] items-center gap-6 rounded-[8px] border px-10 text-left transition-colors",
        muted
          ? "border-[#d7dbe6] bg-white hover:bg-[#f8fafc]"
          : "border-transparent bg-[#f3f4f6] hover:bg-[#eceef2]",
      ].join(" ")}
    >
      <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full border-2 border-[#2b56c4] text-[#2b56c4]">
        <Icon className="h-[26px] w-[26px] stroke-[1.8]" />
      </span>
      <span className="text-[20px] font-semibold tracking-[-0.01em] text-[#243b7a]">{title}</span>
    </button>
  );
}

export function MembershipLookupView() {
  return (
    <div className="min-h-[calc(100vh-180px)] bg-[#f5f5f6]">
      <div className="bg-[#1f49b6] h-10 w-full" />

      <div className="mx-auto max-w-[1040px] px-8 pb-24 pt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <MembershipOptionCard icon={CreditCard} title="New Membership" />
          <MembershipOptionCard icon={AlertTriangle} title="Pending process" muted />
        </div>

        <div className="mt-6 border-t border-[#d7dbe3] pt-16">
          <section className="max-w-[860px]">
            <h1 className="text-[23px] font-medium tracking-[-0.01em] text-[#243b7a]">
              Search for membership
            </h1>
            <p className="mt-2 max-w-[820px] text-[15px] leading-6 text-[#475b84]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone
              number, email, or membership ID.
            </p>

            <div className="mx-auto mt-7 flex max-w-[445px] flex-col items-center gap-5">
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6b7280]" />
                <Input
                  type="text"
                  placeholder="Search by name, mobile phone, email or membership number"
                  className="h-10 rounded-[10px] border-[#cfd5df] bg-white pl-11 pr-4 text-[14px] text-[#243b7a] placeholder:text-[#7a8498] focus-visible:ring-1 focus-visible:ring-[#2b56c4]"
                />
              </div>

              <Button
                type="button"
                disabled
                className="h-9 rounded-[8px] bg-[#e8ebf0] px-6 text-[14px] font-semibold text-[#8993a7] hover:bg-[#e8ebf0]"
              >
                Search Membership
              </Button>
            </div>
          </section>
        </div>
      </div>

      <div className="absolute right-6 top-5 flex items-center gap-7 text-[14px] text-white sm:right-12">
        <div className="flex items-center gap-2 opacity-95">
          <MapPin className="h-4 w-4" />
          <span>Miraflores</span>
        </div>
        <div className="flex items-center gap-2 opacity-95">
          <span className="text-[15px]">🇬🇹</span>
          <span>Guatemala</span>
        </div>
        <div className="flex items-center gap-2 opacity-95">
          <Globe className="h-4 w-4" />
          <span>English</span>
        </div>
      </div>
    </div>
  );
}
