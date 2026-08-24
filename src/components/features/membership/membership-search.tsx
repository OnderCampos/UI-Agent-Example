"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MembershipSearchProps {
	onSearch?: (query: string) => void;
	isLoading?: boolean;
	className?: string;
}

export function MembershipSearch({
	onSearch,
	isLoading = false,
	className,
}: MembershipSearchProps) {
	const [query, setQuery] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (onSearch) {
			onSearch(query.trim());
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={cn("flex flex-col items-center gap-6", className)}
		>
			<div className="relative w-full max-w-2xl">
				<Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
				<Input
					type="text"
					placeholder="Search by name, mobile phone, email or membership number"
					value={query}
					disabled={isLoading}
					onChange={(e) => setQuery(e.target.value)}
					className="h-14 pl-14 pr-5 text-base rounded-xl border-gray-200 bg-white focus-visible:ring-[#0052a1] focus-visible:ring-2 disabled:opacity-70"
				/>
			</div>
			<Button
				type="submit"
				disabled={isLoading || !query.trim()}
				className="h-12 px-8 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-70 font-semibold text-base"
			>
				{isLoading ? (
					<Loader2 className="w-4 h-4 animate-spin" />
				) : (
					"Search Membership"
				)}
			</Button>
		</form>
	);
}
