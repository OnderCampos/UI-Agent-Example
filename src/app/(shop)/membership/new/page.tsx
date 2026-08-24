"use client";

import {
	AlertCircle,
	Camera,
	Folder,
	Home,
	MapPin,
	Phone,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	InfoSection,
	MembershipStepper,
	type SecondaryMember,
	SecondaryMemberCard,
} from "@/components/features/membership";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const membershipSteps = [
	{ id: 1, name: "Membership data" },
	{ id: 2, name: "Payment" },
];

const personalDataFields = [
	{ label: "ID Type", value: "DNI" },
	{ label: "ID Number", value: "IDGTM1234567890123S0123" },
	{ label: "Membership Type", value: "Diamond" },
	{ label: "Abbreviation", value: "Mr." },
	{ label: "First Name", value: "Nicolás" },
	{ label: "Last Name", value: "Treviño" },
	{ label: "Gender", value: "Male" },
	{ label: "Date of birth", value: "13/09/1978" },
	{ label: "Occupation", value: "Urban planner" },
];

const contactFields = [
	{
		label: "Email address *",
		value: "Customer declined to provide email address",
	},
	{ label: "Mobile phone number *", value: "+502 1234 5678" },
	{ label: "Home phone number *", value: "+502 2345 6789" },
	{ label: "Notifications", value: "By email address" },
];

const contactFieldsWithWarning = contactFields.map((field) =>
	field.label === "Mobile phone number *"
		? {
				...field,
				value: (
					<div className="flex items-center gap-2">
						<span>{field.value}</span>
						<AlertCircle className="w-5 h-5 text-amber-500" />
					</div>
				),
			}
		: field,
);

const addressFields = [
	{ label: "Address *", value: "Km 46.5 Salida A Ciudad Vieja" },
	{ label: "Country", value: "Guatemala" },
	{ label: "State", value: "Antigua" },
	{ label: "City", value: "Sacatepequez" },
];

const secondaryMembers: SecondaryMember[] = [
	{
		id: "sm-1",
		firstName: "Mayra",
		lastName: "Treviño",
		avatarUrl: "https://i.pravatar.cc/150?u=mayra",
		hasWarning: true,
		warningMessage: "Information needs review",
	},
	{
		id: "sm-2",
		firstName: "Pablo",
		lastName: "Treviño",
		avatarUrl: "https://i.pravatar.cc/150?u=pablo",
		hasWarning: true,
		warningMessage: "Information needs review",
	},
];

export default function NewMembershipPage() {
	const router = useRouter();

	const handleEditSecondaryMember = (member: SecondaryMember) => {
		// TODO: open edit modal or navigate to edit form
		console.log("Edit secondary member", member);
	};

	const handleRemoveSecondaryMember = (memberId: string) => {
		// TODO: confirm removal and call service
		console.log("Remove secondary member", memberId);
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Page header */}
			<div className="bg-[#003d7a]">
				<div className="h-2" />
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
					<h1 className="text-3xl font-semibold text-[#002d5c]">
						New membership
					</h1>
					<Button
						variant="outline"
						className="border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa] rounded-lg px-4 py-2 h-10"
					>
						<Camera className="w-4 h-4 mr-2" />
						Capture Member ID
					</Button>
				</div>

				<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
					{/* Stepper sidebar */}
					<aside className="lg:w-56 shrink-0">
						<MembershipStepper
							steps={membershipSteps}
							currentStep={1}
							className="sticky top-28"
						/>
					</aside>

					{/* Main content */}
					<main className="flex-1 min-w-0 space-y-8">
						{/* Personal data */}
						<section className="space-y-6">
							<div className="flex items-center gap-2 text-xl font-semibold text-[#002d5c]">
								<Folder className="w-6 h-6" />
								<h2>Personal data</h2>
							</div>

							<div className="flex flex-col md:flex-row gap-8">
								{/* Photo */}
								<div className="flex flex-col items-center gap-3 shrink-0">
									<div className="w-36 h-36 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-md relative">
										<Image
											src="https://i.pravatar.cc/300?u=nicolas"
											alt="Member photo"
											fill
											className="object-cover"
											sizes="144px"
										/>
									</div>
									<button
										type="button"
										className="text-sm font-medium text-[#0052a1] hover:underline"
									>
										Change picture
									</button>
								</div>

								{/* Info grid */}
								<div className="flex-1">
									<InfoSection
										title={null}
										fields={personalDataFields}
										columns={3}
									/>
								</div>
							</div>
						</section>

						<Separator className="bg-gray-200" />

						{/* Contact */}
						<InfoSection
							title={
								<>
									<Phone className="w-6 h-6" />
									<span>Contact</span>
								</>
							}
							fields={contactFieldsWithWarning}
							columns={1}
						/>

						<Separator className="bg-gray-200" />

						{/* Address */}
						<InfoSection
							title={
								<>
									<MapPin className="w-6 h-6" />
									<span>Address</span>
								</>
							}
							fields={addressFields}
							columns={4}
						/>

						<Separator className="bg-gray-200" />

						{/* Secondary memberships */}
						<section className="space-y-5">
							<div className="flex items-center gap-2 text-xl font-semibold text-[#002d5c]">
								<Users className="w-6 h-6" />
								<h2>Secondary memberships</h2>
							</div>

							<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{secondaryMembers.map((member) => (
									<SecondaryMemberCard
										key={member.id}
										member={member}
										onEdit={handleEditSecondaryMember}
										onRemove={handleRemoveSecondaryMember}
									/>
								))}
							</div>
						</section>
					</main>
				</div>
			</div>

			{/* Footer actions */}
			<div className="sticky bottom-0 z-10 bg-white border-t border-gray-200">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-4">
					<div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
						<div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
							<Link href="/" className="w-full sm:w-auto">
								<Button
									variant="outline"
									className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6 h-11"
								>
									<Home className="w-4 h-4 mr-2" />
									Go back home
								</Button>
							</Link>
							<Button
								variant="outline"
								className="w-full sm:w-auto border-[#0052a1] text-[#0052a1] hover:bg-[#e6f0fa] rounded-lg px-8 h-11"
							>
								Save changes
							</Button>
						</div>

						<Button
							className="w-full sm:w-auto bg-[#0052a1] hover:bg-[#003d7a] text-white rounded-lg px-12 h-11 font-semibold"
							onClick={() => router.push("/membership/new/payment")}
						>
							Payment
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
