import Link from "next/link";
import {
  CalendarDays,
  Camera,
  ChevronDown,
  FolderOpen,
  Globe,
  House,
  MapPin,
  Phone,
  Smartphone,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  trailingIcon?: React.ElementType;
  disabled?: boolean;
}

function Field({ label, placeholder, value, trailingIcon: TrailingIcon, disabled }: FieldProps) {
  return (
    <label className="space-y-1.5">
      <span className="block text-[10px] font-medium text-[#4b587c]">{label}</span>
      <div className="relative">
        <Input
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly
          className={cn(
            "h-[34px] rounded-md border-[#d9dee8] bg-white px-3 text-[12px] text-[#334155] placeholder:text-[#9aa5b5] focus-visible:ring-1 focus-visible:ring-[#2b56c4]",
            TrailingIcon && "pr-9",
            disabled && "bg-[#f8f9fc] text-[#9aa5b5]",
          )}
        />
        {TrailingIcon ? (
          <TrailingIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
        ) : null}
      </div>
    </label>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
}

function SelectField({ label, value }: SelectFieldProps) {
  return <Field label={label} value={value} trailingIcon={ChevronDown} />;
}

interface CodeRowProps {
  label: string;
  checkboxLabel: string;
  fullWidth?: boolean;
}

function CodeRow({ label, checkboxLabel, fullWidth }: CodeRowProps) {
  return (
    <div className={cn("grid gap-3 md:grid-cols-[1fr_96px_auto] md:items-end", fullWidth && "lg:col-span-3") }>
      <Field label={label} placeholder={`Enter your ${label.toLowerCase().replace(" *", "")}`} />
      <Button
        variant="outline"
        className="h-[34px] min-w-[96px] rounded-md border-[#e3e7ef] bg-[#f8f9fc] px-3 text-[11px] font-medium text-[#a5adba] hover:bg-[#f8f9fc] hover:text-[#a5adba]"
      >
        Send code
      </Button>
      <label className="flex min-h-[34px] items-center gap-2 text-[11px] text-[#4b587c]">
        <Checkbox className="h-4 w-4 rounded-[4px] border-[#d6dbe5] data-[state=checked]:border-[#2b56c4] data-[state=checked]:bg-[#2b56c4]" />
        <span>{checkboxLabel}</span>
      </label>
    </div>
  );
}

interface SectionTitleProps {
  icon: React.ElementType;
  title: string;
  muted?: boolean;
}

function SectionTitle({ icon: Icon, title, muted }: SectionTitleProps) {
  return (
    <div className={cn("mb-4 flex items-center gap-2", muted ? "text-[#c0c7d3]" : "text-[#2c4379]") }>
      <Icon className="h-4 w-4 stroke-[1.8]" />
      <h2 className="text-[15px] font-medium">{title}</h2>
    </div>
  );
}

export function MembershipRegistrationView() {
  return (
    <div className="min-h-[calc(100vh-112px)] bg-[#f5f6f8] text-[#0f172a]">
      <div className="mx-auto max-w-[1380px] px-6 pb-8 pt-5">
        <div className="mb-5 space-y-1.5">
          <h1 className="text-[20px] font-medium text-[#30477f]">Nicolas Treviño</h1>
          <p className="text-[13px] text-[#5d6b89]">Primary membership</p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-medium text-[#30477f]">New secondary membership</h2>
          <Button
            variant="outline"
            className="h-[32px] rounded-md border-[#85a9ea] bg-white px-4 text-[11px] font-medium text-[#2f67d1] hover:bg-[#eef4ff] hover:text-[#2f67d1]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="overflow-hidden rounded-sm border border-[#e3e7ee] bg-[#f5f6f8]">
          <div className="grid lg:grid-cols-[110px_1fr]">
            <aside className="border-r border-[#dde2ea] px-4 py-4">
              <div className="flex items-start gap-2 text-[#354a7f]">
                <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#273b73] text-[10px] font-semibold text-white">
                  1
                </span>
                <span className="text-[11px] font-semibold">Membership data</span>
              </div>
            </aside>

            <div className="bg-[#f6f7f9] px-4 py-4 md:px-5 lg:px-6">
              <section className="border-b border-[#dde2ea] pb-5">
                <SectionTitle icon={FolderOpen} title="Personal data" />
                <div className="grid gap-5 xl:grid-cols-[96px_1fr]">
                  <div className="flex flex-col items-center pt-2">
                    <div className="h-[88px] w-[88px] rounded-full bg-[#c7ccd6]" />
                    <button className="mt-2 text-[10px] font-medium text-[#2f67d1]">Take photo</button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <SelectField label="ID Type *" value="Select" />
                    <Field label="ID Number *" placeholder="Enter ID number" />
                    <SelectField label="Membership type *" value="Select" />
                    <SelectField label="Abbreviation" value="Select" />
                    <Field label="First Name *" placeholder="Enter first name" />
                    <Field label="Last Name *" placeholder="Enter last name" />
                    <SelectField label="Gender" value="Select" />
                    <Field label="Date of birth *" value="Select" trailingIcon={CalendarDays} />
                    <SelectField label="Occupation" value="Select" />
                  </div>
                </div>
              </section>

              <section className="border-b border-[#dde2ea] py-5">
                <SectionTitle icon={Phone} title="Contact" muted />
                <div className="space-y-4">
                  <CodeRow
                    label="Email address *"
                    checkboxLabel="Customer declines to provide email address"
                    fullWidth
                  />
                  <CodeRow
                    label="Mobile phone number *"
                    checkboxLabel="Customer declines to provide mobile phone number"
                    fullWidth
                  />
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr]">
                    <Field label="Home phone number" placeholder="Enter your home phone number" />
                    <SelectField label="Notifications" value="Select" />
                    <div />
                  </div>
                </div>
              </section>

              <section className="py-5">
                <SectionTitle icon={MapPin} title="Address" muted />
                <label className="mb-4 flex items-center gap-2 text-[11px] text-[#4b587c]">
                  <Checkbox className="h-4 w-4 rounded-[4px] border-[#d6dbe5] data-[state=checked]:border-[#2b56c4] data-[state=checked]:bg-[#2b56c4]" />
                  <span>Same address as primary member</span>
                </label>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[2.1fr_1fr_1fr_1fr]">
                  <Field label="Address *" placeholder="Enter your address" />
                  <SelectField label="Country" value="Select" />
                  <SelectField label="State" value="Select" />
                  <SelectField label="City" value="Select" />
                </div>
              </section>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-[#dde2ea] bg-[#f5f6f8] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5 lg:px-6">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                asChild
                className="h-[36px] rounded-md border-[#8da8dc] bg-white px-4 text-[12px] font-medium text-[#2f67d1] hover:bg-[#eef4ff] hover:text-[#2f67d1]"
              >
                <Link href="/">
                  <House className="h-4 w-4" />
                  Go back home
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-[36px] rounded-md border-[#8da8dc] bg-white px-5 text-[12px] font-medium text-[#2f67d1] hover:bg-[#eef4ff] hover:text-[#2f67d1]"
              >
                Save changes
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button className="h-[38px] min-w-[94px] rounded-md bg-[#e44e26] px-5 text-[12px] font-medium text-white hover:bg-[#d4461f]">
                Previous
              </Button>
              <Button
                disabled
                className="h-[38px] min-w-[94px] rounded-md bg-[#e7e9ef] px-5 text-[12px] font-medium text-[#a7afbc] hover:bg-[#e7e9ef]"
              >
                Add member
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed right-3 top-[102px] z-20 rounded-l-xl bg-[#203a79] p-3 shadow-[0_10px_24px_rgba(32,58,121,0.25)]">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#283f7f] text-white">
          <Smartphone className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
