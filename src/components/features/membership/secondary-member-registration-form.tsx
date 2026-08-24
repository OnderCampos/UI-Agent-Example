"use client";

import { useState } from "react";
import Image from "next/image";
import { Folder, Phone, MapPin, Home, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export interface SecondaryMemberRegistrationData {
  avatarUrl?: string;
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
  declinesEmail: boolean;
  mobilePhone: string;
  declinesMobile: boolean;
  homePhone: string;
  notifications: string;
  sameAddressAsPrimary: boolean;
  address: string;
  country: string;
  state: string;
  city: string;
}

interface SecondaryMemberRegistrationFormProps {
  initialData?: Partial<SecondaryMemberRegistrationData>;
  onSave?: (data: SecondaryMemberRegistrationData) => void;
  onAddMember?: (data: SecondaryMemberRegistrationData) => void;
  onGoHome?: () => void;
  onPrevious?: () => void;
  onCaptureMemberId?: () => void;
}

const emptyData: SecondaryMemberRegistrationData = {
  avatarUrl: undefined,
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
  declinesEmail: false,
  mobilePhone: "",
  declinesMobile: false,
  homePhone: "",
  notifications: "",
  sameAddressAsPrimary: false,
  address: "",
  country: "",
  state: "",
  city: "",
};

const idTypes = ["DPI", "Passport", "Driver's license", "Resident card"];
const abbreviations = ["Mr.", "Mrs.", "Ms.", "Dr."];
const membershipTypes = ["Diamond", "Platinum", "Gold", "Business"];
const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];
const occupations = ["Urban planner", "Engineer", "Teacher", "Doctor", "Other"];
const countries = ["Guatemala", "Costa Rica", "Panama", "El Salvador", "Honduras"];
const states = ["Antigua", "Guatemala", "Sacatepequez", "Escuintla"];
const cities = ["Sacatepequez", "Antigua Guatemala", "Ciudad Vieja", "Jocotenango"];
const notificationOptions = ["By email address", "By mobile phone", "By both"];

