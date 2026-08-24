"use client";

import * as React from "react";
import { Check, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { VerificationCodeInput } from "./verification-code-input";

export type VerificationStatus = "verified" | "pending";

export interface VerifyMember {
  id: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  contact: string;
  contactType: "phone" | "email";
  status: VerificationStatus;
  code: string[];
}

interface VerifyMemberRowProps {
  member: VerifyMember;
  onCodeChange: (id: string, code: string[]) => void;
  onResend: (id: string) => void;
  className?: string;
}

export function VerifyMemberRow({
  member,
  onCodeChange,
  onResend,
  className,
}: VerifyMemberRowProps) {
  const displayName = [member.firstName, member.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cn(
        "grid items-center gap-4 border-b border-gray-100 py-5 last:border-b-0",
        member.firstName || member.lastName
          ? "grid-cols-[3rem_1fr_auto]"
          : "grid-cols-[1fr_auto]",
        className
      )}
    >
      {(member.firstName || member.lastName) && member.avatarUrl && (
        <img
          src={member.avatarUrl}
          alt={displayName}
          className="h-12 w-12 rounded-full object-cover"
        />
      )}

      <div className="min-w-0 space-y-1.5">
        {displayName && (
          <p className="text-sm font-semibold text-[#002d5c]">{displayName}</p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{member.contact}</span>
          {member.status === "verified" ? (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#e8f5e9] text-[#4caf50]">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
          ) : (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fff3e0] text-[#f5a623]">
              <AlertCircle className="h-3 w-3" strokeWidth={2.5} />
            </span>
          )}
        </div>
      </div>

      {member.status === "verified" ? (
        <span className="justify-self-end text-sm font-semibold text-[#4caf50]">
          Member verified
        </span>
      ) : (
        <div className="justify-self-end">
          <VerificationCodeInput
            value={member.code}
            onChange={(code) => onCodeChange(member.id, code)}
            label="Enter code"
            className="items-end"
          />
          <button
            type="button"
            onClick={() => onResend(member.id)}
            className="mt-1 text-xs font-medium text-[#0052a1] hover:underline"
          >
            Resend code
          </button>
        </div>
      )}
    </div>
  );
}
