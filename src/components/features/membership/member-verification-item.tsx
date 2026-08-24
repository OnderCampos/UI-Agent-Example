"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Check, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export type VerificationStatus = "verified" | "pending";

export interface MemberVerificationItemProps {
  id: string;
  firstName: string;
  lastName: string;
  contact: string;
  avatarUrl?: string;
  status: VerificationStatus;
  codeLength?: number;
  onVerify?: (id: string, code: string) => void;
  onResend?: (id: string) => void;
}

export function MemberVerificationItem({
  id,
  firstName,
  lastName,
  contact,
  avatarUrl,
  status: initialStatus,
  codeLength = 4,
  onVerify,
  onResend,
}: MemberVerificationItemProps) {
  const [status, setStatus] = useState<VerificationStatus>(initialStatus);
  const [code, setCode] = useState<string[]>(Array(codeLength).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Member";
  const isVerified = status === "verified";

  useEffect(() => {
    setStatus(initialStatus);
    if (initialStatus === "pending") {
      setCode(Array(codeLength).fill(""));
    }
  }, [initialStatus, codeLength]);

  const focusInput = useCallback((index: number) => {
    inputsRef.current[index]?.focus();
  }, []);

  const handleChange = useCallback(
    (index: number, value: string) => {
      const digit = value.replace(/\D/g, "").slice(-1);
      if (!digit) return;

      setCode((prev) => {
        const next = [...prev];
        next[index] = digit;
        return next;
      });

      if (index < codeLength - 1) {
        focusInput(index + 1);
      }
    },
    [codeLength, focusInput]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        setCode((prev) => {
          const next = [...prev];
          const hadValue = next[index] !== "";
          if (hadValue) {
            next[index] = "";
          } else if (index > 0) {
            next[index - 1] = "";
            focusInput(index - 1);
          }
          if (hadValue) {
            focusInput(index);
          }
          return next;
        });
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusInput(index - 1);
      } else if (e.key === "ArrowRight" && index < codeLength - 1) {
        e.preventDefault();
        focusInput(index + 1);
      }
    },
    [codeLength, focusInput]
  );

  const completeVerification = useCallback(
    (fullCode: string) => {
      onVerify?.(id, fullCode);
      setStatus("verified");
    },
    [id, onVerify]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const raw = e.clipboardData
        .getData("Text")
        .replace(/\D/g, "")
        .slice(0, codeLength);
      if (!raw) return;

      setCode((prev) => {
        const next = [...prev];
        raw.split("").forEach((digit, i) => {
          if (i < codeLength) next[i] = digit;
        });
        return next;
      });

      const nextIndex = Math.min(raw.length, codeLength - 1);
      focusInput(nextIndex);

      if (raw.length === codeLength) {
        completeVerification(raw);
      }
    },
    [codeLength, focusInput, completeVerification]
  );

  const handleComplete = useCallback(() => {
    const fullCode = code.join("");
    if (fullCode.length === codeLength) {
      completeVerification(fullCode);
    }
  }, [code, codeLength, completeVerification]);

  const handleResend = useCallback(() => {
    setCode(Array(codeLength).fill(""));
    setStatus("pending");
    onResend?.(id);
    focusInput(0);
  }, [codeLength, focusInput, id, onResend]);

  return (
    <div className="py-5 border-b border-gray-100 last:border-b-0">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
        {/* Avatar + identity */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={fullName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#0052a1] font-semibold">
                {firstName ? firstName.charAt(0) : ""}
                {lastName ? lastName.charAt(0) : contact.charAt(0)}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">{fullName}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="truncate">{contact}</span>
              {isVerified ? (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 shrink-0">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
              ) : (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-[#f5a623] shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status / Code entry */}
        {isVerified ? (
          <div className="flex items-center justify-start sm:justify-end sm:pt-2 shrink-0">
            <span className="text-green-600 font-semibold text-sm">
              Member verified
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2 shrink-0">
            <p className="text-xs text-gray-500">Enter code</p>
            <div className="flex items-center gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  onBlur={handleComplete}
                  className={cn(
                    "w-11 h-12 text-center text-lg font-semibold text-gray-900 rounded-lg border",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052a1] focus-visible:border-[#0052a1]",
                    digit ? "border-[#0052a1]" : "border-gray-200"
                  )}
                  aria-label={`Verification code digit ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleResend}
              className="text-xs text-[#0052a1] hover:underline text-left font-medium"
            >
              Resend code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
