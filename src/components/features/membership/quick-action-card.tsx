import Link from "next/link";
import { cn } from "@/lib/utils";

export interface QuickActionCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  variant?: "filled" | "outlined";
}

export function QuickActionCard({
  href,
  icon,
  title,
  variant = "filled",
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-center gap-4 rounded-xl p-8 transition-all duration-200",
        variant === "filled"
          ? "bg-[#f5f7fa] hover:bg-[#e9eef5]"
          : "border border-gray-200 bg-white hover:border-[#0052a1]/30 hover:shadow-sm"
      )}
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#0052a1] text-[#0052a1] transition-colors group-hover:bg-[#0052a1] group-hover:text-white">
        {icon}
      </span>
      <span className="text-2xl font-semibold text-[#002d5c]">{title}</span>
    </Link>
  );
}
