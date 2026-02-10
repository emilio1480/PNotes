"use client";

import type { Tool } from "@/types";

export default function Tool({ onClick, name, disabled, isActive }: Readonly<Tool>) {
	return (
		<button type={"button"} onClick={onClick} disabled={disabled} className={`text-tertiary m-0 rounded-lg border-0 px-2.5 py-1.5 text-sm leading-tight font-medium transition-all duration-200 ease-[cubic-bezier(0.65,0.05,0.36,1)] hover:cursor-pointer ${isActive ? "bg-[#912623] hover:bg-[#a52b28]" : "bg-primary hover:bg-[#ce812b]"}`}>
			{name}
		</button>
	);
}
