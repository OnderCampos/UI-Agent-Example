import { AlertTriangle, CreditCard, Globe, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function MembershipShortcutCard({
  icon: Icon,
  title,
  muted = false,
}: {
  icon: typeof CreditCard;
  title: string;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex h-[124px] w-full items-center gap-5 rounded-md border px-8 text-left transition-colors ${
        muted
          ? "border-[#d5dae4] bg-white hover:bg-[#fafbfd]"
          : "border-transparent bg-[#ededf0] hover:bg-[#e7e8ec]"
      }`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2f62d5] text-[#2f62d5]">
        <Icon className="h-7 w-7" />
      </span>
      <span className="text-[22px] font-semibold tracking-[-0.02em] text-[#243b7a]">{title}</span>
    </button>
  );
}

export function MemberMembershipSearch() {
  return (
    <div className="min-h-screen bg-[#f6f6f7] text-[#101828]">
      <header className="shadow-sm">
        <div className="flex h-[60px] items-center justify-between bg-[#14295d] px-14 text-white">
          <div className="text-[18px] font-bold tracking-tight">
            Price<span className="text-[#f58220]">Smart</span>
          </div>
          <div className="flex items-center gap-8 text-[15px] font-medium">
            <div className="flex items-center gap-2 opacity-95">
              <MapPin className="h-4 w-4" />
              Miraflores
            </div>
            <div className="flex items-center gap-2 opacity-95">
              <Globe className="h-4 w-4" />
              Guatemala
            </div>
            <div className="flex items-center gap-2 opacity-95">
              <Globe className="h-4 w-4" />
              English
            </div>
          </div>
        </div>
        <div className="h-[39px] bg-[#1748b8]" />
      </header>

      <main className="mx-auto max-w-[1080px] px-6 pb-16 pt-6">
        <section className="grid gap-6 md:grid-cols-2">
          <MembershipShortcutCard icon={CreditCard} title="New Membership" />
          <MembershipShortcutCard icon={AlertTriangle} title="Pending process" muted />
        </section>

        <div className="mt-8 border-t border-[#d9d9df] pt-16">
          <section className="mx-auto max-w-[900px] text-center">
            <div className="text-left md:pl-2">
              <h1 className="text-[24px] font-medium tracking-[-0.02em] text-[#243b7a]">
                Search for membership
              </h1>
              <p className="mt-3 max-w-[880px] text-[15px] leading-6 text-[#42526e]">
                Search for an existing profile before creating a new membership. Enter the
                customer&apos;s last name, phone number, email, or membership ID.
              </p>
            </div>

            <div className="mt-7 flex flex-col items-center gap-5">
              <div className="relative w-full max-w-[445px]">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
                <Input
                  placeholder="Search by name, mobile phone, email or membership number"
                  className="h-10 rounded-[10px] border-[#d0d5dd] bg-white pl-11 text-[15px] text-[#344054] placeholder:text-[#8b95a7] focus-visible:ring-[#1748b8]"
                />
              </div>

              <Button
                disabled
                className="h-9 rounded-md bg-[#e8eaee] px-6 text-[15px] font-semibold text-[#99a2b2] hover:bg-[#e8eaee]"
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
