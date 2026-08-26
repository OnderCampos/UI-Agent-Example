import type { Metadata } from "next";
import Link from "next/link";
import {
  BriefcaseBusiness,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Globe,
  House,
  IdCard,
  Languages,
  MapPin,
  PencilLine,
  Phone,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "New membership",
  description: "Review and complete a new membership registration before payment.",
};

const personalData = [
  { label: "ID Type", value: "DNI", icon: IdCard },
  { label: "ID Number", value: "IDGTM1234567890123S0123", icon: IdCard },
  { label: "Membership Type", value: "Diamond", icon: CreditCard },
  { label: "Abbreviation", value: "Mr.", icon: User },
  { label: "First Name", value: "Nicolás", icon: User },
  { label: "Last Name", value: "Treviño", icon: User },
  { label: "Gender", value: "Male", icon: User },
  { label: "Date of birth", value: "13/09/1978", icon: User },
  { label: "Occupation", value: "Urban planner", icon: BriefcaseBusiness },
];

const contactData = [
  { label: "Email address *", value: "Customer declined to provide email address" },
  { label: "Mobile phone number *", value: "+502 1234 5678", hint: "Notifications", detail: "By email address" },
  { label: "Home phone number *", value: "+502 2345 6789" },
];

const addressData = [
  { label: "Address *", value: "Km 46.5 Salida A Ciudad Vieja" },
  { label: "Country", value: "Guatemala" },
  { label: "State", value: "Antigua" },
  { label: "City", value: "Sacatepequez" },
];

const secondaryMembers = [
  { name: "Mayra Treviño" },
  { name: "Pablo Treviño" },
];

