"use client";

import { UserPlus } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { type VerifyMember, VerifyMemberRow } from "./verify-member-row";

interface VerifyMembershipsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	members: VerifyMember[];
	onVerify: (members: VerifyMember[]) => void;
}

export function VerifyMembershipsDialog({
	open,
	onOpenChange,
	members: initialMembers,
	onVerify,
}: VerifyMembershipsDialogProps) {
	const [members, setMembers] = useState<VerifyMember[]>(initialMembers);

	const handleCodeChange = useCallback(
		(id: string, index: number, value: string) => {
			setMembers((prev) =>
				prev.map((member) => {
					if (member.id !== id) return member;

					const newCode = [...member.code];
					newCode[index] = value;

					return {
						...member,
						code: newCode,
						verified: member.verified || newCode.every((digit) => digit !== ""),
					};
				}),
			);
		},
		[],
	);

	const handleResendCode = useCallback((id: string) => {
		// In a real app, this would call an API to resend the code
		setMembers((prev) =>
			prev.map((member) =>
				member.id === id ? { ...member, code: ["", "", "", ""] } : member,
			),
		);
	}, []);

	const handleDone = () => {
		onVerify(members);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[540px] p-0 overflow-hidden gap-0">
				<div className="p-6 pb-4">
					<DialogHeader className="space-y-4 text-left">
						<div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-[#0052a1]">
							<UserPlus className="h-6 w-6" />
						</div>
						<div className="space-y-1.5">
							<DialogTitle className="text-xl font-semibold text-[#003d7a]">
								Verify memberships
							</DialogTitle>
							<DialogDescription className="text-sm text-gray-600">
								Send a code to the registered contact of each member. You will
								enter the code number in the next screen.
							</DialogDescription>
						</div>
					</DialogHeader>
				</div>

				<Separator />

				<div className="max-h-[360px] overflow-y-auto px-6">
					{members.map((member, index) => (
						<div key={member.id}>
							<VerifyMemberRow
								member={member}
								onCodeChange={handleCodeChange}
								onResendCode={handleResendCode}
							/>
							{index < members.length - 1 && <Separator />}
						</div>
					))}
				</div>

				<Separator />

				<div className="p-6 pt-4">
					<Button
						onClick={handleDone}
						className="w-full h-11 bg-[#003d7a] hover:bg-[#002d5c] text-white font-medium"
					>
						Done
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export type { VerifyMember };
