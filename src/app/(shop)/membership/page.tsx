"use client";

import { useRouter } from "next/navigation";
import { CreditCard, AlertTriangle } from "lucide-react";

import {
	MembershipActionCard,
	MembershipSearch,
} from "@/components/features/membership";
import { useToast } from "@/hooks/use-toast";

export default function MembershipPage() {
	const router = useRouter();
	const { toast } = useToast();

	const handleNewMembership = () => {
		router.push("/membership/new");
	};

	const handlePendingProcess = () => {
		toast({
			title: "Pending process",
			description: "Opening pending membership applications.",
		});
	};

	const handleSearch = (query: string) => {
		toast({
			title: "Searching membership",
			description: `Looking for profiles matching "${query}".`,
		});
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Hero / Brand strip */}
			<div className="bg-[#0052a1] h-24" />

			<div className="container mx-auto px-4 -mt-12">
				{/* Action cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 pt-6">
					<MembershipActionCard
						icon={<CreditCard className="w-8 h-8" />}
						title="New Membership"
						variant="filled"
						onClick={handleNewMembership}
					/>
					<MembershipActionCard
						icon={<AlertTriangle className="w-8 h-8" />}
						title="Pending process"
						variant="outlined"
						onClick={handlePendingProcess}
					/>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-200 mb-16" />

				{/* Search section */}
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-3xl md:text-4xl font-semibold text-[#003d7a] mb-4">
						Search for membership
					</h1>
					<p className="text-base md:text-lg text-[#003d7a]/80 mb-10">
						Search for an existing profile before creating a new membership.
						Enter the customer&apos;s last name, phone number, email, or membership
						ID.
					</p>

					<MembershipSearch onSearch={handleSearch} />
				</div>
			</div>

			{/* Bottom spacing to keep footer separated */}
			<div className="h-24" />
		</div>
	);
}
