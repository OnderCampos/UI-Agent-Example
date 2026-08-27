import { CalendarDays, Camera, ChevronDown, Circle, House, MapPinned, Phone, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SelectFieldProps = {
  label: string;
  placeholder: string;
  className?: string;
};

type InputFieldProps = {
  label: string;
  placeholder: string;
  className?: string;
  trailingIcon?: React.ComponentType<{ className?: string }>;
};

type SectionHeadingProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  muted?: boolean;
};

function SectionHeading({ icon: Icon, title, muted }: SectionHeadingProps) {
  return (
    <div className={cn("mb-4 flex items-center gap-2 text-[15px] font-medium", muted ? "text-[#c6cad4]" : "text-[#274385]")}>
      <Icon className="h-4 w-4" />
      <h2>{title}</h2>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-[11px] font-medium text-[#4e5c77]">{children}</label>;
}

function SelectField({ label, placeholder, className }: SelectFieldProps) {
  return (
    <div className={className}>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex h-9 items-center justify-between rounded-md border border-[#d8dde7] bg-white px-3 text-[12px] text-[#98a1b2] shadow-[0_1px_0_rgba(16,24,40,0.02)]">
        <span>{placeholder}</span>
        <ChevronDown className="h-4 w-4 text-[#8f99ab]" />
      </div>
    </div>
  );
}

function InputField({ label, placeholder, className, trailingIcon: TrailingIcon }: InputFieldProps) {
  return (
    <div className={className}>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <Input
          placeholder={placeholder}
          className="h-9 border-[#d8dde7] bg-white px-3 text-[12px] text-[#59657b] placeholder:text-[#a0a8b8] focus-visible:ring-1"
        />
        {TrailingIcon ? <TrailingIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#97a0b1]" /> : null}
      </div>
    </div>
  );
}

const personalFields = [
  { type: "select", label: "ID Type*", placeholder: "Select" },
  { type: "input", label: "ID Number *", placeholder: "Enter ID number" },
  { type: "select", label: "Membership type *", placeholder: "Select" },
  { type: "select", label: "Abbreviation", placeholder: "Select" },
  { type: "input", label: "First Name *", placeholder: "Enter first name" },
  { type: "input", label: "Last Name *", placeholder: "Enter last name" },
  { type: "select", label: "Gender", placeholder: "Select" },
  { type: "select", label: "Date of birth *", placeholder: "Select", icon: CalendarDays },
  { type: "select", label: "Occupation", placeholder: "Select" },
] as const;

export function SecondaryMembershipForm() {
  return (
    <div className="min-h-screen bg-[#f3f4f7] text-[#24375b]">
      <header>
        <div className="bg-[#173272] text-white">
          <div className="mx-auto flex h-[42px] max-w-[1280px] items-center justify-between px-7 text-[12px]">
            <div className="text-[24px] font-bold tracking-tight">
              Price<span className="text-[#e85c2a]">Smart</span>
            </div>
            <div className="flex items-center gap-5 text-[12px] text-white/95">
              <span>Miraflores</span>
              <span>Guatemala</span>
              <span>English</span>
            </div>
          </div>
        </div>
        <div className="h-[27px] bg-[#1d4fb2]" />
      </header>

      <main className="mx-auto max-w-[1280px] px-10 pb-6 pt-5">
        <div className="mb-6">
          <h1 className="text-[38px] font-medium leading-none text-[#29427f]">Nicolas Treviño</h1>
          <p className="mt-2 text-[18px] text-[#4d5c7a]">Primary membership</p>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[32px] font-medium text-[#29427f]">New secondary membership</h2>
          <Button
            variant="outline"
            className="h-9 rounded-md border-[#8ba9e4] bg-white px-4 text-[11px] font-medium text-[#2d67c8] hover:bg-[#eff4ff] hover:text-[#2d67c8]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="overflow-hidden rounded-none border border-[#dfe3ea] bg-[#f7f8fa]">
          <div className="grid grid-cols-[155px_1fr]">
            <aside className="border-r border-[#d7dbe4] px-5 py-6">
              <div className="flex items-start gap-2 text-[11px] font-semibold text-[#34497d]">
                <Circle className="mt-0.5 h-4 w-4 fill-[#233f7d] text-[#233f7d]" />
                <span>Membership data</span>
              </div>
            </aside>

            <div className="bg-[#fbfbfc] px-5 py-5">
              <SectionHeading icon={UserRound} title="Personal data" />

              <div className="grid grid-cols-[95px_1fr] gap-5 border-b border-[#e1e4eb] pb-5">
                <div className="pt-2 text-center text-[10px] text-[#3e75d2]">
                  <div className="mx-auto mb-3 flex h-[102px] w-[102px] items-center justify-center rounded-full bg-[#d0d5dd] shadow-[0_4px_10px_rgba(15,23,42,0.08)]">
                    <Camera className="h-7 w-7 text-[#cfd3da]" />
                  </div>
                  <button type="button" className="font-medium text-[#2f67c4]">
                    Take photo
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-x-5 gap-y-3">
                  {personalFields.map((field) =>
                    field.type === "select" ? (
                      <SelectField key={field.label} label={field.label} placeholder={field.placeholder} />
                    ) : (
                      <InputField key={field.label} label={field.label} placeholder={field.placeholder} />
                    )
                  )}
                </div>
              </div>

              <section className="border-b border-[#e1e4eb] py-5">
                <SectionHeading icon={Phone} title="Contact" muted />

                <div className="space-y-4">
                  <div className="grid grid-cols-[1fr_96px_auto] items-end gap-4">
                    <InputField label="Email address *" placeholder="Enter your email address" />
                    <Button variant="outline" className="h-9 border-[#e1e5ec] bg-[#f9fafb] text-[12px] text-[#a4acba] hover:bg-[#f9fafb] hover:text-[#a4acba]">
                      Send code
                    </Button>
                    <label className="flex items-center gap-2 pb-2 text-[12px] text-[#4f5d77]">
                      <Checkbox className="border-[#d5d9e2] data-[state=checked]:border-[#2f67c4] data-[state=checked]:bg-[#2f67c4]" />
                      <span>Customer declines to provide email address</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-[1fr_96px_auto] items-end gap-4">
                    <InputField label="Mobile phone number *" placeholder="Enter your phone number" />
                    <Button variant="outline" className="h-9 border-[#e1e5ec] bg-[#f9fafb] text-[12px] text-[#a4acba] hover:bg-[#f9fafb] hover:text-[#a4acba]">
                      Send code
                    </Button>
                    <label className="flex items-center gap-2 pb-2 text-[12px] text-[#4f5d77]">
                      <Checkbox className="border-[#d5d9e2] data-[state=checked]:border-[#2f67c4] data-[state=checked]:bg-[#2f67c4]" />
                      <span>Customer declines to provide mobile phone number</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-[1fr_110px_1fr] gap-4">
                    <InputField label="Home phone number" placeholder="Enter your home phone number" />
                    <SelectField label="Notifications" placeholder="Select" />
                    <div />
                  </div>
                </div>
              </section>

              <section className="py-5">
                <SectionHeading icon={MapPinned} title="Address" muted />

                <label className="mb-4 flex items-center gap-2 text-[12px] text-[#4f5d77]">
                  <Checkbox className="border-[#d5d9e2] data-[state=checked]:border-[#2f67c4] data-[state=checked]:bg-[#2f67c4]" />
                  <span>Same address as primary member</span>
                </label>

                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4">
                  <InputField label="Address *" placeholder="Enter your address" />
                  <SelectField label="Country" placeholder="Select" />
                  <SelectField label="State" placeholder="Select" />
                  <SelectField label="City" placeholder="Select" />
                </div>
              </section>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#d7dbe4] bg-[#f7f8fa] px-5 py-4">
            <div className="flex gap-4">
              <Button variant="outline" className="h-10 border-[#86a6e8] bg-white px-5 text-[13px] font-medium text-[#3269c7] hover:bg-[#eff4ff] hover:text-[#3269c7]">
                <House className="h-4 w-4" />
                Go back home
              </Button>
              <Button variant="outline" className="h-10 border-[#86a6e8] bg-white px-5 text-[13px] font-medium text-[#3269c7] hover:bg-[#eff4ff] hover:text-[#3269c7]">
                Save changes
              </Button>
            </div>

            <div className="flex gap-4">
              <Button className="h-10 min-w-[126px] bg-[#e44d26] text-[13px] font-semibold text-white hover:bg-[#cc4522]">
                Previous
              </Button>
              <Button disabled className="h-10 min-w-[126px] bg-[#e4e7ec] text-[13px] font-semibold text-[#adb4c2] hover:bg-[#e4e7ec]">
                Add member
              </Button>
            </div>
          </div>
        </div>

        <div className="fixed right-4 top-[102px] rounded-xl bg-[#1d3779] p-2 shadow-lg">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#223d86] text-white"
            aria-label="Membership shortcut"
          >
            <MapPinned className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
