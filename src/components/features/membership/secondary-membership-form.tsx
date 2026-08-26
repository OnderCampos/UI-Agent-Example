import Link from "next/link";
import {
  CalendarDays,
  Camera,
  ChevronDown,
  FolderOpen,
  Globe,
  Home,
  MapPin,
  MonitorSmartphone,
  Phone,
  Smartphone,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function TopBar() {
  return (
    <>
      <div className="bg-[#172a66] text-white">
        <div className="mx-auto flex h-[42px] max-w-[1280px] items-center justify-between px-7 text-[12px]">
          <div className="text-[23px] font-bold tracking-[-0.03em]">
            Price<span className="text-[#ef6a2f]">Smart</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-white/95">
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
              <span>English</span>
              <ChevronDown className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[28px] bg-[#1d4fd0]" />
    </>
  );
}

function SectionHeading({ icon: Icon, title, muted = false }: { icon: typeof User; title: string; muted?: boolean }) {
  return (
    <div className={`mb-4 flex items-center gap-2 ${muted ? "text-[#cfcfd6]" : "text-[#334b86]"}`}>
      <Icon className="h-4 w-4" strokeWidth={1.8} />
      <h2 className="text-[28px] font-medium tracking-[-0.02em] md:text-[16px]">{title}</h2>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-[10px] font-semibold text-[#5d6880]">{children}</label>;
}

function SelectField({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative">
      <select className="h-[32px] w-full appearance-none rounded-[5px] border border-[#d7dde7] bg-white px-3 pr-8 text-[11px] text-[#7a8395] outline-none">
        <option>{placeholder}</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#7d8698]" />
    </div>
  );
}

function SendCodeRow({ placeholder, checkboxLabel }: { placeholder: string; checkboxLabel: string }) {
  return (
    <div className="grid gap-3 md:grid-cols-[150px_94px_1fr] md:items-center">
      <Input
        placeholder={placeholder}
        className="h-[32px] rounded-[5px] border-[#d7dde7] px-3 text-[11px] placeholder:text-[#9aa2b1] focus-visible:ring-1"
      />
      <Button
        variant="outline"
        className="h-[32px] rounded-[5px] border-[#e2e6ed] bg-[#f8f9fb] px-3 text-[11px] font-semibold text-[#a9b0bf] hover:bg-[#f8f9fb] hover:text-[#a9b0bf]"
      >
        Send code
      </Button>
      <label className="flex items-center gap-2 text-[11px] font-medium text-[#556074]">
        <Checkbox className="h-3.5 w-3.5 rounded-[3px] border-[#d9dee8] data-[state=checked]:bg-[#334b86] data-[state=checked]:text-white" />
        <span>{checkboxLabel}</span>
      </label>
    </div>
  );
}

export function SecondaryMembershipForm() {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#24314d]">
      <TopBar />

      <div className="mx-auto max-w-[1280px] px-10 pb-5 pt-14">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-[21px] font-medium tracking-[-0.02em] text-[#314375]">Nicolas Treviño</h1>
            <p className="mt-1 text-[13px] text-[#5f6882]">Primary membership</p>
            <h2 className="mt-9 text-[18px] font-medium text-[#334b86]">New secondary membership</h2>
          </div>
          <Button
            variant="outline"
            className="mt-10 h-[30px] rounded-[6px] border-[#91b0ed] px-3 text-[11px] font-medium text-[#3d72d3] hover:bg-[#eef4ff] hover:text-[#3d72d3]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="rounded-[2px] border border-[#dde2eb] bg-[#f7f8fa]">
          <div className="grid min-h-[560px] grid-cols-[110px_1fr]">
            <aside className="border-r border-[#dde2eb] px-4 py-6">
              <div className="flex items-start gap-2 text-[10px] font-semibold text-[#33415f]">
                <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#33415f] text-[9px] text-white">1</span>
                <span>Membership data</span>
              </div>
            </aside>

            <div className="px-5 py-6">
              <SectionHeading icon={FolderOpen} title="Personal data" />

              <div className="grid gap-6 md:grid-cols-[90px_1fr]">
                <div className="flex flex-col items-center">
                  <div className="h-[96px] w-[96px] rounded-full bg-[#cfd4de]" />
                  <button className="mt-3 text-[10px] font-medium text-[#4a82de]">Take photo</button>
                </div>

                <div className="grid gap-x-4 gap-y-3 md:grid-cols-3">
                  <div>
                    <FieldLabel>ID Type *</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                  <div>
                    <FieldLabel>ID Number *</FieldLabel>
                    <Input placeholder="Enter ID number" className="h-[32px] rounded-[5px] border-[#d7dde7] px-3 text-[11px] placeholder:text-[#9aa2b1] focus-visible:ring-1" />
                  </div>
                  <div>
                    <FieldLabel>Membership type *</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                  <div>
                    <FieldLabel>Abbreviation</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                  <div>
                    <FieldLabel>First Name *</FieldLabel>
                    <Input placeholder="Enter first name" className="h-[32px] rounded-[5px] border-[#d7dde7] px-3 text-[11px] placeholder:text-[#9aa2b1] focus-visible:ring-1" />
                  </div>
                  <div>
                    <FieldLabel>Last Name *</FieldLabel>
                    <Input placeholder="Enter last name" className="h-[32px] rounded-[5px] border-[#d7dde7] px-3 text-[11px] placeholder:text-[#9aa2b1] focus-visible:ring-1" />
                  </div>
                  <div>
                    <FieldLabel>Gender</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                  <div>
                    <FieldLabel>Date of birth *</FieldLabel>
                    <div className="relative">
                      <Input placeholder="Select" className="h-[32px] rounded-[5px] border-[#d7dde7] px-3 pr-8 text-[11px] placeholder:text-[#7a8395] focus-visible:ring-1" />
                      <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8790a2]" />
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Occupation</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                </div>
              </div>

              <Separator className="my-5 bg-[#e2e6ed]" />

              <section>
                <SectionHeading icon={Phone} title="Contact" muted />
                <div className="space-y-4">
                  <div>
                    <FieldLabel>Email address *</FieldLabel>
                    <SendCodeRow placeholder="Enter your email address" checkboxLabel="Customer declines to provide email address" />
                  </div>
                  <div>
                    <FieldLabel>Mobile phone number *</FieldLabel>
                    <SendCodeRow placeholder="Enter your phone number" checkboxLabel="Customer declines to provide mobile phone number" />
                  </div>
                  <div className="grid gap-3 md:grid-cols-[150px_94px] md:gap-4">
                    <div>
                      <FieldLabel>Home phone number</FieldLabel>
                      <Input placeholder="Enter your home phone number" className="h-[32px] rounded-[5px] border-[#d7dde7] px-3 text-[11px] placeholder:text-[#9aa2b1] focus-visible:ring-1" />
                    </div>
                    <div>
                      <FieldLabel>Notifications</FieldLabel>
                      <SelectField placeholder="Select" />
                    </div>
                  </div>
                </div>
              </section>

              <Separator className="my-5 bg-[#e2e6ed]" />

              <section>
                <SectionHeading icon={Home} title="Address" muted />
                <label className="mb-4 flex items-center gap-2 text-[11px] font-medium text-[#556074]">
                  <Checkbox className="h-3.5 w-3.5 rounded-[3px] border-[#d9dee8] data-[state=checked]:bg-[#334b86] data-[state=checked]:text-white" />
                  <span>Same address as primary member</span>
                </label>

                <div className="grid gap-3 md:grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr]">
                  <div>
                    <FieldLabel>Address *</FieldLabel>
                    <Input placeholder="Enter your address" className="h-[32px] rounded-[5px] border-[#d7dde7] px-3 text-[11px] placeholder:text-[#9aa2b1] focus-visible:ring-1" />
                  </div>
                  <div>
                    <FieldLabel>Country</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                  <div>
                    <FieldLabel>State</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                  <div>
                    <FieldLabel>City</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#dde2eb] bg-[#f7f8fa] px-5 py-4">
            <div className="flex gap-4">
              <Button
                variant="outline"
                asChild
                className="h-[34px] rounded-[6px] border-[#8fb0ee] px-4 text-[12px] font-medium text-[#3a71d1] hover:bg-[#eef4ff] hover:text-[#3a71d1]"
              >
                <Link href="/">
                  <Home className="h-3.5 w-3.5" />
                  Go back home
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-[34px] rounded-[6px] border-[#8fb0ee] px-5 text-[12px] font-medium text-[#3a71d1] hover:bg-[#eef4ff] hover:text-[#3a71d1]"
              >
                Save changes
              </Button>
            </div>

            <div className="flex gap-4">
              <Button className="h-[34px] min-w-[96px] rounded-[6px] bg-[#e84f2d] px-5 text-[12px] font-semibold text-white hover:bg-[#d84525]">
                Previous
              </Button>
              <Button disabled className="h-[34px] min-w-[96px] rounded-[6px] bg-[#e7e9ee] px-5 text-[12px] font-semibold text-[#9ca5b5] hover:bg-[#e7e9ee]">
                Add member
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed right-4 top-[102px] rounded-[12px] bg-[#263d80] p-2 shadow-[0_8px_20px_rgba(24,37,78,0.25)]">
        <button className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#20346f] text-white">
          <Smartphone className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
