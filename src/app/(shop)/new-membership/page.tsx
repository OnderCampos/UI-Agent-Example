import type { Metadata } from "next";
import Link from "next/link";
import {
  BriefcaseBusiness,
  ChevronDown,
  Circle,
  CreditCard,
  Folder,
  Globe,
  Home,
  Mail,
  MapPin,
  NotebookPen,
  Phone,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "New membership",
  description: "Review and manage new membership registration details before payment.",
};

const personalDetails = [
  [
    { label: "ID Type", value: "DNI", icon: NotebookPen },
    { label: "ID Number", value: "IDGTM1234567890123S0123", icon: CreditCard },
    { label: "Membership Type", value: "Diamond", icon: Folder },
  ],
  [
    { label: "Abbreviation", value: "Mr.", icon: UserRound },
    { label: "First Name", value: "Nicolás", icon: UserRound },
    { label: "Last Name", value: "Treviño", icon: UserRound },
  ],
  [
    { label: "Gender", value: "Male", icon: UserRound },
    { label: "Date of birth", value: "13/09/1978", icon: CreditCard },
    { label: "Occupation", value: "Urban planner", icon: BriefcaseBusiness },
  ],
];

const addressDetails = [
  { label: "Address *", value: "Km 46.5 Salida A Ciudad Vieja", icon: Home },
  { label: "Country", value: "Guatemala", icon: Globe },
  { label: "State", value: "Antigua", icon: MapPin },
  { label: "City", value: "Sacatepequez", icon: MapPin },
];

const secondaryMembers = [
  { name: "Mayra Treviño", initials: "MT" },
  { name: "Pablo Treviño", initials: "PT" },
];

