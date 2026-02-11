"use client";

import type { Tool } from "@/types";

export default function Tool({ onClick, name, disabled, isActive }: Readonly<Tool>) {
	return (
		<button
			type={"button"}
			onClick={onClick}
			disabled={disabled}
			className={`m-0 rounded-lg border-0 px-2.5 py-1.5 text-sm leading-tight font-medium text-[#fefae0] transition-all duration-200 ease-[cubic-bezier(0.65,0.05,0.36,1)] hover:cursor-pointer ${isActive ? "bg-primary hover:bg-tertiary" : "bg-secondary hover:bg-tertiary"}`}
		>
			{name}
		</button>
	);
}
