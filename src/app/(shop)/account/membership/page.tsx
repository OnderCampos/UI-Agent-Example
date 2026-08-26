import type { Metadata } from "next";

import { MembershipRegistrationView } from "@/components/features/membership/membership-registration-view";

export const metadata: Metadata = {
  title: "New secondary membership",
  description: "Add a new secondary membership linked to a primary member through personal, contact, and address details.",
};

export default function MembershipPage() {
  return <MembershipRegistrationView />;
}
