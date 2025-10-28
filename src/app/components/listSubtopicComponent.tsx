"use client";

import type { ListSubtopic } from "@/types";
import React from "react";
import DropdownButton from "@/app/components/dropdownButton";

function handleTitleClick(id: number) {
	// In Next.js, you would use: router.push(`/subtopic/${id}`)
	console.log(`Navigating to /subtopic/${id}`);
	window.location.hash = `subtopic/${id}`;
}

export default function ListSubtopicComponent({
	depth,
	hasKids,
	isExpanded,
	listSubtopic,
}: Readonly<{
	depth: number;
	hasKids: boolean;
	isExpanded: boolean;
	listSubtopic: ListSubtopic;
}>) {
	return (
		<div className={`transition-color flex cursor-pointer items-center gap-1 rounded p-2 hover:bg-gray-200`} style={{ paddingLeft: `${depth * 1.1}rem` }}>
			<DropdownButton hasKids={hasKids} isExpanded={isExpanded} />
			<span className={`${listSubtopic.parentId == 0 ? "font-[600]" : ""} `} onClick={() => handleTitleClick(listSubtopic.id)}>
				{listSubtopic.title}
			</span>
		</div>
	);
}
