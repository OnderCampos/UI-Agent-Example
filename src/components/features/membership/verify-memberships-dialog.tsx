"use client";

import * as React from "react";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VerifyMemberRow, type VerifyMember } from "./verify-member-row";

interface VerifyMembershipsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: VerifyMember[];
  onMembersChange: (members: VerifyMember[]) => void;
  onDone: () => void;
}

export function VerifyMembershipsDialog({
  open,
  onOpenChange,
  members,
  onMembersChange,
  onDone,
}: VerifyMembershipsDialogProps) {
  const handleCodeChange = (id: string, code: string[]) => {
    onMembersChange(
      members.map((member) =>
        member.id === id ? { ...member, code } : member
      )
    );
  };

  const handleResend = (id: string) => {
    // Placeholder for resend logic.
    onMembersChange(
      members.map((member) =>
        member.id === id ? { ...member, code: Array(member.code.length).fill("") } : member
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-0 sm:max-w-[540px]">
        <div className="relative overflow-hidden rounded-t-2xl bg-[#0052a1] p-6 text-white">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full border-[16px] border-white/10" />
          <div className="absolute -right-10 top-8 h-24 w-24 rounded-full border-[12px] border-white/10" />

          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="px-6 pb-6 pt-4">
          <DialogHeader className="mb-4 space-y-2 text-left">
            <DialogTitle className="text-xl font-bold text-[#002d5c]">
              Verify memberships
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-gray-500">
              Send a code to the registered contact of each member. You will
              enter the code number in the next screen.
            </DialogDescription>
          </DialogHeader>

          <div className="divide-y divide-gray-100">
            {members.map((member) => (
              <VerifyMemberRow
                key={member.id}
                member={member}
                onCodeChange={handleCodeChange}
                onResend={handleResend}
              />
            ))}
          </div>

          <Button
            onClick={onDone}
            className="mt-6 h-12 w-full bg-[#003d7a] text-base font-semibold text-white hover:bg-[#002d5c]"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
