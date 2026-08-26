import Link from "next/link";
import {
  Camera,
  ChevronDown,
  Circle,
  FolderOpen,
  Globe,
  House,
  Languages,
  MapPin,
  Pencil,
  Phone,
  Save,
  Smartphone,
  Trash2,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const personalData = [
  { label: "ID Type", value: "DNI" },
  { label: "ID Number", value: "IDGTM1234567890123S0123" },
  { label: "Membership Type", value: "Diamond" },
  { label: "Abbreviation", value: "Mr." },
  { label: "First Name", value: "Nicolás" },
  { label: "Last Name", value: "Treviño" },
  { label: "Gender", value: "Male" },
  { label: "Date of birth", value: "13/09/1978" },
  { label: "Occupation", value: "Urban planner" },
];

const contactRows = [
  { label: "Email address *", value: "Customer declined to provide email address", full: true },
  { label: "Mobile phone number *", value: "+502 1234 5678" },
  { label: "Notifications", value: "By email address" },
  { label: "Home phone number *", value: "+502 2345 6789" },
];

const addressRows = [
  { label: "Address *", value: "Km 46.5 Salida A Ciudad Vieja" },
  { label: "Country", value: "Guatemala" },
  { label: "State", value: "Antigua" },
  { label: "City", value: "Sacatepequez" },
];

const secondaryMembers = [
  { name: "Mayra Treviño", tone: "from-orange-200 to-orange-500" },
  { name: "Pablo Treviño", tone: "from-sky-100 to-sky-400" },
];

function TopMembershipBar() {
  return (
    <div className="bg-[#19376d] text-white">
      <div className="mx-auto flex h-11 max-w-[1360px] items-center justify-between px-6 text-xs sm:px-8 lg:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Price<span className="text-[#f26c21]">Smart</span>
        </Link>
        <div className="flex items-center gap-5 text-[12px] text-white/90">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>Miraflores</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            <span>Guatemala</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="flex items-center gap-1.5">
            <Languages className="h-3.5 w-3.5" />
            <span>English</span>
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>
      </div>
      <div className="h-10 bg-[#1f53c2]" />
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: typeof UserRound; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[17px] font-medium text-[#2b4580]">
      <Icon className="h-4.5 w-4.5" />
      <h2>{title}</h2>
    </div>
  );
}

export default function NewMembershipPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#243a66]">
      <TopMembershipBar />

      <div className="mx-auto max-w-[1360px] px-6 pb-7 pt-6 sm:px-8 lg:px-10">
        <div className="mb-4 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-[21px] font-medium text-[#2d467d]">New membership</h1>
          </div>
          <Button
            variant="outline"
            className="h-8 rounded-md border-[#9cb4e3] px-4 text-[12px] font-medium text-[#3361bf] hover:bg-[#edf3ff] hover:text-[#2c56a9]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="overflow-hidden rounded-sm border border-[#d9dde6] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.01)]">
          <div className="grid min-h-[760px] grid-cols-[180px_minmax(0,1fr)]">
            <aside className="border-r border-[#e1e5ec] bg-[#f7f7f8] px-6 py-7">
              <div className="space-y-6 text-[12px]">
                <div className="flex items-start gap-3 text-[#2f467f]">
                  <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1e3668] text-[10px] font-semibold text-white">1</span>
                  <div>
                    <p className="font-semibold">Membership data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-[#b6bcc9]">
                  <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#eceff4] text-[10px] font-semibold text-[#9ca4b6]">2</span>
                  <div>
                    <p>Payment</p>
                  </div>
                </div>
              </div>
            </aside>

            <section className="px-8 py-7">
              <SectionTitle icon={FolderOpen} title="Personal data" />

              <div className="grid grid-cols-[126px_minmax(0,1fr)] gap-8 pb-8">
                <div className="flex flex-col items-center pt-1">
                  <div className="flex h-[94px] w-[94px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#d6d7db] to-[#efefef]">
                    <div className="flex h-full w-full items-end justify-center bg-[radial-gradient(circle_at_top,_#f3f3f4,_#d8d8dc_58%,_#c8c8cc_100%)]">
                      <div className="mb-0 flex h-[76px] w-[76px] items-end justify-center rounded-full bg-gradient-to-b from-[#f2d4bf] via-[#d8a27c] to-[#b96542]">
                        <div className="mb-0 h-[34px] w-[64px] rounded-t-[30px] bg-[#7a3b2c]" />
                      </div>
                    </div>
                  </div>
                  <button className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-[#4675d1]">
                    <Camera className="h-3.5 w-3.5" />
                    Change picture
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-x-8 gap-y-8 pr-4 text-[13px]">
                  {personalData.map((item) => (
                    <div key={item.label}>
                      <p className="mb-2 text-[11px] text-[#6f7b93]">{item.label}</p>
                      <p className="leading-5 text-[#2f467f]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#e3e6ec] pt-5">
                <SectionTitle icon={Phone} title="Contact" />
                <div className="grid grid-cols-2 gap-x-8 gap-y-7 pr-8 text-[13px]">
                  {contactRows.map((item) => (
                    <div key={item.label} className={item.full ? "col-span-2" : ""}>
                      <div className="flex items-center gap-2">
                        <p className="mb-2 text-[11px] text-[#6f7b93]">{item.label}</p>
                        {item.label === "Mobile phone number *" ? (
                          <Circle className="mb-2 h-3.5 w-3.5 fill-[#f0ad2c] text-[#f0ad2c]" />
                        ) : null}
                      </div>
                      <p className="leading-5 text-[#2f467f]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 border-t border-[#e3e6ec] pt-5">
                <SectionTitle icon={House} title="Address" />
                <div className="grid grid-cols-4 gap-x-8 pr-8 text-[13px]">
                  {addressRows.map((item) => (
                    <div key={item.label}>
                      <p className="mb-2 text-[11px] text-[#6f7b93]">{item.label}</p>
                      <p className="leading-5 text-[#2f467f]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 border-t border-[#e3e6ec] pt-5">
                <SectionTitle icon={UsersRound} title="Secondary memberships" />
                <div className="flex gap-5">
                  {secondaryMembers.map((member) => (
                    <div
                      key={member.name}
                      className="flex w-[220px] items-center justify-between rounded-lg border border-[#e3e6ec] bg-white px-3 py-3 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${member.tone}`} />
                        <div>
                          <p className="text-[12px] font-semibold text-[#3a4f81]">{member.name}</p>
                          <div className="mt-1 flex items-center gap-2 text-[11px] font-medium text-[#4675d1]">
                            <button className="inline-flex items-center gap-1 hover:underline">
                              <Pencil className="h-3 w-3" />
                              Edit
                            </button>
                            <span className="text-[#aab2c2]">|</span>
                            <button className="inline-flex items-center gap-1 text-[#e15d4f] hover:underline">
                              <Trash2 className="h-3 w-3" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                      <Circle className="h-3.5 w-3.5 fill-[#f0ad2c] text-[#f0ad2c]" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="flex items-center justify-between border-t border-[#d9dde6] bg-white px-7 py-4">
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="h-10 rounded-md border-[#9cb4e3] px-4 text-[13px] font-medium text-[#3361bf] hover:bg-[#edf3ff] hover:text-[#2c56a9]"
              >
                <House className="h-4 w-4" />
                Go back home
              </Button>
              <Button
                variant="outline"
                className="h-10 rounded-md border-[#9cb4e3] px-5 text-[13px] font-medium text-[#3361bf] hover:bg-[#edf3ff] hover:text-[#2c56a9]"
              >
                <Save className="h-4 w-4" />
                Save changes
              </Button>
            </div>
            <Button className="h-10 min-w-[128px] rounded-md bg-[#243f86] px-6 text-[13px] font-medium text-white hover:bg-[#1b316a]">
              Payment
            </Button>
          </div>
        </div>
      </div>

      <button className="fixed right-3 top-[118px] flex h-16 w-12 flex-col items-center justify-center rounded-l-xl rounded-r-md bg-[#1f3b84] text-white shadow-lg">
        <Smartphone className="h-4 w-4" />
        <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-md bg-[#27499d]">
          <div className="h-4 w-2.5 rounded-sm border border-white/80" />
        </div>
      </button>
    </div>
  );
}
