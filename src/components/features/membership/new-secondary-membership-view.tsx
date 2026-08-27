"use client";

import {
  CalendarDays,
  Camera,
  ChevronDown,
  Circle,
  Globe,
  House,
  Languages,
  MapPin,
  Smartphone,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type FieldProps = {
  label: string;
  placeholder?: string;
  className?: string;
  icon?: "chevron" | "calendar";
  buttonLabel?: string;
  checkboxLabel?: string;
};

function TopHeader() {
  return (
    <header>
      <div className="bg-[#1e376f] text-white">
        <div className="mx-auto flex h-[43px] max-w-[1365px] items-center justify-between px-7">
          <div className="text-[26px] font-bold tracking-tight text-white">
            Price<span className="text-[#ef6a2f]">Smart</span>
          </div>
          <div className="flex items-center gap-6 text-[12px] font-medium text-white/95">
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
      <div className="h-[27px] bg-[#0d57c6]" />
    </header>
  );
}

function SidebarStep() {
  return (
    <aside className="w-[150px] shrink-0 border-r border-[#d9dde7] pt-3">
      <div className="flex items-center gap-2 px-0 text-[11px] font-semibold text-[#32476d]">
        <Circle className="h-4 w-4 fill-[#32476d] text-[#32476d]" />
        <span>Membership data</span>
      </div>
    </aside>
  );
}

function SectionHeading({
  title,
  icon,
  muted = false,
}: {
  title: string;
  icon: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <div className={`mb-4 flex items-center gap-2 ${muted ? "text-[#c5cad4]" : "text-[#28467e]"}`}>
      {icon}
      <h2 className="text-[15px] font-medium">{title}</h2>
    </div>
  );
}

function FormField({ label, placeholder, className, icon, buttonLabel, checkboxLabel }: FieldProps) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-[10px] font-semibold text-[#5a6785]">{label}</label>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            placeholder={placeholder}
            className="h-[36px] rounded-md border-[#d5dae5] bg-white pr-9 text-[12px] text-[#32476d] placeholder:text-[#9ca5b8] focus-visible:ring-[#7ca4e6]"
          />
          {icon === "chevron" ? (
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7f889c]" />
          ) : null}
          {icon === "calendar" ? (
            <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa3b5]" />
          ) : null}
        </div>
        {buttonLabel ? (
          <Button
            type="button"
            variant="outline"
            className="h-[36px] min-w-[96px] rounded-md border-[#dde2eb] bg-[#f7f8fb] px-4 text-[11px] font-semibold text-[#a4abb9] hover:bg-[#f7f8fb]"
          >
            {buttonLabel}
          </Button>
        ) : null}
        {checkboxLabel ? (
          <label className="flex shrink-0 items-center gap-2 text-[11px] font-medium text-[#55627f]">
            <Checkbox className="h-4 w-4 rounded-[4px] border-[#d4d8e2] data-[state=checked]:border-[#0d57c6] data-[state=checked]:bg-[#0d57c6]" />
            <span>{checkboxLabel}</span>
          </label>
        ) : null}
      </div>
    </div>
  );
}

