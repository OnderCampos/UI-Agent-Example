import type { Metadata } from "next";

import { MembershipVerificationDialog } from "@/components/features/membership/membership-verification-dialog";

export const metadata: Metadata = {
  title: "Verify memberships",
  description:
    "Membership verification dialog for reviewing contacts and entering confirmation codes for each member.",
};

export default function MembershipVerificationPage() {
  return <MembershipVerificationDialog />;
}
