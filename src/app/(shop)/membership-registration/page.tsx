import type { Metadata } from "next";

import { MembershipRegistrationView } from "@/components/features/membership/membership-registration-view";

export const metadata: Metadata = {
  title: "New membership | PriceSmart",
  description: "Review membership registration details before payment.",
};

export default function MembershipRegistrationPage() {
  return <MembershipRegistrationView />;
}
