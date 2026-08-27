import { AlertTriangle, CreditCard, Globe, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickActions = [
  {
    title: "New Membership",
    icon: CreditCard,
    highlighted: true,
  },
  {
    title: "Pending process",
    icon: AlertTriangle,
    highlighted: false,
  },
];

function TopBrandBar() {
  return (
    <div className="bg-[#173579] text-white">
      <div className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-6 lg:px-12">
        <div className="text-[19px] font-semibold tracking-[-0.02em]">
          Price<span className="text-[#f26c28]">Smart</span>
        </div>
        <div className="flex items-center gap-6 text-[15px]">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" strokeWidth={2} />
            <span>Miraflores</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">🇬🇹</span>
            <span>Guatemala</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" strokeWidth={2} />
            <span>English</span>
          </div>
        </div>
      </div>
      <div className="h-[38px] bg-[#1f47b6]" />
    </div>
  );
}

function QuickActionCard({
  title,
  icon: Icon,
  highlighted,
}: {
  title: string;
  icon: typeof CreditCard;
  highlighted: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex h-[124px] items-center gap-8 rounded-lg border px-11 text-left transition-colors ${
        highlighted
          ? "border-transparent bg-[#f0f0f2]"
          : "border-[#d7dce7] bg-white hover:bg-[#fbfcff]"
      }`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2a58c3] text-[#2a58c3]">
        <Icon className={`h-7 w-7 ${title === "New Membership" ? "" : "stroke-[1.8]"}`} />
      </div>
      <span className="text-[20px] font-semibold text-[#254287]">{title}</span>
    </button>
  );
}

export function MembershipProfileSearch() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-slate-900">
      <TopBrandBar />

      <div className="mx-auto max-w-[1120px] px-6 pb-24 pt-6 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {quickActions.map((action) => (
            <QuickActionCard key={action.title} {...action} />
          ))}
        </div>

        <div className="mt-22 border-t border-[#d5d9e1] pt-16">
          <section className="max-w-[920px]">
            <h1 className="text-[25px] font-medium tracking-[-0.02em] text-[#254287]">
              Search for membership
            </h1>
            <p className="mt-2 text-[15px] leading-7 text-[#495b87]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last
              name, phone number, email, or membership ID.
            </p>

            <div className="mt-10 flex flex-col items-center gap-5">
              <div className="relative w-full max-w-[444px]">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#75809a]" />
                <Input
                  aria-label="Search membership"
                  placeholder="Search by name, mobile phone, email or membership number"
                  className="h-10 rounded-[10px] border-[#d4d9e3] bg-white pl-11 pr-4 text-[14px] text-[#254287] placeholder:text-[#7d879d] focus-visible:ring-1 focus-visible:ring-[#2a58c3] focus-visible:ring-offset-0"
                />
              </div>

              <Button
                type="button"
                variant="outline"
                className="h-9 rounded-lg border-[#e3e5ea] bg-[#f2f3f6] px-6 text-[14px] font-semibold text-[#96a0b5] hover:bg-[#eceef3] hover:text-[#96a0b5]"
              >
                Search Membership
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
