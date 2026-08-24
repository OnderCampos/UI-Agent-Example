"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface VerificationCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  className?: string;
}

export function VerificationCodeInput({
  value,
  onChange,
  length = 4,
  disabled = false,
  className,
}: VerificationCodeInputProps) {
  const digits = value.padEnd(length, "").slice(0, length).split("");
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const focusIndex = React.useCallback((index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  }, []);

  const updateValue = React.useCallback(
    (newDigits: string[]) => {
      onChange(newDigits.join(""));
    },
    [onChange]
  );

  const handleChange = React.useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const char = e.target.value.slice(-1);
      if (!/^\d*$/.test(char)) return;

      const newDigits = [...digits];
      newDigits[index] = char;
      updateValue(newDigits);

      if (char && index < length - 1) {
        focusIndex(index + 1);
      }
    },
    [digits, focusIndex, length, updateValue]
  );

  const handleKeyDown = React.useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newDigits = [...digits];

        if (newDigits[index]) {
          newDigits[index] = "";
          updateValue(newDigits);
          focusIndex(index);
        } else if (index > 0) {
          newDigits[index - 1] = "";
          updateValue(newDigits);
          focusIndex(index - 1);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusIndex(index - 1);
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        focusIndex(index + 1);
      }
    },
    [digits, focusIndex, length, updateValue]
  );

  const handlePaste = React.useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      if (!pasted) return;

      const newDigits = [...digits];
      pasted.split("").forEach((char, i) => {
        if (i < length) newDigits[i] = char;
      });
      updateValue(newDigits);

      const nextIndex = Math.min(pasted.length, length - 1);
      focusIndex(nextIndex);
    },
    [digits, focusIndex, length, updateValue]
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          autoComplete="one-time-code"
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={digits[index] ?? ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            "h-12 w-11 rounded-lg border border-[#e0e0e0] bg-white text-center text-2xl font-medium text-[#212121] placeholder:text-[#bdbdbd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052a1] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            disabled && "bg-[#f5f5f5]"
          )}
          aria-label={`Verification digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
