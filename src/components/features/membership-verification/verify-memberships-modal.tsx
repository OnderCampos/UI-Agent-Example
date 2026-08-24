"use client";

import * as React from "react";
import { UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VerificationMemberItem, type VerificationMember } from "./verification-member-item";

export interface VerifyMembershipsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: VerificationMember[];
  onCodeChange: (id: string, code: string) => void;
  onResendCode?: (id: string) => void;
  onDone?: () => void;
  title?: string;
  description?: string;
  codeLength?: number;
}

export function VerifyMembershipsModal({
  open,
  onOpenChange,
  members,
  onCodeChange,
  onResendCode,
  onDone,
  title = "Verify memberships",
  description = "Send a code to the registered contact of each member. You will enter the code number in the next screen.",
  codeLength = 4,
}: VerifyMembershipsModalProps) {
  const allVerified = members.every((member) => member.status === "verified");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] p-0 gap-0 overflow-hidden border-none bg-white">
        <div className="p-6 sm:p-8">
          <DialogHeader className="space-y-4 text-left">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#0052a1] bg-white">
              <UserPlus className="h-7 w-7 text-[#0052a1]" />
            </div>
            <div className="space-y-1.5 pr-8">
              <DialogTitle className="text-2xl font-semibold text-[#003d7a]">
                {title}
              </DialogTitle>
              <DialogDescription className="text-sm text-[#616161] leading-relaxed">
                {description}
              </DialogDescription>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 sm:px-8">
          <div className="border-t border-[#e5e7eb]" />
        </div>

        <div className="px-6 sm:px-8 py-2">
          {members.map((member) => (
            <VerificationMemberItem
              key={member.id}
              member={member}
              onCodeChange={onCodeChange}
              onResendCode={onResendCode}
              codeLength={codeLength}
            />
          ))}
        </div>

        <div className="p-6 sm:p-8 pt-2">
          <Button
            type="button"
            onClick={onDone}
            disabled={!allVerified}
            className={cn(
              "w-full h-12 text-base font-semibold rounded-lg transition-colors",
              allVerified
                ? "bg-[#003d7a] text-white hover:bg-[#002d5c]"
                : "bg-[#0052a1] text-white hover:bg-[#003d7a]"
            )}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
