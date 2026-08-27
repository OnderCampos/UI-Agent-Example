import {
  CalendarDays,
  ChevronDown,
  Circle,
  FolderOpen,
  Globe,
  Home,
  MapPin,
  MonitorSmartphone,
  Phone,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

function MembershipTopBar() {
  return (
    <header className="sticky top-0 z-10 shadow-sm">
      <div className="bg-[#172f6a] text-white">
        <div className="mx-auto flex h-[42px] max-w-[1280px] items-center justify-between px-8">
          <div className="text-[18px] font-semibold tracking-[-0.02em] text-white">
            Price<span className="text-[#ec5a29]">Smart</span>
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
              <Circle className="h-3.5 w-3.5 fill-white/10" />
              <span>English</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[28px] bg-[#1950d1]" />
    </header>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-[10px] font-medium text-[#4e5977]">{children}</label>;
}

function TextField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <Input
        placeholder={placeholder}
        className="h-[34px] rounded-[5px] border-[#d7dce6] bg-white px-3 text-[12px] text-[#334066] placeholder:text-[#9ca3b5] focus-visible:ring-[#2f65c9]/20"
      />
    </div>
  );
}

function SelectField({ label, placeholder, icon }: { label: string; placeholder: string; icon?: React.ReactNode }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <Input
          readOnly
          value={placeholder}
          className="h-[34px] rounded-[5px] border-[#d7dce6] bg-white px-3 pr-9 text-[12px] text-[#6d7690] focus-visible:ring-[#2f65c9]/20"
        />
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#8b93a9]">
          {icon ?? <ChevronDown className="h-4 w-4" />}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, muted = false }: { icon: typeof FolderOpen; title: string; muted?: boolean }) {
  return (
    <div className={`mb-5 flex items-center gap-2 text-[13px] font-medium ${muted ? "text-[#bcc1cd]" : "text-[#334b86]"}`}>
      <Icon className="h-4 w-4" strokeWidth={1.8} />
      <span>{title}</span>
    </div>
  );
}

function SidebarStep({ active, title, number }: { active: boolean; title: string; number: number }) {
  return (
    <div className={`flex items-start gap-3 text-[11px] ${active ? "font-semibold text-[#2a3c68]" : "text-[#b1b8c8]"}`}>
      <span
        className={`mt-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[9px] ${active ? "bg-[#23385f] text-white" : "bg-[#e8ecf4] text-[#97a2ba]"}`}
      >
        {number}
      </span>
      <span>{title}</span>
    </div>
  );
}

export function NewSecondaryMembershipFormView() {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#24324f]">
      <MembershipTopBar />

      <main className="mx-auto max-w-[1280px] px-10 pb-5 pt-4">
        <div className="rounded-[3px] bg-[#f5f6f8]">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-[18px] font-medium text-[#30457d]">Nicolas Treviño</h1>
              <p className="mt-1 text-[12px] text-[#4d5876]">Primary membership</p>
            </div>
            <div className="fixed right-5 top-[102px] flex h-[56px] w-[40px] items-center justify-center rounded-[10px] bg-[#1d3776] shadow-[0_10px_22px_rgba(26,58,119,0.28)]">
              <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-[#27448c] text-white">
                <MonitorSmartphone className="h-4 w-4" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-[#30457d]">New secondary membership</h2>
            <Button
              variant="outline"
              className="h-[31px] rounded-[6px] border-[#8db2ef] bg-white px-4 text-[11px] font-medium text-[#2f67ce] hover:bg-[#edf4ff] hover:text-[#2f67ce]"
            >
              Capture Member ID
            </Button>
          </div>

          <div className="overflow-hidden rounded-[3px] border border-[#ebeef4] bg-[#f5f6f8]">
            <div className="grid grid-cols-[94px_1fr]">
              <aside className="border-r border-[#dde2ea] pr-4 pt-2">
                <SidebarStep active number={1} title="Membership data" />
              </aside>

              <section className="bg-[#f5f6f8] pl-4 pr-6 pt-1">
                <SectionTitle icon={FolderOpen} title="Personal data" />

                <div className="grid grid-cols-[92px_1fr] gap-5 border-b border-[#e1e5ec] pb-5">
                  <div className="pt-5">
                    <div className="mx-auto h-[88px] w-[88px] rounded-full bg-[#cfd4de]" />
                    <button className="mt-3 w-full text-center text-[10px] font-medium text-[#4a84e3]">Take photo</button>
                  </div>

                  <div className="grid grid-cols-3 gap-x-16 gap-y-3">
                    <SelectField label="ID Type*" placeholder="Select" />
                    <TextField label="ID Number *" placeholder="Enter ID number" />
                    <SelectField label="Membership type *" placeholder="Select" />
                    <SelectField label="Abbreviation" placeholder="Select" />
                    <TextField label="First Name *" placeholder="Enter first name" />
                    <TextField label="Last Name *" placeholder="Enter last name" />
                    <SelectField label="Gender" placeholder="Select" />
                    <SelectField label="Date of birth *" placeholder="Select" icon={<CalendarDays className="h-4 w-4" />} />
                    <SelectField label="Occupation" placeholder="Select" />
                  </div>
                </div>

                <div className="border-b border-[#e1e5ec] py-5">
                  <SectionTitle icon={Phone} title="Contact" muted />
                  <div className="grid grid-cols-[1fr_94px_1fr] gap-x-4 gap-y-4">
                    <TextField label="Email address *" placeholder="Enter your email address" />
                    <div className="self-end">
                      <Button
                        variant="outline"
                        className="h-[34px] w-full rounded-[5px] border-[#e0e3ea] bg-white text-[11px] font-medium text-[#a6adbb] hover:bg-white hover:text-[#a6adbb]"
                      >
                        Send code
                      </Button>
                    </div>
                    <label className="flex items-end gap-2 pb-2 text-[11px] text-[#4e5977]">
                      <Checkbox className="h-[13px] w-[13px] rounded-[3px] border-[#d4d9e2] data-[state=checked]:bg-[#2f65c9] data-[state=checked]:border-[#2f65c9]" />
                      <span>Customer declines to provide email address</span>
                    </label>

                    <TextField label="Mobile phone number *" placeholder="Enter your phone number" />
                    <div className="self-end">
                      <Button
                        variant="outline"
                        className="h-[34px] w-full rounded-[5px] border-[#e0e3ea] bg-white text-[11px] font-medium text-[#a6adbb] hover:bg-white hover:text-[#a6adbb]"
                      >
                        Send code
                      </Button>
                    </div>
                    <label className="flex items-end gap-2 pb-2 text-[11px] text-[#4e5977]">
                      <Checkbox className="h-[13px] w-[13px] rounded-[3px] border-[#d4d9e2] data-[state=checked]:bg-[#2f65c9] data-[state=checked]:border-[#2f65c9]" />
                      <span>Customer declines to provide mobile phone number</span>
                    </label>

                    <TextField label="Home phone number" placeholder="Enter your home phone number" />
                    <SelectField label="Notifications" placeholder="Select" />
                  </div>
                </div>

                <div className="py-5">
                  <SectionTitle icon={Home} title="Address" muted />
                  <label className="mb-4 flex items-center gap-2 text-[11px] text-[#4e5977]">
                    <Checkbox className="h-[13px] w-[13px] rounded-[3px] border-[#d4d9e2] data-[state=checked]:bg-[#2f65c9] data-[state=checked]:border-[#2f65c9]" />
                    <span>Same address as primary member</span>
                  </label>

                  <div className="grid grid-cols-[1.4fr_0.65fr_0.65fr_0.65fr] gap-4">
                    <TextField label="Address *" placeholder="Enter your address" />
                    <SelectField label="Country" placeholder="Select" />
                    <SelectField label="State" placeholder="Select" />
                    <SelectField label="City" placeholder="Select" />
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[#dfe4ec] pt-4">
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="h-[35px] rounded-[6px] border-[#8eace0] bg-white px-4 text-[12px] font-medium text-[#3065ca] hover:bg-[#edf4ff] hover:text-[#3065ca]"
              >
                <Home className="h-3.5 w-3.5" />
                Go back home
              </Button>
              <Button
                variant="outline"
                className="h-[35px] rounded-[6px] border-[#8eace0] bg-white px-5 text-[12px] font-medium text-[#3065ca] hover:bg-[#edf4ff] hover:text-[#3065ca]"
              >
                Save changes
              </Button>
            </div>

            <div className="flex gap-4">
              <Button className="h-[35px] rounded-[6px] bg-[#e6542d] px-10 text-[12px] font-semibold text-white hover:bg-[#d84c27]">
                Previous
              </Button>
              <Button
                disabled
                className="h-[35px] rounded-[6px] bg-[#e7e9ee] px-8 text-[12px] font-semibold text-[#acb4c3] hover:bg-[#e7e9ee]"
              >
                Add member
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
