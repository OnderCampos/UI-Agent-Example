"use client";

import { cn } from "@/lib/utils";

interface MembershipActionCardProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "default" | "alert";
  className?: string;
}

export function MembershipActionCard({
  icon,
  label,
  onClick,
  variant = "default",
  className,
}: MembershipActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-4 w-full rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all",
        "hover:shadow-md hover:border-[var(--ps-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ps-blue)] focus-visible:ring-offset-2",
        className
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center w-16 h-16 rounded-full border-2",
          variant === "alert"
            ? "border-[var(--ps-blue)] text-[var(--ps-blue)]"
            : "border-[var(--ps-blue)] text-[var(--ps-blue)]"
        )}
      >
        {icon}
      </span>
      <span className="text-xl font-medium text-[var(--ps-blue)]">{label}</span>
    </button>
  );
}
