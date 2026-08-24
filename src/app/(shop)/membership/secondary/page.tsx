"use client";

import { useRouter } from "next/navigation";
import { Camera, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SecondaryMemberRegistrationForm } from "@/components/features/membership";
import { APP_ROUTES } from "@/lib/constants";

const steps = [
  { id: 1, name: "Membership data" },
  { id: 2, name: "Payment" },
];

const primaryMember = {
  firstName: "Nicolas",
  lastName: "Treviño",
  membershipType: "Primary membership",
};

export default function NewSecondaryMembershipPage() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#003d7a]">
          {primaryMember.firstName} {primaryMember.lastName}
        </h1>
        <p className="text-gray-600 mt-1">{primaryMember.membershipType}</p>
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

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-semibold text-[#003d7a]">
              New secondary membership
            </h2>
            <Button
              type="button"
              variant="outline"
              className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 h-11"
              onClick={() => router.push(APP_ROUTES.MEMBERSHIP + "/capture-id")}
            >
              <Camera className="w-4 h-4 mr-2" />
              Capture Member ID
            </Button>
          </div>

          <SecondaryMemberRegistrationForm
            onSave={(data) => {
              console.log("Save secondary member data", data);
            }}
            onAddMember={(data) => {
              console.log("Add secondary member", data);
              router.push(APP_ROUTES.MEMBERSHIP + "/verify");
            }}
            onGoHome={() => router.push("/")}
            onPrevious={() => router.back()}
            onCaptureMemberId={() =>
              router.push(APP_ROUTES.MEMBERSHIP + "/capture-id")
            }
          />
        </div>
      </div>
    </div>
  );
}
