"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InfoSectionProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
	title: React.ReactNode;
	icon?: React.ReactNode;
}

export function InfoSection({
	title,
	icon,
	children,
	className,
	...props
}: InfoSectionProps) {
	return (
		<section
			className={cn(
				"border-b border-gray-200 last:border-b-0 pb-8 mb-8",
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-3 mb-6">
				{icon && <span className="text-[#0052a1]">{icon}</span>}
				<h2 className="text-xl font-semibold text-[#003d7a]">{title}</h2>
			</div>
			{children}
		</section>
	);
}
