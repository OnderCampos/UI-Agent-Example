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
  Save,
  CreditCard,
  AlertCircle,
  Camera,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import type { UserAddress } from "@/types/user";

// Mock data matching the reference image
const mockMember = {
  photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  idType: "DNI",
  idNumber: "IDGTM1234567890123S0123",
  membershipType: "Diamond",
  abbreviation: "Mr.",
  firstName: "Nicolás",
  lastName: "Treviño",
  gender: "Male",
  dateOfBirth: "13/09/1978",
  occupation: "Urban planner",
};

const mockContact = {
  email: "",
  emailDeclined: true,
  mobilePhone: "+502 1234 5678",
  mobilePhoneNeedsAttention: true,
  homePhone: "+502 2345 6789",
  notifications: "By email address",
  notificationOptions: [
    { value: "email", label: "By email address" },
    { value: "sms", label: "By SMS" },
    { value: "none", label: "No notifications" },
  ],
};

const mockAddress: UserAddress = {
  id: "addr-1",
  firstName: "Nicolás",
  lastName: "Treviño",
  streetAddress: "Km 46.5 Salida A Ciudad Vieja",
  streetAddress2: "",
  city: "Sacatepequez",
  state: "Antigua",
  postalCode: "",
  country: "Guatemala",
  phone: "",
  isDefault: true,
  isDefaultShipping: true,
  isDefaultBilling: true,
  label: "Home",
};

const mockSecondaryMemberships = [
  {
    id: "sec-1",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    name: "Mayra Treviño",
    needsAttention: true,
  },
  {
    id: "sec-2",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    name: "Pablo Treviño",
    needsAttention: true,
  },
];

// Empty state placeholder image
const placeholderAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e5e7eb'/%3E%3C/svg%3E";

function SectionTitle({ icon: Icon, title }: { icon: typeof Folder; title: string }) {
  return (
    <div className="flex items-center gap-2 text-[#003d7a] mb-6">
      <Icon className="w-6 h-6" />
      <h2 className="text-xl font-normal">{title}</h2>
    </div>
  );
}

function ReadOnlyField({
  label,
  value,
  required = false,
  warning = false,
}: {
  label: string;
  value: string;
  required?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="space-y-1.5 relative">
      <Label className="text-gray-600 font-normal">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      <Input
        value={value}
        readOnly
        className="bg-white border-gray-300 text-[#003d7a] font-medium h-10 pr-10 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {warning && (
        <AlertCircle className="absolute right-3 top-[34px] w-5 h-5 text-[#f5a623]" />
      )}
    </div>
  );
}

function SecondaryMembershipCard({
  member,
  onEdit,
  onRemove,
}: {
  member: (typeof mockSecondaryMemberships)[0];
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white">
      <img
        src={member.photoUrl}
        alt={member.name}
        className="w-12 h-12 rounded-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = placeholderAvatar;
        }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-[#003d7a] font-medium truncate">{member.name}</p>
        <div className="flex items-center gap-2 text-sm mt-0.5">
          <button type="button" onClick={onEdit} className="text-[#0052a1] hover:underline">
            Edit
          </button>
          <span className="text-gray-300">|</span>
          <button type="button" onClick={onRemove} className="text-[#0052a1] hover:underline">
            Remove
          </button>
        </div>
      </div>
      {member.needsAttention && (
        <AlertCircle className="w-5 h-5 text-[#f5a623] flex-shrink-0" />
      )}
    </div>
  );
}

