"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Folder,
  Phone,
  MapPin,
  Users,
  Home,
  AlertCircle,
  Camera,
  Save,
  CreditCard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PersonalData {
  photoUrl?: string;
  idType: string;
  idNumber: string;
  membershipType: string;
  abbreviation: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  occupation: string;
}

export interface ContactInfo {
  email?: string;
  emailDeclined?: boolean;
  mobilePhone: string;
  homePhone: string;
  notifications: string;
}

export interface AddressInfo {
  address: string;
  country: string;
  state: string;
  city: string;
}

export interface SecondaryMember {
  id: string;
  photoUrl?: string;
  firstName: string;
  lastName: string;
  hasIssue?: boolean;
}

export interface NewMemberRegistrationData {
  personal: PersonalData;
  contact: ContactInfo;
  address: AddressInfo;
  secondaryMembers: SecondaryMember[];
}

export interface NewMemberRegistrationProps {
  initialData?: Partial<NewMemberRegistrationData>;
  onSaveChanges?: (data: NewMemberRegistrationData) => void | Promise<void>;
  onPayment?: (data: NewMemberRegistrationData) => void;
  onGoHome?: () => void;
  onCaptureMemberId?: () => void;
  onEditSecondary?: (member: SecondaryMember) => void;
  onRemoveSecondary?: (memberId: string) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------

interface Step {
  label: string;
  number: number;
}

interface RegistrationStepsProps {
  steps: Step[];
  currentStep: number;
}

export function RegistrationSteps({ steps, currentStep }: RegistrationStepsProps) {
  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, index) => {
        const isActive = step.number === currentStep;
        const isPast = step.number < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.number} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors",
                  isActive
                    ? "bg-[#003d7a] text-white border-[#003d7a]"
                    : isPast
                      ? "bg-[#003d7a] text-white border-[#003d7a]"
                      : "bg-white text-gray-400 border-gray-200"
                )}
              >
                {step.number}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 flex-1 min-h-[24px] mt-1",
                    isPast || isActive ? "bg-[#003d7a]" : "bg-gray-200"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-sm font-medium pt-1.5",
                isActive || isPast ? "text-gray-900" : "text-gray-400"
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Read-only field
// ---------------------------------------------------------------------------

