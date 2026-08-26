import Link from "next/link";
import {
  BadgeCheck,
  Circle,
  Folder,
  House,
  Info,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const personalData = [
  [
    { label: "ID Type", value: "DNI" },
    { label: "ID Number", value: "IDGTM1234567890123S0123" },
    { label: "Membership Type", value: "Diamond" },
  ],
  [
    { label: "Abbreviation", value: "Mr." },
    { label: "First Name", value: "Nicolás" },
    { label: "Last Name", value: "Treviño" },
  ],
  [
    { label: "Gender", value: "Male" },
    { label: "Date of birth", value: "13/09/1978" },
    { label: "Occupation", value: "Urban planner" },
  ],
];

const contactData = [
  [
    { label: "Email address *", value: "Customer declined to provide email address" },
  ],
  [
    { label: "Mobile phone number *", value: "+502 1234 5678", trailingIcon: true },
    { label: "", value: "" },
  ],
  [
    { label: "Home phone number *", value: "+502 2345 6789" },
    { label: "Notifications", value: "By email address" },
  ],
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

function SectionTitle({ icon: Icon, title }: { icon: typeof UserRound; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[14px] font-medium text-[#243f84]">
      <Icon className="h-4 w-4" strokeWidth={1.9} />
      <h2>{title}</h2>
    </div>
  );
}

function DataBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-h-[48px] space-y-2">
      <p className="text-[11px] font-medium text-[#51617f]">{label}</p>
      <p className="text-[13px] text-[#24324d]">{value}</p>
    </div>
  );
}

export function NewMembershipRegistration() {
  return (
    <div className="min-h-screen bg-white text-[#24324d]">
      <div className="h-[27px] bg-[#1f4fb7]" />

      <div className="mx-auto max-w-[1180px] px-10 pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-[22px] font-medium tracking-[0.01em] text-[#243f84]">
            New membership
          </h1>
          <Button
            variant="outline"
            className="h-9 rounded-md border-[#8fb1ea] px-4 text-[12px] font-medium text-[#2f67d4] hover:bg-[#f3f7ff]"
          >
            Capture Member ID
          </Button>
        </div>

        <Card className="overflow-hidden rounded-none border-[#e4e7ef] shadow-none">
          <div className="flex min-h-[760px]">
            <aside className="w-[182px] shrink-0 border-r border-[#e4e7ef] bg-[#fafbfc] px-6 py-8">
              <div className="space-y-5 text-[12px]">
                <div className="flex items-start gap-3 text-[#24324d]">
                  <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#24324d] text-[10px] font-semibold text-white">
                    1
                  </span>
                  <span className="font-semibold">Membership data</span>
                </div>
                <div className="flex items-start gap-3 text-[#c2c8d6]">
                  <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#eef1f6] text-[10px] font-semibold text-[#aeb8ca]">
                    2
                  </span>
                  <span>Payment</span>
                </div>
              </div>
            </aside>

            <section className="flex-1 px-6 py-7">
              <SectionTitle icon={Folder} title="Personal data" />

              <div className="grid grid-cols-[90px_1fr] gap-8">
                <div className="pt-1 text-center">
                  <div className="mx-auto h-[94px] w-[94px] overflow-hidden rounded-full bg-[#d9d9d9]">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                      alt="Member portrait"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button className="mt-3 text-[10px] font-medium text-[#4d84ea]">
                    Change picture
                  </button>
                </div>

                <div className="space-y-7">
                  {personalData.map((row, index) => (
                    <div key={index} className="grid grid-cols-3 gap-x-8 gap-y-4">
                      {row.map((item) => (
                        <DataBlock key={`${item.label}-${item.value}`} label={item.label} value={item.value} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-8 bg-[#e4e7ef]" />

              <SectionTitle icon={Phone} title="Contact" />
              <div className="space-y-7">
                {contactData.map((row, index) => (
                  <div key={index} className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {row.map((item, itemIndex) => (
                      <div key={`${item.label}-${itemIndex}`} className="min-h-[48px] space-y-2">
                        {item.label ? <p className="text-[11px] font-medium text-[#51617f]">{item.label}</p> : <div className="h-[14px]" />}
                        <div className="flex items-center gap-2 text-[13px] text-[#24324d]">
                          <span>{item.value}</span>
                          {item.trailingIcon ? <Info className="h-3.5 w-3.5 text-[#f0a326]" /> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <Separator className="my-8 bg-[#e4e7ef]" />

              <SectionTitle icon={House} title="Address" />
              <div className="grid grid-cols-4 gap-x-8 gap-y-4">
                {addressData.map((item) => (
                  <DataBlock key={item.label} label={item.label} value={item.value} />
                ))}
              </div>

              <Separator className="my-8 bg-[#e4e7ef]" />

              <SectionTitle icon={BadgeCheck} title="Secondary memberships" />
              <div className="flex gap-4">
                {secondaryMembers.map((member, index) => (
                  <div
                    key={member.name}
                    className="flex w-[150px] items-center gap-3 rounded-lg border border-[#e4e7ef] bg-white px-3 py-3"
                  >
                    <div className="h-7 w-7 overflow-hidden rounded-full bg-[#d9d9d9]">
                      <img
                        src={index === 0 ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80"}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-medium text-[#24324d]">{member.name}</p>
                      <div className="mt-0.5 flex gap-2 text-[10px] font-medium text-[#3d6fd3]">
                        <button>Edit</button>
                        <span className="text-[#8ba0cf]">|</span>
                        <button className="text-[#6e788f]">Remove</button>
                      </div>
                    </div>
                    <Info className="h-3.5 w-3.5 shrink-0 text-[#f0a326]" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="flex items-center justify-between border-t border-[#e4e7ef] px-6 py-4">
            <div className="flex gap-4">
              <Button asChild variant="outline" className="h-9 rounded-md border-[#8fb1ea] px-4 text-[12px] font-medium text-[#2f67d4] hover:bg-[#f3f7ff]">
                <Link href="/">
                  <MapPin className="h-3.5 w-3.5" />
                  Go back home
                </Link>
              </Button>
              <Button variant="outline" className="h-9 rounded-md border-[#8fb1ea] px-5 text-[12px] font-medium text-[#2f67d4] hover:bg-[#f3f7ff]">
                Save changes
              </Button>
            </div>

            <Button className="h-9 rounded-md bg-[#243f84] px-8 text-[12px] font-semibold text-white hover:bg-[#1a3167]">
              Payment
            </Button>
          </div>
        </Card>

        <div className="fixed right-5 top-[185px] flex h-[58px] w-[46px] items-center justify-center rounded-xl bg-[#243f84] shadow-[0_8px_20px_rgba(36,63,132,0.28)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1d2f68]">
            <Circle className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
