"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { VerifyMembershipsDialog } from "@/components/features/membership/verify-memberships-dialog";
import { APP_ROUTES } from "@/lib/constants";

const initialMembers = [
  {
    id: "m-1",
    firstName: "Nicolás",
    lastName: "Treviño",
    contact: "+502 1234 5678",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
    status: "verified" as const,
  },
  {
    id: "m-2",
    firstName: "Mayra",
    lastName: "Treviño",
    contact: "+502 98876 5432",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    status: "pending" as const,
  },
  {
    id: "m-3",
    firstName: "Pablo",
    lastName: "Treviño",
    contact: "trevino.pablo@gmail.com",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    status: "pending" as const,
  },
  {
    id: "m-4",
    firstName: "",
    lastName: "",
    contact: "+502 94585 2576",
    avatarUrl: undefined,
    status: "pending" as const,
  },
];

export default function VerifyMembershipsPage() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleVerify = useCallback((id: string, code: string) => {
    console.log("Verified member", id, "with code", code);
  }, []);

  const handleResend = useCallback((id: string) => {
    console.log("Resend code to member", id);
  }, []);

  const handleDone = useCallback(() => {
    setOpen(false);
    // Delay navigation to let the dialog close animation finish.
    setTimeout(() => {
      void router.push(APP_ROUTES.VERIFY_MEMBERSHIP + "/done");
    }, 150);
  }, [router]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <VerifyMembershipsDialog
        open={open}
        onOpenChange={setOpen}
        members={initialMembers}
        onVerify={handleVerify}
        onResend={handleResend}
        onDone={handleDone}
      />
    </div>
  );
}
