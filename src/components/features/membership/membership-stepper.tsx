"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MembershipStep {
	id: number;
	name: string;
	description?: string;
}

interface MembershipStepperProps {
	steps: MembershipStep[];
	currentStep: number;
	className?: string;
}

export function MembershipStepper({
	steps,
	currentStep,
	className,
}: MembershipStepperProps) {
	return (
		<nav
			className={cn("flex flex-col gap-0", className)}
			aria-label="Membership progress"
		>
			{steps.map((step, index) => {
				const isCompleted = currentStep > step.id;
				const isCurrent = currentStep === step.id;
				const isUpcoming = currentStep < step.id;

				return (
					<div key={step.id} className="flex">
						{/* Step indicator column */}
						<div className="flex flex-col items-center mr-4">
							<div
								className={cn(
									"w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors",
									isCompleted && "bg-[#0052a1] border-[#0052a1] text-white",
									isCurrent && "bg-[#0052a1] border-[#0052a1] text-white",
									isUpcoming && "bg-white border-gray-300 text-gray-400",
								)}
							>
								{isCompleted ? <Check className="w-4 h-4" /> : step.id}
							</div>
							{index < steps.length - 1 && (
								<div
									className={cn(
										"w-0.5 flex-1 min-h-[24px] my-1",
										isCompleted ? "bg-[#0052a1]" : "bg-gray-200",
									)}
								/>
							)}
						</div>

						{/* Step text */}
						<div className={cn("pb-6", index === steps.length - 1 && "pb-0")}>
							<p
								className={cn(
									"text-sm font-semibold",
									isUpcoming ? "text-gray-400" : "text-gray-900",
								)}
							>
								{step.name}
							</p>
							{step.description && (
								<p className="text-xs text-gray-500 mt-0.5">
									{step.description}
								</p>
							)}
						</div>
					</div>
				);
			})}
		</nav>
	);
}
