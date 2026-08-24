"use client";

import { useState } from "react";

import {
  VerifyMembershipDialog,
  type VerificationMember,
} from "@/components/features/membership/verify-membership-dialog";

const INITIAL_MEMBERS: VerificationMember[] = [
  {
    id: "1",
    name: "Nicolás Treviño",
    contact: "+502 1234 5678",
    avatarUrl: "https://i.pravatar.cc/150?u=nicolas",
    status: "verified",
  },
  {
    id: "2",
    name: "Mayra Treviño",
    contact: "+502 98876 5432",
    avatarUrl: "https://i.pravatar.cc/150?u=mayra",
    status: "pending",
  },
  {
    id: "3",
    name: "Pablo Treviño",
    contact: "trevino.pablo@gmail.com",
    avatarUrl: "https://i.pravatar.cc/150?u=pablo",
    status: "pending",
  },
];

export default function VerifyMembershipPage() {
  const [open, setOpen] = useState(true);
  const [members] = useState<VerificationMember[]>(INITIAL_MEMBERS);

  return (
    <main className="min-h-screen bg-[#5a667c] flex items-center justify-center p-4">
      <VerifyMembershipDialog
        open={open}
        onOpenChange={setOpen}
        members={members}
        onDone={(verifiedMembers) => {
          // eslint-disable-next-line no-console
          console.log("Verified members:", verifiedMembers);
        }}
      />
    </main>
  );
}
