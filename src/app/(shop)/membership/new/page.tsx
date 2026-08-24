"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Folder,
  Phone,
  MapPin,
  Users,
  Home,
  AlertCircle,
  Check,
  Camera,
  Edit,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

interface SecondaryMember {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  hasIssue?: boolean;
}

interface MemberData {
  idType: string;
  idNumber: string;
  membershipType: string;
  abbreviation: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  occupation: string;
  avatarUrl: string;
  email: string;
  declinedEmail: boolean;
  mobilePhone: string;
  homePhone: string;
  notifications: string;
  address: string;
  country: string;
  state: string;
  city: string;
  secondaries: SecondaryMember[];
}

// ------------------------------------------------------------------
// Static data matching the reference
// ------------------------------------------------------------------

const initialData: MemberData = {
  idType: "DNI",
  idNumber: "IDGTM1234567890123S0123",
  membershipType: "Diamond",
  abbreviation: "Mr.",
  firstName: "Nicolás",
  lastName: "Treviño",
  gender: "Male",
  dateOfBirth: "13/09/1978",
  occupation: "Urban planner",
  avatarUrl:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
  email: "",
  declinedEmail: true,
  mobilePhone: "+502 1234 5678",
  homePhone: "+502 2345 6789",
  notifications: "By email address",
  address: "Km 46.5 Salida A Ciudad Vieja",
  country: "Guatemala",
  state: "Antigua",
  city: "Sacatepequez",
  secondaries: [
    {
      id: "s-1",
      firstName: "Mayra",
      lastName: "Treviño",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80",
      hasIssue: true,
    },
    {
      id: "s-2",
      firstName: "Pablo",
      lastName: "Treviño",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80",
      hasIssue: true,
    },
  ],
};

// ------------------------------------------------------------------
// Reusable read-only field block
// ------------------------------------------------------------------

interface ReadOnlyFieldProps {
  label: string;
  value: string;
}

function ReadOnlyField({ label, value }: ReadOnlyFieldProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-base font-medium text-[#003d7a]">{value}</p>
    </div>
  );
}

interface EditableFieldProps {
  label: string;
  value: string;
  name: string;
  required?: boolean;
  onChange: (value: string) => void;
}

function EditableField({
  label,
  value,
  name,
  required,
  onChange,
}: EditableFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-sm text-gray-600">
        {label}
        {required && <span className="text-[#f5a623] ml-0.5">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 border-gray-200 bg-white text-[#003d7a] font-medium focus-visible:ring-[#0052a1]"
      />
    </div>
  );
}

// ------------------------------------------------------------------
// Section title helper
// ------------------------------------------------------------------

interface SectionTitleProps {
  icon: React.ElementType;
  children: React.ReactNode;
}

function SectionTitle({ icon: Icon, children }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2 text-[#003d7a] mb-6">
      <AnimatedIcon icon={Icon} className="w-6 h-6" hoverAnimation="none" />
      <h2 className="text-xl font-medium">{children}</h2>
    </div>
  );
}

// ------------------------------------------------------------------
// Stepper
// ------------------------------------------------------------------

interface StepperProps {
  steps: { id: number; label: string }[];
  currentStep: number;
}

function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="relative flex flex-col gap-6">
      {/* Vertical line */}
      <div className="absolute left-[15px] top-3 bottom-3 w-px bg-gray-200" />

      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <div key={step.id} className="relative flex items-start gap-4">
            <div
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold border-2",
                isActive
                  ? "bg-[#003d7a] border-[#003d7a] text-white"
                  : isCompleted
                    ? "bg-[#0052a1] border-[#0052a1] text-white"
                    : "bg-white border-gray-200 text-gray-400"
              )}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                step.id
              )}
            </div>
            <div className="pt-1">
              <p
                className={cn(
                  "text-sm font-medium",
                  isActive || isCompleted ? "text-[#003d7a]" : "text-gray-400"
                )}
              >
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ------------------------------------------------------------------
// Secondary member card
// ------------------------------------------------------------------