function DetailCell({ label, value, icon: Icon }: { label: string; value: string; icon: typeof UserRound }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-[11px] font-medium text-[#5f6c87]">
        <Icon className="h-3.5 w-3.5 text-[#7e8aa3]" />
        <span>{label}</span>
      </div>
      <p className="text-[15px] font-medium text-[#243b6b]">{value}</p>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: typeof Phone; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-[#2c467d]">
      <Icon className="h-5 w-5" />
      <h2 className="text-[31px] font-medium tracking-[-0.02em]">{title}</h2>
    </div>
  );
}

function SecondaryMemberCard({ name, initials }: { name: string; initials: string }) {
  return (
    <div className="flex min-w-[232px] items-center justify-between rounded-xl border border-[#dde2ec] bg-white px-4 py-3 shadow-[0_1px_0_rgba(28,46,76,0.02)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#f2ccb4] to-[#8a5a42] text-sm font-semibold text-white">
          {initials}
        </div>
        <div>
          <p className="text-[14px] font-semibold text-[#31456f]">{name}</p>
          <div className="mt-1 flex items-center gap-2 text-[12px] font-medium text-[#4b82d8]">
            <button type="button">Edit</button>
            <span className="text-[#a7b1c3]">|</span>
            <button type="button" className="text-[#6f8cc0]">Remove</button>
          </div>
        </div>
      </div>
      <Circle className="h-4 w-4 fill-[#ffc13a] text-[#d99a00]" />
    </div>
  );
}

export default function NewMembershipPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f6] text-[#253b68]">
      <div className="h-[42px] bg-[#1b2f63]" />
      <div className="h-[40px] bg-[#0f57d0]" />

      <div className="mx-auto max-w-[1360px] px-10 pb-7 pt-6">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h1 className="text-[43px] font-medium tracking-[-0.03em] text-[#334c81]">New membership</h1>
          </div>
          <div className="flex items-center gap-5">
            <Button
              variant="outline"
              className="h-10 rounded-md border-[#7ea2df] px-4 text-[13px] font-semibold text-[#3c70c9] hover:bg-[#eef4ff] hover:text-[#2f62bc]"
            >
              Capture Member ID
            </Button>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#1b2f63] shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2b457f] bg-[#263d78] text-white">
                <Phone className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-sm border border-[#d8dbe3] bg-white">
          <div className="grid min-h-[980px] grid-cols-[198px_minmax(0,1fr)]">
            <aside className="border-r border-[#d8dbe3] bg-[#f7f7f8] px-5 py-7">
              <div className="space-y-7">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#163872] text-[11px] font-bold text-white">1</div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1f3f75]">Membership data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 opacity-40">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-[#cfd4de] text-[11px] font-bold text-[#7c8799]">2</div>
                  <div>
                    <p className="text-[13px] font-medium text-[#737f95]">Payment</p>
                  </div>
                </div>
              </div>
            </aside>

            <section className="px-7 pt-7">
              <SectionTitle icon={Folder} title="Personal data" />

              <div className="grid grid-cols-[160px_minmax(0,1fr)] gap-8 pb-9">
                <div className="flex flex-col items-center pt-1">
                  <div className="flex h-[132px] w-[132px] items-center justify-center overflow-hidden rounded-full bg-[#d9d9d9]">
                    <UserRound className="h-16 w-16 text-[#8c8c8c]" />
                  </div>
                  <button type="button" className="mt-4 text-[12px] font-semibold text-[#4f84dd]">
                    Change picture
                  </button>
                </div>

                <div className="space-y-8 pt-1">
                  {personalDetails.map((row) => (
                    <div key={row[0].label} className="grid grid-cols-3 gap-x-10 gap-y-5">
                      {row.map((detail) => (
                        <DetailCell key={detail.label} {...detail} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#d7dbe5] pt-7">
                <SectionTitle icon={Phone} title="Contact" />
                <div className="grid grid-cols-2 gap-x-16 gap-y-8 pb-8 pr-10">
                  <DetailCell label="Email address *" value="Customer declined to provide email address" icon={Mail} />
                  <div />
                  <DetailCell label="Mobile phone number *" value="+502 1234 5678" icon={Phone} />
                  <div className="space-y-2 pt-7">
                    <div className="flex items-center gap-2 text-[11px] font-medium text-[#5f6c87]">
                      <Circle className="h-3.5 w-3.5 fill-[#ffc13a] text-[#d99a00]" />
                      <span>Notifications</span>
                    </div>
                    <p className="text-[15px] font-medium text-[#243b6b]">By email address</p>
                  </div>
                  <DetailCell label="Home phone number *" value="+502 2345 6789" icon={Phone} />
                </div>
              </div>

              <div className="border-t border-[#d7dbe5] pt-7">
                <SectionTitle icon={Home} title="Address" />
                <div className="grid grid-cols-4 gap-x-10 gap-y-6 pb-8 pr-10">
                  {addressDetails.map((detail) => (
                    <DetailCell key={detail.label} {...detail} />
                  ))}
                </div>
              </div>

              <div className="border-t border-[#d7dbe5] pt-7">
                <SectionTitle icon={UserRound} title="Secondary memberships" />
                <div className="flex flex-wrap gap-4 pb-8">
                  {secondaryMembers.map((member) => (
                    <SecondaryMemberCard key={member.name} {...member} />
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="flex items-center justify-between border-t border-[#d8dbe3] bg-white px-7 py-4">
            <div className="flex items-center gap-5">
              <Link href="/">
                <Button
                  variant="outline"
                  className="h-10 rounded-md border-[#6f95db] px-5 text-[13px] font-semibold text-[#3f70c7] hover:bg-[#eff5ff] hover:text-[#2f62bc]"
                >
                  <Home className="h-4 w-4" />
                  Go back home
                </Button>
              </Link>
              <Button
                variant="outline"
                className="h-10 rounded-md border-[#6f95db] px-8 text-[13px] font-semibold text-[#3f70c7] hover:bg-[#eff5ff] hover:text-[#2f62bc]"
              >
                Save changes
              </Button>
            </div>

            <Button className="h-10 min-w-[120px] rounded-md bg-[#243b7a] px-8 text-[13px] font-semibold text-white hover:bg-[#1c2f63]">
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
