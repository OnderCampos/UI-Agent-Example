"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MembershipActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "filled" | "outlined";
  className?: string;
}

export function MembershipActionCard({
  icon: Icon,
  label,
  onClick,
  variant = "filled",
  className,
}: MembershipActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-center justify-center gap-5 w-full rounded-xl px-6 py-10 transition-all duration-200",
        variant === "filled"
          ? "bg-[#f0f4f8] hover:bg-[#e6eef5] text-[#003d7a]"
          : "bg-white border border-gray-200 hover:border-[#0052a1] hover:shadow-sm text-[#003d7a]",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-[72px] h-[72px] rounded-full border-2 transition-colors",
          variant === "filled"
            ? "border-[#0052a1] bg-white group-hover:bg-[#e6f0fa]"
            : "border-[#0052a1] bg-white"
        )}
      >
        <Icon className="w-8 h-8 text-[#0052a1]" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <span className="text-xl font-semibold">{label}</span>
    </button>
  );
}
