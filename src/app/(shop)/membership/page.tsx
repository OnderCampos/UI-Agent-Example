import type { Metadata } from "next";

import { MembershipSearchView } from "@/components/features/membership";

export const metadata: Metadata = {
  title: "Membership Search",
  description: "Locate an existing membership profile or start a new membership registration.",
};

export default function MembershipPage() {
  return <MembershipSearchView />;
}
