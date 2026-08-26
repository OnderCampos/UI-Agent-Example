import {
  Calendar,
  ChevronDown,
  Folder,
  Globe,
  IdCard,
  MapPin,
  MonitorSmartphone,
  Phone,
  Camera,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const topMeta = [
  { icon: MapPin, label: "Miraflores" },
  { icon: Globe, label: "Guatemala", caret: true },
  { icon: Globe, label: "English", caret: true },
];

function TopBar() {
  return (
    <header>
      <div className="bg-[#16306d] text-white">
        <div className="mx-auto flex h-[42px] w-full max-w-[1366px] items-center justify-between px-[28px]">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ef5d23] text-[11px] font-bold leading-none text-white">
              ✳
            </div>
            <span className="text-[13px] font-semibold tracking-[-0.02em]">PriceSmart</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-white/95">
            {topMeta.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  <span>{item.label}</span>
                  {item.caret ? <ChevronDown className="h-3 w-3 text-white/75" /> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-[27px] bg-[#1e50c4]" />
    </header>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-[11px] font-medium text-[#4f5f7f]">{children}</label>;
}

function TextField({ placeholder }: { placeholder: string }) {
  return (
    <Input
      placeholder={placeholder}
      className="h-[30px] rounded-[5px] border-[#d5dae5] bg-white px-3 text-[11px] text-[#22314e] placeholder:text-[#99a2b5] focus-visible:ring-[#2b5fd1]"
    />
  );
}

function SelectField({ placeholder, icon }: { placeholder: string; icon?: React.ReactNode }) {
  return (
    <div className="relative">
      {icon ? <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-[#9aa4b7]">{icon}</div> : null}
      <select className="h-[30px] w-full appearance-none rounded-[5px] border border-[#d5dae5] bg-white px-3 text-[11px] text-[#6f7c96] focus:outline-none focus:ring-2 focus:ring-[#2b5fd1]">
        <option>{placeholder}</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#74809a]" />
    </div>
  );
}

function SectionHeading({ icon: Icon, title, muted = false }: { icon: typeof Folder; title: string; muted?: boolean }) {
  return (
    <div className={`mb-4 flex items-center gap-2 ${muted ? "text-[#c8ceda]" : "text-[#2a437f]"}`}>
      <Icon className="h-4 w-4" strokeWidth={1.8} />
      <h2 className="text-[15px] font-medium">{title}</h2>
    </div>
  );
}

export function NewSecondaryMembershipForm() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#22314e]">
      <TopBar />

      <main className="relative mx-auto max-w-[1366px] px-[41px] pb-10 pt-[16px]">
        <div className="mb-3 ml-[18px]">
          <h1 className="text-[18px] font-medium text-[#243f84]">Nicolas Treviño</h1>
          <p className="mt-1 text-[12px] text-[#54617b]">Primary membership</p>
        </div>

        <div className="mb-4 ml-[18px] flex items-center justify-between pr-[18px]">
          <h2 className="text-[18px] font-medium text-[#29488c]">New secondary membership</h2>
          <Button
            variant="outline"
            className="h-[28px] rounded-[6px] border-[#80a2e4] bg-white px-3 text-[10px] font-medium text-[#3970d3] hover:bg-[#f7faff] hover:text-[#3970d3]"
          >
            Capture Member ID
          </Button>
        </div>

        <Card className="overflow-hidden rounded-none border-[#d9dde7] bg-white shadow-none">
          <div className="grid min-h-[583px] grid-cols-[111px_1fr]">
            <aside className="border-r border-[#e1e5ed] bg-[#f7f7f8] px-[18px] py-[18px]">
              <div className="flex items-start gap-2 text-[10px] font-semibold text-[#27324a]">
                <span className="mt-px flex h-[12px] w-[12px] items-center justify-center rounded-full bg-[#27324a] text-[8px] text-white">
                  1
                </span>
                <span>Membership data</span>
              </div>
            </aside>

            <section className="px-[18px] pb-[18px] pt-[16px]">
              <SectionHeading icon={Folder} title="Personal data" />

              <div className="grid grid-cols-[94px_1fr] gap-x-16 border-b border-[#e5e8ef] pb-5">
                <div className="flex flex-col items-center pt-[6px]">
                  <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-[#cfd4dd]" />
                  <button type="button" className="mt-3 flex items-center gap-1 text-[9px] font-medium text-[#4b78d8]">
                    <Camera className="h-3 w-3" />
                    Take photo
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-x-18 gap-y-3">
                  <div>
                    <FieldLabel>ID Type *</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                  <div>
                    <FieldLabel>ID Number *</FieldLabel>
                    <TextField placeholder="Enter ID number" />
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
                    <TextField placeholder="Enter first name" />
                  </div>
                  <div>
                    <FieldLabel>Last Name *</FieldLabel>
                    <TextField placeholder="Enter last name" />
                  </div>
                  <div>
                    <FieldLabel>Gender</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                  <div>
                    <FieldLabel>Date of birth *</FieldLabel>
                    <SelectField placeholder="Select" icon={<Calendar className="h-3.5 w-3.5" />} />
                  </div>
                  <div>
                    <FieldLabel>Occupation</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                </div>
              </div>

              <div className="border-b border-[#e5e8ef] py-5">
                <SectionHeading icon={Phone} title="Contact" muted />

                <div className="grid grid-cols-[150px_95px_1fr] items-end gap-x-16 gap-y-4">
                  <div>
                    <FieldLabel>Email address *</FieldLabel>
                    <TextField placeholder="Enter your email address" />
                  </div>
                  <Button
                    variant="outline"
                    className="h-[30px] rounded-[5px] border-[#d9dde7] bg-[#f9fafc] px-3 text-[10px] font-medium text-[#a2abba] hover:bg-[#f9fafc] hover:text-[#a2abba]"
                  >
                    Send code
                  </Button>
                  <label className="flex items-center gap-2 pb-[6px] text-[11px] text-[#475470]">
                    <Checkbox className="h-[12px] w-[12px] rounded-[3px] border-[#d7dbe5] data-[state=checked]:bg-[#2959d3] data-[state=checked]:text-white" />
                    Customer declines to provide email address
                  </label>

                  <div>
                    <FieldLabel>Mobile phone number *</FieldLabel>
                    <TextField placeholder="Enter your phone number" />
                  </div>
                  <Button
                    variant="outline"
                    className="h-[30px] rounded-[5px] border-[#d9dde7] bg-[#f9fafc] px-3 text-[10px] font-medium text-[#a2abba] hover:bg-[#f9fafc] hover:text-[#a2abba]"
                  >
                    Send code
                  </Button>
                  <label className="flex items-center gap-2 pb-[6px] text-[11px] text-[#475470]">
                    <Checkbox className="h-[12px] w-[12px] rounded-[3px] border-[#d7dbe5] data-[state=checked]:bg-[#2959d3] data-[state=checked]:text-white" />
                    Customer declines to provide mobile phone number
                  </label>

                  <div>
                    <FieldLabel>Home phone number</FieldLabel>
                    <TextField placeholder="Enter your home phone number" />
                  </div>
                  <div>
                    <FieldLabel>Notifications</FieldLabel>
                    <SelectField placeholder="Select" />
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <SectionHeading icon={MapPin} title="Address" muted />

                <label className="mb-4 flex items-center gap-2 text-[11px] text-[#475470]">
                  <Checkbox className="h-[12px] w-[12px] rounded-[3px] border-[#d7dbe5] data-[state=checked]:bg-[#2959d3] data-[state=checked]:text-white" />
                  Same address as primary member
                </label>

                <div className="grid grid-cols-[206px_97px_97px_97px] gap-x-16">
                  <div>
                    <FieldLabel>Address *</FieldLabel>
                    <TextField placeholder="Enter your address" />
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
              </div>
            </section>
          </div>

          <div className="flex items-center justify-between border-t border-[#dfe3ea] px-[18px] py-[16px]">
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="h-[27px] rounded-[6px] border-[#7f9fe0] bg-white px-4 text-[11px] font-medium text-[#3a68c5] hover:bg-[#f7faff] hover:text-[#3a68c5]"
              >
                Go back home
              </Button>
              <Button
                variant="outline"
                className="h-[27px] rounded-[6px] border-[#7f9fe0] bg-white px-5 text-[11px] font-medium text-[#3a68c5] hover:bg-[#f7faff] hover:text-[#3a68c5]"
              >
                Save changes
              </Button>
            </div>

            <div className="flex gap-4">
              <Button className="h-[27px] rounded-[5px] bg-[#ef4f23] px-9 text-[11px] font-semibold text-white hover:bg-[#de471e]">
                Previous
              </Button>
              <Button
                disabled
                className="h-[27px] rounded-[5px] bg-[#eef0f4] px-9 text-[11px] font-semibold text-[#a8b0be] hover:bg-[#eef0f4]"
              >
                Add member
              </Button>
            </div>
          </div>
        </Card>

        <button
          type="button"
          className="absolute right-[21px] top-[28px] flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-[#243b7a] shadow-[0_8px_18px_rgba(27,47,109,0.25)]"
        >
          <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] border border-white/15 bg-[#2d478d] text-white">
            <MonitorSmartphone className="h-3.5 w-3.5" strokeWidth={1.8} />
          </div>
        </button>
      </main>
    </div>
  );
}
