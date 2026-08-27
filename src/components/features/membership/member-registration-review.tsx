import {
  BriefcaseBusiness,
  Camera,
  ChevronDown,
  ChevronLeft,
  CircleAlert,
  CreditCard,
  FolderOpen,
  Globe,
  Home,
  Languages,
  Mail,
  MapPin,
  Pencil,
  Phone,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const memberSections = {
  personal: [
    ["ID Type", "DNI"],
    ["ID Number", "IDGTM1234567890123S0123"],
    ["Membership Type", "Diamond"],
    ["Abbreviation", "Mr."],
    ["First Name", "Nicolás"],
    ["Last Name", "Treviño"],
    ["Gender", "Male"],
    ["Date of birth", "13/09/1978"],
    ["Occupation", "Urban planner"],
  ],
  contact: [
    ["Email address *", "Customer declined to provide email address"],
    ["Mobile phone number *", "+502 1234 5678"],
    ["Home phone number *", "+502 2345 6789"],
    ["Notifications", "By email address"],
  ],
  address: [
    ["Address *", "Km 46.5 Salida A Ciudad Vieja"],
    ["Country", "Guatemala"],
    ["State", "Antigua"],
    ["City", "Sacatepequez"],
  ],
};

const secondaryMembers = [
  { name: "Mayra Treviño", role: "Secondary member" },
  { name: "Pablo Treviño", role: "Secondary member" },
];

function DetailGrid({ items, columns = 3 }: { items: string[][]; columns?: 3 | 4 }) {
  return (
    <div
      className={`grid gap-y-7 gap-x-8 ${
        columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
      }`}
    >
      {items.map(([label, value]) => (
        <div key={label} className="space-y-1.5">
          <p className="text-[11px] font-semibold text-[#667085]">{label}</p>
          <p className="text-[14px] text-[#243b7a]">{value}</p>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: typeof UserRound; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[#243b7a]">
      <Icon className="h-4 w-4" />
      <h2 className="text-[15px] font-semibold">{title}</h2>
    </div>
  );
}

export function MemberRegistrationReview() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#101828]">
      <header className="shadow-sm">
        <div className="flex h-[42px] items-center justify-between bg-[#123a8f] px-7 text-white">
          <div className="text-[27px] font-bold tracking-tight">
            Price<span className="text-[#f58220]">Smart</span>
          </div>
          <div className="flex items-center gap-6 text-[12px] font-medium">
            <div className="flex items-center gap-1.5 opacity-90">
              <MapPin className="h-3.5 w-3.5" />
              Miraflores
            </div>
            <div className="flex items-center gap-1.5 opacity-90">
              <Globe className="h-3.5 w-3.5" />
              Guatemala
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center gap-1.5 opacity-90">
              <Languages className="h-3.5 w-3.5" />
              English
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
        <div className="h-[26px] bg-[#1651c7]" />
      </header>

      <main className="mx-auto max-w-[1280px] px-10 pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-[37px] font-medium tracking-[-0.02em] text-[#2b468f]">
            New membership
          </h1>
          <Button
            variant="outline"
            className="h-9 rounded-md border-[#8eb0ef] bg-white px-4 text-[12px] font-semibold text-[#2160d0] hover:bg-[#f5f8ff]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="overflow-hidden rounded-sm border border-[#d8dde7] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.03)]">
          <div className="grid min-h-[760px] grid-cols-[190px_1fr]">
            <aside className="border-r border-[#e4e7ec] bg-[#fbfbfc] px-6 py-7">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[13px] font-semibold text-[#243b7a]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#243b7a] text-[11px] text-white">
                    1
                  </span>
                  Membership data
                </div>
                <div className="flex items-center gap-3 text-[13px] text-[#98a2b3]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d0d5dd] text-[11px]">
                    2
                  </span>
                  Payment
                </div>
              </div>
            </aside>

            <section className="flex flex-col">
              <div className="flex-1 px-8 py-7">
                <SectionTitle icon={FolderOpen} title="Personal data" />

                <div className="rounded-sm border-b border-[#e4e7ec] pb-8">
                  <div className="grid grid-cols-[120px_1fr] gap-8">
                    <div className="flex flex-col items-center pt-1">
                      <div className="relative h-24 w-24 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_35%,#f6f6f6_0,#d4d4d4_72%)]">
                        <div className="absolute inset-x-0 bottom-0 h-14 bg-[#8c1b1b]" />
                        <div className="absolute left-1/2 top-[22px] h-7 w-7 -translate-x-1/2 rounded-full bg-[#e5c3ad]" />
                        <div className="absolute left-1/2 top-[17px] h-9 w-10 -translate-x-1/2 rounded-t-[20px] rounded-b-[10px] bg-[#4b403c]" />
                        <div className="absolute left-[33px] top-[50px] h-4 w-14 rounded-[999px_999px_20px_20px] border-b-[18px] border-b-[#e5c3ad] border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent" />
                      </div>
                      <button className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#3b82f6]">
                        <Camera className="h-3.5 w-3.5" />
                        Change picture
                      </button>
                    </div>

                    <DetailGrid items={memberSections.personal} />
                  </div>
                </div>

                <div className="border-b border-[#e4e7ec] py-7">
                  <SectionTitle icon={Phone} title="Contact" />
                  <div className="grid gap-y-7 gap-x-8 md:grid-cols-2">
                    <div className="space-y-7">
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-semibold text-[#667085]">Email address *</p>
                        <p className="text-[14px] text-[#243b7a]">
                          Customer declined to provide email address
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-semibold text-[#667085]">Mobile phone number *</p>
                        <div className="flex items-center gap-3">
                          <p className="text-[14px] text-[#243b7a]">+502 1234 5678</p>
                          <CircleAlert className="h-4 w-4 text-[#f59e0b]" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-semibold text-[#667085]">Home phone number *</p>
                        <p className="text-[14px] text-[#243b7a]">+502 2345 6789</p>
                      </div>
                    </div>
                    <div className="grid content-end">
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-semibold text-[#667085]">Notifications</p>
                        <p className="text-[14px] text-[#243b7a]">By email address</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-[#e4e7ec] py-7">
                  <SectionTitle icon={Home} title="Address" />
                  <DetailGrid items={memberSections.address} columns={4} />
                </div>

                <div className="py-7">
                  <SectionTitle icon={UsersRound} title="Secondary memberships" />
                  <div className="flex flex-wrap gap-4">
                    {secondaryMembers.map((member, index) => (
                      <div
                        key={member.name}
                        className="flex w-[264px] items-center justify-between rounded-lg border border-[#e4e7ec] bg-white px-4 py-3 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_35%,#f5f5f5_0,#d6d6d6_74%)]">
                            <div
                              className={`absolute inset-x-0 bottom-0 h-5 ${
                                index === 0 ? "bg-[#7a3a2b]" : "bg-[#6f8ab7]"
                              }`}
                            />
                            <div className="absolute left-1/2 top-[8px] h-3 w-3 -translate-x-1/2 rounded-full bg-[#e7c4b1]" />
                            <div className="absolute left-1/2 top-[6px] h-4 w-4 -translate-x-1/2 rounded-t-full bg-[#4b403c]" />
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-[#344054]">{member.name}</p>
                            <div className="mt-0.5 flex items-center gap-2 text-[11px] font-semibold text-[#1d4ed8]">
                              <button className="inline-flex items-center gap-1 hover:underline">
                                <Pencil className="h-3 w-3" />
                                Edit
                              </button>
                              <span className="text-[#98a2b3]">|</span>
                              <button className="hover:underline">Remove</button>
                            </div>
                          </div>
                        </div>
                        <CircleAlert className="h-4 w-4 text-[#f59e0b]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <footer className="flex items-center justify-between border-t border-[#d8dde7] px-8 py-4">
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="h-10 rounded-md border-[#8eb0ef] px-5 text-[13px] font-semibold text-[#2160d0] hover:bg-[#f5f8ff]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Go back home
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 rounded-md border-[#8eb0ef] px-5 text-[13px] font-semibold text-[#2160d0] hover:bg-[#f5f8ff]"
                  >
                    Save changes
                  </Button>
                </div>
                <Button className="h-10 min-w-[128px] rounded-md bg-[#223b82] px-6 text-[13px] font-semibold text-white hover:bg-[#1c316a]">
                  <CreditCard className="h-4 w-4" />
                  Payment
                </Button>
              </footer>
            </section>
          </div>
        </div>
      </main>

      <div className="fixed right-4 top-[88px] flex h-16 w-14 items-center justify-center rounded-xl bg-[#1f3b83] shadow-lg">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white">
          <Mail className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
