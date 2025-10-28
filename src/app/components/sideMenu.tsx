"use client";

import React, { useState } from "react";
import ListSubheadingComponent from "./listSubheadingComponent";
import { ListSubheading } from "@/types";

let subtopicList: ListSubheading[];

function getChildren(parentId: number) {
	return subtopicList.filter((item) => item.parent === parentId);
}

function hasChildren(id: number) {
	return subtopicList.some((item) => item.parent === id);
}

export default function SideMenu({
	className,
	subtopics,
}: Readonly<{
	className?: string;
	subtopics: ListSubheading[];
}>) {
	const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
	subtopicList = subtopics;

	function toggleListSubheading(id: number) {
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

	function renderListSubheading(listSubheading: ListSubheading, depth: number = 0) {
		const hasKids = hasChildren(listSubheading.id);
		const isExpanded = expandedItems.has(listSubheading.id);
		const children = getChildren(listSubheading.id);

		return (
			<div
				key={listSubheading.id}
				className="mb-1"
				onClick={(e) => {
					e.stopPropagation();
					toggleListSubheading(listSubheading.id);
				}}
			>
				<ListSubheadingComponent listSubheading={listSubheading} depth={depth} hasKids={hasKids} isExpanded={isExpanded} />

				{hasKids && isExpanded && <div>{children.map((child) => renderListSubheading(child, depth + 1))}</div>}
			</div>
		);
	}

	const rootItems = getChildren(0);

	return (
		<div className={`fixed h-screen bg-gray-100 ${className}`}>
			<div className="p-4">
				<h2 className="mb-4 text-lg font-semibold text-gray-800">Menu</h2>
				{rootItems.map((item) => renderListSubheading(item, 0))}
			</div>
		</div>
	);
}
