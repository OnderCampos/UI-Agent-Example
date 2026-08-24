"use client";

import { AlertCircle, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface SecondaryMember {
	id: string;
	firstName: string;
	lastName: string;
	avatarUrl?: string;
	hasWarning?: boolean;
	warningMessage?: string;
}

interface SecondaryMemberCardProps {
	member: SecondaryMember;
	onEdit: (member: SecondaryMember) => void;
	onRemove: (memberId: string) => void;
	className?: string;
}

export function SecondaryMemberCard({
	member,
	onEdit,
	onRemove,
	className,
}: SecondaryMemberCardProps) {
	const fullName = `${member.firstName} ${member.lastName}`;

	return (
		<div
			className={cn(
				"flex items-center justify-between gap-4 p-4 rounded-lg border bg-white transition-shadow hover:shadow-sm",
				className,
			)}
		>
			<div className="flex items-center gap-3 min-w-0">
				<div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 relative">
					{member.avatarUrl ? (
						<Image
							src={member.avatarUrl}
							alt={fullName}
							fill
							className="object-cover"
							sizes="48px"
						/>
					) : (
						<User className="w-6 h-6 text-gray-400" />
					)}
				</div>
				<div className="min-w-0">
					<p className="font-medium text-gray-900 truncate">{fullName}</p>
					<div className="flex items-center gap-2 text-sm">
						<button
							type="button"
							onClick={() => onEdit(member)}
							className="text-[#0052a1] hover:underline"
						>
							Edit
						</button>
						<span className="text-gray-300">|</span>
						<button
							type="button"
							onClick={() => onRemove(member.id)}
							className="text-[#0052a1] hover:underline"
						>
							Remove
						</button>
					</div>
				</div>
			</div>

			{member.hasWarning && (
				<div
					className="shrink-0"
					title={member.warningMessage || "Attention required"}
				>
					<div className="w-8 h-8 rounded-full border-2 border-amber-500 flex items-center justify-center">
						<AlertCircle className="w-4 h-4 text-amber-500" />
					</div>
				</div>
			)}
		</div>
	);
}
