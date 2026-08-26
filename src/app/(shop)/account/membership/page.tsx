import type { Metadata } from "next";

import { MembershipVerificationDialog } from "@/components/features/membership/membership-verification-dialog";

export const metadata: Metadata = {
  title: "Verify memberships",
  description: "Confirm member identities with verification codes sent to their registered contact methods.",
};

export default function MembershipPage() {
  return <MembershipVerificationDialog />;
}
