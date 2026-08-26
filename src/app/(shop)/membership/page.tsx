import type { Metadata } from "next";

import { NewMembershipRegistration } from "@/components/features/membership/new-membership-registration";

export const metadata: Metadata = {
  title: "New membership",
  description: "Review personal, contact, address, and secondary membership details before payment.",
};

export default function MembershipPage() {
  return <NewMembershipRegistration />;
}
