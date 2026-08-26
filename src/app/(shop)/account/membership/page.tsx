import type { Metadata } from "next";

import { MembershipLookupView } from "@/components/features/membership/membership-lookup-view";

export const metadata: Metadata = {
  title: "Membership search",
  description: "Create a new membership or look up an existing member profile.",
};

export default function MembershipPage() {
  return <MembershipLookupView />;
}
