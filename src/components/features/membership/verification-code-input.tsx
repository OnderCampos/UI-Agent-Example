"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface VerificationCodeInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  className?: string;
}

export function VerificationCodeInput({
  length = 4,
  value,
  onChange,
  label = "Enter code",
  className,
}: VerificationCodeInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, inputValue: string) => {
    const digits = inputValue.replace(/\D/g, "").slice(0, length - index);
    const next = [...value];

    for (let i = 0; i < digits.length; i++) {
      if (index + i < length) {
        next[index + i] = digits[i];
      }
    }

    onChange(next);

    const nextIndex = Math.min(index + digits.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      const next = [...value];
      next[index - 1] = "";
      onChange(next);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const next = [...value];
    for (let i = 0; i < pasted.length && index + i < length; i++) {
      next[index + i] = pasted[i];
    }
    onChange(next);

    const nextIndex = Math.min(index + pasted.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <span className="text-xs font-medium text-[#002d5c]">{label}</span>
      )}
      <div className="flex items-center gap-2">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            className="h-12 w-10 rounded-lg border border-gray-200 bg-white text-center text-lg font-medium text-[#002d5c] shadow-sm placeholder:text-gray-300 focus-visible:border-[#0052a1] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052a1]"
            placeholder="0"
          />
        ))}
      </div>
    </div>
  );
}
