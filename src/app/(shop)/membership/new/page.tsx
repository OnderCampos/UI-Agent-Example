"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FolderOpen,
  Phone,
  MapPin,
  Users,
  Home,
  Save,
  AlertCircle,
  Camera,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const membershipSteps = [
  { id: 1, name: "Membership data", href: "/membership/new" },
  { id: 2, name: "Payment", href: "/membership/new/payment" },
];

type IdType = "DNI" | "Passport" | "Driver's License";
type Abbreviation = "Mr." | "Mrs." | "Ms." | "Dr.";
type MembershipTier = "Diamond" | "Gold" | "Silver";
type Gender = "Male" | "Female" | "Other";
type NotificationMethod = "By email address" | "By SMS" | "None";

interface SecondaryMember {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  hasWarning?: boolean;
}

export default function NewMembershipPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    idType: "DNI" as IdType,
    idNumber: "IDGTM1234567890123S0123",
    membershipType: "Diamond" as MembershipTier,
    abbreviation: "Mr." as Abbreviation,
    firstName: "Nicolás",
    lastName: "Treviño",
    gender: "Male" as Gender,
    dateOfBirth: "13/09/1978",
    occupation: "Urban planner",
    email: "",
    emailDeclined: true,
    mobilePhone: "+502 1234 5678",
    homePhone: "+502 2345 6789",
    notifications: "By email address" as NotificationMethod,
    address: "Km 46.5 Salida A Ciudad Vieja",
    country: "Guatemala",
    state: "Antigua",
    city: "Sacatepequez",
  });

  const [secondaryMembers] = useState<SecondaryMember[]>([
    {
      id: "1",
      firstName: "Mayra",
      lastName: "Treviño",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      hasWarning: true,
    },
    {
      id: "2",
      firstName: "Pablo",
      lastName: "Treviño",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      hasWarning: true,
    },
  ]);

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleRemoveSecondaryMember = (id: string) => {
    // In a real app this would remove the member
    console.log("Remove secondary member", id);
  };

  const handleEditSecondaryMember = (id: string) => {
    // In a real app this would open an edit modal
    console.log("Edit secondary member", id);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003d7a]">
            New membership
          </h1>
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
            <nav className="space-y-2">
              {membershipSteps.map((step, index) => {
                const isActive = step.id === 1;
                const isCompleted = false;

                return (
                  <div key={step.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                          isActive
                            ? "bg-[#003d7a] text-white"
                            : isCompleted
                              ? "bg-[#0052a1] text-white"
                              : "bg-gray-200 text-gray-500"
                        )}
                      >
                        {step.id}
                      </div>
                      {index < membershipSteps.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 mt-1" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium pt-1.5",
                        isActive ? "text-[#003d7a]" : "text-gray-500"
                      )}
                    >
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Main Form */}
          <main className="flex-1 min-w-0">
            {/* Personal Data Section */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <FolderOpen className="w-5 h-5 text-[#003d7a]" />
                <h2 className="text-xl font-semibold text-[#003d7a]">
                  Personal data
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Picture */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-gray-100 border-4 border-gray-100 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
                      alt="Member photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="link"
                    className="text-[#0052a1] hover:text-[#003d7a] font-medium text-sm h-auto py-1"
                  >
                    Change picture
                  </Button>
                </div>

                {/* Personal Data Fields */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                  <ReadOnlyField label="ID Type" value={formData.idType} />
                  <ReadOnlyField label="ID Number" value={formData.idNumber} />
                  <ReadOnlyField label="Membership Type" value={formData.membershipType} />
                  <ReadOnlyField label="Abbreviation" value={formData.abbreviation} />
                  <ReadOnlyField label="First Name" value={formData.firstName} />
                  <ReadOnlyField label="Last Name" value={formData.lastName} />
                  <ReadOnlyField label="Gender" value={formData.gender} />
                  <ReadOnlyField label="Date of birth" value={formData.dateOfBirth} />
                  <ReadOnlyField label="Occupation" value={formData.occupation} />
                </div>
              </div>
            </section>

            <Separator className="my-8 bg-gray-200" />

            {/* Contact Section */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Phone className="w-5 h-5 text-[#003d7a]" />
                <h2 className="text-xl font-semibold text-[#003d7a]">Contact</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6 max-w-4xl">
                <div className="lg:col-span-2">
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email address <span className="text-red-500">*</span>
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter email address"
                          className="max-w-md border-gray-300 focus-visible:ring-[#0052a1]"
                          disabled={formData.emailDeclined}
                        />
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.emailDeclined}
                            onChange={(e) => handleInputChange("emailDeclined", e.target.checked)}
                            className="rounded border-gray-300 text-[#0052a1] focus:ring-[#0052a1]"
                          />
                          Customer declined
                        </label>
                      </div>
                    </div>
                  ) : (
                    <ReadOnlyField
                      label="Email address *"
                      value={formData.emailDeclined ? "Customer declined to provide email address" : formData.email}
                      valueClassName={formData.emailDeclined ? "text-gray-500 italic" : "text-[#003d7a]"}
                    />
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="mobilePhone" className="text-sm font-medium text-gray-700">
                        Mobile phone number <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="mobilePhone"
                          type="tel"
                          value={formData.mobilePhone}
                          onChange={(e) => handleInputChange("mobilePhone", e.target.value)}
                          className="border-gray-300 focus-visible:ring-[#0052a1] pr-10"
                        />
                        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f5a623]" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative inline-block w-full">
                      <ReadOnlyField label="Mobile phone number *" value={formData.mobilePhone} />
                      <AlertCircle className="absolute right-0 top-7 w-5 h-5 text-[#f5a623]" />
                    </div>
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="homePhone" className="text-sm font-medium text-gray-700">
                        Home phone number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="homePhone"
                        type="tel"
                        value={formData.homePhone}
                        onChange={(e) => handleInputChange("homePhone", e.target.value)}
                        className="border-gray-300 focus-visible:ring-[#0052a1]"
                      />
                    </div>
                  ) : (
                    <ReadOnlyField label="Home phone number *" value={formData.homePhone} />
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="notifications" className="text-sm font-medium text-gray-700">
                        Notifications
                      </Label>
                      <select
                        id="notifications"
                        value={formData.notifications}
                        onChange={(e) => handleInputChange("notifications", e.target.value)}
                        className="w-full h-10 rounded-md border border-gray-300 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052a1] focus-visible:ring-offset-2"
                      >
                        <option>By email address</option>
                        <option>By SMS</option>
                        <option>None</option>
                      </select>
                    </div>
                  ) : (
                    <ReadOnlyField label="Notifications" value={formData.notifications} />
                  )}
                </div>
              </div>
            </section>

            <Separator className="my-8 bg-gray-200" />

            {/* Address Section */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-[#003d7a]" />
                <h2 className="text-xl font-semibold text-[#003d7a]">Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
                <div className="sm:col-span-2">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                        Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="border-gray-300 focus-visible:ring-[#0052a1]"
                      />
                    </div>
                  ) : (
                    <ReadOnlyField label="Address *" value={formData.address} />
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                        Country
                      </Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className="border-gray-300 focus-visible:ring-[#0052a1]"
                      />
                    </div>
                  ) : (
                    <ReadOnlyField label="Country" value={formData.country} />
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                        State
                      </Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="border-gray-300 focus-visible:ring-[#0052a1]"
                      />
                    </div>
                  ) : (
                    <ReadOnlyField label="State" value={formData.state} />
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                        City
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="border-gray-300 focus-visible:ring-[#0052a1]"
                      />
                    </div>
                  ) : (
                    <ReadOnlyField label="City" value={formData.city} />
                  )}
                </div>
              </div>
            </section>

            <Separator className="my-8 bg-gray-200" />

            {/* Secondary Memberships Section */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-[#003d7a]" />
                <h2 className="text-xl font-semibold text-[#003d7a]">
                  Secondary memberships
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {secondaryMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={member.avatarUrl}
                          alt={`${member.firstName} ${member.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#003d7a]">
                          {member.firstName} {member.lastName}
                        </p>
                        <div className="flex items-center gap-1 text-sm">
                          <button
                            onClick={() => handleEditSecondaryMember(member.id)}
                            className="text-[#0052a1] hover:text-[#003d7a] font-medium"
                          >
                            Edit
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleRemoveSecondaryMember(member.id)}
                            className="text-[#0052a1] hover:text-[#003d7a] font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    {member.hasWarning && (
                      <AlertCircle className="w-5 h-5 text-[#f5a623] flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Sticky Footer Actions */}
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
              {isEditing ? (
                <Button
                  variant="outline"
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="w-full sm:w-auto rounded-lg font-semibold border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save changes"}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto rounded-lg font-semibold border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save changes
                </Button>
              )}
            </div>

            <Button
              onClick={() => router.push("/membership/new/payment")}
              className="w-full sm:w-auto bg-[#003d7a] hover:bg-[#002d5c] text-white rounded-lg font-semibold px-8"
            >
              Payment
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ReadOnlyFieldProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function ReadOnlyField({ label, value, valueClassName }: ReadOnlyFieldProps) {
  const displayValue = value && value.trim() !== "" ? value : "—";

  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className={cn("text-base font-semibold text-[#003d7a]", valueClassName)}>
        {displayValue}
      </p>
    </div>
  );
}
