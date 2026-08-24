"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface MembershipActionCardProps {
  icon: LucideIcon;
  iconClassName?: string;
  ringClassName?: string;
  title: string;
  variant?: "default" | "outlined";
  onClick?: () => void;
  href?: string;
}

export function MembershipActionCard({
  icon: Icon,
  iconClassName,
  ringClassName,
  title,
  variant = "default",
  onClick,
  href,
}: MembershipActionCardProps) {
  const className = cn(
    "flex items-center justify-center gap-4 rounded-xl border p-8 transition-all",
    variant === "default"
      ? "bg-[#f5f6f8] border-transparent"
      : "bg-white border-[#e5e7eb] hover:border-[#0052a1]/30",
    (onClick || href) && "cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052a1] focus-visible:ring-offset-2"
  );

  const content = (
    <>
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white",
          ringClassName ?? "border-[#0052a1]"
        )}
      >
        <Icon className={cn("h-7 w-7", iconClassName ?? "text-[#0052a1]")} />
      </div>
      <span className="text-2xl font-semibold text-[#003d7a]">{title}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  );
}
