"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Folder,
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface SecondaryMember {
  id: string;
  name: string;
  avatarUrl: string;
}

const initialSecondaryMembers: SecondaryMember[] = [
  {
    id: "sm-1",
    name: "Mayra Treviño",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "sm-2",
    name: "Pablo Treviño",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
];

const fieldLabelClass = "text-sm font-medium text-[#1a1a2e]";
const fieldValueClass = "text-base text-[#1a3a5c]";
const sectionIconClass = "w-6 h-6 text-[#0052a1]";

export default function NewMembershipPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isSaving, setIsSaving] = useState(false);
  const [secondaryMembers, setSecondaryMembers] = useState<SecondaryMember[]>(
    initialSecondaryMembers
  );

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSaving(false);
    toast({
      title: "Changes saved",
      description: "Membership information has been updated.",
    });
  };

  const handlePayment = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSaving(false);
    router.push("/checkout/payment");
  };

  const handleRemoveSecondary = (id: string) => {
    setSecondaryMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-semibold text-[#1a1a2e]">New membership</h1>
          <Button
            variant="outline"
            className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 rounded-md px-4 py-2 h-10"
          >
            <Camera className="w-4 h-4 mr-2" />
            Capture Member ID
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar progress */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="flex lg:flex-col items-start gap-6">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#0052a1] text-white flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <span className="text-[#0052a1] font-medium">Membership data</span>
              </div>
              <div className="hidden lg:block w-px h-6 bg-gray-200 ml-3.5" />
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <span className="text-gray-400 font-medium">Payment</span>
              </div>
            </div>
          </aside>

          {/* Main form content */}
          <main className="flex-1 min-w-0">
            {/* Personal data */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <Folder className={sectionIconClass} />
                <h2 className="text-xl font-medium text-[#1a1a2e]">Personal data</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-100">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
                      alt="Member"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="text-sm text-[#0052a1] hover:underline font-medium"
                  >
                    Change picture
                  </button>
                </div>

                {/* Fields grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  <div className="space-y-1">
                    <p className={fieldLabelClass}>ID Type</p>
                    <p className={fieldValueClass}>DNI</p>
                  </div>
                  <div className="space-y-1">
                    <p className={fieldLabelClass}>ID Number</p>
                    <p className={fieldValueClass}>IDGTM1234567890123S0123</p>
                  </div>
                  <div className="space-y-1">
                    <p className={fieldLabelClass}>Membership Type</p>
                    <p className={fieldValueClass}>Diamond</p>
                  </div>
                  <div className="space-y-1">
                    <p className={fieldLabelClass}>Abbreviation</p>
                    <p className={fieldValueClass}>Mr.</p>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="firstName" className={fieldLabelClass}>
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      defaultValue="Nicolás"
                      className="h-9 border-gray-300 text-[#1a3a5c] focus-visible:ring-[#0052a1]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName" className={fieldLabelClass}>
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      defaultValue="Treviño"
                      className="h-9 border-gray-300 text-[#1a3a5c] focus-visible:ring-[#0052a1]"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className={fieldLabelClass}>Gender</p>
                    <p className={fieldValueClass}>Male</p>
                  </div>
                  <div className="space-y-1">
                    <p className={fieldLabelClass}>Date of birth</p>
                    <p className={fieldValueClass}>13/09/1978</p>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="occupation" className={fieldLabelClass}>
                      Occupation
                    </Label>
                    <Input
                      id="occupation"
                      defaultValue="Urban planner"
                      className="h-9 border-gray-300 text-[#1a3a5c] focus-visible:ring-[#0052a1]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-8 bg-gray-200" />

            {/* Contact */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <Phone className={sectionIconClass} />
                <h2 className="text-xl font-medium text-[#1a1a2e]">Contact</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-1 lg:col-span-2">
                  <Label htmlFor="email" className={fieldLabelClass}>
                    Email address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    defaultValue="Customer declined to provide email address"
                    className="h-9 border-gray-300 text-[#1a3a5c] focus-visible:ring-[#0052a1]"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="mobile" className={fieldLabelClass}>
                    Mobile phone number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="mobile"
                      defaultValue="+502 1234 5678"
                      className="h-9 border-gray-300 text-[#1a3a5c] focus-visible:ring-[#0052a1] pr-10"
                    />
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f5a623]" />
                  </div>
                </div>

                <div className="hidden lg:block" />

                <div className="space-y-1">
                  <Label htmlFor="homePhone" className={fieldLabelClass}>
                    Home phone number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="homePhone"
                    defaultValue="+502 2345 6789"
                    className="h-9 border-gray-300 text-[#1a3a5c] focus-visible:ring-[#0052a1]"
                  />
                </div>

                <div className="space-y-1">
                  <p className={fieldLabelClass}>Notifications</p>
                  <p className={fieldValueClass}>By email address</p>
                </div>
              </div>
            </section>

            <Separator className="my-8 bg-gray-200" />

            {/* Address */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className={sectionIconClass} />
                <h2 className="text-xl font-medium text-[#1a1a2e]">Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="address" className={fieldLabelClass}>
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    defaultValue="Km 46.5 Salida A Ciudad Vieja"
                    className="h-9 border-gray-300 text-[#1a3a5c] focus-visible:ring-[#0052a1]"
                  />
                </div>
                <div className="space-y-1">
                  <p className={fieldLabelClass}>Country</p>
                  <p className={fieldValueClass}>Guatemala</p>
                </div>
                <div className="space-y-1">
                  <p className={fieldLabelClass}>State</p>
                  <p className={fieldValueClass}>Antigua</p>
                </div>
                <div className="space-y-1">
                  <p className={fieldLabelClass}>City</p>
                  <p className={fieldValueClass}>Sacatepequez</p>
                </div>
              </div>
            </section>

            <Separator className="my-8 bg-gray-200" />

            {/* Secondary memberships */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <Users className={sectionIconClass} />
                <h2 className="text-xl font-medium text-[#1a1a2e]">Secondary memberships</h2>
              </div>

              <div className="flex flex-wrap gap-4">
                {secondaryMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-4 border border-gray-200 rounded-lg px-4 py-3 min-w-[280px]"
                  >
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1a1a2e] truncate">
                        {member.name}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <button
                          type="button"
                          className="text-[#0052a1] hover:underline font-medium"
                        >
                          Edit
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSecondary(member.id)}
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

      {/* Sticky footer actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 z-30">
        <div className="container mx-auto px-4 max-w-7xl">
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
                onClick={handleSave}
                disabled={isSaving}
                className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 h-11 px-8 w-full sm:w-auto"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                Save changes
              </Button>
            </div>
            <Button
              onClick={handlePayment}
              disabled={isSaving}
              className="bg-[#0052a1] hover:bg-[#003d7a] text-white h-11 px-12 w-full sm:w-auto"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
