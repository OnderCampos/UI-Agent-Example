"use client";

import { AlertCircle, CheckCircle } from "lucide-react";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface VerifyMember {
	id: string;
	name: string;
	contact: string;
	avatarUrl?: string;
	verified: boolean;
	code: string[];
}

interface VerifyMemberRowProps {
	member: VerifyMember;
	onCodeChange: (id: string, index: number, value: string) => void;
	onResendCode: (id: string) => void;
}

export function VerifyMemberRow({
	member,
	onCodeChange,
	onResendCode,
}: VerifyMemberRowProps) {
	const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const value = e.target.value.replace(/\D/g, "");

		if (!value) {
			onCodeChange(member.id, index, "");
			return;
		}

		const lastDigit = value.slice(-1);
		onCodeChange(member.id, index, lastDigit);

		// Move focus to next input when a digit is entered
		if (index < 3 && lastDigit) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number,
	) => {
		if (e.key === "Backspace" && !member.code[index] && index > 0) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "");
		if (!pastedData) return;

		const digits = pastedData.slice(0, 4).split("");
		digits.forEach((digit, index) => {
			onCodeChange(member.id, index, digit);
		});

		// Focus the next empty input or the last one
		const nextEmptyIndex = digits.length < 4 ? digits.length : 3;
		inputsRef.current[nextEmptyIndex]?.focus();
	};

	return (
		<div className="py-5">
			<div className="flex items-start gap-4">
				{/* Avatar */}
				<div className="flex-shrink-0">
					{member.avatarUrl ? (
						<img
							src={member.avatarUrl}
							alt={member.name}
							className="h-12 w-12 rounded-full object-cover"
						/>
					) : (
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 font-semibold text-lg">
							{member.name
								.split(" ")
								.map((part) => part[0])
								.join("")
								.slice(0, 2)
								.toUpperCase()}
						</div>
					)}
				</div>

				{/* Member info */}
				<div className="flex-1 min-w-0">
					<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
						<div>
							<h3 className="font-semibold text-gray-900">{member.name}</h3>
							<div className="mt-1 flex items-center gap-2">
								<span className="text-sm text-gray-600">{member.contact}</span>
								{member.verified ? (
									<CheckCircle className="h-4 w-4 text-green-600" />
								) : (
									<AlertCircle className="h-4 w-4 text-[#f5a623]" />
								)}
							</div>
						</div>

						{member.verified ? (
							<span className="text-sm font-medium text-green-600 whitespace-nowrap">
								Member verified
							</span>
						) : (
							<div className="flex flex-col items-start sm:items-end gap-2">
								<span className="text-xs text-gray-500">Enter code</span>
								<div className="flex items-center gap-2">
									{member.code.map((digit, codeIndex) => (
										<Input
											key={codeIndex}
											ref={(el) => {
												inputsRef.current[codeIndex] = el;
											}}
											type="text"
											inputMode="numeric"
											maxLength={1}
											value={digit}
											onChange={(e) => handleChange(e, codeIndex)}
											onKeyDown={(e) => handleKeyDown(e, codeIndex)}
											onPaste={handlePaste}
											className={cn(
												"h-11 w-10 p-0 text-center text-lg font-medium rounded-md",
												digit
													? "border-[#0052a1] text-[#0052a1]"
													: "border-gray-200 text-gray-400",
											)}
										/>
									))}
								</div>
								<button
									type="button"
									onClick={() => onResendCode(member.id)}
									className="text-xs text-[#0052a1] hover:underline"
								>
									Resend code
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
