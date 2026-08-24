"use client";

import { FolderOpen, Phone, MapPin, Users, AlertCircle } from "lucide-react";

import { InfoSection } from "./info-section";
import { ReadOnlyField } from "./read-only-field";
import { SecondaryMembershipCard } from "./secondary-membership-card";
import type { MembershipRegistrationData, SecondaryMember } from "./types";

interface MembershipRegistrationSummaryProps {
	data: MembershipRegistrationData;
	secondaryMembers: SecondaryMember[];
	onEditSecondary?: (id: string) => void;
	onRemoveSecondary?: (id: string) => void;
}

export function MembershipRegistrationSummary({
	data,
	secondaryMembers,
	onEditSecondary,
	onRemoveSecondary,
}: MembershipRegistrationSummaryProps) {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
			{/* Personal Data */}
			<InfoSection
				title="Personal data"
				icon={<FolderOpen className="w-6 h-6" />}
			>
				<div className="flex flex-col md:flex-row gap-8">
					{/* Photo */}
					<div className="flex flex-col items-center gap-3 shrink-0">
						<img
							src={data.photo}
							alt={`${data.firstName} ${data.lastName}`}
							className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
						/>
						<button
							type="button"
							className="text-sm font-medium text-[#0052a1] hover:underline"
						>
							Change picture
						</button>
					</div>

					{/* Fields */}
					<div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
						<ReadOnlyField label="ID Type" value={data.idType} />
						<ReadOnlyField label="ID Number" value={data.idNumber} />
						<ReadOnlyField
							label="Membership Type"
							value={data.membershipType}
						/>
						<ReadOnlyField label="Abbreviation" value={data.abbreviation} />
						<ReadOnlyField label="First Name" value={data.firstName} />
						<ReadOnlyField label="Last Name" value={data.lastName} />
						<ReadOnlyField label="Gender" value={data.gender} />
						<ReadOnlyField label="Date of birth" value={data.dateOfBirth} />
						<ReadOnlyField label="Occupation" value={data.occupation} />
					</div>
				</div>
			</InfoSection>

			{/* Contact */}
			<InfoSection title="Contact" icon={<Phone className="w-6 h-6" />}>
				<div className="space-y-6">
					<ReadOnlyField
						label="Email address"
						value={<span className="text-gray-700">{data.email}</span>}
						required
					/>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<ReadOnlyField
							label="Mobile phone number"
							value={
								<div className="flex items-center gap-2">
									<span>{data.mobilePhone}</span>
									<AlertCircle className="w-4 h-4 text-[#f5a623]" />
								</div>
							}
							required
						/>
						<ReadOnlyField
							label="Home phone number"
							value={data.homePhone}
							required
						/>
					</div>

					<ReadOnlyField label="Notifications" value={data.notifications} />
				</div>
			</InfoSection>

			{/* Address */}
			<InfoSection title="Address" icon={<MapPin className="w-6 h-6" />}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<ReadOnlyField label="Address" value={data.address} required />
					<div className="grid grid-cols-3 gap-6">
						<ReadOnlyField label="Country" value={data.country} />
						<ReadOnlyField label="State" value={data.state} />
						<ReadOnlyField label="City" value={data.city} />
					</div>
				</div>
			</InfoSection>

			{/* Secondary Memberships */}
			<InfoSection
				title="Secondary memberships"
				icon={<Users className="w-6 h-6" />}
				className="border-b-0 pb-0 mb-0"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{secondaryMembers.map((member) => (
						<SecondaryMembershipCard
							key={member.id}
							member={member}
							onEdit={onEditSecondary}
							onRemove={onRemoveSecondary}
						/>
					))}
				</div>
			</InfoSection>
		</div>
	);
}
