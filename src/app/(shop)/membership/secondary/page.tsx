"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Folder,
  Phone,
  MapPin,
  Home,
  Save,
  Camera,
  ChevronLeft,
  Plus,
  Calendar,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, type SelectOption } from "@/components/ui/select";

const idTypeOptions: SelectOption[] = [
  { value: "dpi", label: "DPI" },
  { value: "passport", label: "Passport" },
  { value: "license", label: "Driver's License" },
];

const membershipTypeOptions: SelectOption[] = [
  { value: "business", label: "Business" },
  { value: "diamond", label: "Diamond" },
  { value: "gold", label: "Gold" },
];

const abbreviationOptions: SelectOption[] = [
  { value: "mr", label: "Mr." },
  { value: "mrs", label: "Mrs." },
  { value: "ms", label: "Ms." },
  { value: "dr", label: "Dr." },
];

const genderOptions: SelectOption[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const occupationOptions: SelectOption[] = [
  { value: "urban-planner", label: "Urban planner" },
  { value: "engineer", label: "Engineer" },
  { value: "teacher", label: "Teacher" },
];

const countryOptions: SelectOption[] = [
  { value: "guatemala", label: "Guatemala" },
  { value: "costa-rica", label: "Costa Rica" },
  { value: "panama", label: "Panama" },
];

const stateOptions: SelectOption[] = [
  { value: "sacatepequez", label: "Sacatepequez" },
  { value: "antigua", label: "Antigua" },
  { value: "guatemala-city", label: "Guatemala City" },
];

const cityOptions: SelectOption[] = [
  { value: "antigua", label: "Antigua" },
  { value: "guatemala-city", label: "Guatemala City" },
  { value: "ciudad-vieja", label: "Ciudad Vieja" },
];

const notificationOptions: SelectOption[] = [
  { value: "email", label: "By email address" },
  { value: "sms", label: "By SMS" },
  { value: "none", label: "No notifications" },
];

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[#003d7a] mb-6">
      <Icon className="w-6 h-6" />
      <h2 className="text-xl font-normal">{title}</h2>
    </div>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-gray-600 font-normal">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

export default function SecondaryMembershipPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailDeclined, setEmailDeclined] = useState(false);
  const [mobileDeclined, setMobileDeclined] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const [notifications, setNotifications] = useState<string>("email");

  const handleSaveChanges = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Blue sub-header matching the reference */}
      <div className="bg-[#0052a1] h-12" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar with steps */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-[#0052a1] text-white flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                </div>
                <div>
                  <p className="text-[#003d7a] font-medium">Membership data</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Primary member header */}
            <div className="mb-6">
              <h1 className="text-3xl font-normal text-[#003d7a]">
                Nicolas Treviño
              </h1>
              <p className="text-[#003d7a] text-base mt-1">Primary membership</p>
            </div>

            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-2xl font-normal text-[#003d7a]">
                New secondary membership
              </h2>
              <Button
                variant="outline"
                className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 rounded-lg px-4 py-2 h-auto"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture Member ID
              </Button>
            </div>

            {/* Personal data section */}
            <section className="mb-10">
              <SectionTitle icon={Folder} title="Personal data" />
              <div className="flex flex-col md:flex-row gap-8">
                {/* Photo column */}
                <div className="flex flex-col items-center gap-2 md:w-40">
                  <div className="w-36 h-36 rounded-full overflow-hidden bg-[#d1d5db] border-4 border-white shadow-md flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <button
                    type="button"
                    className="text-sm text-[#0052a1] hover:underline"
                  >
                    Take photo
                  </button>
                </div>

                {/* Fields grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                  <FormField label="ID Type" required>
                    <Select placeholder="Select" options={idTypeOptions} />
                  </FormField>

                  <FormField label="ID Number" required>
                    <Input placeholder="Enter ID number" />
                  </FormField>

                  <FormField label="Membership type" required>
                    <Select
                      placeholder="Select"
                      options={membershipTypeOptions}
                    />
                  </FormField>

                  <FormField label="Abbreviation">
                    <Select placeholder="Select" options={abbreviationOptions} />
                  </FormField>

                  <FormField label="First Name" required>
                    <Input placeholder="Enter first name" />
                  </FormField>

                  <FormField label="Last Name" required>
                    <Input placeholder="Enter last name" />
                  </FormField>

                  <FormField label="Gender">
                    <Select placeholder="Select" options={genderOptions} />
                  </FormField>

                  <FormField label="Date of birth" required>
                    <div className="relative">
                      <Input placeholder="Select" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </FormField>

                  <FormField label="Occupation">
                    <Select placeholder="Select" options={occupationOptions} />
                  </FormField>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 my-8" />

            {/* Contact section */}
            <section className="mb-10">
              <SectionTitle icon={Phone} title="Contact" />
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <FormField label="Email address" required>
                    <Input
                      placeholder="Enter your email address"
                      disabled={emailDeclined}
                    />
                  </FormField>
                  <Button
                    variant="outline"
                    className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 rounded-lg px-6 h-10 mt-7 md:mt-0"
                  >
                    Send code
                  </Button>
                  <div className="flex items-center gap-2 md:mt-7">
                    <Checkbox
                      id="email-declined"
                      checked={emailDeclined}
                      onCheckedChange={(checked) =>
                        setEmailDeclined(checked === true)
                      }
                    />
                    <Label
                      htmlFor="email-declined"
                      className="text-sm text-gray-600 font-normal cursor-pointer"
                    >
                      Customer declines to provide email address
                    </Label>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <FormField label="Mobile phone number" required>
                    <Input
                      placeholder="Enter your phone number"
                      disabled={mobileDeclined}
                    />
                  </FormField>
                  <Button
                    variant="outline"
                    className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 rounded-lg px-6 h-10 mt-7 md:mt-0"
                  >
                    Send code
                  </Button>
                  <div className="flex items-center gap-2 md:mt-7">
                    <Checkbox
                      id="mobile-declined"
                      checked={mobileDeclined}
                      onCheckedChange={(checked) =>
                        setMobileDeclined(checked === true)
                      }
                    />
                    <Label
                      htmlFor="mobile-declined"
                      className="text-sm text-gray-600 font-normal cursor-pointer"
                    >
                      Customer declines to provide mobile phone number
                    </Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <FormField label="Home phone number">
                    <Input placeholder="Enter your home phone number" />
                  </FormField>

                  <FormField label="Notifications">
                    <Select
                      placeholder="Select"
                      options={notificationOptions}
                      value={notifications}
                      onChange={setNotifications}
                    />
                  </FormField>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 my-8" />

            {/* Address section */}
            <section className="mb-10">
              <SectionTitle icon={MapPin} title="Address" />
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="same-address"
                    checked={sameAddress}
                    onCheckedChange={(checked) =>
                      setSameAddress(checked === true)
                    }
                  />
                  <Label
                    htmlFor="same-address"
                    className="text-sm text-gray-600 font-normal cursor-pointer"
                  >
                    Same address as primary member
                  </Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
                  <div className="lg:col-span-2">
                    <FormField label="Address" required>
                      <Input placeholder="Enter your address" />
                    </FormField>
                  </div>
                  <FormField label="Country">
                    <Select placeholder="Select" options={countryOptions} />
                  </FormField>
                  <FormField label="State">
                    <Select placeholder="Select" options={stateOptions} />
                  </FormField>
                  <FormField label="City">
                    <Select placeholder="Select" options={cityOptions} />
                  </FormField>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Link href="/" className="flex-1 sm:flex-initial">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 rounded-lg px-6 h-11"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go back home
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleSaveChanges}
                disabled={isLoading}
                className="flex-1 sm:flex-initial border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 rounded-lg px-6 h-11"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Button className="flex-1 sm:flex-initial bg-[#f5a623] hover:bg-[#d4900f] text-white rounded-lg px-8 h-11">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button className="flex-1 sm:flex-initial bg-[#0052a1] hover:bg-[#003d7a] text-white rounded-lg px-8 h-11">
                <Plus className="w-4 h-4 mr-2" />
                Add member
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
