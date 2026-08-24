"use client";

import { Home, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stepper, type Step } from "./stepper";
import { PersonalDataSection } from "./personal-data-section";
import { ContactSection } from "./contact-section";
import { AddressSection } from "./address-section";
import { SecondaryMembershipsSection } from "./secondary-memberships-section";

const steps: Step[] = [
  { id: "data", label: "Membership data", number: 1 },
  { id: "payment", label: "Payment", number: 2 },
];

interface MembershipDataViewProps {
  personalData: Parameters<typeof PersonalDataSection>[0]["data"];
  contactData: Parameters<typeof ContactSection>[0]["data"];
  addressData: Parameters<typeof AddressSection>[0]["data"];
  secondaryMembers: Parameters<typeof SecondaryMembershipsSection>[0]["members"];
  onCaptureMemberId?: () => void;
  onChangePicture?: () => void;
  onEditSecondary?: (id: string) => void;
  onRemoveSecondary?: (id: string) => void;
  onSaveChanges?: () => void;
  onGoHome?: () => void;
  onPayment?: () => void;
}

export function MembershipDataView({
  personalData,
  contactData,
  addressData,
  secondaryMembers,
  onCaptureMemberId,
  onChangePicture,
  onEditSecondary,
  onRemoveSecondary,
  onSaveChanges,
  onGoHome,
  onPayment,
}: MembershipDataViewProps) {
  return (
    <div className="min-h-screen bg-white flex">
      <aside className="hidden md:block w-64 border-r border-gray-200 p-8">
        <Stepper steps={steps} currentStep="data" />
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 max-w-6xl">
            <h1 className="text-2xl font-bold text-[#003d7a]">New membership</h1>
            {onCaptureMemberId && (
              <Button
                variant="outline"
                onClick={onCaptureMemberId}
                className="border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa]"
              >
                Capture Member ID
              </Button>
            )}
          </div>

          <div className="space-y-10 max-w-6xl">
            <PersonalDataSection
              data={personalData}
              onChangePicture={onChangePicture}
            />
            <ContactSection data={contactData} />
            <AddressSection data={addressData} />
            <SecondaryMembershipsSection
              members={secondaryMembers}
              onEdit={onEditSecondary}
              onRemove={onRemoveSecondary}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 bg-white">
          <div className="px-4 sm:px-6 lg:px-10 py-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 max-w-6xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={onGoHome}
                  className="border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa]"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go back home
                </Button>
                {onSaveChanges && (
                  <Button
                    variant="outline"
                    onClick={onSaveChanges}
                    className="border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa]"
                  >
                    Save changes
                  </Button>
                )}
              </div>

              {onPayment && (
                <Button
                  onClick={onPayment}
                  className="bg-[#003d7a] hover:bg-[#002d5c] text-white"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
