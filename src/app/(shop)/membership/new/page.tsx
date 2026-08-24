"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Save, ArrowRight, Loader2, Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
	MembershipRegistrationSummary,
	type SecondaryMember,
} from "@/components/features/membership-registration";

// Mock data matching the reference UI
const initialData = {
	photo: "https://i.pravatar.cc/150?u=nicolas",
	idType: "DNI",
	idNumber: "IDGTM1234567890123S0123",
	membershipType: "Diamond",
	abbreviation: "Mr.",
	firstName: "Nicolás",
	lastName: "Treviño",
	gender: "Male",
	dateOfBirth: "13/09/1978",
	occupation: "Urban planner",
	email: "Customer declined to provide email address",
	mobilePhone: "+502 1234 5678",
	homePhone: "+502 2345 6789",
	notifications: "By email address",
	address: "Km 46.5 Salida A Ciudad Vieja",
	country: "Guatemala",
	state: "Antigua",
	city: "Sacatepequez",
};

const initialSecondaryMembers: SecondaryMember[] = [
	{
		id: "sm-1",
		photo: "https://i.pravatar.cc/150?u=mayra",
		name: "Mayra Treviño",
		hasWarning: true,
	},
	{
		id: "sm-2",
		photo: "https://i.pravatar.cc/150?u=pablo",
		name: "Pablo Treviño",
		hasWarning: true,
	},
];

export default function NewMembershipPage() {
	const router = useRouter();
	const { toast } = useToast();

	const [isSaving, setIsSaving] = useState(false);
	const [secondaryMembers, setSecondaryMembers] = useState<SecondaryMember[]>(
		initialSecondaryMembers,
	);

	const handleSaveChanges = async () => {
		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 800));
		setIsSaving(false);
		toast({
			title: "Changes saved",
			description: "Membership information has been updated.",
		});
	};

	const handlePayment = () => {
		router.push("/checkout/payment");
	};

	const handleEditSecondary = (id: string) => {
		toast({
			title: "Edit member",
			description: `Editing member ${id} would open an edit form.`,
		});
	};

	const handleRemoveSecondary = (id: string) => {
		setSecondaryMembers((prev) => prev.filter((member) => member.id !== id));
		toast({
			title: "Member removed",
			description: "Secondary member has been removed.",
		});
	};

	return (
		<div className="min-h-screen bg-[#f5f5f5]">
			{/* Page Header */}
			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<h1 className="text-3xl font-bold text-[#003d7a]">
							New membership
						</h1>
						<Button
							variant="outline"
							className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 self-start sm:self-auto"
						>
							<Camera className="w-4 h-4 mr-2" />
							Capture Member ID
						</Button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Stepper Sidebar */}
					<aside className="lg:w-64 flex-shrink-0">
						<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
							<div className="relative">
								{/* Vertical Line */}
								<div className="absolute left-[15px] top-8 bottom-8 w-0.5 bg-gray-200" />

								{/* Step 1 - Active */}
								<div className="relative flex items-start gap-4 pb-10">
									<div className="w-8 h-8 rounded-full bg-[#0052a1] text-white flex items-center justify-center text-sm font-semibold shrink-0 z-10">
										1
									</div>
									<div>
										<p className="font-semibold text-[#0052a1]">
											Membership data
										</p>
									</div>
								</div>

								{/* Step 2 */}
								<div className="relative flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold shrink-0 z-10">
										2
									</div>
									<div>
										<p className="font-medium text-gray-400">Payment</p>
									</div>
								</div>
							</div>
						</div>
					</aside>

					{/* Form Content */}
					<main className="flex-1 min-w-0">
						<MembershipRegistrationSummary
							data={initialData}
							secondaryMembers={secondaryMembers}
							onEditSecondary={handleEditSecondary}
							onRemoveSecondary={handleRemoveSecondary}
						/>
					</main>
				</div>
			</div>

			{/* Sticky Footer Actions */}
			<div className="sticky bottom-0 bg-white border-t mt-8">
				<div className="container mx-auto px-4 py-4">
					<div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
						<Link href="/">
							<Button
								variant="outline"
								className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 w-full sm:w-auto"
							>
								<Home className="w-4 h-4 mr-2" />
								Go back home
							</Button>
						</Link>

						<div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
							<Button
								variant="outline"
								onClick={handleSaveChanges}
								disabled={isSaving}
								className="border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1]/5 w-full sm:w-auto"
							>
								{isSaving ? (
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								) : (
									<Save className="w-4 h-4 mr-2" />
								)}
								Save changes
							</Button>

							<Button
								onClick={handlePayment}
								className="bg-[#003d7a] hover:bg-[#002d5c] text-white w-full sm:w-auto"
							>
								Payment
								<ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
