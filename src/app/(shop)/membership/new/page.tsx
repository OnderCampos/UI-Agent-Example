import type { Metadata } from "next";

import { NewMemberRegistration } from "@/components/features/membership";

export const metadata: Metadata = {
  title: "New Membership | PriceSmart",
  description: "Register a new PriceSmart membership and review member details before payment.",
};

export default function NewMembershipPage() {
  return (
    <NewMemberRegistration
      onSaveChanges={(data) => {
        // Placeholder: persist membership registration data
        console.log("Saving membership data:", data);
      }}
      onPayment={(data) => {
        // Placeholder: proceed to payment step
        console.log("Proceeding to payment:", data);
      }}
    />
  );
}