interface SecondaryMemberCardProps {
  member: SecondaryMember;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

function SecondaryMemberCard({
  member,
  onEdit,
  onRemove,
}: SecondaryMemberCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
          <img
            src={member.avatarUrl}
            alt={`${member.firstName} ${member.lastName}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-[#003d7a]">
            {member.firstName} {member.lastName}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => onEdit(member.id)}
              className="text-[#0052a1] hover:underline"
            >
              Edit
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => onRemove(member.id)}
              className="text-[#0052a1] hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {member.hasIssue && (
        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#f5a623]">
          <AlertCircle className="h-4 w-4 text-[#f5a623]" />
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------

export default function NewMembershipPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<MemberData>(initialData);

  const updateField = <K extends keyof MemberData>(
    key: K,
    value: MemberData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // TODO: persist data
    setIsEditing(false);
  };

  const handleEditSecondary = (id: string) => {
    // TODO: open secondary member editor
    console.log("Edit secondary", id);
  };

  const handleRemoveSecondary = (id: string) => {
    setData((prev) => ({
      ...prev,
      secondaries: prev.secondaries.filter((s) => s.id !== id),
    }));
  };

  const steps = [
    { id: 1, label: "Membership data" },
    { id: 2, label: "Payment" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top blue strip (reference shows full-width solid blue band below header) */}
      <div className="h-10 bg-[#0052a1]" />

      <div className="container mx-auto px-4 py-8 lg:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-normal text-[#003d7a]">New membership</h1>
          <Button
            variant="outline"
            className="w-fit gap-2 border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa]"
          >
            <Camera className="w-4 h-4" />
            Capture Member ID
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left stepper */}
          <aside className="lg:w-48 shrink-0">
            <Stepper steps={steps} currentStep={1} />
          </aside>

          {/* Main form */}
          <main className="flex-1 min-w-0">
            {/* Personal data */}
            <section>
              <SectionTitle icon={Folder}>Personal data</SectionTitle>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full bg-gray-100 border-4 border-white shadow-md">
                    <img
                      src={data.avatarUrl}
                      alt={`${data.firstName} ${data.lastName}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button className="text-sm text-[#0052a1] hover:underline font-medium">
                    Change picture
                  </button>
                </div>

                {/* Fields */}
                <div className="flex-1">
                  {isEditing ? (
                    <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                      <EditableField
                        label="ID Type"
                        name="idType"
                        value={data.idType}
                        onChange={(v) => updateField("idType", v)}
                      />
                      <EditableField
                        label="ID Number"
                        name="idNumber"
                        value={data.idNumber}
                        onChange={(v) => updateField("idNumber", v)}
                      />
                      <EditableField
                        label="Membership Type"
                        name="membershipType"
                        value={data.membershipType}
                        onChange={(v) => updateField("membershipType", v)}
                      />
                      <EditableField
                        label="Abbreviation"
                        name="abbreviation"
                        value={data.abbreviation}
                        onChange={(v) => updateField("abbreviation", v)}
                      />
                      <EditableField
                        label="First Name"
                        name="firstName"
                        value={data.firstName}
                        onChange={(v) => updateField("firstName", v)}
                      />
                      <EditableField
                        label="Last Name"
                        name="lastName"
                        value={data.lastName}
                        onChange={(v) => updateField("lastName", v)}
                      />
                      <EditableField
                        label="Gender"
                        name="gender"
                        value={data.gender}
                        onChange={(v) => updateField("gender", v)}
                      />
                      <EditableField
                        label="Date of birth"
                        name="dateOfBirth"
                        value={data.dateOfBirth}
                        onChange={(v) => updateField("dateOfBirth", v)}
                      />
                      <EditableField
                        label="Occupation"
                        name="occupation"
                        value={data.occupation}
                        onChange={(v) => updateField("occupation", v)}
                      />
                    </div>
                  ) : (
                    <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                      <ReadOnlyField label="ID Type" value={data.idType} />
                      <ReadOnlyField label="ID Number" value={data.idNumber} />
                      <ReadOnlyField
                        label="Membership Type"
                        value={data.membershipType}
                      />
                      <ReadOnlyField
                        label="Abbreviation"
                        value={data.abbreviation}
                      />
                      <ReadOnlyField label="First Name" value={data.firstName} />
                      <ReadOnlyField label="Last Name" value={data.lastName} />
                      <ReadOnlyField label="Gender" value={data.gender} />
                      <ReadOnlyField label="Date of birth" value={data.dateOfBirth} />
                      <ReadOnlyField label="Occupation" value={data.occupation} />
                    </div>
                  )}
                </div>
              </div>
            </section>

            <Separator className="my-8 bg-gray-200" />

            {/* Contact */}
            <section>
              <SectionTitle icon={Phone}>Contact</SectionTitle>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <Label className="text-sm text-gray-600">
                    Email address <span className="text-[#f5a623]">*</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      value={data.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="Enter email address"
                      className="h-11 border-gray-200 text-[#003d7a] font-medium focus-visible:ring-[#0052a1]"
                    />
                  ) : data.declinedEmail ? (
                    <p className="text-base text-[#003d7a]">
                      Customer declined to provide email address
                    </p>
                  ) : (
                    <p className="text-base font-medium text-[#003d7a]">
                      {data.email || "—"}
                    </p>
                  )}
                </div>

                <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                  <EditableField
                    label="Mobile phone number"
                    name="mobilePhone"
                    value={data.mobilePhone}
                    required
                    onChange={(v) => updateField("mobilePhone", v)}
                  />

                  <div className="space-y-1.5">
                    <Label className="text-sm text-gray-600">Notifications</Label>
                    {isEditing ? (
                      <Input
                        value={data.notifications}
                        onChange={(e) =>
                          updateField("notifications", e.target.value)
                        }
                        className="h-11 border-gray-200 text-[#003d7a] font-medium focus-visible:ring-[#0052a1]"
                      />
                    ) : (
                      <p className="text-base font-medium text-[#003d7a]">
                        {data.notifications}
                      </p>
                    )}
                  </div>

                  <EditableField
                    label="Home phone number"
                    name="homePhone"
                    value={data.homePhone}
                    required
                    onChange={(v) => updateField("homePhone", v)}
                  />
                </div>
              </div>
            </section>

            <Separator className="my-8 bg-gray-200" />

            {/* Address */}
            <section>
              <SectionTitle icon={MapPin}>Address</SectionTitle>

              <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2">
                  <EditableField
                    label="Address"
                    name="address"
                    value={data.address}
                    required
                    onChange={(v) => updateField("address", v)}
                  />
                </div>
                <EditableField
                  label="Country"
                  name="country"
                  value={data.country}
                  onChange={(v) => updateField("country", v)}
                />
                <EditableField
                  label="State"
                  name="state"
                  value={data.state}
                  onChange={(v) => updateField("state", v)}
                />
                <EditableField
                  label="City"
                  name="city"
                  value={data.city}
                  onChange={(v) => updateField("city", v)}
                />
              </div>
            </section>

            <Separator className="my-8 bg-gray-200" />

            {/* Secondary memberships */}
            <section>
              <SectionTitle icon={Users}>Secondary memberships</SectionTitle>

              {data.secondaries.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.secondaries.map((member) => (
                    <SecondaryMemberCard
                      key={member.id}
                      member={member}
                      onEdit={handleEditSecondary}
                      onRemove={handleRemoveSecondary}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No secondary memberships added.
                </p>
              )}
            </section>
          </main>
        </div>
      </div>

      {/* Floating action helpers */}
      <button
        onClick={() => setIsEditing((prev) => !prev)}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-[#003d7a] text-white shadow-lg hover:bg-[#002d5c] lg:flex"
        aria-label={isEditing ? "Cancel edit" : "Edit membership"}
      >
        {isEditing ? <X className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
      </button>

      {/* Bottom actions */}
      <div className="sticky bottom-0 z-30 border-t bg-white/95 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto gap-2 border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa]"
              >
                <Home className="w-4 h-4" />
                Go back home
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="w-full sm:w-auto gap-2 border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa]"
            >
              {isEditing ? (
                <>
                  <Check className="w-4 h-4" />
                  Save changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  Edit
                </>
              )}
            </Button>
          </div>

          <Button
            onClick={() => router.push("/membership/new/payment")}
            className="w-full sm:w-auto bg-[#003d7a] hover:bg-[#002d5c] text-white px-10"
          >
            Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
