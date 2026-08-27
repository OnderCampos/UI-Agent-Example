import type { Metadata } from "next";

import { NewMembershipRegistrationView } from "@/components/features/membership";

export const metadata: Metadata = {
  title: "New membership",
  description: "Review and edit a new membership registration before continuing to payment.",
};

export default function MembershipRegistrationPage() {
  return <NewMembershipRegistrationView />;
}
