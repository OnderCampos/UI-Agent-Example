"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Check, CircleAlert, UserPlus, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type VerificationStatus = "pending" | "verified";

export interface VerificationMember {
  id: string;
  name: string;
  contact: string;
  avatarUrl?: string;
  status: VerificationStatus;
}

export interface VerifyMembershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members?: VerificationMember[];
  onDone?: (members: VerificationMember[]) => void;
}

const DEMO_MEMBERS: VerificationMember[] = [
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

const DEMO_SECONDARY_CONTACTS: Array<{ memberId: string; contact: string }> = [
  { memberId: "3", contact: "+502 94585 2576" },
];

function VerificationCodeInput({
  value,
  onChange,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const digits = useMemo(() => value.padEnd(4, " ").split(""), [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
      onChange(raw);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && value.length > 0) {
        onChange(value.slice(0, -1));
      }
    },
    [onChange, value]
  );

  return (
    <div className="flex gap-2">
      <input
        type="text"
        inputMode="numeric"
        maxLength={4}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="sr-only"
        aria-label="Verification code"
      />
      {digits.map((digit, index) => (
        <div
          key={index}
          className={cn(
            "w-11 h-12 flex items-center justify-center rounded-lg border text-xl font-semibold bg-white text-[#003d7a] select-none",
            digit === " "
              ? "border-gray-300 text-gray-300"
              : "border-[#0052a1] text-[#003d7a]"
          )}
          aria-hidden="true"
        >
          {digit === " " ? "0" : digit}
        </div>
      ))}
    </div>
  );
}

function MemberRow({
  member,
  code,
  onCodeChange,
  onResend,
}: {
  member: VerificationMember;
  code: string;
  onCodeChange: (value: string) => void;
  onResend: () => void;
}) {
  const isVerified = member.status === "verified";

  return (
    <div className="flex items-start gap-4 py-5 border-b border-gray-100 last:border-b-0">
      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100 shrink-0">
        {member.avatarUrl ? (
          <Image
            src={member.avatarUrl}
            alt={member.name}
            fill
            className="object-cover"
            sizes="44px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-semibold">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] font-semibold text-[#003d7a]">
            {member.name}
          </span>
          {isVerified && (
            <span className="text-sm font-medium text-[#4caf50]">
              Member verified
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm text-gray-600 truncate">{member.contact}</span>
          {isVerified ? (
            <div className="w-5 h-5 rounded-full bg-[#4caf50]/10 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-[#4caf50]" strokeWidth={2.5} />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-[#f5a623]/10 flex items-center justify-center">
              <CircleAlert
                className="w-3.5 h-3.5 text-[#f5a623]"
                strokeWidth={2.5}
              />
            </div>
          )}
        </div>
      </div>

      {!isVerified && (
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[11px] text-gray-500">Enter code</span>
          <VerificationCodeInput value={code} onChange={onCodeChange} />
          <button
            type="button"
            onClick={onResend}
            className="text-[11px] text-[#0052a1] hover:text-[#003d7a] hover:underline"
          >
            Resend code
          </button>
        </div>
      )}
    </div>
  );
}

export function VerifyMembershipDialog({
  open,
  onOpenChange,
  members = DEMO_MEMBERS,
  onDone,
}: VerifyMembershipDialogProps) {
  const [codes, setCodes] = useState<Record<string, string>>({});

  const handleCodeChange = useCallback((memberId: string, value: string) => {
    setCodes((prev) => ({ ...prev, [memberId]: value }));
  }, []);

  const handleDone = useCallback(() => {
    onDone?.(members);
    onOpenChange(false);
  }, [members, onDone, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-none gap-0">
        <div className="p-6 sm:p-8">
          <DialogHeader className="space-y-4 text-left">
            <div className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-[#0052a1]" strokeWidth={1.75} />
            </div>

            <div className="space-y-1.5">
              <DialogTitle className="text-xl font-semibold text-[#003d7a]">
                Verify memberships
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 leading-relaxed">
                Send a code to the registered contact of each member. You will
                enter the code number in the next screen.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="mt-6">
            {members.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
                code={codes[member.id] ?? ""}
                onCodeChange={(value) => handleCodeChange(member.id, value)}
                onResend={() => handleCodeChange(member.id, "")}
              />
            ))}

            {DEMO_SECONDARY_CONTACTS.map(({ memberId, contact }) => (
              <div
                key={`${memberId}-${contact}`}
                className="flex items-start gap-4 py-5 border-b border-gray-100 last:border-b-0 pl-[60px]"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm text-gray-600 truncate">
                      {contact}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-[#f5a623]/10 flex items-center justify-center">
                      <CircleAlert
                        className="w-3.5 h-3.5 text-[#f5a623]"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-[11px] text-gray-500">Enter code</span>
                  <VerificationCodeInput
                    value={codes[`${memberId}-${contact}`] ?? ""}
                    onChange={(value) =>
                      handleCodeChange(`${memberId}-${contact}`, value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleCodeChange(`${memberId}-${contact}`, "")
                    }
                    className="text-[11px] text-[#0052a1] hover:text-[#003d7a] hover:underline"
                  >
                    Resend code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          <Button
            onClick={handleDone}
            className="w-full h-12 rounded-lg bg-[#003d7a] hover:bg-[#002d5c] text-white font-semibold text-base"
          >
            Done
          </Button>
        </div>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#0052a1] focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
}
