"use client";

import { useState } from "react";
import {
	type VerifyMember,
	VerifyMembershipsDialog,
} from "@/components/features/membership-verification";

const initialMembers: VerifyMember[] = [
	{
		id: "1",
		name: "Nicolás Treviño",
		contact: "+502 1234 5678",
		avatarUrl: "https://i.pravatar.cc/150?u=nicolas",
		verified: true,
		code: ["", "", "", ""],
	},
	{
		id: "2",
		name: "Mayra Treviño",
		contact: "+502 98876 5432",
		avatarUrl: "https://i.pravatar.cc/150?u=mayra",
		verified: false,
		code: ["", "", "", ""],
	},
	{
		id: "3",
		name: "Pablo Treviño",
		contact: "trevino.pablo@gmail.com",
		avatarUrl: "https://i.pravatar.cc/150?u=pablo",
		verified: false,
		code: ["", "", "", ""],
	},
	{
		id: "4",
		name: "",
		contact: "+502 94585 2576",
		verified: false,
		code: ["", "", "", ""],
	},
];

export default function VerifyMembershipsPage() {
	const [open, setOpen] = useState(true);

	const handleVerify = (members: VerifyMember[]) => {
		// In a real app, this would submit verification data to the server
		void members;
	};

	return (
		<div className="min-h-screen bg-[#4a5568]">
			<VerifyMembershipsDialog
				open={open}
				onOpenChange={setOpen}
				members={initialMembers}
				onVerify={handleVerify}
			/>
		</div>
	);
}
