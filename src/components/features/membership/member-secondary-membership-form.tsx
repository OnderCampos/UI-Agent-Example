import {
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  ChevronDown,
  ChevronLeft,
  CreditCard,
  FolderOpen,
  Globe,
  Home,
  Languages,
  MapPin,
  Smartphone,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const fieldClassName =
  "h-9 rounded-md border-[#d0d5dd] bg-white px-3 text-[12px] text-[#344054] placeholder:text-[#98a2b3] focus-visible:ring-1 focus-visible:ring-[#2b63cc] focus-visible:ring-offset-0";

function TopBar() {
  return (
    <header className="shadow-sm">
      <div className="flex h-[43px] items-center justify-between bg-[#133789] px-7 text-white">
        <div className="text-[26px] font-bold tracking-tight">
          Price<span className="text-[#f58220]">Smart</span>
        </div>
        <div className="flex items-center gap-6 text-[12px] font-medium">
          <div className="flex items-center gap-1.5 opacity-95">
            <MapPin className="h-3.5 w-3.5" />
            Miraflores
          </div>
          <div className="flex items-center gap-1.5 opacity-95">
            <Globe className="h-3.5 w-3.5" />
            Guatemala
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
          <div className="flex items-center gap-1.5 opacity-95">
            <Languages className="h-3.5 w-3.5" />
            English
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
      <div className="h-[28px] bg-[#1d53c8]" />
    </header>
  );
}

function Stepper() {
  return (
    <aside className="border-r border-[#e5e7eb] px-0 py-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#344054]">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#344054] text-[10px] text-white">
          1
        </span>
        Membership data
      </div>
    </aside>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  muted = false,
}: {
  icon: typeof UserRound;
  title: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`mb-4 flex items-center gap-2 ${muted ? "text-[#c4c7cf]" : "text-[#2f4e94]"}`}
    >
      <Icon className="h-4 w-4" />
      <h2 className="text-[15px] font-medium">{title}</h2>
    </div>
  );
}

