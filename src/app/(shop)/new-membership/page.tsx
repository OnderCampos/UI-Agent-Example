import type { Metadata } from "next";

import { NewSecondaryMembershipForm } from "@/components/features/membership/new-secondary-membership-form";

export const metadata: Metadata = {
  title: "New secondary membership",
  description: "Add a new secondary membership linked to a primary member.",
};

export default function NewMembershipPage() {
  return <NewSecondaryMembershipForm />;
}
