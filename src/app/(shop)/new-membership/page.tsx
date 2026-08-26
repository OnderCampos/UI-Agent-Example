import type { Metadata } from "next";

import { MembershipLocator } from "@/components/features/membership/membership-locator";

export const metadata: Metadata = {
  title: "Membership search",
  description: "Create a new membership or search for an existing member profile.",
};

export default function NewMembershipPage() {
  return <MembershipLocator />;
}
