import type { Metadata } from "next";

import { NewMembershipRegistration } from "@/components/features/membership/new-membership-registration";

export const metadata: Metadata = {
  title: "New Membership",
  description: "Review and manage a new membership registration before proceeding to payment.",
};

export default function MembershipRegistrationPage() {
  return <NewMembershipRegistration />;
}
