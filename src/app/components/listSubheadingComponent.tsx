"use client";

import type { ListSubheading } from "@/types";
import React from "react";
import DropdownButton from "@/app/components/dropdownButton";

function handleTitleClick(id: number) {
	// In Next.js, you would use: router.push(`/subtopic/${id}`)
	console.log(`Navigating to /subtopic/${id}`);
	window.location.hash = `subtopic/${id}`;
}

export default function ListSubheadingComponent({
	depth,
	hasKids,
	isExpanded,
	listSubheading,
}: Readonly<{
	depth: number;
	hasKids: boolean;
	isExpanded: boolean;
	listSubheading: ListSubheading;
}>) {
	return (
		<div className={`transition-color flex cursor-pointer items-center gap-1 rounded p-2 hover:bg-gray-200`} style={{ paddingLeft: `${depth * 1.1}rem` }}>
			<DropdownButton hasKids={hasKids} isExpanded={isExpanded} />
			<span className={`${listSubheading.parent == 0 ? "font-[600]" : ""} `} onClick={() => handleTitleClick(listSubheading.id)}>
				{listSubheading.title}
			</span>
		</div>
	);
}
