import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface MembershipActionTileProps {
  icon: LucideIcon;
  title: string;
  active?: boolean;
}

export function MembershipActionTile({ icon: Icon, title, active = false }: MembershipActionTileProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-[124px] w-full items-center gap-5 rounded-lg border px-10 text-left transition-colors",
        active
          ? "border-transparent bg-[#f2f2f4]"
          : "border-[#cfd4dd] bg-white hover:bg-[#f8f9fb]",
      )}
    >
      <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-2 border-[#2e57c3] text-[#2e57c3]">
        <Icon className="h-7 w-7" strokeWidth={1.8} />
      </span>
      <span className="text-[20px] font-semibold text-[#203b82]">{title}</span>
    </button>
  );
}
