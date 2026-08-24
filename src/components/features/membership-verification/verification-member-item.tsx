"use client";

import Image from "next/image";
import { User, CheckCircle2, AlertCircle } from "lucide-react";
import { VerificationCodeInput, type VerificationCodeInputProps } from "./verification-code-input";

export type VerificationStatus = "verified" | "pending";

export interface VerificationMember {
  id: string;
  firstName: string;
  lastName: string;
  contact: string;
  photoUrl?: string;
  status: VerificationStatus;
  code: string;
}

export interface VerificationMemberItemProps {
  member: VerificationMember;
  onCodeChange: (id: string, code: string) => void;
  onResendCode?: (id: string) => void;
  codeLength?: number;
}

export function VerificationMemberItem({
  member,
  onCodeChange,
  onResendCode,
  codeLength = 4,
}: VerificationMemberItemProps) {
  const isVerified = member.status === "verified";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 border-b border-[#e5e7eb] last:border-b-0">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#f5f5f5] shrink-0 flex items-center justify-center">
          {member.photoUrl ? (
            <Image
              src={member.photoUrl}
              alt={`${member.firstName || "Member"} ${member.lastName || ""}`.trim()}
              fill
              className="object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-[#bdbdbd]" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {(member.firstName || member.lastName) && (
            <p className="text-base font-semibold text-[#212121] truncate">
              {member.firstName} {member.lastName}
            </p>
          )}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#616161] truncate">{member.contact}</span>
            {isVerified ? (
              <CheckCircle2 className="w-5 h-5 text-[#4caf50] shrink-0" aria-label="Verified" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#f5a623] shrink-0" aria-label="Pending" />
            )}
          </div>
        </div>
      </div>

      {isVerified ? (
        <span className="text-[#4caf50] font-semibold text-sm sm:text-right sm:min-w-[140px]">
          Member verified
        </span>
      ) : (
        <div className="flex flex-col gap-1.5 sm:items-end">
          <span className="text-xs font-medium text-[#212121]">Enter code</span>
          <VerificationCodeInput
            value={member.code}
            onChange={(code) => onCodeChange(member.id, code)}
            length={codeLength}
          />
          <button
            type="button"
            onClick={() => onResendCode?.(member.id)}
            className="text-xs font-medium text-[#0066cc] hover:text-[#0052a1] focus-visible:outline-none focus-visible:underline"
          >
            Resend code
          </button>
        </div>
      )}
    </div>
  );
}

export type { VerificationCodeInputProps };
