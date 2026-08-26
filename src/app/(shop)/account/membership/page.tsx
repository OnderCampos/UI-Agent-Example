import type { Metadata } from "next";

import { MembershipRegistrationView } from "@/components/features/membership/membership-registration-view";

export const metadata: Metadata = {
  title: "New membership",
  description: "Review and edit new membership registration details before payment.",
};

export default function MembershipPage() {
  return <MembershipRegistrationView />;
}
