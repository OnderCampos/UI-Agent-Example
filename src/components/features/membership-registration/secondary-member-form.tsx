"use client";

import { useState } from "react";
import { User, Folder, Phone, MapPin, Home, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SecondaryMemberFormData {
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
  mobileDeclined: boolean;
  homePhone: string;
  notifications: string;
  sameAddressAsPrimary: boolean;
  address: string;
  country: string;
  state: string;
  city: string;
}

interface SecondaryMemberFormProps {
  primaryMemberName?: string;
  defaultData?: Partial<SecondaryMemberFormData>;
  onSubmit?: (data: SecondaryMemberFormData) => void;
  onGoHome?: () => void;
  onSaveChanges?: () => void;
  onPrevious?: () => void;
  onAddMember?: () => void;
  onCaptureMemberId?: () => void;
  onTakePhoto?: () => void;
}

const idTypes = [
  { value: "DPI", label: "DPI" },
  { value: "Passport", label: "Passport" },
];

const abbreviations = [
  { value: "Mr.", label: "Mr." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Ms.", label: "Ms." },
];

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const membershipTypes = [
  { value: "Diamond", label: "Diamond" },
  { value: "Business", label: "Business" },
];

const occupations = [
  { value: "Urban planner", label: "Urban planner" },
  { value: "Engineer", label: "Engineer" },
  { value: "Teacher", label: "Teacher" },
];

const notifications = [
  { value: "Email", label: "By email address" },
  { value: "SMS", label: "By SMS" },
];

const countries = [
  { value: "Guatemala", label: "Guatemala" },
];

const states = [
  { value: "Antigua", label: "Antigua" },
];

const cities = [
  { value: "Sacatepequez", label: "Sacatepequez" },
];

export function SecondaryMemberForm({
  primaryMemberName = "Nicolas Treviño",
  defaultData,
  onSubmit,
  onGoHome,
  onSaveChanges,
  onPrevious,
  onAddMember,
  onCaptureMemberId,
  onTakePhoto,
}: SecondaryMemberFormProps) {
  const [data, setData] = useState<SecondaryMemberFormData>({
    idType: defaultData?.idType ?? "",
    idNumber: defaultData?.idNumber ?? "",
    membershipType: defaultData?.membershipType ?? "",
    abbreviation: defaultData?.abbreviation ?? "",
    firstName: defaultData?.firstName ?? "",
    lastName: defaultData?.lastName ?? "",
    gender: defaultData?.gender ?? "",
    dateOfBirth: defaultData?.dateOfBirth ?? "",
    occupation: defaultData?.occupation ?? "",
    email: defaultData?.email ?? "",
    emailDeclined: defaultData?.emailDeclined ?? false,
    mobilePhone: defaultData?.mobilePhone ?? "",
    mobileDeclined: defaultData?.mobileDeclined ?? false,
    homePhone: defaultData?.homePhone ?? "",
    notifications: defaultData?.notifications ?? "",
    sameAddressAsPrimary: defaultData?.sameAddressAsPrimary ?? false,
    address: defaultData?.address ?? "",
    country: defaultData?.country ?? "",
    state: defaultData?.state ?? "",
    city: defaultData?.city ?? "",
  });

  const updateField = <K extends keyof SecondaryMemberFormData>(
    field: K,
    value: SecondaryMemberFormData[K]
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(data);
  };

  const SectionHeader = ({
    icon: Icon,
    title,
  }: {
    icon: React.ElementType;
    title: string;
  }) => (
    <div className="flex items-center gap-2 text-[#0052a1] mb-6">
      <Icon className="w-5 h-5" />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );

  const FormGroup = ({
    label,
    htmlFor,
    required,
    children,
    className,
  }: {
    label: string;
    htmlFor: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor} className="text-sm text-[#424242]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
    </div>
  );

  const NativeSelect = ({
    id,
    value,
    onChange,
    placeholder,
    options,
    required,
  }: {
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    options: { value: string; label: string }[];
    required?: boolean;
  }) => (
    <Select value={value} onValueChange={onChange} required={required}>
      <SelectTrigger
        id={id}
        className="h-11 border-gray-300 bg-white text-[#616161]"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const TextInput = ({
    id,
    value,
    onChange,
    placeholder,
    type = "text",
    required,
    disabled,
  }: {
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
  }) => (
    <Input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className="h-11 border-gray-300 bg-white text-[#212121] placeholder:text-[#9e9e9e]"
    />
  );

  const DeclineCheckbox = ({
    id,
    checked,
    onChange,
    label,
  }: {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
  }) => (
    <div className="flex items-center gap-2 pt-7">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onChange(value === true)}
        className="border-gray-300 data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
      />
      <Label htmlFor={id} className="text-sm text-[#424242] cursor-pointer">
        {label}
      </Label>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
      <div className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
        <div className="max-w-6xl space-y-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-[#003d7a]">
              {primaryMemberName}
            </h1>
            <p className="text-sm text-[#616161]">Primary membership</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-[#003d7a]">
              New secondary membership
            </h2>
            {onCaptureMemberId && (
              <Button
                type="button"
                variant="outline"
                onClick={onCaptureMemberId}
                className="border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa]"
              >
                Capture Member ID
              </Button>
            )}
          </div>

          <section className="border-b border-gray-200 pb-8">
            <SectionHeader icon={Folder} title="Personal data" />

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg bg-[#d1d5db] flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button
                  type="button"
                  onClick={onTakePhoto}
                  className="text-sm text-[#0066cc] hover:text-[#0052a1] font-medium"
                >
                  Take photo
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                <FormGroup label="ID Type" htmlFor="idType" required>
                  <NativeSelect
                    id="idType"
                    value={data.idType}
                    onChange={(value) => updateField("idType", value)}
                    placeholder="Select"
                    options={idTypes}
                    required
                  />
                </FormGroup>

                <FormGroup label="ID Number" htmlFor="idNumber" required>
                  <TextInput
                    id="idNumber"
                    value={data.idNumber}
                    onChange={(value) => updateField("idNumber", value)}
                    placeholder="Enter ID number"
                    required
                  />
                </FormGroup>

                <FormGroup
                  label="Membership type"
                  htmlFor="membershipType"
                  required
                >
                  <NativeSelect
                    id="membershipType"
                    value={data.membershipType}
                    onChange={(value) => updateField("membershipType", value)}
                    placeholder="Select"
                    options={membershipTypes}
                    required
                  />
                </FormGroup>

                <FormGroup label="Abbreviation" htmlFor="abbreviation">
                  <NativeSelect
                    id="abbreviation"
                    value={data.abbreviation}
                    onChange={(value) => updateField("abbreviation", value)}
                    placeholder="Select"
                    options={abbreviations}
                  />
                </FormGroup>

                <FormGroup label="First Name" htmlFor="firstName" required>
                  <TextInput
                    id="firstName"
                    value={data.firstName}
                    onChange={(value) => updateField("firstName", value)}
                    placeholder="Enter first name"
                    required
                  />
                </FormGroup>

                <FormGroup label="Last Name" htmlFor="lastName" required>
                  <TextInput
                    id="lastName"
                    value={data.lastName}
                    onChange={(value) => updateField("lastName", value)}
                    placeholder="Enter last name"
                    required
                  />
                </FormGroup>

                <FormGroup label="Gender" htmlFor="gender">
                  <NativeSelect
                    id="gender"
                    value={data.gender}
                    onChange={(value) => updateField("gender", value)}
                    placeholder="Select"
                    options={genders}
                  />
                </FormGroup>

                <FormGroup label="Date of birth" htmlFor="dateOfBirth" required>
                  <div className="relative">
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={data.dateOfBirth}
                      onChange={(e) => updateField("dateOfBirth", e.target.value)}
                      placeholder="Select"
                      required
                      className="h-11 border-gray-300 bg-white text-[#212121] placeholder:text-[#9e9e9e] pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9e9e9e] pointer-events-none" />
                  </div>
                </FormGroup>

                <FormGroup label="Occupation" htmlFor="occupation">
                  <NativeSelect
                    id="occupation"
                    value={data.occupation}
                    onChange={(value) => updateField("occupation", value)}
                    placeholder="Select"
                    options={occupations}
                  />
                </FormGroup>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-8">
            <SectionHeader icon={Phone} title="Contact" />

            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-4">
                  <FormGroup label="Email address" htmlFor="email" required>
                    <TextInput
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(value) => updateField("email", value)}
                      placeholder="Enter your email address"
                      required={!data.emailDeclined}
                      disabled={data.emailDeclined}
                    />
                  </FormGroup>
                </div>
                <div className="lg:col-span-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 border-[#bdbdbd] text-[#424242] hover:bg-[#f5f5f5] mt-7"
                  >
                    Send code
                  </Button>
                </div>
                <div className="lg:col-span-5">
                  <DeclineCheckbox
                    id="emailDeclined"
                    checked={data.emailDeclined}
                    onChange={(checked) => updateField("emailDeclined", checked)}
                    label="Customer declines to provide email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-4">
                  <FormGroup
                    label="Mobile phone number"
                    htmlFor="mobilePhone"
                    required
                  >
                    <TextInput
                      id="mobilePhone"
                      type="tel"
                      value={data.mobilePhone}
                      onChange={(value) => updateField("mobilePhone", value)}
                      placeholder="Enter your phone number"
                      required={!data.mobileDeclined}
                      disabled={data.mobileDeclined}
                    />
                  </FormGroup>
                </div>
                <div className="lg:col-span-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 border-[#bdbdbd] text-[#424242] hover:bg-[#f5f5f5] mt-7"
                  >
                    Send code
                  </Button>
                </div>
                <div className="lg:col-span-5">
                  <DeclineCheckbox
                    id="mobileDeclined"
                    checked={data.mobileDeclined}
                    onChange={(checked) => updateField("mobileDeclined", checked)}
                    label="Customer declines to provide mobile phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormGroup label="Home phone number" htmlFor="homePhone">
                  <TextInput
                    id="homePhone"
                    type="tel"
                    value={data.homePhone}
                    onChange={(value) => updateField("homePhone", value)}
                    placeholder="Enter your home phone number"
                  />
                </FormGroup>

                <FormGroup label="Notifications" htmlFor="notifications">
                  <NativeSelect
                    id="notifications"
                    value={data.notifications}
                    onChange={(value) => updateField("notifications", value)}
                    placeholder="Select"
                    options={notifications}
                  />
                </FormGroup>
              </div>
            </div>
          </section>

          <section className="pb-8">
            <SectionHeader icon={MapPin} title="Address" />

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="sameAddressAsPrimary"
                  checked={data.sameAddressAsPrimary}
                  onCheckedChange={(value) =>
                    updateField("sameAddressAsPrimary", value === true)
                  }
                  className="border-gray-300 data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
                />
                <Label
                  htmlFor="sameAddressAsPrimary"
                  className="text-sm text-[#424242] cursor-pointer"
                >
                  Same address as primary member
                </Label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <FormGroup
                  label="Address"
                  htmlFor="address"
                  required
                  className="sm:col-span-2 lg:col-span-1"
                >
                  <TextInput
                    id="address"
                    value={data.address}
                    onChange={(value) => updateField("address", value)}
                    placeholder="Enter your address"
                    required
                  />
                </FormGroup>

                <FormGroup label="Country" htmlFor="country">
                  <NativeSelect
                    id="country"
                    value={data.country}
                    onChange={(value) => updateField("country", value)}
                    placeholder="Select"
                    options={countries}
                  />
                </FormGroup>

                <FormGroup label="State" htmlFor="state">
                  <NativeSelect
                    id="state"
                    value={data.state}
                    onChange={(value) => updateField("state", value)}
                    placeholder="Select"
                    options={states}
                  />
                </FormGroup>

                <FormGroup label="City" htmlFor="city">
                  <NativeSelect
                    id="city"
                    value={data.city}
                    onChange={(value) => updateField("city", value)}
                    placeholder="Select"
                    options={cities}
                  />
                </FormGroup>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white">
        <div className="px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 max-w-6xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onGoHome}
                className="border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa]"
              >
                <Home className="w-4 h-4 mr-2" />
                Go back home
              </Button>
              {onSaveChanges && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onSaveChanges}
                  className="border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa]"
                >
                  Save changes
                </Button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {onPrevious && (
                <Button
                  type="button"
                  onClick={onPrevious}
                  className="bg-[#d84315] hover:bg-[#bf360c] text-white"
                >
                  Previous
                </Button>
              )}
              {onAddMember && (
                <Button
                  type="submit"
                  onClick={onAddMember}
                  className="bg-[#e0e0e0] hover:bg-[#bdbdbd] text-[#424242]"
                >
                  Add member
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
