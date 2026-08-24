"use client";

import { useState } from "react";

import { VerifyMembershipsDialog } from "@/components/features/membership";

export default function VerifyMembershipPage() {
  const [open, setOpen] = useState(true);

  return (
    <main className="min-h-screen bg-slate-600 flex items-center justify-center p-4">
      <VerifyMembershipsDialog open={open} onOpenChange={setOpen} />
    </main>
  );
}
