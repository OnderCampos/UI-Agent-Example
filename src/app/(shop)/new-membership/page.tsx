import type { Metadata } from "next";

import { NewMembershipReview } from "@/components/features/membership/new-membership-review";

export const metadata: Metadata = {
  title: "New membership",
  description: "Review member registration details before proceeding to payment.",
};

export default function NewMembershipPage() {
  return <NewMembershipReview />;
}
