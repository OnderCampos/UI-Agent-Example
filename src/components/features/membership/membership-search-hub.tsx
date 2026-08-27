import { AlertTriangle, CreditCard, Globe, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function HeaderMeta() {
  return (
    <div className="bg-[#172b63] text-white">
      <div className="mx-auto flex h-[60px] max-w-[1080px] items-center justify-between px-6">
        <div className="text-[18px] font-semibold tracking-tight">
          Price<span className="text-[#f59b23]">Smart</span>
        </div>
        <div className="flex items-center gap-7 text-[14px] font-medium text-white/95">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Miraflores</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px]">🌐</span>
            <span>Guatemala</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>English</span>
          </div>
        </div>
      </div>
      <div className="h-10 bg-[#1542b0]" />
    </div>
  );
}

type ActionCardProps = {
  title: string;
  active?: boolean;
  icon: React.ComponentType<{ className?: string }>;
};

function ActionCard({ title, active, icon: Icon }: ActionCardProps) {
  return (
    <button
      type="button"
      className={[
        "flex h-[124px] items-center gap-5 rounded-lg border px-12 text-left transition-colors",
        active
          ? "border-transparent bg-[#f1f1f4]"
          : "border-[#d4d9e3] bg-transparent hover:bg-[#f8f9fb]",
      ].join(" ")}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2455c4] text-[#2455c4]">
        <Icon className="h-7 w-7" />
      </div>
      <span className="text-[18px] font-semibold text-[#213f83]">{title}</span>
    </button>
  );
}

export function MembershipSearchHub() {
  return (
    <div className="min-h-screen bg-[#f6f6f8] text-[#213f83]">
      <HeaderMeta />

      <main className="mx-auto max-w-[1080px] px-[60px] py-6">
        <section className="grid grid-cols-2 gap-6">
          <ActionCard title="New Membership" icon={CreditCard} active />
          <ActionCard title="Pending process" icon={AlertTriangle} />
        </section>

        <div className="mt-22 border-t border-[#d8dbe2] pt-16">
          <div className="max-w-[820px]">
            <h1 className="text-[25px] font-medium tracking-[0.01em] text-[#223f84]">
              Search for membership
            </h1>
            <p className="mt-2 text-[14px] leading-6 text-[#42557f]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s
              last name, phone number, email, or membership ID.
            </p>

            <div className="mt-6 flex flex-col items-center gap-5">
              <div className="relative w-full max-w-[444px]">
                <Search className="pointer-events-none absolute left-13 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6e7890]" />
                <Input
                  type="text"
                  placeholder="Search by name, mobile phone, email or membership number"
                  className="h-10 rounded-[10px] border-[#cfd4de] bg-transparent pl-12 pr-4 text-[13px] text-[#32456e] placeholder:text-[#717b92] focus-visible:ring-1 focus-visible:ring-[#2455c4]"
                />
              </div>

              <Button
                type="button"
                disabled
                className="h-9 rounded-md bg-[#eef0f4] px-10 text-[13px] font-semibold text-[#8b94a9] hover:bg-[#eef0f4]"
              >
                Search Membership
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
