"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Folder,
  Phone,
  MapPin,
  Users,
  Home,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SecondaryMembershipCard } from "./secondary-membership-card";

interface SecondaryMember {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  hasWarning?: boolean;
}

interface MembershipRegistrationData {
  idType: string;
  idNumber: string;
  membershipType: string;
  abbreviation: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  occupation: string;
  avatarUrl?: string;
  email: string;
  mobilePhone: string;
  homePhone: string;
  notifications: string;
  address: string;
  country: string;
  state: string;
  city: string;
  secondaryMembers: SecondaryMember[];
}

interface MembershipRegistrationFormProps {
  initialData: MembershipRegistrationData;
  onSave?: (data: MembershipRegistrationData) => void;
  onPayment?: (data: MembershipRegistrationData) => void;
  onGoHome?: () => void;
  onCaptureMemberId?: () => void;
}

export function MembershipRegistrationForm({
  initialData,
  onSave,
  onPayment,
  onGoHome,
  onCaptureMemberId,
}: MembershipRegistrationFormProps) {
  const [data, setData] = useState<MembershipRegistrationData>(initialData);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(initialData.email);

  const updateField = <K extends keyof MembershipRegistrationData>(
    field: K,
    value: MembershipRegistrationData[K]
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.(data);
  };

  const handlePayment = () => {
    onPayment?.(data);
  };

  const handleEditSecondary = (id: string) => {
    // Placeholder for future edit behavior
    console.log("Edit secondary member", id);
  };

  const handleRemoveSecondary = (id: string) => {
    setData((prev) => ({
      ...prev,
      secondaryMembers: prev.secondaryMembers.filter((m) => m.id !== id),
    }));
  };

  return (
    <div className="space-y-8">
      {/* Personal Data */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Folder className="w-5 h-5 text-[#0052a1]" />
          <h2 className="text-xl font-semibold text-[#003d7a]">Personal data</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
              {data.avatarUrl ? (
                <Image
                  src={data.avatarUrl}
                  alt={`${data.firstName} ${data.lastName}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#0052a1] text-2xl font-semibold">
                  {data.firstName.charAt(0)}
                  {data.lastName.charAt(0)}
                </div>
              )}
            </div>
            <button
              type="button"
              className="text-sm text-[#0052a1] hover:underline font-medium"
            >
              Change picture
            </button>
          </div>

          {/* Fields */}
          <div className="flex-1 grid gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            <ReadOnlyField label="ID Type" value={data.idType} />
            <ReadOnlyField label="ID Number" value={data.idNumber} />
            <ReadOnlyField label="Membership Type" value={data.membershipType} />
            <ReadOnlyField label="Abbreviation" value={data.abbreviation} />
            <ReadOnlyField label="First Name" value={data.firstName} />
            <ReadOnlyField label="Last Name" value={data.lastName} />
            <ReadOnlyField label="Gender" value={data.gender} />
            <ReadOnlyField label="Date of birth" value={data.dateOfBirth} />
            <ReadOnlyField label="Occupation" value={data.occupation} />
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
          <div className="sm:col-span-2 lg:col-span-3">
            <Label className="text-gray-700 font-medium">
              Email address <span className="text-red-500">*</span>
            </Label>
            {isEditingEmail ? (
              <div className="mt-2 flex items-center gap-3">
                <Input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="max-w-md h-11 border-gray-300"
                  placeholder="you@example.com"
                />
                <Button
                  type="button"
                  size="sm"
                  className="bg-[#0052a1] hover:bg-[#003d7a]"
                  onClick={() => {
                    updateField("email", emailInput);
                    setIsEditingEmail(false);
                  }}
                >
                  Save
                </Button>
              </div>
            ) : data.email ? (
              <div className="mt-2 flex items-center gap-3">
                <p className="text-gray-900">{data.email}</p>
                <button
                  type="button"
                  onClick={() => setIsEditingEmail(true)}
                  className="text-sm text-[#0052a1] hover:underline font-medium"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="mt-2 flex items-center gap-2 text-gray-600">
                <span>Customer declined to provide email address</span>
                <button
                  type="button"
                  onClick={() => setIsEditingEmail(true)}
                  className="text-sm text-[#0052a1] hover:underline font-medium"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <Label className="text-gray-700 font-medium">
              Mobile phone number <span className="text-red-500">*</span>
            </Label>
            <div className="mt-2 flex items-center gap-2">
              <Input
                value={data.mobilePhone}
                onChange={(e) => updateField("mobilePhone", e.target.value)}
                className="h-11 border-gray-300"
              />
              <AlertCircle className="w-5 h-5 text-[#f5a623] shrink-0" />
            </div>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">
              Home phone number <span className="text-red-500">*</span>
            </Label>
            <Input
              value={data.homePhone}
              onChange={(e) => updateField("homePhone", e.target.value)}
              className="mt-2 h-11 border-gray-300"
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Notifications</Label>
            <Input
              value={data.notifications}
              onChange={(e) => updateField("notifications", e.target.value)}
              className="mt-2 h-11 border-gray-300"
            />
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

        <div className="grid gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Label className="text-gray-700 font-medium">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              value={data.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="mt-2 h-11 border-gray-300"
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Country</Label>
            <Input
              value={data.country}
              onChange={(e) => updateField("country", e.target.value)}
              className="mt-2 h-11 border-gray-300"
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">State</Label>
            <Input
              value={data.state}
              onChange={(e) => updateField("state", e.target.value)}
              className="mt-2 h-11 border-gray-300"
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">City</Label>
            <Input
              value={data.city}
              onChange={(e) => updateField("city", e.target.value)}
              className="mt-2 h-11 border-gray-300"
            />
          </div>
        </div>
      </section>

      <Separator className="bg-gray-200" />

      {/* Secondary memberships */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-[#0052a1]" />
          <h2 className="text-xl font-semibold text-[#003d7a]">Secondary memberships</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.secondaryMembers.map((member) => (
            <SecondaryMembershipCard
              key={member.id}
              id={member.id}
              firstName={member.firstName}
              lastName={member.lastName}
              avatarUrl={member.avatarUrl}
              hasWarning={member.hasWarning}
              onEdit={handleEditSecondary}
              onRemove={handleRemoveSecondary}
            />
          ))}
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
            onClick={handleSave}
            className="flex-1 sm:flex-none border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 h-11 px-6"
          >
            Save changes
          </Button>
        </div>

        <Button
          type="button"
          onClick={handlePayment}
          className="w-full sm:w-auto bg-[#003d7a] hover:bg-[#002d5c] text-white h-11 px-10"
        >
          Payment
        </Button>
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-gray-700 font-medium">{label}</Label>
      <p className="mt-2 text-gray-900">{value}</p>
    </div>
  );
}
