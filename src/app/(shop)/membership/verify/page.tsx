"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { VerifyMembershipsModal, type VerificationMember } from "@/components/features/membership-verification";

const initialMembers: VerificationMember[] = [
  {
    id: "1",
    firstName: "Nicolás",
    lastName: "Treviño",
    contact: "+502 1234 5678",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    status: "verified",
    code: "",
  },
  {
    id: "2",
    firstName: "Mayra",
    lastName: "Treviño",
    contact: "+502 98876 5432",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    status: "pending",
    code: "",
  },
  {
    id: "3",
    firstName: "Pablo",
    lastName: "Treviño",
    contact: "trevino.pablo@gmail.com",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    status: "pending",
    code: "",
  },
  {
    id: "4",
    firstName: "",
    lastName: "",
    contact: "+502 94585 2576",
    status: "pending",
    code: "",
  },
];

export default function VerifyMembershipsPage() {
  const router = useRouter();
  const [members, setMembers] = React.useState<VerificationMember[]>(initialMembers);

  const handleCodeChange = React.useCallback((id: string, code: string) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? {
              ...member,
              code,
              status: code.length === 4 ? "verified" : "pending",
            }
          : member
      )
    );
  }, []);

  const handleResendCode = React.useCallback((id: string) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, code: "", status: "pending" } : member
      )
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#5a667c] flex items-center justify-center p-4">
      <VerifyMembershipsModal
        open
        onOpenChange={(open) => {
          if (!open) router.push("/membership/search");
        }}
        members={members}
        onCodeChange={handleCodeChange}
        onResendCode={handleResendCode}
        onDone={() => router.push("/membership/search")}
      />
    </div>
  );
}
