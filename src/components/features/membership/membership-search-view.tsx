import { CreditCard, MapPin, Search, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function BrandHeader() {
  return (
    <header>
      <div className="bg-[#19336f] text-white">
        <div className="mx-auto flex h-[59px] w-full max-w-[1080px] items-center justify-between px-6 md:px-8">
          <div className="text-[23px] font-bold tracking-tight">
            Price<span className="text-[#f26b37]">Smart</span>
          </div>

          <div className="hidden items-center gap-8 text-[12px] text-white/95 md:flex">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base leading-none">🇬🇹</span>
              <span>Guatemala</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🌐</span>
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[39px] bg-[#0a4fc4]" />
    </header>
  );
}

function ActionTile({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex h-[124px] items-center gap-5 rounded-md border px-8 text-left transition-colors ${
        active
          ? "border-transparent bg-[#f2f2f4]"
          : "border-[#d8dde8] bg-white hover:bg-[#fafbfd]"
      }`}
    >
      <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-2 border-[#305cc9] text-[#305cc9]">
        {icon}
      </div>
      <span className="text-[20px] font-semibold text-[#243b7a]">{label}</span>
    </button>
  );
}

export function MembershipSearchView() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#243b7a]">
      <BrandHeader />

      <main className="mx-auto max-w-[1080px] px-6 pb-20 pt-6 md:px-8 md:pt-6">
        <section className="grid gap-6 md:grid-cols-2">
          <ActionTile active icon={<CreditCard className="h-7 w-7" strokeWidth={1.8} />} label="New Membership" />
          <ActionTile icon={<TriangleAlert className="h-7 w-7" strokeWidth={1.8} />} label="Pending process" />
        </section>

        <div className="mt-22 border-t border-[#d8dde8] pt-16">
          <div className="max-w-[860px]">
            <h1 className="text-[24px] font-medium tracking-[0.01em] text-[#243b7a] md:text-[25px]">
              Search for membership
            </h1>
            <p className="mt-2 max-w-[780px] text-[14px] leading-6 text-[#4f5f87]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-7 flex flex-col items-center">
            <div className="relative w-full max-w-[446px]">
              <Search className="pointer-events-none absolute left-14 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6c7894]" strokeWidth={2} />
              <Input
                aria-label="Search membership"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-[42px] rounded-[10px] border-[#cfd5e2] bg-white pl-[68px] pr-4 text-[13px] text-[#243b7a] placeholder:text-[#78839d] focus-visible:ring-1 focus-visible:ring-[#6b84d6] focus-visible:ring-offset-0"
              />
            </div>

            <Button
              type="button"
              disabled
              className="mt-5 h-[36px] rounded-md bg-[#ececef] px-6 text-[13px] font-semibold text-[#8d96aa] hover:bg-[#ececef]"
            >
              Search Membership
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
