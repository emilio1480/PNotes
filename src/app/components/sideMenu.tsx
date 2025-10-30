"use client";

import React, { useState } from "react";
import ListSubtopicComponent from "./listSubtopicComponent";
import { ListSubtopic } from "@/types";
import RedirectButton from "@/app/[id]/redirectButton";

export default function SideMenu({
	className,
	subtopics,
}: Readonly<{
	className?: string;
	subtopics: ListSubtopic[];
}>) {
	const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

	const subtopicList: ListSubtopic[] = subtopics;

	function getChildren(parentId: number | null) {
		return subtopicList.filter((item) => item.parentId === parentId);
	}

	function hasChildren(id: number) {
		return subtopicList.some((item) => item.parentId === id);
	}

	function toggleListSubtopic(id: number) {
		setExpandedItems((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	}

	function renderListSubtopic(listSubtopic: ListSubtopic, depth: number = 0) {
		const hasKids = hasChildren(listSubtopic.id);
		const isExpanded = expandedItems.has(listSubtopic.id);
		const children = getChildren(listSubtopic.id);

		return (
			<div
				key={listSubtopic.id}
				className="mb-1"
				onClick={(e) => {
					e.stopPropagation();
					toggleListSubtopic(listSubtopic.id);
				}}
			>
				<ListSubtopicComponent listSubtopic={listSubtopic} depth={depth} hasKids={hasKids} isExpanded={isExpanded} />

				{hasKids && isExpanded && <div>{children.map((child) => renderListSubtopic(child, depth + 1))}</div>}
			</div>
		);
	}

	const rootItems = getChildren(null);

	return (
		<>
			<div className={`fixed h-screen bg-gray-100 ${className}`}>
				<div className="p-4">
					<h2 className="mb-4 text-lg font-semibold text-gray-800">Menu</h2>
					{rootItems.map((item) => renderListSubtopic(item, 0))}
				</div>
			</div>
			<RedirectButton id={null} className={"fixed bottom-4 left-9 z-10 w-43 rounded-2xl bg-orange-800 text-white hover:cursor-pointer hover:bg-orange-900"} text={"Shto nje teme te re"} />
		</>
	);
}
