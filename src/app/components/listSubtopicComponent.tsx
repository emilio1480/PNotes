"use client";

import type { ListSubtopic } from "@/types";
import React from "react";
import DropdownButton from "@/app/components/dropdownButton";
import {router} from "next/client";
import {useRouter} from "next/navigation";

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
    const router = useRouter();

	return (
		<div className={`transition-color flex cursor-pointer items-center gap-1 rounded p-2 hover:bg-gray-200`} style={{ paddingLeft: `${depth * 1.1}rem` }}>
			<DropdownButton hasKids={hasKids} isExpanded={isExpanded} />
			<span className={`${listSubtopic.parentId == 0 ? "font-[600]" : ""} hover:text-blue-400`} onClick={() => router.push(`/${listSubtopic.id}`)}>
				{listSubtopic.title}
			</span>
		</div>
	);
}
