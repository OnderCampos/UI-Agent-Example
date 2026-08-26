import Link from "next/link";
import {
  Camera,
  ChevronLeft,
  Circle,
  FolderOpen,
  MapPin,
  Phone,
  Smartphone,
  UserRound,
  UsersRound,
  AlertCircle,
  Pencil,
  Trash2,
  CreditCard,
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

const addressData = [
  { label: "Address*", value: "Km 46.5 Salida A Ciudad Vieja" },
  { label: "Country", value: "Guatemala" },
  { label: "State", value: "Antigua" },
  { label: "City", value: "Sacatepequez" },
];

const secondaryMembers = [
  { name: "Mayra Treviño", image: "MT" },
  { name: "Pablo Treviño", image: "PT" },
];

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
      <p className="text-[13px] text-slate-700">{value}</p>
    </div>
  );
}

function SectionHeader({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[#2a3f7a]">
      <Icon className="h-4 w-4" />
      <h2 className="text-[15px] font-medium">{title}</h2>
    </div>
  );
}

function SecondaryMemberCard({ name, image }: { name: string; image: string }) {
  return (
    <div className="flex min-w-[150px] items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm shadow-slate-100/50">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e7edf8] text-[10px] font-semibold text-[#2a3f7a]">
          {image}
        </div>
        <div>
          <p className="text-[12px] font-medium text-slate-700">{name}</p>
          <div className="mt-0.5 flex items-center gap-2 text-[11px]">
            <button className="text-[#3b78dd] hover:underline">Edit</button>
            <span className="text-slate-300">|</span>
            <button className="text-[#d66b4a] hover:underline">Remove</button>
          </div>
        </div>
      </div>
      <AlertCircle className="h-3.5 w-3.5 text-[#f0a327]" />
    </div>
  );
}

export function MembershipRegistrationView() {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-800">
      <div className="mx-auto max-w-[1360px] px-5 pb-8 pt-5 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-[22px] font-medium text-[#2f4678]">New membership</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="h-9 rounded-md border-[#7ea5e6] px-4 text-[12px] font-medium text-[#4c7dd9] hover:bg-[#eef4ff] hover:text-[#3b78dd]"
            >
              Capture Member ID
            </Button>
            <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1f3774] text-white shadow-lg shadow-[#1f3774]/20">
              <CreditCard className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
          <div className="grid min-h-[720px] grid-cols-1 md:grid-cols-[92px_1fr]">
            <aside className="border-r border-slate-200 bg-[#f8f9fb] px-4 py-7">
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#243e7b] text-[10px] font-semibold text-white">
                    1
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#243e7b]">Membership data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 opacity-40">
                  <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] font-semibold text-slate-400">
                    2
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-slate-500">Payment</p>
                  </div>
                </div>
              </div>
            </aside>

            <section className="flex flex-col">
              <div className="flex-1 px-5 py-6 md:px-8 md:py-7">
                <SectionHeader icon={FolderOpen} title="Personal data" />

                <div className="grid gap-6 border-b border-slate-200 pb-7 md:grid-cols-[170px_1fr]">
                  <div className="flex flex-col items-center pt-2">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-b from-slate-200 to-slate-300">
                      <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                        <UserRound className="h-12 w-12" />
                      </div>
                    </div>
                    <button className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-[#3b78dd] hover:underline">
                      <Camera className="h-3 w-3" />
                      Change picture
                    </button>
                  </div>

                  <div className="grid gap-y-6 md:grid-cols-3 md:gap-x-8">
                    {personalData.map((item) => (
                      <DetailItem key={item.label} label={item.label} value={item.value} />
                    ))}
                  </div>
                </div>

                <div className="border-b border-slate-200 py-7">
                  <SectionHeader icon={Phone} title="Contact" />
                  <div className="grid gap-y-6 md:grid-cols-3 md:gap-x-8">
                    <div className="space-y-1.5 md:col-span-3">
                      <p className="text-[11px] font-medium text-slate-500">Email address *</p>
                      <p className="text-[13px] text-slate-700">Customer declined to provide email address</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-medium text-slate-500">Mobile phone number *</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] text-slate-700">+502 1234 5678</p>
                        <AlertCircle className="h-3.5 w-3.5 text-[#f0a327]" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-medium text-slate-500">Home phone number *</p>
                      <p className="text-[13px] text-slate-700">+502 2345 6789</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-medium text-slate-500">Notifications</p>
                      <p className="text-[13px] text-slate-700">By email address</p>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-200 py-7">
                  <SectionHeader icon={MapPin} title="Address" />
                  <div className="grid gap-y-6 md:grid-cols-4 md:gap-x-8">
                    {addressData.map((item) => (
                      <DetailItem key={item.label} label={item.label} value={item.value} />
                    ))}
                  </div>
                </div>

                <div className="py-7">
                  <SectionHeader icon={UsersRound} title="Secondary memberships" />
                  <div className="flex flex-wrap gap-4">
                    {secondaryMembers.map((member) => (
                      <SecondaryMemberCard key={member.name} {...member} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="h-9 rounded-md border-[#8ab0ea] px-4 text-[12px] font-medium text-[#3b78dd] hover:bg-[#eef4ff] hover:text-[#3b78dd]"
                    asChild
                  >
                    <Link href="#">
                      <ChevronLeft className="h-4 w-4" />
                      Go back home
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-9 rounded-md border-[#8ab0ea] px-5 text-[12px] font-medium text-[#3b78dd] hover:bg-[#eef4ff] hover:text-[#3b78dd]"
                  >
                    Save changes
                  </Button>
                </div>
                <Button className="h-9 min-w-[124px] rounded-md bg-[#243e7b] px-6 text-[12px] font-semibold text-white hover:bg-[#1d3264]">
                  Payment
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