export function SecondaryMemberRegistrationForm({
  initialData,
  onSave,
  onAddMember,
  onGoHome,
  onPrevious,
  onCaptureMemberId,
}: SecondaryMemberRegistrationFormProps) {
  const [data, setData] = useState<SecondaryMemberRegistrationData>({
    ...emptyData,
    ...initialData,
  });

  const updateField = <K extends keyof SecondaryMemberRegistrationData>(
    field: K,
    value: SecondaryMemberRegistrationData[K]
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Personal data */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Folder className="w-5 h-5 text-[#0052a1]" />
          <h2 className="text-xl font-semibold text-[#003d7a]">Personal data</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-md">
              {data.avatarUrl ? (
                <Image
                  src={data.avatarUrl}
                  alt={`${data.firstName} ${data.lastName}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400" />
              )}
            </div>
            <button
              type="button"
              className="text-sm text-[#0052a1] hover:underline font-medium"
            >
              Take photo
            </button>
          </div>

          {/* Fields */}
          <div className="flex-1 grid gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label className="text-gray-700 font-medium">
                ID Type <span className="text-red-500">*</span>
              </Label>
              <select
                value={data.idType}
                onChange={(e) => updateField("idType", e.target.value)}
                className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select</option>
                {idTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-gray-700 font-medium">
                ID Number <span className="text-red-500">*</span>
              </Label>
              <Input
                value={data.idNumber}
                onChange={(e) => updateField("idNumber", e.target.value)}
                placeholder="Enter ID number"
                className="mt-2 h-11 border-gray-300"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium">
                Membership type <span className="text-red-500">*</span>
              </Label>
              <select
                value={data.membershipType}
                onChange={(e) => updateField("membershipType", e.target.value)}
                className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select</option>
                {membershipTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Abbreviation</Label>
              <select
                value={data.abbreviation}
                onChange={(e) => updateField("abbreviation", e.target.value)}
                className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select</option>
                {abbreviations.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-gray-700 font-medium">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={data.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                placeholder="Enter first name"
                className="mt-2 h-11 border-gray-300"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={data.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                placeholder="Enter last name"
                className="mt-2 h-11 border-gray-300"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Gender</Label>
              <select
                value={data.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select</option>
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-gray-700 font-medium">
                Date of birth <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <Input
                  type="text"
                  value={data.dateOfBirth}
                  onChange={(e) => updateField("dateOfBirth", e.target.value)}
                  placeholder="Select"
                  className="h-11 border-gray-300 pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Occupation</Label>
              <select
                value={data.occupation}
                onChange={(e) => updateField("occupation", e.target.value)}
                className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select</option>
                {occupations.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-gray-200" />

      {/* Contact */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Phone className="w-5 h-5 text-[#0052a1]" />
          <h2 className="text-xl font-semibold text-[#003d7a]">Contact</h2>
        </div>

        <div className="grid gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-2">
            <Label className="text-gray-700 font-medium">
              Email address <span className="text-red-500">*</span>
            </Label>
            <div className="mt-2 flex items-center gap-3">
              <Input
                type="email"
                value={data.email}
                onChange={(e) => updateField("email", e.target.value)}
                disabled={data.declinesEmail}
                placeholder="Enter your email address"
                className="h-11 border-gray-300"
              />
              <Button
                type="button"
                variant="outline"
                disabled={data.declinesEmail}
                className="h-11 px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Send code
              </Button>
            </div>
          </div>

          <div className="flex items-end pb-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="declinesEmail"
                checked={data.declinesEmail}
                onCheckedChange={(checked) =>
                  updateField("declinesEmail", checked === true)
                }
              />
              <Label htmlFor="declinesEmail" className="text-sm text-gray-700">
                Customer declines to provide email address
              </Label>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <Label className="text-gray-700 font-medium">
              Mobile phone number <span className="text-red-500">*</span>
            </Label>
            <div className="mt-2 flex items-center gap-3">
              <Input
                value={data.mobilePhone}
                onChange={(e) => updateField("mobilePhone", e.target.value)}
                disabled={data.declinesMobile}
                placeholder="Enter your phone number"
                className="h-11 border-gray-300"
              />
              <Button
                type="button"
                variant="outline"
                disabled={data.declinesMobile}
                className="h-11 px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Send code
              </Button>
            </div>
          </div>

          <div className="flex items-end pb-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="declinesMobile"
                checked={data.declinesMobile}
                onCheckedChange={(checked) =>
                  updateField("declinesMobile", checked === true)
                }
              />
              <Label htmlFor="declinesMobile" className="text-sm text-gray-700">
                Customer declines to provide mobile phone number
              </Label>
            </div>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Home phone number</Label>
            <Input
              value={data.homePhone}
              onChange={(e) => updateField("homePhone", e.target.value)}
              placeholder="Enter your home phone number"
              className="mt-2 h-11 border-gray-300"
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Notifications</Label>
            <select
              value={data.notifications}
              onChange={(e) => updateField("notifications", e.target.value)}
              className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select</option>
              {notificationOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <Separator className="bg-gray-200" />

      {/* Address */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-[#0052a1]" />
          <h2 className="text-xl font-semibold text-[#003d7a]">Address</h2>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Checkbox
            id="sameAddressAsPrimary"
            checked={data.sameAddressAsPrimary}
            onCheckedChange={(checked) =>
              updateField("sameAddressAsPrimary", checked === true)
            }
          />
          <Label htmlFor="sameAddressAsPrimary" className="text-sm text-gray-700">
            Same address as primary member
          </Label>
        </div>

        <div className="grid gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Label className="text-gray-700 font-medium">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              value={data.address}
              onChange={(e) => updateField("address", e.target.value)}
              disabled={data.sameAddressAsPrimary}
              placeholder="Enter your address"
              className="mt-2 h-11 border-gray-300"
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Country</Label>
            <select
              value={data.country}
              onChange={(e) => updateField("country", e.target.value)}
              disabled={data.sameAddressAsPrimary}
              className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
            >
              <option value="">Select</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">State</Label>
            <select
              value={data.state}
              onChange={(e) => updateField("state", e.target.value)}
              disabled={data.sameAddressAsPrimary}
              className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
            >
              <option value="">Select</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">City</Label>
            <select
              value={data.city}
              onChange={(e) => updateField("city", e.target.value)}
              disabled={data.sameAddressAsPrimary}
              className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
            >
              <option value="">Select</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onGoHome}
            className="flex-1 sm:flex-none border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 h-11 px-6"
          >
            <Home className="w-4 h-4 mr-2" />
            Go back home
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onSave?.(data)}
            className="flex-1 sm:flex-none border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 h-11 px-6"
          >
            Save changes
          </Button>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Button
            type="button"
            onClick={onPrevious}
            className="flex-1 sm:flex-none bg-[#003d7a] hover:bg-[#002d5c] text-white h-11 px-10"
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={() => onAddMember?.(data)}
            className="flex-1 sm:flex-none bg-[#f5a623] hover:bg-[#d4900f] text-white h-11 px-10"
          >
            Add member
          </Button>
        </div>
      </div>
    </div>
  );
}
