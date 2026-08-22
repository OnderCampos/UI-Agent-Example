"use client";

import { useState } from "react";
import { VerifyMembershipsDialog } from "@/components/features/membership";
import { Button } from "@/components/ui/button";

export default function MembershipVerifyPage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#5b6780] flex items-center justify-center p-4">
      <Button
        onClick={() => setOpen(true)}
        className="bg-[#003d7a] hover:bg-[#002d5c] text-white"
      >
        Verify memberships
      </Button>
      <VerifyMembershipsDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
