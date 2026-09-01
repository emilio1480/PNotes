"use client";

import React, { useContext, useState } from "react";
import ListSubtopicComponent from "./listSubtopicComponent";
import { ListSubtopic } from "@/types";
import AddSubtopicButton from "@/app/components/addSubtopicButton";
import { Menu, MoveLeft, MoveRight } from "lucide-react";
import { usePathname } from "next/navigation";
import LogoutButton from "@/app/components/logoutButton";
import { ToolContext } from "@/app/components/toolBarContext";

export default function SideMenu({
	className,
	subtopics,
}: Readonly<{
	className?: string;
	subtopics: ListSubtopic[];
}>) {
	const [isCollapse, setIsCollapse] = useState(false);
	const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
	const pathname = usePathname();
	const { isToolbarVisible, setIsToolbarVisible } = useContext(ToolContext)!;

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
				className="w-full min-w-0"
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
	const expandedClassName = "max-h-[45svh] md:w-72 md:max-w-[32vw]";
	const collapsedClassName = "max-h-24 md:w-14 md:max-w-14";
	const editorRoutePattern = /^\/[^/]+(?:\/addSubtopic)?$/;
	const hasEditorActions = editorRoutePattern.test(pathname) && pathname !== "/signIn";

	return (
		<>
			<aside
				className={`flex flex-col justify-between overflow-hidden border-b border-gray-200 bg-gray-100 transition-all md:sticky md:top-0 md:h-svh md:flex-shrink-0 md:max-h-none md:border-r md:border-b-0 ${
					isCollapse ? collapsedClassName : `${expandedClassName} ${className || ""}`
				}`}
			>
				<div className={`min-h-0 overflow-y-auto px-3 pt-2 pb-4 md:px-4 ${isCollapse ? "" : "md:pr-8"}`}>
					<div className={`mb-4 flex h-8 items-center ${isCollapse ? "justify-between" : "justify-between space-x-3"}`}>
						<h2 className="text-lg font-[500] text-gray-800">{!isCollapse && "Menu"}</h2>
						<div className="flex items-center gap-2">
							<button
								onClick={() => setIsToolbarVisible(!isToolbarVisible)}
								className="h-10 flex-shrink-0 rounded-md px-3 py-2 text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-200 md:hidden"
							>
								<Menu size={24} />
							</button>
							<LogoutButton className="z-10 w-max rounded px-2 py-1 text-sm font-[500] text-gray-700 hover:cursor-pointer hover:bg-gray-200 hover:text-[#112d5f] md:hidden" />
							<button
								type="button"
								aria-label={isCollapse ? "Expand menu" : "Collapse menu"}
								aria-expanded={!isCollapse}
								className="h-max w-max rounded p-1 hover:cursor-pointer hover:bg-gray-200 hover:text-gray-500"
								onClick={() => setIsCollapse((current) => !current)}
							>
								{isCollapse ? <MoveRight /> : <MoveLeft />}
							</button>
						</div>
					</div>
					{isCollapse ? null : rootItems.map((item) => renderListSubtopic(item, 0))}
				</div>
				<AddSubtopicButton
					id={null}
					ariaLabel="Add note"
					className="z-10 hidden w-full flex-shrink-0 bg-gray-300 p-2 text-gray-700 transition-all ease-out hover:cursor-pointer hover:bg-gray-600 hover:text-gray-100 md:block"
					text={isCollapse ? undefined : "Add a note"}
				/>
			</aside>
			{!hasEditorActions && (
				<nav className="fixed inset-x-0 bottom-0 z-30 flex justify-center border-t border-gray-200 bg-white/95 p-2 shadow-lg backdrop-blur md:hidden">
					<AddSubtopicButton
						id={null}
						ariaLabel="Add note"
						className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-300 text-gray-700 transition-all ease-out hover:cursor-pointer hover:bg-gray-600 hover:text-gray-100"
					/>
				</nav>
			)}
		</>
	);
}
