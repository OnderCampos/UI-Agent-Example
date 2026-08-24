"use client";

import { useRef } from "react";
import type { UserMembership } from "@/types/user";

interface MembershipCardProps {
	membership: UserMembership;
	memberName: string;
}

export function MembershipCard({
	membership,
	memberName,
}: MembershipCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	// Generate barcode-like pattern from member ID
	const generateBarcodePattern = (memberId: string): string => {
		// Simple pattern generation for visual effect
		const hash = memberId
			.split("")
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		const pattern = [];
		for (let i = 0; i < 30; i++) {
			const width = ((hash * (i + 1)) % 4) + 1;
			pattern.push(width);
		}
		return pattern.join(" ");
	};

	const barcodeWidths = generateBarcodePattern(membership.memberId);

	// Calculate days until expiration
	const expirationDate = new Date(membership.expirationDate);
	const today = new Date();
	const daysUntilExpiration = Math.ceil(
		(expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
	);
	const isExpiringSoon = daysUntilExpiration <= 30 && daysUntilExpiration > 0;
	const isExpired = daysUntilExpiration <= 0;

	return (
		<div
			ref={cardRef}
			className="relative w-full max-w-md aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl"
		>
			{/* Card Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#0052a1] via-[#003d7a] to-[#002851]" />

			{/* Decorative Pattern */}
			<div className="absolute inset-0 opacity-10">
				<svg className="w-full h-full" viewBox="0 0 400 250">
					<defs>
						<pattern
							id="circles"
							x="0"
							y="0"
							width="40"
							height="40"
							patternUnits="userSpaceOnUse"
						>
							<circle cx="20" cy="20" r="15" fill="white" />
						</pattern>
					</defs>
					<rect width="400" height="250" fill="url(#circles)" />
				</svg>
			</div>

			{/* Card Content */}
			<div className="relative h-full p-6 flex flex-col justify-between text-white">
				{/* Header */}
				<div className="flex items-start justify-between">
					<div>
						<div className="flex items-center gap-2 mb-1">
							<span className="text-xl font-bold tracking-wide">
								PriceSmart
							</span>
							{membership.tier && (
								<span className="px-2 py-0.5 bg-[#f5a623] text-[#003d7a] text-xs font-bold rounded">
									{membership.tier.toUpperCase()}
								</span>
							)}
						</div>
						<p className="text-sm text-white/70">Membership Card</p>
					</div>
					<div className="text-right">
						<span className="text-xs text-white/60 uppercase tracking-wider">
							{membership.type}
						</span>
					</div>
				</div>

				{/* Member Number with Barcode Effect */}
				<div className="my-4">
					{/* Barcode Visualization */}
					<div className="flex items-end gap-px h-10 mb-3">
						{barcodeWidths.split(" ").map((width, i) => (
							<div
								key={i}
								className="bg-white/90"
								style={{
									width: `${parseInt(width) * 2}px`,
									height: `${20 + ((parseInt(width) * 7) % 20)}px`,
								}}
							/>
						))}
					</div>
					<p className="text-2xl font-mono tracking-[0.3em] font-bold">
						{membership.memberId}
					</p>
				</div>

				{/* Member Name and Details */}
				<div className="flex items-end justify-between">
					<div>
						<p className="text-xs text-white/60 uppercase tracking-wider mb-1">
							Member
						</p>
						<p className="text-lg font-semibold">{memberName}</p>
					</div>
					<div className="text-right">
						<p className="text-xs text-white/60 uppercase tracking-wider mb-1">
							Valid Until
						</p>
						<p
							className={`text-lg font-semibold ${isExpired ? "text-red-400" : isExpiringSoon ? "text-yellow-400" : ""}`}
						>
							{expirationDate.toLocaleDateString("en-US", {
								month: "short",
								year: "numeric",
							})}
						</p>
					</div>
				</div>

				{/* Points Badge */}
				{membership.points !== undefined && (
					<div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
						<p className="text-xs text-white/70 uppercase">Points</p>
						<p className="text-lg font-bold">
							{membership.points.toLocaleString()}
						</p>
					</div>
				)}
			</div>

			{/* Status Indicator */}
			{membership.status !== "active" && (
				<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
					<div className="bg-red-500 text-white px-6 py-2 rounded-full font-bold text-lg uppercase tracking-wider -rotate-12">
						{membership.status}
					</div>
				</div>
			)}
		</div>
	);
}

interface MembershipCardBackProps {
	membership: UserMembership;
}

export function MembershipCardBack({ membership }: MembershipCardBackProps) {
	return (
		<div className="relative w-full max-w-md aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
			{/* Magnetic Strip */}
			<div className="absolute top-8 left-0 right-0 h-12 bg-gray-800" />

			{/* Content */}
			<div className="absolute inset-0 p-6 pt-24">
				{/* Signature Strip */}
				<div className="bg-white/80 h-10 rounded mb-4 flex items-center px-4">
					<span className="text-gray-400 text-sm italic">
						Authorized Signature
					</span>
				</div>

				{/* Info */}
				<div className="text-xs text-gray-600 space-y-2">
					<p>
						This card is the property of PriceSmart, Inc. and must be returned
						upon request. Not transferable. Use of this card constitutes
						acceptance of our terms and conditions.
					</p>
					<p>
						For assistance, call:{" "}
						<span className="font-semibold">+506 2201-9600</span>
					</p>
					<p>
						Visit us at: <span className="font-semibold">pricesmart.com</span>
					</p>
				</div>

				{/* Member ID */}
				<div className="absolute bottom-6 right-6 text-right">
					<p className="text-xs text-gray-500">Member ID</p>
					<p className="font-mono text-sm">{membership.memberId}</p>
				</div>
			</div>
		</div>
	);
}
