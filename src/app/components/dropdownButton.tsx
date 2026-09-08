import { ChevronDown, ChevronRight, Dot } from "lucide-react";
import React from "react";

export default function DropdownButton({ hasKids, isExpanded }: Readonly<{ hasKids: boolean; isExpanded: boolean }>) {
	return (
		<>
			{hasKids ? (
				<button className="h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center">
					{isExpanded ? <ChevronDown className="h-4 w-4 text-gray-600 hover:text-[#112d5f]" /> : <ChevronRight className="h-4 w-4 text-gray-600 hover:text-[#112d5f]" />}
				</button>
			) : (
				<Dot size={"20"} className={"text-primary"} />
			)}
		</>
	);
}
