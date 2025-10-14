"use client";

import React, { useState } from "react";
import ListSubheadingComponent from "./listSubheadingComponent";
import { ListSubheading } from "@/types";

const sampleData: ListSubheading[] = [
	{ id: 1, title: "Getting Started", parent: 0 },
	{ id: 2, title: "Introduction", parent: 1 },
	{ id: 3, title: "Installation", parent: 1 },
	{ id: 4, title: "Configuration", parent: 1 },
	{ id: 5, title: "Core Concepts", parent: 0 },
	{ id: 6, title: "Components", parent: 5 },
	{ id: 7, title: "Props", parent: 5 },
	{ id: 8, title: "State Management", parent: 5 },
	{ id: 9, title: "Advanced Topics", parent: 0 },
	{ id: 10, title: "Routing", parent: 9 },
	{ id: 11, title: "API Integration", parent: 9 },
	{ id: 12, title: "API Integration", parent: 4 },
	{ id: 13, title: "API Integration", parent: 12 },
];

function getChildren(parentId: number) {
	return sampleData.filter((item) => item.parent === parentId);
}

function hasChildren(id: number) {
	return sampleData.some((item) => item.parent === id);
}

export default function SideMenu({ className }: { className?: string }) {
	const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

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
