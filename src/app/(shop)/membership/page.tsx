import type { Metadata } from "next";

import { NewSecondaryMembershipFormView } from "@/components/features/membership";

export const metadata: Metadata = {
  title: "New Secondary Membership",
  description: "Add a new secondary membership linked to a primary member through the membership data form.",
};

export default function MembershipPage() {
  return <NewSecondaryMembershipFormView />;
}
