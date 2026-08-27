import { CalendarDays, Camera, ChevronDown, Globe, MapPin, Phone, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

function TopBar() {
  return (
    <div className="bg-[#173579] text-white">
      <div className="mx-auto flex h-[44px] max-w-[1440px] items-center justify-between px-[58px] text-[12px]">
        <div className="text-[18px] font-semibold tracking-[-0.03em]">
          Price<span className="text-[#f26c28]">Smart</span>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-white/95">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>Miraflores</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px]">🌐</span>
            <span>Guatemala</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            <span>English</span>
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>
      </div>
      <div className="h-[26px] bg-[#1f49b8]" />
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-[11px] font-medium text-[#4b556f]">{children}</label>;
}

function SelectField({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex h-32 items-center justify-between rounded-md border border-[#d9dee8] bg-white px-3 text-[12px] text-[#8a93a8] shadow-[0_1px_1px_rgba(15,23,42,0.02)]" style={{ height: 32 }}>
      <span>{placeholder}</span>
      <ChevronDown className="h-4 w-4 text-[#7f8799]" />
    </div>
  );
}

function SectionHeader({ icon, title, muted = false }: { icon: React.ReactNode; title: string; muted?: boolean }) {
  return (
    <div className={`mb-5 flex items-center gap-2 ${muted ? "text-[#c7ccd7]" : "text-[#334d87]"}`}>
      {icon}
      <h2 className="text-[15px] font-medium">{title}</h2>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="w-[126px] border-r border-[#e6e8ee] pr-4 pt-1">
      <div className="flex items-center gap-2 text-[10px] font-semibold text-[#3d4d74]">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#233e7e] text-[9px] text-white">1</span>
        <span>Membership data</span>
      </div>
    </aside>
  );
}

function CheckboxRow({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 text-[12px] text-[#5d667c]">
      <Checkbox className="h-4 w-4 rounded-[4px] border-[#d8dce6] data-[state=checked]:border-[#23417f] data-[state=checked]:bg-[#23417f]" />
      <span>{label}</span>
    </label>
  );
}

export function NewSecondaryMembershipForm() {
  return (
    <div className="min-h-screen bg-[#f5f6fa] text-slate-900">
      <TopBar />

      <div className="mx-auto max-w-[1440px] px-[42px] py-[14px]">
        <div className="rounded-sm border border-[#eceef2] bg-[#f8f9fc] px-4 pb-4 pt-3 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[16px] font-medium text-[#304b88]">Nicolas Treviño</h1>
              <p className="mt-1 text-[12px] text-[#5f6981]">Primary membership</p>
              <h2 className="mt-7 text-[15px] font-medium text-[#304b88]">New secondary membership</h2>
            </div>

            <div className="mt-[28px] flex items-center gap-5">
              <Button
                variant="outline"
                className="h-[28px] rounded-md border-[#7ea3ea] bg-white px-4 text-[10px] font-medium text-[#3d6dcb] hover:bg-[#f3f7ff] hover:text-[#3d6dcb]"
              >
                Capture Member ID
              </Button>
              <button
                type="button"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#1f3573] text-white shadow-[0_8px_20px_rgba(24,50,116,0.25)]"
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-5">
            <Sidebar />

            <main className="flex-1 pr-3">
              <SectionHeader icon={<span className="text-[15px]">📁</span>} title="Personal data" />

              <div className="grid grid-cols-[90px_1fr] gap-5 border-b border-[#e3e6ed] pb-5">
                <div className="flex flex-col items-center">
                  <div className="h-[86px] w-[86px] rounded-full bg-[#c8ced9]" />
                  <button type="button" className="mt-3 flex items-center gap-1 text-[10px] font-medium text-[#4a7bdd]">
                    <Camera className="h-3 w-3" />
                    Take photo
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-x-16 gap-y-3">
                  <div>
                    <FieldLabel>ID Type *</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                  <div>
                    <FieldLabel>ID Number *</FieldLabel>
                    <Input placeholder="Enter ID number" className="h-8 border-[#d9dee8] bg-white text-[12px] placeholder:text-[#99a1b2] focus-visible:ring-1 focus-visible:ring-[#3058b5] focus-visible:ring-offset-0" />
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
                    <Input placeholder="Enter first name" className="h-8 border-[#d9dee8] bg-white text-[12px] placeholder:text-[#99a1b2] focus-visible:ring-1 focus-visible:ring-[#3058b5] focus-visible:ring-offset-0" />
                  </div>
                  <div>
                    <FieldLabel>Last Name *</FieldLabel>
                    <Input placeholder="Enter last name" className="h-8 border-[#d9dee8] bg-white text-[12px] placeholder:text-[#99a1b2] focus-visible:ring-1 focus-visible:ring-[#3058b5] focus-visible:ring-offset-0" />
                  </div>
                  <div>
                    <FieldLabel>Gender</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                  <div>
                    <FieldLabel>Date of birth *</FieldLabel>
                    <div className="relative">
                      <Input placeholder="Select" className="h-8 border-[#d9dee8] bg-white pr-8 text-[12px] placeholder:text-[#99a1b2] focus-visible:ring-1 focus-visible:ring-[#3058b5] focus-visible:ring-offset-0" />
                      <CalendarDays className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a1a8b8]" />
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Occupation</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                </div>
              </div>

              <section className="border-b border-[#e3e6ed] py-5">
                <SectionHeader icon={<Phone className="h-4 w-4" strokeWidth={1.8} />} title="Contact" muted />
                <div className="grid grid-cols-[1fr_94px_1fr] gap-x-5 gap-y-4">
                  <div>
                    <FieldLabel>Email address *</FieldLabel>
                    <Input placeholder="Enter your email address" className="h-8 border-[#d9dee8] bg-white text-[12px] placeholder:text-[#99a1b2] focus-visible:ring-1 focus-visible:ring-[#3058b5] focus-visible:ring-offset-0" />
                  </div>
                  <div className="pt-[20px]">
                    <Button variant="outline" className="h-8 w-full rounded-md border-[#e1e4eb] bg-[#f9fafc] px-0 text-[11px] font-medium text-[#b8becb] hover:bg-[#f9fafc] hover:text-[#b8becb]">
                      Send code
                    </Button>
                  </div>
                  <div className="pt-[24px]">
                    <CheckboxRow label="Customer declines to provide email address" />
                  </div>

                  <div>
                    <FieldLabel>Mobile phone number *</FieldLabel>
                    <Input placeholder="Enter your phone number" className="h-8 border-[#d9dee8] bg-white text-[12px] placeholder:text-[#99a1b2] focus-visible:ring-1 focus-visible:ring-[#3058b5] focus-visible:ring-offset-0" />
                  </div>
                  <div className="pt-[20px]">
                    <Button variant="outline" className="h-8 w-full rounded-md border-[#e1e4eb] bg-[#f9fafc] px-0 text-[11px] font-medium text-[#b8becb] hover:bg-[#f9fafc] hover:text-[#b8becb]">
                      Send code
                    </Button>
                  </div>
                  <div className="pt-[24px]">
                    <CheckboxRow label="Customer declines to provide mobile phone number" />
                  </div>

                  <div>
                    <FieldLabel>Home phone number</FieldLabel>
                    <Input placeholder="Enter your home phone number" className="h-8 border-[#d9dee8] bg-white text-[12px] placeholder:text-[#99a1b2] focus-visible:ring-1 focus-visible:ring-[#3058b5] focus-visible:ring-offset-0" />
                  </div>
                  <div>
                    <FieldLabel>Notifications</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                </div>
              </section>

              <section className="py-5">
                <SectionHeader icon={<MapPin className="h-4 w-4" strokeWidth={1.8} />} title="Address" muted />
                <div className="mb-4">
                  <CheckboxRow label="Same address as primary member" />
                </div>
                <div className="grid grid-cols-[1.45fr_0.7fr_0.65fr_0.65fr] gap-x-5 gap-y-3">
                  <div>
                    <FieldLabel>Address *</FieldLabel>
                    <Input placeholder="Enter your address" className="h-8 border-[#d9dee8] bg-white text-[12px] placeholder:text-[#99a1b2] focus-visible:ring-1 focus-visible:ring-[#3058b5] focus-visible:ring-offset-0" />
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
            </main>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-[#e3e6ed] pt-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="h-9 rounded-md border-[#7ea3ea] bg-white px-5 text-[12px] font-medium text-[#4070c8] hover:bg-[#f3f7ff] hover:text-[#4070c8]">
                Go back home
              </Button>
              <Button variant="outline" className="h-9 rounded-md border-[#7ea3ea] bg-white px-5 text-[12px] font-medium text-[#4070c8] hover:bg-[#f3f7ff] hover:text-[#4070c8]">
                Save changes
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button className="h-9 min-w-[92px] rounded-md bg-[#e4552e] px-6 text-[12px] font-medium text-white hover:bg-[#d84c27]">
                Previous
              </Button>
              <Button disabled className="h-9 min-w-[102px] rounded-md bg-[#e8eaef] px-6 text-[12px] font-medium text-[#a9b0bf] hover:bg-[#e8eaef]">
                Add member
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