function TopBar() {
  return (
    <header className="bg-[#12306b] text-white">
      <div className="mx-auto flex h-[42px] w-full max-w-[1360px] items-center justify-between px-8 text-[12px]">
        <div className="text-[25px] font-bold tracking-tight">
          Price<span className="text-[#f05a28]">Smart</span>
        </div>
        <div className="flex items-center gap-7 text-[12px] text-white/95">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>Miraflores</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            <span>Guatemala</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
          <div className="flex items-center gap-1.5">
            <Languages className="h-3.5 w-3.5" />
            <span>English</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
      <div className="h-[28px] bg-[#1d56d8]" />
    </header>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: typeof User; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[#243d77]">
      <Icon className="h-4 w-4" />
      <h2 className="text-[15px] font-medium">{title}</h2>
    </div>
  );
}

export default function NewMembershipPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#33415c]">
      <TopBar />

      <div className="mx-auto max-w-[1360px] px-10 pb-8 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-[20px] font-medium text-[#243d77]">New membership</h1>
          <Button
            variant="outline"
            className="h-8 rounded-md border-[#7ca0ea] px-4 text-[11px] text-[#3c68c5] hover:bg-[#eef4ff]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="overflow-hidden rounded-sm border border-[#d9dde6] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.01)]">
          <div className="flex min-h-[760px]">
            <aside className="w-[188px] border-r border-[#dde1ea] bg-[#f7f7f8] px-5 py-6">
              <div className="space-y-5 text-[11px]">
                <div className="flex items-start gap-2.5 text-[#243d77]">
                  <div className="mt-[1px] flex h-4 w-4 items-center justify-center rounded-full bg-[#243d77] text-[10px] font-semibold text-white">
                    1
                  </div>
                  <div>
                    <div className="font-semibold">Membership data</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-[#c3c8d3]">
                  <div className="mt-[1px] flex h-4 w-4 items-center justify-center rounded-full bg-[#e6e8ee] text-[10px] font-semibold text-[#9ba3b3]">
                    2
                  </div>
                  <div>Payment</div>
                </div>
              </div>
            </aside>

            <main className="flex flex-1 flex-col bg-white">
              <div className="flex-1 px-5 py-4">
                <SectionTitle icon={User} title="Personal data" />

                <div className="grid grid-cols-[120px_1fr] gap-8 border-b border-[#e3e6ec] pb-7">
                  <div className="flex flex-col items-center pt-1">
                    <div className="h-[96px] w-[96px] overflow-hidden rounded-full bg-[#d9d9d9]">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                        alt="Member"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button className="mt-3 text-[10px] font-medium text-[#3c68c5]">Change picture</button>
                  </div>

                  <div className="grid grid-cols-3 gap-x-12 gap-y-7 pt-1">
                    {personalData.map((item) => (
                      <div key={item.label}>
                        <div className="mb-1.5 text-[11px] text-[#667085]">{item.label}</div>
                        <div className="text-[13px] text-[#243d77]">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <section className="border-b border-[#e3e6ec] py-5">
                  <SectionTitle icon={Phone} title="Contact" />
                  <div className="grid grid-cols-3 gap-x-12 gap-y-6 text-[13px]">
                    <div>
                      <div className="mb-2 text-[11px] text-[#667085]">{contactData[0].label}</div>
                      <div className="text-[#243d77]">{contactData[0].value}</div>
                    </div>
                    <div />
                    <div />

                    <div>
                      <div className="mb-2 text-[11px] text-[#667085]">{contactData[1].label}</div>
                      <div className="text-[#243d77]">{contactData[1].value}</div>
                    </div>
                    <div className="flex items-end gap-2 text-[11px] text-[#8a93a5]">
                      <CircleHelp className="mb-0.5 h-3.5 w-3.5 text-[#f1a11e]" />
                    </div>
                    <div>
                      <div className="mb-2 text-[11px] text-[#667085]">{contactData[1].hint}</div>
                      <div className="text-[#243d77]">{contactData[1].detail}</div>
                    </div>

                    <div>
                      <div className="mb-2 text-[11px] text-[#667085]">{contactData[2].label}</div>
                      <div className="text-[#243d77]">{contactData[2].value}</div>
                    </div>
                  </div>
                </section>

                <section className="border-b border-[#e3e6ec] py-5">
                  <SectionTitle icon={House} title="Address" />
                  <div className="grid grid-cols-4 gap-x-10 text-[13px]">
                    {addressData.map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 text-[11px] text-[#667085]">{item.label}</div>
                        <div className="text-[#243d77]">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="py-5">
                  <SectionTitle icon={Users} title="Secondary memberships" />
                  <div className="flex gap-4">
                    {secondaryMembers.map((member, index) => (
                      <div
                        key={member.name}
                        className="flex h-[72px] w-[150px] items-center justify-between rounded-lg border border-[#e1e4eb] px-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 overflow-hidden rounded-full bg-[#d0d5dd]">
                            <img
                              src={index === 0 ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"}
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-[12px] font-medium text-[#4b5565]">{member.name}</div>
                            <div className="mt-1 flex items-center gap-1.5 text-[10px] font-medium">
                              <Link href="#" className="text-[#3c68c5] hover:underline">
                                Edit
                              </Link>
                              <span className="text-[#c4c9d4]">|</span>
                              <Link href="#" className="text-[#3c68c5] hover:underline">
                                Remove
                              </Link>
                            </div>
                          </div>
                        </div>
                        <CircleHelp className="h-3.5 w-3.5 self-start text-[#f1a11e]" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="border-t border-[#dde1ea] px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="h-9 rounded-md border-[#8aa8e9] px-4 text-[12px] text-[#3c68c5] hover:bg-[#eef4ff]"
                    >
                      <House className="mr-1.5 h-3.5 w-3.5" />
                      Go back home
                    </Button>
                    <Button
                      variant="outline"
                      className="h-9 rounded-md border-[#8aa8e9] px-5 text-[12px] text-[#3c68c5] hover:bg-[#eef4ff]"
                    >
                      Save changes
                    </Button>
                  </div>

                  <Button className="h-10 min-w-[94px] rounded-md bg-[#273f83] px-6 text-[12px] text-white hover:bg-[#1f3267]">
                    Payment
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>

        <div className="fixed right-4 top-[118px] rounded-xl bg-[#1d2f6b] p-3 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#273f83] text-white">
            <PencilLine className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