export function NewSecondaryMembershipView() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#32476d]">
      <TopHeader />

      <div className="mx-auto max-w-[1365px] px-10 pb-8 pt-12">
        <div className="rounded-sm bg-[#f7f7f8] shadow-[0_0_0_1px_rgba(28,49,95,0.03)]">
          <div className="flex items-start justify-between px-5 pt-1">
            <div>
              <h1 className="text-[18px] font-medium text-[#2f4778]">Nicolas Treviño</h1>
              <p className="mt-1 text-[13px] text-[#56627d]">Primary membership</p>
            </div>
            <div className="mt-[28px] flex items-center gap-4">
              <Button
                variant="outline"
                className="h-[30px] rounded-md border-[#7aa3e5] bg-white px-4 text-[11px] font-semibold text-[#3d6fc9] hover:bg-white"
              >
                Capture Member ID
              </Button>
              <button
                type="button"
                className="grid h-[48px] w-[48px] place-items-center rounded-xl bg-[#1d346a] text-white shadow-sm"
                aria-label="mobile shortcut"
              >
                <Smartphone className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 px-5">
            <h2 className="text-[16px] font-medium text-[#2f4778]">New secondary membership</h2>
          </div>

          <div className="mt-4 flex gap-5 px-5 pb-6">
            <SidebarStep />

            <main className="flex-1">
              <SectionHeading title="Personal data" icon={<UserRound className="h-4 w-4" strokeWidth={1.8} />} />

              <div className="flex gap-6">
                <div className="w-[95px] shrink-0 text-center">
                  <div className="mx-auto h-[95px] w-[95px] rounded-full bg-[#cfd4df]" />
                  <button type="button" className="mt-2 text-[10px] font-medium text-[#4a84e2]">
                    Take photo
                  </button>
                </div>

                <div className="grid flex-1 grid-cols-3 gap-x-16 gap-y-4">
                  <FormField label="ID Type *" placeholder="Select" icon="chevron" />
                  <FormField label="ID Number *" placeholder="Enter ID number" />
                  <FormField label="Membership type *" placeholder="Select" icon="chevron" />
                  <FormField label="Abbreviation" placeholder="Select" icon="chevron" />
                  <FormField label="First Name *" placeholder="Enter first name" />
                  <FormField label="Last Name *" placeholder="Enter last name" />
                  <FormField label="Gender" placeholder="Select" icon="chevron" />
                  <FormField label="Date of birth *" placeholder="Select" icon="calendar" />
                  <FormField label="Occupation" placeholder="Select" icon="chevron" />
                </div>
              </div>

              <Separator className="my-5 bg-[#dde1ea]" />

              <SectionHeading title="Contact" icon={<Smartphone className="h-4 w-4" strokeWidth={1.8} />} muted />

              <div className="space-y-4">
                <div className="grid grid-cols-[1fr] gap-4">
                  <FormField
                    label="Email address *"
                    placeholder="Enter your email address"
                    buttonLabel="Send code"
                    checkboxLabel="Customer declines to provide email address"
                  />
                </div>
                <div className="grid grid-cols-[1fr] gap-4">
                  <FormField
                    label="Mobile phone number *"
                    placeholder="Enter your phone number"
                    buttonLabel="Send code"
                    checkboxLabel="Customer declines to provide mobile phone number"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 pr-[278px]">
                  <FormField label="Home phone number" placeholder="Enter your home phone number" />
                  <FormField label="Notifications" placeholder="Select" icon="chevron" />
                </div>
              </div>

              <Separator className="my-5 bg-[#dde1ea]" />

              <SectionHeading title="Address" icon={<House className="h-4 w-4" strokeWidth={1.8} />} muted />

              <label className="mb-4 flex items-center gap-2 text-[11px] font-medium text-[#55627f]">
                <Checkbox className="h-4 w-4 rounded-[4px] border-[#d4d8e2] data-[state=checked]:border-[#0d57c6] data-[state=checked]:bg-[#0d57c6]" />
                <span>Same address as primary member</span>
              </label>

              <div className="grid grid-cols-[2.1fr_1fr_1fr_1fr] gap-4">
                <FormField label="Address *" placeholder="Enter your address" />
                <FormField label="Country" placeholder="Select" icon="chevron" />
                <FormField label="State" placeholder="Select" icon="chevron" />
                <FormField label="City" placeholder="Select" icon="chevron" />
              </div>
            </main>
          </div>

          <div className="flex items-center justify-between border-t border-[#d8dce6] px-5 py-4">
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="h-[38px] rounded-md border-[#7aa3e5] bg-white px-4 text-[12px] font-semibold text-[#3d6fc9] hover:bg-white"
              >
                Go back home
              </Button>
              <Button
                variant="outline"
                className="h-[38px] rounded-md border-[#7aa3e5] bg-white px-5 text-[12px] font-semibold text-[#3d6fc9] hover:bg-white"
              >
                Save changes
              </Button>
            </div>

            <div className="flex gap-4">
              <Button className="h-[38px] min-w-[96px] rounded-md bg-[#e9532d] px-8 text-[12px] font-semibold text-white hover:bg-[#e9532d]">
                Previous
              </Button>
              <Button
                disabled
                className="h-[38px] min-w-[96px] rounded-md bg-[#e4e6eb] px-8 text-[12px] font-semibold text-[#9ea4b0] hover:bg-[#e4e6eb]"
              >
                Add member
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
