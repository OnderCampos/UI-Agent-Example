import { AlertTriangle, CreditCard, Globe, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function TopBar() {
  return (
    <header>
      <div className="bg-[#172e67] text-white">
        <div className="mx-auto flex h-[60px] max-w-[1280px] items-center justify-between px-[52px]">
          <div className="text-[18px] font-semibold tracking-[-0.02em] text-white">
            Price<span className="text-[#ec5a29]">Smart</span>
          </div>
          <div className="flex items-center gap-8 text-[14px] text-white/95">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" strokeWidth={1.8} />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" strokeWidth={1.8} />
              <span>Guatemala</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border border-white/70" />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[38px] bg-[#184ec7]" />
    </header>
  );
}

function ActionCard({
  icon,
  title,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={[
        "flex h-[124px] items-center gap-5 rounded-[8px] border px-10 text-left transition-colors",
        active
          ? "border-transparent bg-[#f3f4f7]"
          : "border-[#d8ddea] bg-white hover:bg-[#fafbff]",
      ].join(" ")}
    >
      <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border-2 border-[#2d63cf] text-[#2d63cf]">
        {icon}
      </div>
      <span className="text-[20px] font-semibold text-[#253d7a]">{title}</span>
    </button>
  );
}

export function MembershipSearchView() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#233563]">
      <TopBar />

      <main className="mx-auto max-w-[1280px] px-[60px] py-6">
        <section className="grid grid-cols-2 gap-6">
          <ActionCard
            active
            icon={<CreditCard className="h-7 w-7" strokeWidth={1.8} />}
            title="New Membership"
          />
          <ActionCard
            icon={<AlertTriangle className="h-7 w-7" strokeWidth={1.8} />}
            title="Pending process"
          />
        </section>

        <div className="mt-22 border-t border-[#d7dbe6] pt-16">
          <section className="max-w-[920px] pl-6">
            <h1 className="text-[24px] font-medium tracking-[-0.01em] text-[#274282]">
              Search for membership
            </h1>
            <p className="mt-2 max-w-[900px] text-[14px] leading-6 text-[#445785]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s
              last name, phone number, email, or membership ID.
            </p>

            <div className="mx-auto mt-7 flex max-w-[446px] flex-col items-center gap-5">
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-14 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6d7690]" strokeWidth={1.9} />
                <Input
                  aria-label="Search membership"
                  placeholder="Search by name, mobile phone, email or membership number"
                  className="h-[40px] rounded-[10px] border-[#cfd4df] bg-white pl-[38px] pr-4 text-[13px] text-[#33466d] placeholder:text-[#7d859d] focus-visible:ring-[#2d63cf]/25"
                />
              </div>

              <Button
                type="button"
                disabled
                className="h-[36px] rounded-[8px] bg-[#e9ebf0] px-10 text-[13px] font-semibold text-[#93a0b6] hover:bg-[#e9ebf0]"
              >
                Search Membership
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
