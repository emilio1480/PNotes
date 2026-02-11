import { ChevronDown, ChevronRight, Dot } from "lucide-react";
import React from "react";

export default function DropdownButton({ hasKids, isExpanded }: Readonly<{ hasKids: boolean; isExpanded: boolean }>) {
	return (
		<>
			{hasKids ? (
				<button className="h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center">
					{isExpanded ? <ChevronDown className="hover:text-secondary  h-4 w-4 text-gray-600" /> : <ChevronRight className="hover:text-quaternary h-4 w-4 text-gray-600" />}
				</button>
			) : (
				<Dot className={"text-primary -translate-x-2 -mr-2 min-w-max"}/>
			)}
		</>
	);
}
