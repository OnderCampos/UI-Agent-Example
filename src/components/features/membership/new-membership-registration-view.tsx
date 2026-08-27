"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  ChevronDown,
  Circle,
  Globe,
  Home,
  Info,
  Languages,
  MapPin,
  Pencil,
  Phone,
  Trash2,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const personalFields = [
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

const contactRows = [
  { label: "Email address *", value: "Customer declined to provide email address", full: true },
  {
    label: "Mobile phone number *",
    value: "+502 1234 5678",
    trailing: <Info className="h-3.5 w-3.5 text-[#f5a623]" />,
  },
  {
    label: "Home phone number *",
    value: "+502 2345 6789",
  },
  {
    label: "Notifications",
    value: "By email address",
  },
];

const addressFields = [
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
    <div className="mb-5 flex items-center gap-2 text-[#243b7a]">
      <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
      <h2 className="text-[15px] font-medium">{title}</h2>
    </div>
  );
}

function DetailCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium text-[#5d6884]">{label}</p>
      <p className="text-[13px] text-[#243b7a]">{value}</p>
    </div>
  );
}

export function NewMembershipRegistrationView() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#243b7a]">
      <header>
        <div className="bg-[#19336f] text-white">
          <div className="mx-auto flex h-[43px] max-w-[1360px] items-center justify-between px-7">
            <div className="text-[25px] font-bold tracking-tight">
              Price<span className="text-[#ef6a2e]">Smart</span>
            </div>
            <div className="flex items-center gap-6 text-[12px] text-white/95">
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
        </div>
        <div className="h-[26px] bg-[#0d57c6]" />
      </header>

      <div className="mx-auto max-w-[1360px] px-10 pb-8 pt-4">
        <div className="rounded-sm bg-white shadow-[0_0_0_1px_rgba(25,51,111,0.04)]">
          <div className="flex border-b border-[#d9dde8] px-8 py-5">
            <div className="flex-1">
              <h1 className="text-[20px] font-medium">New membership</h1>
            </div>
            <Button
              variant="outline"
              className="h-8 rounded-md border-[#7aa3e8] px-4 text-[11px] font-semibold text-[#3b6dc6] hover:bg-[#f3f7ff]"
            >
              Capture Member ID
            </Button>
          </div>

          <div className="flex min-h-[720px]">
            <aside className="w-[170px] border-r border-[#d9dde8] px-6 py-5">
              <div className="space-y-4">
                <div className="flex items-start gap-2.5">
                  <Circle className="mt-0.5 h-4 w-4 fill-[#1f2f5d] text-[#1f2f5d]" />
                  <div>
                    <p className="text-[12px] font-semibold text-[#1f2f5d]">Membership data</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 opacity-35">
                  <Circle className="mt-0.5 h-4 w-4 text-[#7e879d]" />
                  <div>
                    <p className="text-[12px] font-medium text-[#7e879d]">Payment</p>
                  </div>
                </div>
              </div>
            </aside>

            <main className="flex-1 px-8 py-5">
              <SectionTitle icon={UserRound} title="Personal data" />

              <div className="flex gap-8">
                <div className="w-[110px] shrink-0 text-center">
                  <div className="mx-auto h-[94px] w-[94px] overflow-hidden rounded-full bg-[#e5e5e5]">
                    <Image
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                      alt="Member portrait"
                      width={94}
                      height={94}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-[#4a84e2]">
                    <Camera className="h-3 w-3" />
                    Change picture
                  </button>
                </div>

                <div className="grid flex-1 gap-x-10 gap-y-7 md:grid-cols-3">
                  {personalFields.flat().map((field) => (
                    <DetailCell key={field.label} label={field.label} value={field.value} />
                  ))}
                </div>
              </div>

              <Separator className="my-7 bg-[#d9dde8]" />

              <SectionTitle icon={Phone} title="Contact" />
              <div className="grid grid-cols-2 gap-x-12 gap-y-7">
                {contactRows.map((item) => (
                  <div key={item.label} className={item.full ? "col-span-2" : "space-y-1.5"}>
                    <p className="text-[11px] font-medium text-[#5d6884]">{item.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] text-[#243b7a]">{item.value}</p>
                      {item.trailing}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-7 bg-[#d9dde8]" />

              <SectionTitle icon={Home} title="Address" />
              <div className="grid gap-x-10 gap-y-7 md:grid-cols-4">
                {addressFields.map((field) => (
                  <DetailCell key={field.label} label={field.label} value={field.value} />
                ))}
              </div>

              <Separator className="my-7 bg-[#d9dde8]" />

              <SectionTitle icon={UsersRound} title="Secondary memberships" />
              <div className="flex gap-4">
                {secondaryMembers.map((member, index) => (
                  <div
                    key={member.name}
                    className="flex min-w-[150px] items-center justify-between rounded-lg border border-[#e1e5ef] bg-white px-3 py-2 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 overflow-hidden rounded-full bg-[#d9d9d9]">
                        <Image
                          src={index === 0 ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"}
                          alt={member.name}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#42506f]">{member.name}</p>
                        <div className="mt-0.5 flex gap-2 text-[10px] font-medium text-[#4a84e2]">
                          <button className="inline-flex items-center gap-1">
                            <Pencil className="h-3 w-3" />
                            Edit
                          </button>
                          <button className="inline-flex items-center gap-1 text-[#db6a6a]">
                            <Trash2 className="h-3 w-3" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <Info className="h-3.5 w-3.5 text-[#f5a623]" />
                  </div>
                ))}
              </div>
            </main>
          </div>

          <div className="flex items-center justify-between border-t border-[#d9dde8] px-8 py-4">
            <div className="flex gap-4">
              <Button
                variant="outline"
                asChild
                className="h-9 rounded-md border-[#86a7df] px-5 text-[12px] font-semibold text-[#3b6dc6] hover:bg-[#f3f7ff]"
              >
                <Link href="/">
                  <Home className="h-3.5 w-3.5" />
                  Go back home
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-9 rounded-md border-[#86a7df] px-5 text-[12px] font-semibold text-[#3b6dc6] hover:bg-[#f3f7ff]"
              >
                Save changes
              </Button>
            </div>
            <Button className="h-9 rounded-md bg-[#223c7a] px-10 text-[12px] font-semibold text-white hover:bg-[#1a2f61]">
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
