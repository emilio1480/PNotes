"use client";

import type { Tool } from "@/types";

export default function Tool({ onClick, name, disabled, isActive }: Readonly<Tool>) {
	return (
		<button onClick={onClick} disabled={disabled} className={`m-0 rounded-lg border-0 bg-gray-200 px-2.5 py-1.5 text-sm leading-tight font-medium transition-all duration-200 ease-[cubic-bezier(0.65,0.05,0.36,1)] hover:cursor-pointer hover:bg-gray-300 ${isActive ? "text-purple-600" : "text-black"}`}>
			{name}
		</button>
	);
}
