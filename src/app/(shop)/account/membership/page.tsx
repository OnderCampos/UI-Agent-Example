import type { Metadata } from "next";

import { MembershipVerifyDialog } from "@/components/features/membership/membership-verify-dialog";

export const metadata: Metadata = {
  title: "Verify memberships",
  description: "Verify member contacts by entering the confirmation codes sent to each registered phone number or email.",
};

export default function MembershipPage() {
  return <MembershipVerifyDialog />;
}
