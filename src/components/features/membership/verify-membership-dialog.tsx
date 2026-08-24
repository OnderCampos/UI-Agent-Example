"use client";

import * as React from "react";
import Image from "next/image";
import { AlertCircle, Check, UserPlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type VerificationStatus = "pending" | "sent" | "verified";

export interface VerificationMember {
  id: string;
  photoUrl?: string;
  fullName: string;
  contact: string;
  status: VerificationStatus;
}

interface VerificationCodeInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function VerificationCodeInput({
  length = 4,
  value,
  onChange,
  disabled,
}: VerificationCodeInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const characters = React.useMemo(() => {
    const chars = value.slice(0, length).split("");
    return Array.from({ length }, (_, i) => chars[i] ?? "");
  }, [value, length]);

  const focusIndex = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const char = e.target.value.slice(-1);
    if (!/^\d*$/.test(char)) return;

    const next = value.slice(0, index) + char + value.slice(index + 1);
    onChange(next.slice(0, length));

    if (char && index < length - 1) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (characters[index]) {
        const next = value.slice(0, index) + value.slice(index + 1);
        onChange(next.slice(0, length));
      } else if (index > 0) {
        focusIndex(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusIndex(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      focusIndex(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    if (pasted.length === length) {
      inputRefs.current[length - 1]?.focus();
    } else if (pasted.length > 0) {
      inputRefs.current[pasted.length - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {characters.map((char, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={char}
          disabled={disabled}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          className={cn(
            "h-12 w-12 text-center text-xl font-semibold rounded-lg p-0",
            disabled && "opacity-60 cursor-not-allowed"
          )}
        />
      ))}
    </div>
  );
}

interface VerifyMemberRowProps {
  member: VerificationMember;
  code: string;
  onCodeChange: (id: string, value: string) => void;
  onResend: (id: string) => void;
}

function VerifyMemberRow({
  member,
  code,
  onCodeChange,
  onResend,
}: VerifyMemberRowProps) {
  const isVerified = member.status === "verified";
  const isPending = member.status === "pending";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-5 border-b border-slate-100 last:border-b-0">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {member.photoUrl ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 shrink-0">
            <Image
              src={member.photoUrl}
              alt={member.fullName}
              fill
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="min-w-0">
          {member.fullName ? (
            <p className="font-semibold text-slate-900 truncate">
              {member.fullName}
            </p>
          ) : null}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="truncate">{member.contact}</span>
            {isVerified ? (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-50 text-green-600">
                <Check className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 text-amber-500">
                <AlertCircle className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>
      </div>

      {isVerified ? (
        <div className="flex items-center justify-end sm:w-48 shrink-0">
          <span className="text-sm font-semibold text-green-600">
            Member verified
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-1 sm:items-end sm:w-48 shrink-0">
          <label className="text-xs font-medium text-slate-500">Enter code</label>
          <VerificationCodeInput
            value={code}
            onChange={(value) => onCodeChange(member.id, value)}
            disabled={isPending}
          />
          <button
            type="button"
            onClick={() => onResend(member.id)}
            className="text-xs text-[var(--ps-blue)] hover:underline font-medium"
          >
            Resend code
          </button>
        </div>
      )}
    </div>
  );
}

interface VerifyMembershipsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members?: VerificationMember[];
  onDone?: () => void;
}

const defaultMembers: VerificationMember[] = [
  {
    id: "1",
    photoUrl: "https://i.pravatar.cc/150?u=nicolas",
    fullName: "Nicolás Treviño",
    contact: "+502 1234 5678",
    status: "verified",
  },
  {
    id: "2",
    photoUrl: "https://i.pravatar.cc/150?u=mayra",
    fullName: "Mayra Treviño",
    contact: "+502 98876 5432",
    status: "sent",
  },
  {
    id: "3",
    photoUrl: "https://i.pravatar.cc/150?u=pablo",
    fullName: "Pablo Treviño",
    contact: "trevino.pablo@gmail.com",
    status: "sent",
  },
];

export function VerifyMembershipsDialog({
  open,
  onOpenChange,
  members = defaultMembers,
  onDone,
}: VerifyMembershipsDialogProps) {
  const [codes, setCodes] = React.useState<Record<string, string>>({});

  const handleCodeChange = (id: string, value: string) => {
    setCodes((prev) => ({ ...prev, [id]: value }));
  };

  const handleResend = (id: string) => {
    console.log("Resend code for", id);
  };

  const handleDone = () => {
    onDone?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden">
        <div className="p-6 pb-0">
          <div className="absolute left-6 top-6">
            <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700">
              <UserPlus className="w-6 h-6" />
            </div>
          </div>
          <DialogClose asChild>
            <button
              type="button"
              className="absolute right-4 top-4 rounded-sm p-1 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </button>
          </DialogClose>
          <DialogHeader className="pl-16 pr-8 pt-1 text-left">
            <DialogTitle className="text-xl font-semibold text-[var(--ps-blue)]">
              Verify memberships
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-600">
              Send a code to the registered contact of each member. You will enter
              the code number in the next screen.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-2">
          {members.map((member) => (
            <VerifyMemberRow
              key={member.id}
              member={member}
              code={codes[member.id] ?? ""}
              onCodeChange={handleCodeChange}
              onResend={handleResend}
            />
          ))}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <Button
            onClick={handleDone}
            className="w-full bg-[var(--ps-blue)] hover:bg-[var(--ps-blue-dark)] text-white font-semibold rounded-lg h-11"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
