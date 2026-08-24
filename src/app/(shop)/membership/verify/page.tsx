"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
	MembershipVerificationModal,
	type MemberVerification,
} from "@/components/features/membership";
import { useToast } from "@/hooks/use-toast";

const SAMPLE_MEMBERS: MemberVerification[] = [
	{
		id: "1",
		name: "Nicolás Treviño",
		contact: "+502 1234 5678",
		verified: true,
	},
	{
		id: "2",
		name: "Mayra Treviño",
		contact: "+502 98876 5432",
		verified: false,
	},
	{
		id: "3",
		name: "Pablo Treviño",
		contact: "trevino.pablo@gmail.com",
		verified: false,
	},
	{
		id: "4",
		contact: "+502 94585 2576",
		verified: false,
	},
];

export default function MembershipVerifyPage() {
	const router = useRouter();
	const { toast } = useToast();
	const [open, setOpen] = React.useState(true);

	const handleComplete = (members: MemberVerification[]) => {
		toast({
			title: "Membership verification completed",
			description: `${members.filter((m) => m.verified).length} of ${members.length} members verified.`,
		});
		router.push("/membership");
	};

	const handleResend = (memberId: string) => {
		toast({
			title: "Code resent",
			description: `A new verification code was sent to member ${memberId}.`,
		});
	};

	return (
		<div className="min-h-screen bg-[#5a6680] flex items-center justify-center p-4">
			<MembershipVerificationModal
				open={open}
				onOpenChange={setOpen}
				members={SAMPLE_MEMBERS}
				onComplete={handleComplete}
				onResendCode={handleResend}
			/>
		</div>
	);
}
