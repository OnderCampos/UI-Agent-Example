import type { Metadata } from "next";

import { MembershipLanding } from "@/components/features/membership/membership-landing";

export const metadata: Metadata = {
  title: "Membership",
  description: "Create a new membership, review pending processes, or search for an existing membership profile.",
};

export default function MembershipRegistrationPage() {
  return <MembershipLanding />;
}
