import {
  CalendarDays,
  Camera,
  ChevronDown,
  FolderOpen,
  Globe,
  House,
  Languages,
  MapPin,
  Phone,
  Smartphone,
  UserRound,
} from "lucide-react";

import { MembershipDashboardHeader } from "@/components/features/membership";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

function FormField({
  label,
  placeholder,
  className = "",
  trailingIcon,
}: {
  label: string;
  placeholder: string;
  className?: string;
  trailingIcon?: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-[11px] font-medium text-[#5f6d87]">{label}</label>
      <div className="relative">
        <Input
          placeholder={placeholder}
          className="h-[34px] rounded-md border-[#d5dbe6] bg-white pr-9 text-[12px] text-[#33476f] placeholder:text-[#9aa4b5] focus-visible:ring-[#2d5ec9]"
        />
        {trailingIcon ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8893a8]">
            {trailingIcon}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function SelectField({ label, placeholder, className = "" }: { label: string; placeholder: string; className?: string }) {
  return <FormField label={label} placeholder={placeholder} className={className} trailingIcon={<ChevronDown className="h-3.5 w-3.5" />} />;
}

function SectionHeading({ icon: Icon, title, muted = false }: { icon: typeof UserRound; title: string; muted?: boolean }) {
  return (
    <div className={`mb-4 flex items-center gap-2 text-[15px] font-medium ${muted ? "text-[#c4cad5]" : "text-[#314c84]"}`}>
      <Icon className="h-4 w-4" />
      <h2>{title}</h2>
    </div>
  );
}

export default function NewMembershipPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f6] text-[#243a66]">
      <MembershipDashboardHeader />

      <main className="mx-auto max-w-[1360px] px-10 pb-5 pt-7">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[18px] font-medium text-[#2d467d]">Nicolas Treviño</h1>
            <p className="mt-1 text-[12px] text-[#6d7891]">Primary membership</p>
            <p className="mt-8 text-[15px] font-medium text-[#35508a]">New secondary membership</p>
          </div>

          <Button
            variant="outline"
            className="mt-[64px] h-[30px] rounded-md border-[#7ca3f4] px-4 text-[11px] font-medium text-[#3671db] hover:bg-[#eff5ff] hover:text-[#2d62c4]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="grid grid-cols-[92px_1px_minmax(0,1fr)] gap-0">
          <aside className="pt-[6px] text-[11px] text-[#30497f]">
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#243f86] text-[10px] text-white">1</span>
              <span>Membership data</span>
            </div>
          </aside>

          <div className="bg-[#d8dde7]" />

          <section className="pl-5 pr-6">
            <SectionHeading icon={FolderOpen} title="Personal data" />

            <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-5 pb-5">
              <div className="flex flex-col items-center pt-4">
                <div className="h-[120px] w-[120px] rounded-full bg-[#cfd4df]" />
                <button className="mt-3 text-[10px] font-medium text-[#4f77d4]">Take photo</button>
              </div>

              <div className="grid grid-cols-3 gap-x-16 gap-y-4">
                <SelectField label="ID Type*" placeholder="Select" />
                <FormField label="ID Number*" placeholder="Enter ID number" />
                <SelectField label="Membership type*" placeholder="Select" />
                <SelectField label="Abbreviation" placeholder="Select" />
                <FormField label="First Name*" placeholder="Enter first name" />
                <FormField label="Last Name*" placeholder="Enter last name" />
                <SelectField label="Gender" placeholder="Select" />
                <FormField
                  label="Date of birth*"
                  placeholder="Select"
                  trailingIcon={<CalendarDays className="h-3.5 w-3.5" />}
                />
                <SelectField label="Occupation" placeholder="Select" />
              </div>
            </div>

            <div className="border-t border-[#e0e4eb] pt-5">
              <SectionHeading icon={Phone} title="Contact" muted />

              <div className="grid grid-cols-[minmax(0,1fr)_96px_270px] gap-x-4 gap-y-4">
                <FormField label="Email address*" placeholder="Enter your email address" />
                <Button
                  variant="outline"
                  className="mt-[19px] h-[34px] rounded-md border-[#e2e6ed] bg-[#fbfbfc] px-3 text-[11px] font-medium text-[#a7b0c0] hover:bg-[#fbfbfc] hover:text-[#a7b0c0]"
                >
                  Send code
                </Button>
                <label className="mt-[24px] flex items-center gap-2 text-[12px] text-[#67748d]">
                  <Checkbox className="h-3.5 w-3.5 rounded-[3px] border-[#d4dae4] data-[state=checked]:bg-[#3159c6] data-[state=checked]:border-[#3159c6]" />
                  <span>Customer declines to provide email address</span>
                </label>

                <FormField label="Mobile phone number*" placeholder="Enter your phone number" />
                <Button
                  variant="outline"
                  className="mt-[19px] h-[34px] rounded-md border-[#e2e6ed] bg-[#fbfbfc] px-3 text-[11px] font-medium text-[#a7b0c0] hover:bg-[#fbfbfc] hover:text-[#a7b0c0]"
                >
                  Send code
                </Button>
                <label className="mt-[24px] flex items-center gap-2 text-[12px] text-[#67748d]">
                  <Checkbox className="h-3.5 w-3.5 rounded-[3px] border-[#d4dae4] data-[state=checked]:bg-[#3159c6] data-[state=checked]:border-[#3159c6]" />
                  <span>Customer declines to provide mobile phone number</span>
                </label>

                <FormField label="Home phone number" placeholder="Enter your home phone number" />
                <SelectField label="Notifications" placeholder="Select" />
              </div>
            </div>

            <div className="mt-6 border-t border-[#e0e4eb] pt-5">
              <SectionHeading icon={MapPin} title="Address" muted />

              <label className="mb-4 flex items-center gap-2 text-[12px] text-[#67748d]">
                <Checkbox className="h-3.5 w-3.5 rounded-[3px] border-[#d4dae4] data-[state=checked]:bg-[#3159c6] data-[state=checked]:border-[#3159c6]" />
                <span>Same address as primary member</span>
              </label>

              <div className="grid grid-cols-[minmax(0,1.65fr)_minmax(0,0.75fr)_minmax(0,0.75fr)_minmax(0,0.75fr)] gap-x-16 gap-y-4">
                <FormField label="Address*" placeholder="Enter your address" />
                <SelectField label="Country" placeholder="Select" />
                <SelectField label="State" placeholder="Select" />
                <SelectField label="City" placeholder="Select" />
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#d9dee8] pt-4">
          <div className="flex gap-5">
            <Button
              variant="outline"
              className="h-[38px] rounded-md border-[#6e94e8] px-4 text-[12px] font-medium text-[#3570da] hover:bg-[#eef4ff] hover:text-[#2f68cf]"
            >
              <House className="h-3.5 w-3.5" />
              Go back home
            </Button>
            <Button
              variant="outline"
              className="h-[38px] rounded-md border-[#6e94e8] px-5 text-[12px] font-medium text-[#3570da] hover:bg-[#eef4ff] hover:text-[#2f68cf]"
            >
              Save changes
            </Button>
          </div>

          <div className="flex gap-4">
            <Button className="h-[38px] min-w-[94px] rounded-md bg-[#e54d2e] px-6 text-[12px] font-medium text-white hover:bg-[#d94729]">
              Previous
            </Button>
            <Button
              disabled
              className="h-[38px] min-w-[112px] rounded-md bg-[#eef0f4] px-6 text-[12px] font-medium text-[#aab2c0] hover:bg-[#eef0f4]"
            >
              Add member
            </Button>
          </div>
        </div>
      </main>

      <button className="fixed right-0 top-[102px] flex h-[58px] w-[38px] items-center justify-center rounded-l-xl bg-[#1d387d] text-white shadow-lg">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#223f8a]">
          <Smartphone className="h-4 w-4" />
        </div>
      </button>
    </div>
  );
}
