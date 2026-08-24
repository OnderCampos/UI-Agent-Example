"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SecondaryMember } from "./types";

interface SecondaryMembershipCardProps {
	member: SecondaryMember;
	onEdit?: (id: string) => void;
	onRemove?: (id: string) => void;
	className?: string;
}

export function SecondaryMembershipCard({
	member,
	onEdit,
	onRemove,
	className,
}: SecondaryMembershipCardProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-xl bg-white",
				className,
			)}
		>
			<div className="flex items-center gap-4 min-w-0">
				<img
					src={member.photo}
					alt={member.name}
					className="w-12 h-12 rounded-full object-cover shrink-0"
				/>
				<div className="min-w-0">
					<p className="font-semibold text-gray-900 truncate">{member.name}</p>
					<div className="flex items-center gap-2 text-sm">
						{onEdit && (
							<button
								type="button"
								onClick={() => onEdit(member.id)}
								className="text-[#0052a1] hover:underline font-medium"
							>
								Edit
							</button>
						)}
						{onEdit && onRemove && <span className="text-gray-300">|</span>}
						{onRemove && (
							<button
								type="button"
								onClick={() => onRemove(member.id)}
								className="text-[#0052a1] hover:underline font-medium"
							>
								Remove
							</button>
						)}
					</div>
				</div>
			</div>

			{member.hasWarning && (
				<div className="shrink-0">
					<AlertCircle className="w-5 h-5 text-[#f5a623]" />
				</div>
			)}
		</div>
	);
}
