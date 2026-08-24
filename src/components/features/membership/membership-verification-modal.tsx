"use client";

import * as React from "react";
import { UserPlus, X, CheckCircle2, AlertCircle } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MemberVerification {
	id: string;
	name?: string;
	avatarUrl?: string;
	contact: string;
	verified?: boolean;
	code?: string;
}

interface MembershipVerificationModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	members: MemberVerification[];
	onComplete?: (members: MemberVerification[]) => void;
	onResendCode?: (memberId: string) => void;
	className?: string;
}

export function MembershipVerificationModal({
	open,
	onOpenChange,
	members: initialMembers,
	onComplete,
	onResendCode,
	className,
}: MembershipVerificationModalProps) {
	const [members, setMembers] = React.useState<MemberVerification[]>(() =>
		initialMembers.map((m) => ({ ...m, code: m.verified ? "0000" : "" })),
	);

	React.useEffect(() => {
		setMembers(
			initialMembers.map((m) => ({ ...m, code: m.verified ? "0000" : "" })),
		);
	}, [initialMembers]);

	const handleCodeChange = (memberId: string, index: number, value: string) => {
		const digit = value.slice(-1);
		if (digit && !/^\d$/.test(digit)) return;

		setMembers((prev) =>
			prev.map((member) => {
				if (member.id !== memberId) return member;
				const current = member.code ?? "";
				const next = current.split("");
				next[index] = digit;
				return { ...member, code: next.join("") };
			}),
		);
	};

	const handleComplete = () => {
		onComplete?.(members);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={cn(
					"max-w-xl p-0 overflow-hidden border-0 bg-white gap-0",
					className,
				)}
			>
				<DialogClose className="absolute right-4 top-4 rounded-sm text-gray-400 hover:text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052a1] focus-visible:ring-offset-2 disabled:pointer-events-none">
					<X className="h-5 w-5" />
					<span className="sr-only">Close</span>
				</DialogClose>

				<div className="px-8 pt-8 pb-6">
					<DialogHeader className="space-y-4 text-left">
						<div className="w-16 h-16 rounded-full border-2 border-[#0052a1] flex items-center justify-center text-[#0052a1]">
							<UserPlus className="w-8 h-8" />
						</div>
						<div className="space-y-2">
							<DialogTitle className="text-xl font-semibold text-[#003d7a]">
								Verify memberships
							</DialogTitle>
							<DialogDescription className="text-sm text-[#003d7a]/80 leading-relaxed">
								Send a code to the registered contact of each member. You will
								enter the code number in the next screen.
							</DialogDescription>
						</div>
					</DialogHeader>
				</div>

				<div className="px-8 pb-8 space-y-0">
					{members.map((member, idx) => (
						<div
							key={member.id}
							className={cn(
								"py-5",
								idx !== members.length - 1 && "border-b border-gray-100",
							)}
						>
							<VerificationMemberRow
								member={member}
								onDigitChange={(index, value) =>
									handleCodeChange(member.id, index, value)
								}
								onResend={() => onResendCode?.(member.id)}
							/>
						</div>
					))}
				</div>

				<div className="px-8 pb-8">
					<Button
						onClick={handleComplete}
						className="w-full h-12 text-base font-semibold bg-[#0052a1] hover:bg-[#003d7a] text-white rounded-lg"
					>
						Done
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

interface VerificationMemberRowProps {
	member: MemberVerification;
	onDigitChange: (index: number, value: string) => void;
	onResend?: () => void;
}

function VerificationMemberRow({
	member,
	onDigitChange,
	onResend,
}: VerificationMemberRowProps) {
	const digits = member.verified
		? "0000".split("")
		: (member.code ?? "").padEnd(4, " ").split("");
	const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

	const handleChange = (index: number, value: string) => {
		onDigitChange(index, value);
		if (value && index < 3) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === "Backspace" && !digits[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const initials = React.useMemo(() => {
		if (!member.name) return "";
		return member.name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.slice(0, 2)
			.toUpperCase();
	}, [member.name]);

	return (
		<div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
			<div className="flex items-center gap-4 flex-1 min-w-0">
				{member.name ? (
					<div className="relative flex-shrink-0">
						{member.avatarUrl ? (
							<img
								src={member.avatarUrl}
								alt={member.name}
								className="w-12 h-12 rounded-full object-cover"
							/>
						) : (
							<div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-sm">
								{initials}
							</div>
						)}
					</div>
				) : null}

				<div className="min-w-0 flex-1">
					{member.name ? (
						<p className="text-sm font-semibold text-[#003d7a] truncate">
							{member.name}
						</p>
					) : null}
					<div className="flex items-center gap-2">
						<p className="text-sm text-gray-600 truncate">{member.contact}</p>
						{member.verified ? (
							<CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
						) : (
							<AlertCircle className="w-4 h-4 text-[#f5a623] flex-shrink-0" />
						)}
					</div>
				</div>
			</div>

			{member.verified ? (
				<span className="text-sm font-semibold text-green-600 whitespace-nowrap">
					Member verified
				</span>
			) : (
				<div className="flex flex-col items-start sm:items-end gap-2">
					<div className="flex items-center gap-2">
						<span className="text-xs text-gray-500">Enter code</span>
						{digits.map((digit, index) => (
							<input
								key={index}
								ref={(el) => {
									inputRefs.current[index] = el;
								}}
								type="text"
								inputMode="numeric"
								maxLength={1}
								value={digit === " " ? "" : digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className="w-10 h-12 text-center text-lg font-semibold text-gray-700 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052a1] focus-visible:border-[#0052a1]"
							/>
						))}
					</div>
					<button
						type="button"
						onClick={onResend}
						className="text-xs text-[#0052a1] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052a1] focus-visible:ring-offset-2 rounded"
					>
						Resend code
					</button>
				</div>
			)}
		</div>
	);
}
