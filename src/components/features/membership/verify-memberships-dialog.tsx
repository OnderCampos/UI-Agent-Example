"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { CircleCheck, CircleAlert, X, UserPlus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface VerificationContact {
  type: "phone" | "email";
  value: string;
}

interface VerificationMember {
  id: string;
  name: string;
  avatarUrl: string;
  contact: VerificationContact;
  status: "verified" | "pending";
  code?: string;
}

const CODE_LENGTH = 4;

interface VerifyMembershipsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members?: VerificationMember[];
  onDone?: (members: VerificationMember[]) => void;
}

const defaultMembers: VerificationMember[] = [
  {
    id: "m-1",
    name: "Nicolás Treviño",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    contact: { type: "phone", value: "+502 1234 5678" },
    status: "verified",
  },
  {
    id: "m-2",
    name: "Mayra Treviño",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    contact: { type: "phone", value: "+502 98876 5432" },
    status: "pending",
  },
  {
    id: "m-3",
    name: "Pablo Treviño",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    contact: { type: "email", value: "trevino.pablo@gmail.com" },
    status: "pending",
  },
  {
    id: "m-4",
    name: "Pablo Treviño",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    contact: { type: "phone", value: "+502 94585 2576" },
    status: "pending",
  },
];

function useVerificationMembers(initialMembers: VerificationMember[]) {
  const [members, setMembers] = useState<VerificationMember[]>(initialMembers);

  const updateCode = useCallback((id: string, code: string) => {
    const digits = code.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, code: digits } : member
      )
    );
  }, []);

  const markVerified = useCallback((id: string) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, status: "verified" } : member
      )
    );
  }, []);

  return { members, updateCode, markVerified };
}

function VerificationCodeInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const digits = value.padEnd(CODE_LENGTH, " ").split("").map((d) => (d === " " ? "0" : d));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, CODE_LENGTH);
  }, []);

  const handleChange = (index: number, inputValue: string) => {
    const char = inputValue.slice(-1);
    if (!/^\d?$/.test(char)) return;

    const next = value.padEnd(CODE_LENGTH, " ").split("");
    next[index] = char === "" ? " " : char;
    const nextValue = next.join("").replace(/\s/g, "").slice(0, CODE_LENGTH);
    onChange(nextValue);

    if (char && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {digits.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={cn(
            "h-12 w-12 rounded-md border border-gray-300 bg-white text-center text-2xl font-medium text-gray-700 p-0",
            "focus-visible:border-[#0052a1] focus-visible:ring-1 focus-visible:ring-[#0052a1]",
            disabled && "opacity-60 cursor-not-allowed"
          )}
        />
      ))}
    </div>
  );
}

function MemberVerificationItem({
  member,
  onCodeChange,
  onVerify,
}: {
  member: VerificationMember;
  onCodeChange: (code: string) => void;
  onVerify: () => void;
}) {
  const isVerified = member.status === "verified";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
          <Image
            src={member.avatarUrl}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-base font-medium text-[#003d7a] truncate">
            {member.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-sm text-gray-600 truncate">{member.contact.value}</p>
            {isVerified ? (
              <CircleCheck className="w-5 h-5 text-green-600 shrink-0" />
            ) : (
              <CircleAlert className="w-5 h-5 text-[#f5a623] shrink-0" />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
        {isVerified ? (
          <span className="text-sm font-medium text-green-600">Member verified</span>
        ) : (
          <>
            <p className="text-xs text-gray-500">Enter code</p>
            <VerificationCodeInput
              value={member.code ?? ""}
              onChange={onCodeChange}
            />
            <button
              type="button"
              onClick={onVerify}
              className="text-xs text-[#0052a1] hover:underline font-medium"
            >
              Resend code
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function VerifyMembershipsDialog({
  open,
  onOpenChange,
  members: membersProp,
  onDone,
}: VerifyMembershipsDialogProps) {
  const { members, updateCode, markVerified } = useVerificationMembers(
    membersProp ?? defaultMembers
  );

  const handleDone = () => {
    onDone?.(members);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px] p-0 gap-0 overflow-hidden border-0 rounded-2xl bg-white">
        <DialogHeader className="p-6 pb-2 text-left space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-gray-200 text-[#003d7a]">
              <UserPlus className="w-7 h-7" />
            </div>
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#0052a1] focus:ring-offset-2"
              >
                <X className="h-5 w-5 text-gray-500" />
                <span className="sr-only">Close</span>
              </button>
            </DialogClose>
          </div>
          <div className="space-y-1.5 pr-8">
            <DialogTitle className="text-xl font-semibold text-[#003d7a]">
              Verify memberships
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 leading-relaxed">
              Send a code to the registered contact of each member. You will enter the code number in the next screen.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="px-6 py-2 max-h-[420px] overflow-y-auto">
          {members.map((member) => (
            <MemberVerificationItem
              key={member.id}
              member={member}
              onCodeChange={(code) => updateCode(member.id, code)}
              onVerify={() => markVerified(member.id)}
            />
          ))}
        </div>

        <div className="p-6 pt-4">
          <Button
            onClick={handleDone}
            className="w-full h-11 bg-[#003d7a] hover:bg-[#002d5c] text-white font-medium rounded-lg"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
