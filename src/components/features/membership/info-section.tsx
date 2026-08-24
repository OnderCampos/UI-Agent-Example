"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InfoField {
	label: string;
	value: React.ReactNode;
}

export interface InfoSectionProps {
	title?: React.ReactNode | null;
	fields: InfoField[];
	columns?: 1 | 2 | 3 | 4;
	className?: string;
}

export function InfoSection({
	title,
	fields,
	columns = 3,
	className,
}: InfoSectionProps) {
	const gridCols = {
		1: "grid-cols-1",
		2: "grid-cols-1 sm:grid-cols-2",
		3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
	}[columns];

	return (
		<section className={cn("space-y-5", className)}>
			{title && (
				<div className="flex items-center gap-2 text-xl font-semibold text-[#002d5c]">
					{title}
				</div>
			)}
			<div className={cn("grid gap-x-6 gap-y-5", gridCols)}>
				{fields.map((field, index) => (
					<div key={index} className="space-y-1.5">
						<p className="text-sm font-medium text-gray-700">{field.label}</p>
						<div className="text-[15px] text-[#002d5c] font-medium">
							{field.value}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
