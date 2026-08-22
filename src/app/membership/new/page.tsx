"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FolderOpen,
  Phone,
  MapPin,
  Users,
  Home,
  AlertCircle,
  Camera,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface SecondaryMember {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

const steps = [
  { id: "data", label: "Membership data", number: 1 },
  { id: "payment", label: "Payment", number: 2 },
];

const mockMember = {
  avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  idType: "DNI",
  idNumber: "IDGTM1234567890123S0123",
  membershipType: "Diamond",
  abbreviation: "Mr.",
  firstName: "Nicolás",
  lastName: "Treviño",
  gender: "Male",
  dateOfBirth: "13/09/1978",
  occupation: "Urban planner",
  email: "",
  emailDeclined: true,
  mobilePhone: "+502 1234 5678",
  homePhone: "+502 2345 6789",
  notifications: "By email address",
  address: "Km 46.5 Salida A Ciudad Vieja",
  country: "Guatemala",
  state: "Antigua",
  city: "Sacatepequez",
};

const initialSecondaryMembers: SecondaryMember[] = [
  {
    id: "sm-1",
    firstName: "Mayra",
    lastName: "Treviño",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: "sm-2",
    firstName: "Pablo",
    lastName: "Treviño",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
];

function SectionTitle({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[#003d7a] text-xl font-medium mb-5">
      <Icon className="w-6 h-6" />
      <h2>{label}</h2>
    </div>
  );
}

function Field({ label, value, required = false }: { label: string; value: string; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm text-gray-900">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </p>
      <p className="text-base text-[#003d7a] font-medium min-h-[24px]">{value || "-"}</p>
    </div>
  );
}

export default function NewMembershipPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [member, setMember] = useState(mockMember);
  const [secondaryMembers, setSecondaryMembers] = useState<SecondaryMember[]>(initialSecondaryMembers);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const [formData, setFormData] = useState({ ...mockMember });

  const handleEdit = (section: string) => {
    setFormData({ ...member });
    setEditingSection(section);
  };

  const handleSaveSection = () => {
    setMember({ ...formData });
    setEditingSection(null);
    toast({
      title: "Changes saved",
      description: "Membership data updated successfully.",
    });
  };

  const handleCancel = () => {
    setEditingSection(null);
  };

  const handleRemoveSecondary = (id: string) => {
    setSecondaryMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handlePayment = async () => {
    setIsPaying(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsPaying(false);
    router.push("/membership/new/payment");
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSaving(false);
    toast({
      title: "Changes saved",
      description: "All membership data has been saved.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl flex-1">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-medium text-[#003d7a]">New membership</h1>
          <Button
            variant="outline"
            className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 rounded-lg px-5 py-2 h-auto"
          >
            <Camera className="w-4 h-4 mr-2" />
            Capture Member ID
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Stepper Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <nav className="space-y-4">
              {steps.map((step) => {
                const isCurrent = step.id === "data";
                return (
                  <div key={step.id} className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                        isCurrent
                          ? "bg-[#003d7a] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.number}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isCurrent ? "text-[#003d7a]" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Main Form Content */}
          <main className="flex-1 min-w-0">
            {/* Personal Data Section */}
            <section className="pb-8 border-b border-gray-200">
              <SectionTitle icon={FolderOpen} label="Personal data" />

              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={member.avatarUrl}
                      alt="Member photo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button className="text-sm text-[#0052a1] hover:underline font-medium">
                    Change picture
                  </button>
                </div>

                {/* Read-only data grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                  <Field label="ID Type" value={member.idType} />
                  <Field label="ID Number" value={member.idNumber} />
                  <Field label="Membership Type" value={member.membershipType} />
                  <Field label="Abbreviation" value={member.abbreviation} />
                  <Field label="First Name" value={member.firstName} />
                  <Field label="Last Name" value={member.lastName} />
                  <Field label="Gender" value={member.gender} />
                  <Field label="Date of birth" value={member.dateOfBirth} />
                  <Field label="Occupation" value={member.occupation} />
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="py-8 border-b border-gray-200">
              <SectionTitle icon={Phone} label="Contact" />

              {editingSection === "contact" ? (
                <div className="space-y-5 max-w-2xl">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900">
                      Email address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email address"
                      className="h-11 border-gray-300"
                    />
                    <div className="flex items-center gap-2 pt-1">
                      <Checkbox
                        id="emailDeclined"
                        checked={formData.emailDeclined}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, emailDeclined: checked === true })
                        }
                      />
                      <Label htmlFor="emailDeclined" className="text-sm text-gray-600 font-normal">
                        Customer declined to provide email address
                      </Label>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="mobilePhone" className="text-gray-900">
                        Mobile phone number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="mobilePhone"
                        value={formData.mobilePhone}
                        onChange={(e) => setFormData({ ...formData, mobilePhone: e.target.value })}
                        className="h-11 border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="homePhone" className="text-gray-900">
                        Home phone number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="homePhone"
                        value={formData.homePhone}
                        onChange={(e) => setFormData({ ...formData, homePhone: e.target.value })}
                        className="h-11 border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notifications" className="text-gray-900">
                      Notifications
                    </Label>
                    <Input
                      id="notifications"
                      value={formData.notifications}
                      onChange={(e) => setFormData({ ...formData, notifications: e.target.value })}
                      className="h-11 border-gray-300"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      onClick={handleSaveSection}
                      className="bg-[#0052a1] hover:bg-[#003d7a] h-10 px-6"
                    >
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="h-10 px-6">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                  <div className="sm:col-span-2 space-y-1">
                    <p className="text-sm text-gray-900">
                      Email address <span className="text-red-500">*</span>
                    </p>
                    <p className="text-base text-[#003d7a] font-medium">
                      {member.emailDeclined
                        ? "Customer declined to provide email address"
                        : member.email || "-"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-900">
                      Mobile phone number <span className="text-red-500">*</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-base text-[#003d7a] font-medium">{member.mobilePhone}</p>
                      <AlertCircle className="w-4 h-4 text-[#f5a623]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-900">
                      Home phone number <span className="text-red-500">*</span>
                    </p>
                    <p className="text-base text-[#003d7a] font-medium">{member.homePhone}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-900">Notifications</p>
                    <p className="text-base text-[#003d7a] font-medium">{member.notifications}</p>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => handleEdit("contact")}
                      className="text-sm text-[#0052a1] hover:underline font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* Address Section */}
            <section className="py-8 border-b border-gray-200">
              <SectionTitle icon={MapPin} label="Address" />

              {editingSection === "address" ? (
                <div className="space-y-5 max-w-3xl">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-900">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="h-11 border-gray-300"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-gray-900">
                        Country
                      </Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="h-11 border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-gray-900">
                        State
                      </Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="h-11 border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-900">
                        City
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="h-11 border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      onClick={handleSaveSection}
                      className="bg-[#0052a1] hover:bg-[#003d7a] h-10 px-6"
                    >
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="h-10 px-6">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-900">
                      Address <span className="text-red-500">*</span>
                    </p>
                    <p className="text-base text-[#003d7a] font-medium">{member.address}</p>
                  </div>
                  <Field label="Country" value={member.country} />
                  <Field label="State" value={member.state} />
                  <Field label="City" value={member.city} />
                  <div className="flex items-end">
                    <button
                      onClick={() => handleEdit("address")}
                      className="text-sm text-[#0052a1] hover:underline font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* Secondary Memberships Section */}
            <section className="py-8">
              <SectionTitle icon={Users} label="Secondary memberships" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {secondaryMembers.map((secondary) => (
                  <div
                    key={secondary.id}
                    className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 bg-white"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={secondary.avatarUrl}
                        alt={`${secondary.firstName} ${secondary.lastName}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-[#003d7a] truncate">
                        {secondary.firstName} {secondary.lastName}
                      </p>
                      <div className="flex items-center gap-2 text-sm mt-0.5">
                        <button className="text-[#0052a1] hover:underline font-medium">
                          Edit
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleRemoveSecondary(secondary.id)}
                          className="text-[#0052a1] hover:underline font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <AlertCircle className="w-5 h-5 text-[#f5a623] shrink-0" />
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Sticky Footer Actions */}
      <div className="sticky bottom-0 z-30 bg-white border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 h-11 px-6 w-full"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go back home
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleSaveAll}
                disabled={isSaving}
                className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 h-11 px-6 w-full sm:w-auto"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save changes"}
              </Button>
            </div>
            <Button
              onClick={handlePayment}
              disabled={isPaying}
              className="bg-[#003d7a] hover:bg-[#002d5c] text-white h-11 px-10 w-full sm:w-auto"
            >
              {isPaying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Payment"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
