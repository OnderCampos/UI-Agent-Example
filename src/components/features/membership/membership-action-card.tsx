"use client";

import { cn } from "@/lib/utils";

interface MembershipActionCardProps {
	icon: React.ReactNode;
	title: string;
	variant?: "filled" | "outlined";
	onClick?: () => void;
	className?: string;
}

export function MembershipActionCard({
	icon,
	title,
	variant = "filled",
	onClick,
	className,
}: MembershipActionCardProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"w-full flex items-center justify-center gap-6 rounded-xl p-10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052a1] focus-visible:ring-offset-2",
				variant === "filled"
					? "bg-[#f5f7fa] hover:bg-[#eef1f5]"
					: "bg-white border border-gray-200 hover:border-[#0052a1]/30 hover:shadow-sm",
				className,
			)}
		>
			<div className="w-20 h-20 rounded-full border-2 border-[#0052a1] flex items-center justify-center text-[#0052a1]">
				{icon}
			</div>
			<span className="text-2xl font-semibold text-[#003d7a]">{title}</span>
		</button>
	);
}
