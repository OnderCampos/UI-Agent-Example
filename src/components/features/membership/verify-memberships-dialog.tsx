"use client";

import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  MemberVerificationItem,
  type MemberVerificationItemProps,
} from "./member-verification-item";

export interface VerifyMembershipsDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  members: Omit<
    MemberVerificationItemProps,
    "codeLength" | "onVerify" | "onResend"
  >[];
  onVerify?: (id: string, code: string) => void;
  onResend?: (id: string) => void;
  onDone?: () => void;
}

type MemberWithStatus = Omit<
  MemberVerificationItemProps,
  "codeLength" | "onVerify" | "onResend"
> & {
  status: MemberVerificationItemProps["status"];
};

export function VerifyMembershipsDialog({
  open,
  onOpenChange,
  members,
  onVerify,
  onResend,
  onDone,
}: VerifyMembershipsDialogProps) {
  const [localMembers, setLocalMembers] = useState<MemberWithStatus[]>(members);

  useEffect(() => {
    setLocalMembers(members);
  }, [members]);

  const allVerified =
    localMembers.length > 0 && localMembers.every((m) => m.status === "verified");

  const handleVerify = (id: string, code: string) => {
    setLocalMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "verified" as const } : m))
    );
    onVerify?.(id, code);
  };

  const handleResend = (id: string) => {
    setLocalMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "pending" as const } : m))
    );
    onResend?.(id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden border-0 sm:rounded-2xl">
        <div className="p-6 sm:p-8 bg-white rounded-2xl">
          <DialogHeader className="space-y-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#0052a1] bg-white">
                <UserPlus className="w-7 h-7 text-[#0052a1]" strokeWidth={1.5} />
              </div>
            </div>
            <div className="space-y-1.5">
              <DialogTitle className="text-xl font-bold text-[#003d7a]">
                Verify memberships
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 leading-relaxed">
                Send a code to the registered contact of each member. You will enter the
                code number in the next screen.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="mt-6">
            {localMembers.map((member) => (
              <MemberVerificationItem
                key={member.id}
                id={member.id}
                firstName={member.firstName}
                lastName={member.lastName}
                contact={member.contact}
                avatarUrl={member.avatarUrl}
                status={member.status}
                codeLength={4}
                onVerify={handleVerify}
                onResend={handleResend}
              />
            ))}
          </div>

          <div className="mt-6">
            <Button
              type="button"
              onClick={onDone}
              disabled={!allVerified}
              className="w-full bg-[#003d7a] hover:bg-[#002d5c] disabled:bg-gray-300 disabled:text-gray-500 text-white h-12 rounded-lg font-semibold"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
