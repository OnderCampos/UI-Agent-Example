"use client";

import { useRouter } from "next/navigation";
import { Camera, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MembershipRegistrationForm } from "@/components/features/membership";

const steps = [
  { id: 1, name: "Membership data" },
  { id: 2, name: "Payment" },
];

const initialData = {
  idType: "DNI",
  idNumber: "IDGTM1234567890123S0123",
  membershipType: "Diamond",
  abbreviation: "Mr.",
  firstName: "Nicolás",
  lastName: "Treviño",
  gender: "Male",
  dateOfBirth: "13/09/1978",
  occupation: "Urban planner",
  avatarUrl: "https://i.pravatar.cc/300?img=11",
  email: "",
  mobilePhone: "+502 1234 5678",
  homePhone: "+502 2345 6789",
  notifications: "By email address",
  address: "Km 46.5 Salida A Ciudad Vieja",
  country: "Guatemala",
  state: "Antigua",
  city: "Sacatepequez",
  secondaryMembers: [
    {
      id: "sm-1",
      firstName: "Mayra",
      lastName: "Treviño",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      hasWarning: true,
    },
    {
      id: "sm-2",
      firstName: "Pablo",
      lastName: "Treviño",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      hasWarning: true,
    },
  ],
};

export default function NewMembershipPage() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#003d7a]">New membership</h1>
        <Button
          type="button"
          variant="outline"
          className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 h-11"
          onClick={() => router.push("/membership/capture-id")}
        >
          <Camera className="w-4 h-4 mr-2" />
          Capture Member ID
        </Button>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8 items-start">
        {/* Stepper */}
        <nav aria-label="Membership progress" className="lg:sticky lg:top-24">
          <ol className="space-y-6">
            {steps.map((step) => {
              const isActive = step.id === 1;
              const isCompleted = step.id < 1;

              return (
                <li key={step.id} className="flex items-start gap-3">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold shrink-0 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                        ? "bg-[#003d7a] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        isActive
                          ? "text-[#003d7a]"
                          : isCompleted
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {step.name}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
          <MembershipRegistrationForm
            initialData={initialData}
            onSave={(data) => {
              console.log("Save membership data", data);
            }}
            onPayment={(data) => {
              console.log("Proceed to payment", data);
              router.push("/membership/payment");
            }}
            onGoHome={() => router.push("/")}
            onCaptureMemberId={() => router.push("/membership/capture-id")}
          />
        </div>
      </div>
    </div>
  );
}
