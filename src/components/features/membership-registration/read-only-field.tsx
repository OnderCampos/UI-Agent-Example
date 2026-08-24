"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ReadOnlyFieldProps extends React.HTMLAttributes<HTMLDivElement> {
	label: string;
	value: React.ReactNode;
	required?: boolean;
}

export function ReadOnlyField({
	label,
	value,
	required = false,
	className,
	...props
}: ReadOnlyFieldProps) {
	return (
		<div className={cn("space-y-1.5", className)} {...props}>
			<p className="text-sm text-gray-500">
				{label}
				{required && <span className="text-red-500 ml-0.5">*</span>}
			</p>
			<div className="text-base font-medium text-gray-900 break-words">
				{value}
			</div>
		</div>
	);
}