interface ReadOnlyFieldProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function ReadOnlyField({ label, value, className }: ReadOnlyFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <p className="text-sm text-gray-600">{label}</p>
      <div className="text-[#002d5c] font-medium min-h-[1.5rem]">{value}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section header
// ---------------------------------------------------------------------------

interface SectionHeaderProps {
  icon: React.ElementType;
  title: string;
}

export function SectionHeader({ icon: Icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 text-[#003d7a] mb-6">
      <Icon className="w-5 h-5" />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Secondary member card
// ---------------------------------------------------------------------------

interface SecondaryMemberCardProps {
  member: SecondaryMember;
  onEdit?: (member: SecondaryMember) => void;
  onRemove?: (memberId: string) => void;
}

export function SecondaryMemberCard({ member, onEdit, onRemove }: SecondaryMemberCardProps) {
  const fullName = `${member.firstName} ${member.lastName}`;

  return (
    <Card className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
          {member.photoUrl ? (
            <Image
              src={member.photoUrl}
              alt={fullName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-semibold">
              {member.firstName.charAt(0)}
              {member.lastName.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[#002d5c] font-semibold truncate">{fullName}</p>
          <div className="flex items-center gap-2 text-sm">
            <button
              type="button"
              onClick={() => onEdit?.(member)}
              className="text-[#0052a1] hover:text-[#003d7a] font-medium"
            >
              Edit
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => onRemove?.(member.id)}
              className="text-[#0052a1] hover:text-[#003d7a] font-medium"
            >
              Remove
            </button>
          </div>
        </div>

        {member.hasIssue && (
          <AlertCircle className="w-5 h-5 text-[#f5a623] shrink-0" />
        )}
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

const defaultData: NewMemberRegistrationData = {
  personal: {
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    idType: "DNI",
    idNumber: "IDGTM1234567890123S0123",
    membershipType: "Diamond",
    abbreviation: "Mr.",
    firstName: "Nicolás",
    lastName: "Treviño",
    gender: "Male",
    dateOfBirth: "13/09/1978",
    occupation: "Urban planner",
  },
  contact: {
    emailDeclined: true,
    mobilePhone: "+502 1234 5678",
    homePhone: "+502 2345 6789",
    notifications: "By email address",
  },
  address: {
    address: "Km 46.5 Salida A Ciudad Vieja",
    country: "Guatemala",
    state: "Antigua",
    city: "Sacatepequez",
  },
  secondaryMembers: [
    {
      id: "1",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      firstName: "Mayra",
      lastName: "Treviño",
      hasIssue: true,
    },
    {
      id: "2",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      firstName: "Pablo",
      lastName: "Treviño",
      hasIssue: true,
    },
  ],
};

export function NewMemberRegistration({
  initialData,
  onSaveChanges,
  onPayment,
  onGoHome,
  onCaptureMemberId,
  onEditSecondary,
  onRemoveSecondary,
  className,
}: NewMemberRegistrationProps) {
  const [data, setData] = React.useState<NewMemberRegistrationData>({
    personal: { ...defaultData.personal, ...initialData?.personal },
    contact: { ...defaultData.contact, ...initialData?.contact },
    address: { ...defaultData.address, ...initialData?.address },
    secondaryMembers: initialData?.secondaryMembers ?? defaultData.secondaryMembers,
  });

  const handleSave = () => {
    onSaveChanges?.(data);
  };

  const handlePayment = () => {
    onPayment?.(data);
  };

  const steps: Step[] = [
    { number: 1, label: "Membership data" },
    { number: 2, label: "Payment" },
  ];

  return (
    <div className={cn("min-h-screen bg-white", className)}>
      {/* Top location / language bar */}
      <div className="bg-[#002d5c] text-white text-sm">
        <div className="container mx-auto px-4 h-10 flex items-center justify-end gap-6">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>Miraflores</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">🇬🇹</span>
            <span>Guatemala</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">🌐</span>
            <span>English</span>
          </div>
        </div>
      </div>

      {/* Brand bar */}
      <div className="bg-[#0052a1]">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="text-white text-2xl font-bold tracking-tight">
            Price<span className="text-[#f5a623]">Smart</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-[#002d5c]">New membership</h1>
          <Button
            variant="outline"
            className="border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa] rounded-lg px-4 py-2 h-auto"
            onClick={onCaptureMemberId}
          >
            <Camera className="w-4 h-4 mr-2" />
            Capture Member ID
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Steps sidebar */}
          <aside className="lg:w-56 shrink-0">
            <RegistrationSteps steps={steps} currentStep={1} />
          </aside>

          {/* Form sections */}
          <div className="flex-1 space-y-8">
            {/* Personal data */}
            <section className="border-b border-gray-200 pb-8">
              <SectionHeader icon={Folder} title="Personal data" />

              <div className="flex flex-col md:flex-row gap-8">
                {/* Photo */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                    {data.personal.photoUrl ? (
                      <Image
                        src={data.personal.photoUrl}
                        alt={`${data.personal.firstName} ${data.personal.lastName}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Users className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="text-[#0052a1] text-sm font-medium hover:text-[#003d7a]"
                  >
                    Change picture
                  </button>
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                  <ReadOnlyField label="ID Type" value={data.personal.idType} />
                  <ReadOnlyField label="ID Number" value={data.personal.idNumber} />
                  <ReadOnlyField label="Membership Type" value={data.personal.membershipType} />
                  <ReadOnlyField label="Abbreviation" value={data.personal.abbreviation} />
                  <ReadOnlyField label="First Name" value={data.personal.firstName} />
                  <ReadOnlyField label="Last Name" value={data.personal.lastName} />
                  <ReadOnlyField label="Gender" value={data.personal.gender} />
                  <ReadOnlyField label="Date of birth" value={data.personal.dateOfBirth} />
                  <ReadOnlyField label="Occupation" value={data.personal.occupation} />
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="border-b border-gray-200 pb-8">
              <SectionHeader icon={Phone} title="Contact" />

              <div className="space-y-6 max-w-3xl">
                <ReadOnlyField
                  label="Email address *"
                  value={
                    data.contact.emailDeclined ? (
                      <span className="text-[#002d5c]">
                        Customer declined to provide email address
                      </span>
                    ) : (
                      data.contact.email
                    )
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ReadOnlyField
                    label="Mobile phone number *"
                    value={
                      <div className="flex items-center gap-3">
                        <span>{data.contact.mobilePhone}</span>
                        <AlertCircle className="w-4 h-4 text-[#f5a623]" />
                      </div>
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ReadOnlyField label="Home phone number *" value={data.contact.homePhone} />
                  <ReadOnlyField label="Notifications" value={data.contact.notifications} />
                </div>
              </div>
            </section>

            {/* Address */}
            <section className="border-b border-gray-200 pb-8">
              <SectionHeader icon={MapPin} title="Address" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ReadOnlyField label="Address *" value={data.address.address} />
                <ReadOnlyField label="Country" value={data.address.country} />
                <ReadOnlyField label="State" value={data.address.state} />
                <ReadOnlyField label="City" value={data.address.city} />
              </div>
            </section>

            {/* Secondary memberships */}
            <section>
              <SectionHeader icon={Users} title="Secondary memberships" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.secondaryMembers.map((member) => (
                  <SecondaryMemberCard
                    key={member.id}
                    member={member}
                    onEdit={onEditSecondary}
                    onRemove={(id) => {
                      setData((prev) => ({
                        ...prev,
                        secondaryMembers: prev.secondaryMembers.filter((m) => m.id !== id),
                      }));
                      onRemoveSecondary?.(id);
                    }}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="border-t border-gray-200 bg-white sticky bottom-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="flex-1 sm:flex-none border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa] rounded-lg px-6 h-11"
                onClick={onGoHome}
                asChild
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go back home
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex-1 sm:flex-none border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa] rounded-lg px-6 h-11"
                onClick={handleSave}
              >
                <Save className="w-4 h-4 mr-2" />
                Save changes
              </Button>
            </div>

            <Button
              className="w-full sm:w-auto bg-[#003d7a] hover:bg-[#002d5c] text-white rounded-lg px-10 h-11 font-semibold"
              onClick={handlePayment}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewMemberRegistration;
