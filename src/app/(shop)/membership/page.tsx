import type { Metadata } from "next";

import { MembershipVerificationDialog } from "@/components/features/membership";

export const metadata: Metadata = {
  title: "Membership Verification",
  description: "Verify each member using confirmation codes sent to their registered contact information.",
};

export default function MembershipPage() {
  return <MembershipVerificationDialog />;
}
