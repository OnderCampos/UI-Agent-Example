import { CircleAlert, Globe, MapPin, Search, WalletCards } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const actions = [
  {
    title: "New Membership",
    icon: WalletCards,
    active: true,
  },
  {
    title: "Pending process",
    icon: CircleAlert,
    active: false,
  },
];

export function MembershipLocator() {
  return (
    <div className="min-h-screen bg-[#f6f6f8] text-[#17336d]">
      <header>
        <div className="bg-[#162c67] text-white">
          <div className="mx-auto flex h-[60px] w-full max-w-[1080px] items-center justify-between px-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f26522] text-[15px] font-bold text-white">
                ✳
              </div>
              <span className="text-[17px] font-semibold tracking-[-0.02em]">PriceSmart</span>
            </div>

            <div className="flex items-center gap-7 text-[14px] text-white/95">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" strokeWidth={1.8} />
                <span>Miraflores</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[15px]">🌐</span>
                <span>Guatemala</span>
                <span className="text-white/70">▾</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" strokeWidth={1.8} />
                <span>English</span>
                <span className="text-white/70">▾</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[39px] bg-[#1f49b8]" />
      </header>

      <main className="mx-auto max-w-[1080px] px-[59px] pb-24 pt-[23px]">
        <section className="grid gap-6 md:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                type="button"
                className={[
                  "flex h-[124px] items-center gap-5 rounded-[8px] border px-[48px] text-left transition-colors",
                  action.active
                    ? "border-transparent bg-[#efeff2]"
                    : "border-[#d5d9e5] bg-transparent",
                ].join(" ")}
              >
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border-2 border-[#2959d3] text-[#2959d3]">
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <span className="text-[21px] font-semibold text-[#243f84]">{action.title}</span>
              </button>
            );
          })}
        </section>

        <div className="mt-[22px] border-t border-[#d7d9df]" />

        <section className="px-[25px] pt-[58px]">
          <h1 className="text-[24px] font-medium tracking-[-0.02em] text-[#243f84]">Search for membership</h1>
          <p className="mt-2 max-w-[870px] text-[14px] leading-6 text-[#44557f]">
            Search for an existing profile before creating a new membership. Enter the customer&apos;s last name,
            phone number, email, or membership ID.
          </p>

          <form className="mt-[23px] flex flex-col items-center">
            <div className="relative w-full max-w-[446px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6d7995]" strokeWidth={2} />
              <Input
                type="search"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-[41px] rounded-[10px] border-[#cfd4df] bg-white pl-11 pr-4 text-[13px] text-[#24314f] placeholder:text-[#7e879f] focus-visible:ring-[#2959d3]"
              />
            </div>

            <Button
              type="submit"
              disabled
              className="mt-[20px] h-[36px] rounded-[8px] bg-[#ebedf2] px-10 text-[12px] font-semibold text-[#8f98ad] hover:bg-[#ebedf2]"
            >
              Search Membership
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
