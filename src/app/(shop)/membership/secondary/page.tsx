"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FolderOpen,
  Phone,
  MapPin,
  Home,
  Save,
  ChevronLeft,
  Camera,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { MembershipStepper } from "@/components/features/membership/membership-stepper";
import type { MembershipStep } from "@/components/features/membership/membership-stepper";
import { SelectField } from "@/components/features/membership/select-field";
import { FormSection } from "@/components/features/membership/form-section";

const membershipSteps: MembershipStep[] = [
  { id: 1, name: "Membership data", href: "/membership/new" },
  { id: 2, name: "Payment", href: "/membership/new/payment" },
];

const idTypeOptions = [
  { value: "DNI", label: "DNI" },
  { value: "Passport", label: "Passport" },
  { value: "DriversLicense", label: "Driver's License" },
];

const membershipTypeOptions = [
  { value: "Diamond", label: "Diamond" },
  { value: "Gold", label: "Gold" },
  { value: "Silver", label: "Silver" },
];

const abbreviationOptions = [
  { value: "Mr.", label: "Mr." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Ms.", label: "Ms." },
  { value: "Dr.", label: "Dr." },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const occupationOptions = [
  { value: "Urban planner", label: "Urban planner" },
  { value: "Engineer", label: "Engineer" },
  { value: "Teacher", label: "Teacher" },
  { value: "Doctor", label: "Doctor" },
  { value: "Other", label: "Other" },
];

const notificationOptions = [
  { value: "By email address", label: "By email address" },
  { value: "By SMS", label: "By SMS" },
  { value: "None", label: "None" },
];

const countryOptions = [{ value: "Guatemala", label: "Guatemala" }];
const stateOptions = [{ value: "Antigua", label: "Antigua" }];
const cityOptions = [{ value: "Sacatepequez", label: "Sacatepequez" }];

interface SecondaryMembershipForm {
  idType: string;
  idNumber: string;
  membershipType: string;
  abbreviation: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  occupation: string;
  email: string;
  emailDeclined: boolean;
  mobilePhone: string;
  mobilePhoneDeclined: boolean;
  homePhone: string;
  notifications: string;
  sameAddressAsPrimary: boolean;
  address: string;
  country: string;
  state: string;
  city: string;
}

export default function NewSecondaryMembershipPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<SecondaryMembershipForm>({
    idType: "",
    idNumber: "",
    membershipType: "",
    abbreviation: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    occupation: "",
    email: "",
    emailDeclined: false,
    mobilePhone: "",
    mobilePhoneDeclined: false,
    homePhone: "",
    notifications: "",
    sameAddressAsPrimary: false,
    address: "",
    country: "",
    state: "",
    city: "",
  });

  const handleFieldChange = <K extends keyof SecondaryMembershipForm>(
    field: K,
    value: SecondaryMembershipForm[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Primary member header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#003d7a]">
            Nicolas Treviño
          </h1>
          <p className="text-gray-500 text-sm mt-1">Primary membership</p>
        </div>

        {/* Page title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#003d7a]">
            New secondary membership
          </h2>
          <Button
            variant="outline"
            className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 rounded-lg font-semibold self-start"
          >
            <Camera className="w-4 h-4 mr-2" />
            Capture Member ID
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Stepper Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <MembershipStepper
              steps={membershipSteps}
              currentStepId={1}
            />
          </aside>

          {/* Main Form */}
          <main className="flex-1 min-w-0">
            {/* Personal Data */}
            <FormSection icon={FolderOpen} title="Personal data">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Photo placeholder */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#e6e8ec] flex items-center justify-center" />
                  <Button
                    variant="link"
                    className="text-[#0052a1] hover:text-[#003d7a] font-medium text-sm h-auto py-1"
                  >
                    Take photo
                  </Button>
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                  <SelectField
                    label={<span>ID Type <span className="text-red-500">*</span></span>}
                    options={idTypeOptions}
                    value={formData.idType}
                    onChange={(value) => handleFieldChange("idType", value)}
                    required
                  />

                  <div className="space-y-2">
                    <Label htmlFor="idNumber" className="text-sm font-medium text-gray-700">
                      ID Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="idNumber"
                      placeholder="Enter ID number"
                      value={formData.idNumber}
                      onChange={(e) => handleFieldChange("idNumber", e.target.value)}
                      className="border-gray-300 focus-visible:ring-[#0052a1]"
                    />
                  </div>

                  <SelectField
                    label={<span>Membership type <span className="text-red-500">*</span></span>}
                    options={membershipTypeOptions}
                    value={formData.membershipType}
                    onChange={(value) => handleFieldChange("membershipType", value)}
                    required
                  />

                  <SelectField
                    label="Abbreviation"
                    options={abbreviationOptions}
                    value={formData.abbreviation}
                    onChange={(value) => handleFieldChange("abbreviation", value)}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => handleFieldChange("firstName", e.target.value)}
                      className="border-gray-300 focus-visible:ring-[#0052a1]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => handleFieldChange("lastName", e.target.value)}
                      className="border-gray-300 focus-visible:ring-[#0052a1]"
                    />
                  </div>

                  <SelectField
                    label="Gender"
                    options={genderOptions}
                    value={formData.gender}
                    onChange={(value) => handleFieldChange("gender", value)}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                      Date of birth <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="dateOfBirth"
                        type="date"
                        placeholder="Select"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleFieldChange("dateOfBirth", e.target.value)}
                        className="border-gray-300 focus-visible:ring-[#0052a1] pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <SelectField
                    label="Occupation"
                    options={occupationOptions}
                    value={formData.occupation}
                    onChange={(value) => handleFieldChange("occupation", value)}
                  />
                </div>
              </div>
            </FormSection>

            <Separator className="my-8 bg-gray-200" />

            {/* Contact */}
            <FormSection icon={Phone} title="Contact">
              <div className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex flex-col sm:flex-row gap-3 flex-1">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        disabled={formData.emailDeclined}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        className="max-w-md border-gray-300 focus-visible:ring-[#0052a1]"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        disabled={formData.emailDeclined}
                        className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg"
                      >
                        Send code
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="emailDeclined"
                        checked={formData.emailDeclined}
                        onCheckedChange={(checked) =>
                          handleFieldChange("emailDeclined", Boolean(checked))
                        }
                      />
                      <Label
                        htmlFor="emailDeclined"
                        className="text-sm font-normal text-gray-600 cursor-pointer"
                      >
                        Customer declines to provide email address
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Mobile phone */}
                <div className="space-y-2">
                  <Label htmlFor="mobilePhone" className="text-sm font-medium text-gray-700">
                    Mobile phone number <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex flex-col sm:flex-row gap-3 flex-1">
                      <Input
                        id="mobilePhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.mobilePhone}
                        disabled={formData.mobilePhoneDeclined}
                        onChange={(e) => handleFieldChange("mobilePhone", e.target.value)}
                        className="max-w-md border-gray-300 focus-visible:ring-[#0052a1]"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        disabled={formData.mobilePhoneDeclined}
                        className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg"
                      >
                        Send code
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="mobilePhoneDeclined"
                        checked={formData.mobilePhoneDeclined}
                        onCheckedChange={(checked) =>
                          handleFieldChange("mobilePhoneDeclined", Boolean(checked))
                        }
                      />
                      <Label
                        htmlFor="mobilePhoneDeclined"
                        className="text-sm font-normal text-gray-600 cursor-pointer"
                      >
                        Customer declines to provide mobile phone number
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Home phone + Notifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 max-w-4xl">
                  <div className="space-y-2">
                    <Label htmlFor="homePhone" className="text-sm font-medium text-gray-700">
                      Home phone number
                    </Label>
                    <Input
                      id="homePhone"
                      type="tel"
                      placeholder="Enter your home phone number"
                      value={formData.homePhone}
                      onChange={(e) => handleFieldChange("homePhone", e.target.value)}
                      className="border-gray-300 focus-visible:ring-[#0052a1]"
                    />
                  </div>

                  <SelectField
                    label="Notifications"
                    options={notificationOptions}
                    value={formData.notifications}
                    onChange={(value) => handleFieldChange("notifications", value)}
                    className="bg-white"
                  />
                </div>
              </div>
            </FormSection>

            <Separator className="my-8 bg-gray-200" />

            {/* Address */}
            <FormSection icon={MapPin} title="Address">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="sameAddressAsPrimary"
                    checked={formData.sameAddressAsPrimary}
                    onCheckedChange={(checked) =>
                      handleFieldChange("sameAddressAsPrimary", Boolean(checked))
                    }
                  />
                  <Label
                    htmlFor="sameAddressAsPrimary"
                    className="text-sm font-normal text-gray-700 cursor-pointer"
                  >
                    Same address as primary member
                  </Label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="address"
                      placeholder="Enter your address"
                      value={formData.address}
                      disabled={formData.sameAddressAsPrimary}
                      onChange={(e) => handleFieldChange("address", e.target.value)}
                      className="border-gray-300 focus-visible:ring-[#0052a1]"
                    />
                  </div>

                  <SelectField
                    label="Country"
                    options={countryOptions}
                    value={formData.country}
                    disabled={formData.sameAddressAsPrimary}
                    onChange={(value) => handleFieldChange("country", value)}
                    className="bg-white"
                  />

                  <SelectField
                    label="State"
                    options={stateOptions}
                    value={formData.state}
                    disabled={formData.sameAddressAsPrimary}
                    onChange={(value) => handleFieldChange("state", value)}
                    className="bg-white"
                  />

                  <SelectField
                    label="City"
                    options={cityOptions}
                    value={formData.city}
                    disabled={formData.sameAddressAsPrimary}
                    onChange={(value) => handleFieldChange("city", value)}
                    className="bg-white"
                  />
                </div>
              </div>
            </FormSection>
          </main>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 rounded-lg font-semibold"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go back home
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={handleSave}
                disabled={isSaving}
                className="w-full sm:w-auto rounded-lg font-semibold border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save changes"}
              </Button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                onClick={() => router.back()}
                className="w-full sm:w-auto bg-[#d84315] hover:bg-[#bf360c] text-white rounded-lg font-semibold px-8"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                disabled
                className="w-full sm:w-auto bg-gray-100 text-gray-400 rounded-lg font-semibold px-8 disabled:opacity-100"
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