export default function NewMembershipPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [secondaryMemberships, setSecondaryMemberships] = useState(mockSecondaryMemberships);
  const [showCaptureDialog, setShowCaptureDialog] = useState(false);

  const handleSaveChanges = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const handlePayment = () => {
    router.push("/checkout/payment");
  };

  const handleRemoveSecondary = (id: string) => {
    setSecondaryMemberships((prev) => prev.filter((m) => m.id !== id));
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
                  <div className="w-0.5 h-8 bg-gray-300 mt-1" />
                </div>
                <div>
                  <p className="text-[#003d7a] font-medium">Membership data</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 font-medium">Payment</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h1 className="text-3xl font-normal text-[#003d7a]">New membership</h1>
              <Dialog open={showCaptureDialog} onOpenChange={setShowCaptureDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 rounded-lg px-4 py-2 h-auto"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Member ID
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Capture Member ID</DialogTitle>
                  </DialogHeader>
                  <div className="p-8 text-center text-gray-500">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>Camera capture placeholder</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Personal data section */}
            <section className="mb-10">
              <SectionTitle icon={Folder} title="Personal data" />
              <div className="flex flex-col md:flex-row gap-8">
                {/* Photo column */}
                <div className="flex flex-col items-center gap-2 md:w-40">
                  <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                    <img
                      src={mockMember.photoUrl}
                      alt="Member"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = placeholderAvatar;
                      }}
                    />
                  </div>
                  <button type="button" className="text-sm text-[#0052a1] hover:underline">
                    Change picture
                  </button>
                </div>

                {/* Fields grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                  <ReadOnlyField label="ID Type" value={mockMember.idType} />
                  <ReadOnlyField label="ID Number" value={mockMember.idNumber} />
                  <ReadOnlyField label="Membership Type" value={mockMember.membershipType} />
                  <ReadOnlyField label="Abbreviation" value={mockMember.abbreviation} />
                  <ReadOnlyField label="First Name" value={mockMember.firstName} />
                  <ReadOnlyField label="Last Name" value={mockMember.lastName} />
                  <ReadOnlyField label="Gender" value={mockMember.gender} />
                  <ReadOnlyField label="Date of birth" value={mockMember.dateOfBirth} />
                  <ReadOnlyField label="Occupation" value={mockMember.occupation} />
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 my-8" />

            {/* Contact section */}
            <section className="mb-10">
              <SectionTitle icon={Phone} title="Contact" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <ReadOnlyField
                    label="Email address"
                    value={mockContact.emailDeclined ? "Customer declined to provide email address" : mockContact.email}
                    required
                  />
                </div>
                <ReadOnlyField
                  label="Mobile phone number"
                  value={mockContact.mobilePhone}
                  required
                  warning={mockContact.mobilePhoneNeedsAttention}
                />
                <ReadOnlyField label="Home phone number" value={mockContact.homePhone} required />
                <div className="space-y-2">
                  <Label className="text-gray-600 font-normal">Notifications</Label>
                  <div className="space-y-2">
                    {mockContact.notificationOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`notification-${option.value}`}
                          checked={mockContact.notifications === option.label}
                          className="data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
                        />
                        <Label
                          htmlFor={`notification-${option.value}`}
                          className="text-sm text-[#003d7a] font-normal cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 my-8" />

            {/* Address section */}
            <section className="mb-10">
              <SectionTitle icon={MapPin} title="Address" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
                <div className="lg:col-span-2">
                  <ReadOnlyField label="Address" value={mockAddress.streetAddress} required />
                </div>
                <ReadOnlyField label="Country" value={mockAddress.country} />
                <ReadOnlyField label="State" value={mockAddress.state} />
                <ReadOnlyField label="City" value={mockAddress.city} />
              </div>
            </section>

            <div className="border-t border-gray-200 my-8" />

            {/* Secondary memberships section */}
            <section className="mb-10">
              <SectionTitle icon={Users} title="Secondary memberships" />
              {secondaryMemberships.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {secondaryMemberships.map((member) => (
                    <SecondaryMembershipCard
                      key={member.id}
                      member={member}
                      onEdit={() => {}}
                      onRemove={() => handleRemoveSecondary(member.id)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No secondary memberships added.</p>
              )}
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
            <Button
              onClick={handlePayment}
              className="w-full sm:w-auto bg-[#003d7a] hover:bg-[#002d5c] text-white rounded-lg px-10 h-11"
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
