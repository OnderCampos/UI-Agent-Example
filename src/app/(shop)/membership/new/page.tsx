"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FolderOpen,
  Phone,
  MapPin,
  Users,
  Home,
  AlertCircle,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const steps = [
  { id: "data", name: "Membership data", number: 1 },
  { id: "payment", name: "Payment", number: 2 },
];

interface SecondaryMember {
  id: string;
  name: string;
  avatarUrl: string;
  hasWarning?: boolean;
}

const mockSecondaryMembers: SecondaryMember[] = [
  {
    id: "sm-1",
    name: "Mayra Treviño",
    avatarUrl: "https://i.pravatar.cc/150?u=sm1",
    hasWarning: true,
  },
  {
    id: "sm-2",
    name: "Pablo Treviño",
    avatarUrl: "https://i.pravatar.cc/150?u=sm2",
    hasWarning: true,
  },
];

interface FormData {
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
  mobilePhone: string;
  homePhone: string;
  notifications: string;
  address: string;
  country: string;
  state: string;
  city: string;
}

const initialData: FormData = {
  idType: "DNI",
  idNumber: "IDGTM1234567890123S0123",
  membershipType: "Diamond",
  abbreviation: "Mr.",
  firstName: "Nicolás",
  lastName: "Treviño",
  gender: "Male",
  dateOfBirth: "13/09/1978",
  occupation: "Urban planner",
  email: "Customer declined to provide email address",
  mobilePhone: "+502 1234 5678",
  homePhone: "+502 2345 6789",
  notifications: "By email address",
  address: "Km 46.5 Salida A Ciudad Vieja",
  country: "Guatemala",
  state: "Antigua",
  city: "Sacatepequez",
};

export default function NewMembershipPage() {
  const router = useRouter();
  const [currentStep] = useState("data");
  const [formData, setFormData] = useState<FormData>(initialData);
  const [secondaryMembers, setSecondaryMembers] = useState<SecondaryMember[]>(
    mockSecondaryMembers
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSecondary = (id: string) => {
    // Placeholder for edit action
    console.log("Edit secondary member", id);
  };

  const handleRemoveSecondary = (id: string) => {
    setSecondaryMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handlePayment = () => {
    router.push("/membership/new/payment");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Blue bar under header */}
      <div className="h-12 bg-[#0052a1]" />

      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-medium text-[#002d5c]">New membership</h1>
          <Button
            variant="outline"
            className="border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa] rounded-lg px-4 py-2 h-10"
          >
            <Camera className="w-4 h-4 mr-2" />
            Capture Member ID
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Stepper sidebar */}
          <aside className="lg:w-56 shrink-0">
            <nav aria-label="Membership progress">
              <ol className="space-y-6">
                {steps.map((step) => {
                  const isCurrent = step.id === currentStep;
                  return (
                    <li key={step.id} className="flex items-start gap-3">
                      <div
                        className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold shrink-0 ${
                          isCurrent
                            ? "bg-[#0052a1] text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step.number}
                      </div>
                      <span
                        className={`text-sm font-medium pt-0.5 ${
                          isCurrent ? "text-[#002d5c]" : "text-gray-400"
                        }`}
                      >
                        {step.name}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          {/* Main form */}
          <div className="flex-1 max-w-5xl">
            {/* Personal data */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <FolderOpen className="w-5 h-5 text-[#002d5c]" />
                <h2 className="text-xl font-medium text-[#002d5c]">Personal data</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                    <Image
                      src="https://i.pravatar.cc/150?u=primary"
                      alt="Member photo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button className="text-sm text-[#0052a1] hover:underline font-medium">
                    Change picture
                  </button>
                </div>

                {/* Fields grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                  <ReadOnlyField label="ID Type" value={formData.idType} />
                  <ReadOnlyField label="ID Number" value={formData.idNumber} />
                  <ReadOnlyField
                    label="Membership Type"
                    value={formData.membershipType}
                  />
                  <ReadOnlyField label="Abbreviation" value={formData.abbreviation} />
                  <ReadOnlyField label="First Name" value={formData.firstName} />
                  <ReadOnlyField label="Last Name" value={formData.lastName} />
                  <ReadOnlyField label="Gender" value={formData.gender} />
                  <ReadOnlyField label="Date of birth" value={formData.dateOfBirth} />
                  <ReadOnlyField label="Occupation" value={formData.occupation} />
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Contact */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <Phone className="w-5 h-5 text-[#002d5c]" />
                <h2 className="text-xl font-medium text-[#002d5c]">Contact</h2>
              </div>

              <div className="space-y-6 max-w-3xl">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Email address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-2 h-11 border-gray-300 text-[#002d5c]"
                  />
                </div>

                <div className="relative">
                  <Label className="text-sm font-medium text-gray-700">
                    Mobile phone number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={formData.mobilePhone}
                    onChange={(e) =>
                      handleInputChange("mobilePhone", e.target.value)
                    }
                    className="mt-2 h-11 border-gray-300 text-[#002d5c]"
                  />
                  <AlertCircle className="absolute right-3 top-[38px] w-5 h-5 text-[#f5a623]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Home phone number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.homePhone}
                      onChange={(e) =>
                        handleInputChange("homePhone", e.target.value)
                      }
                      className="mt-2 h-11 border-gray-300 text-[#002d5c]"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Notifications
                    </Label>
                    <Input
                      value={formData.notifications}
                      onChange={(e) =>
                        handleInputChange("notifications", e.target.value)
                      }
                      className="mt-2 h-11 border-gray-300 text-[#002d5c]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Address */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-[#002d5c]" />
                <h2 className="text-xl font-medium text-[#002d5c]">Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="sm:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="mt-2 h-11 border-gray-300 text-[#002d5c]"
                  />
                </div>
                <ReadOnlyInput label="Country" value={formData.country} />
                <ReadOnlyInput label="State" value={formData.state} />
                <ReadOnlyInput label="City" value={formData.city} />
              </div>
            </section>

            <Separator className="my-8" />

            {/* Secondary memberships */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-[#002d5c]" />
                <h2 className="text-xl font-medium text-[#002d5c]">
                  Secondary memberships
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {secondaryMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between border rounded-lg p-4 bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100">
                        <Image
                          src={member.avatarUrl}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#002d5c]">
                          {member.name}
                        </p>
                        <div className="flex items-center gap-1 text-sm">
                          <button
                            onClick={() => handleEditSecondary(member.id)}
                            className="text-[#0052a1] hover:underline font-medium"
                          >
                            Edit
                          </button>
                          <span className="text-gray-400">|</span>
                          <button
                            onClick={() => handleRemoveSecondary(member.id)}
                            className="text-[#0052a1] hover:underline font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    {member.hasWarning && (
                      <AlertCircle className="w-5 h-5 text-[#f5a623]" />
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Sticky footer actions */}
      <div className="sticky bottom-0 bg-white border-t mt-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa] h-11 px-6"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go back home
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="w-full sm:w-auto border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa] h-11 px-8"
              >
                {isSaving ? "Saving..." : "Save changes"}
              </Button>
            </div>
            <Button
              onClick={handlePayment}
              className="w-full sm:w-auto bg-[#003d7a] hover:bg-[#002d5c] text-white h-11 px-10"
            >
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
      <p className="text-base text-[#002d5c]">{value}</p>
    </div>
  );
}

function ReadOnlyInput({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <Input
        value={value}
        readOnly
        className="mt-2 h-11 border-gray-300 bg-gray-50 text-[#002d5c]"
      />
    </div>
  );
}
