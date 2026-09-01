"use client";

import type { ListSubtopic } from "@/types";
import React from "react";
import DropdownButton from "@/app/components/dropdownButton";
import { useRouter } from "next/navigation";

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
	const indentation = `${Math.min(depth * 1.1, 4.4)}rem`;

	return (
		<div className="transition-color mb-1 flex w-full min-w-0 cursor-pointer items-start gap-1 rounded px-2" style={{ paddingLeft: indentation }}>
			<DropdownButton hasKids={hasKids} isExpanded={isExpanded} />
			<span className={`${listSubtopic.parentId == 0 ? "font-[600]" : ""} min-w-0 flex-1 break-words leading-tight hover:text-[#112d5f]`} onClick={() => router.push(`/${listSubtopic.id}`)}>
				{listSubtopic.title}
			</span>
		</div>
	);
}