function Field({
  label,
  placeholder,
  className = "",
}: {
  label: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-[11px] font-medium text-[#475467]">{label}</label>
      <Input placeholder={placeholder} className={fieldClassName} />
    </div>
  );
}

function SelectField({
  label,
  placeholder = "Select",
  className = "",
}: {
  label: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <label className="mb-1.5 block text-[11px] font-medium text-[#475467]">{label}</label>
      <div className="pointer-events-none absolute right-3 top-[34px] text-[#667085]">
        <ChevronDown className="h-4 w-4" />
      </div>
      <Input placeholder={placeholder} className={`${fieldClassName} pr-9`} />
    </div>
  );
}

function SendCodeRow({ label, placeholder, checkboxLabel }: { label: string; placeholder: string; checkboxLabel: string }) {
  return (
    <div className="grid grid-cols-[1.25fr_96px_1fr] items-end gap-4">
      <Field label={label} placeholder={placeholder} />
      <Button
        type="button"
        variant="outline"
        className="h-9 rounded-md border-[#e4e7ec] bg-[#f8fafc] text-[12px] font-semibold text-[#98a2b3] hover:bg-[#f8fafc] hover:text-[#98a2b3]"
      >
        Send code
      </Button>
      <label className="flex h-9 items-center gap-2 text-[12px] text-[#475467]">
        <Checkbox className="h-4 w-4 border-[#d0d5dd] data-[state=checked]:bg-[#2b63cc] data-[state=checked]:border-[#2b63cc]" />
        <span>{checkboxLabel}</span>
      </label>
    </div>
  );
}

export function MemberSecondaryMembershipForm() {
  return (
    <div className="min-h-screen bg-[#f6f7f9] text-[#101828]">
      <TopBar />

      <main className="mx-auto max-w-[1170px] px-6 pb-6 pt-4">
        <div className="mb-4">
          <h1 className="text-[18px] font-medium text-[#2c4a91]">Nicolas Treviño</h1>
          <p className="mt-1 text-[12px] text-[#667085]">Primary membership</p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-medium text-[#2c4a91]">New secondary membership</h2>
          <Button
            variant="outline"
            className="h-8 rounded-md border-[#8eb0ef] bg-white px-4 text-[11px] font-medium text-[#2160d0] hover:bg-[#f5f8ff]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="grid grid-cols-[92px_1fr] gap-5">
          <Stepper />

          <section className="rounded-sm bg-transparent">
            <div className="rounded-sm border-b border-[#e4e7ec] pb-5">
              <SectionTitle icon={FolderOpen} title="Personal data" />

              <div className="grid grid-cols-[86px_1fr] gap-6">
                <div className="flex flex-col items-center pt-3">
                  <div className="h-[88px] w-[88px] rounded-full bg-[#cfd4dc]" />
                  <button className="mt-3 flex items-center gap-1 text-[10px] font-medium text-[#3b82f6]">
                    <Camera className="h-3 w-3" />
                    Take photo
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-x-4 gap-y-4">
                  <SelectField label="ID Type *" />
                  <Field label="ID Number *" placeholder="Enter ID number" />
                  <SelectField label="Membership type *" />
                  <SelectField label="Abbreviation" />
                  <Field label="First Name *" placeholder="Enter first name" />
                  <Field label="Last Name *" placeholder="Enter last name" />
                  <SelectField label="Gender" />
                  <div className="relative">
                    <label className="mb-1.5 block text-[11px] font-medium text-[#475467]">Date of birth *</label>
                    <Input placeholder="Select" className={`${fieldClassName} pr-9`} />
                    <CalendarDays className="pointer-events-none absolute right-3 top-[34px] h-4 w-4 text-[#98a2b3]" />
                  </div>
                  <SelectField label="Occupation" />
                </div>
              </div>
            </div>

            <div className="border-b border-[#e4e7ec] py-5">
              <SectionTitle icon={Smartphone} title="Contact" muted />
              <div className="space-y-4">
                <SendCodeRow
                  label="Email address *"
                  placeholder="Enter your email address"
                  checkboxLabel="Customer declines to provide email address"
                />
                <SendCodeRow
                  label="Mobile phone number *"
                  placeholder="Enter your phone number"
                  checkboxLabel="Customer declines to provide mobile phone number"
                />
                <div className="grid grid-cols-[1.25fr_96px_1fr] gap-4">
                  <Field label="Home phone number" placeholder="Enter your home phone number" />
                  <div />
                  <SelectField label="Notifications" />
                </div>
              </div>
            </div>

            <div className="py-5">
              <SectionTitle icon={Home} title="Address" muted />
              <label className="mb-4 flex items-center gap-2 text-[12px] text-[#475467]">
                <Checkbox className="h-4 w-4 border-[#d0d5dd] data-[state=checked]:bg-[#2b63cc] data-[state=checked]:border-[#2b63cc]" />
                <span>Same address as primary member</span>
              </label>

              <div className="grid grid-cols-[1.4fr_0.65fr_0.65fr_0.65fr] gap-4">
                <Field label="Address *" placeholder="Enter your address" />
                <SelectField label="Country" />
                <SelectField label="State" />
                <SelectField label="City" />
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-6 flex items-center justify-between border-t border-[#d8dde7] pt-4">
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="h-10 rounded-md border-[#8eb0ef] bg-white px-5 text-[13px] font-medium text-[#2160d0] hover:bg-[#f5f8ff]"
            >
              <ChevronLeft className="h-4 w-4" />
              Go back home
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-md border-[#6a8fe1] bg-white px-5 text-[13px] font-medium text-[#2160d0] hover:bg-[#f5f8ff]"
            >
              Save changes
            </Button>
          </div>

          <div className="flex gap-4">
            <Button className="h-10 min-w-[94px] rounded-md bg-[#e54c2a] px-5 text-[13px] font-medium text-white hover:bg-[#d84322]">
              Previous
            </Button>
            <Button
              disabled
              className="h-10 min-w-[96px] rounded-md bg-[#eaecf0] px-5 text-[13px] font-medium text-[#b3b8c2] hover:bg-[#eaecf0]"
            >
              Add member
            </Button>
          </div>
        </footer>
      </main>

      <div className="fixed right-4 top-[70px] flex h-[54px] w-[36px] items-center justify-center rounded-xl bg-[#1f3b83] shadow-lg">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white">
          <CreditCard className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
