import type { Metadata } from "next";

import { SecondaryMembershipForm } from "@/components/features/membership/secondary-membership-form";

export const metadata: Metadata = {
  title: "New secondary membership",
  description:
    "Secondary membership registration form with personal data, contact details, address fields, and footer actions.",
};

export default function MembershipPage() {
  return <SecondaryMembershipForm />;
}
