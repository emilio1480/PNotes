"use client";

import React, { useState } from "react";
import ListSubtopicComponent from "./listSubtopicComponent";
import { ListSubtopic } from "@/types";
import AddSubtopicButton from "@/app/components/addSubtopicButton";
import { MoveLeft, MoveRight } from "lucide-react";

export default function SideMenu({
	className,
	subtopics,
}: Readonly<{
	className?: string;
	subtopics: ListSubtopic[];
}>) {
	const [isCollapse, setIsCollapse] = useState(false);
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
				className="w-max"
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
		<div className={`flex h-screen flex-col justify-between bg-gray-100 ${className}`}>
			<div className={`mt-2 px-4 pb-4 ${isCollapse ? "" : "pr-8"}`}>
				<div className={`flex h-8 justify-between ${isCollapse ? "space-x-0" : "space-x-3"} mb-4 items-center`}>
					<h2 className="text-lg font-[500] text-gray-800">{!isCollapse && "Menu"}</h2>
					<button className={"h-max w-max hover:cursor-pointer hover:text-gray-500"} onClick={() => setIsCollapse(!isCollapse)}>
						{isCollapse ? <MoveRight /> : <MoveLeft />}
					</button>
				</div>
				{isCollapse ? null : rootItems.map((item) => renderListSubtopic(item, 0))}
			</div>
			<AddSubtopicButton
				id={null}
				className={"z-10 w-full bg-gray-300 p-2 text-gray-700 transition-all ease-out hover:cursor-pointer hover:bg-gray-600 hover:text-gray-100"}
				text={isCollapse ? undefined : "Add a note"}
			/>
		</div>
	);
}
