"use client";
import { redirect } from "next/navigation";
import {Plus} from "lucide-react";

export default function AddSubtopicButton({
	id,
	className,
	text,
	ariaLabel,
}: Readonly<{
	id: string | null;
	text?: string;
	className?: string;
	ariaLabel?: string;
}>) {
	return (
		<>
			<button type={"button"} aria-label={ariaLabel} className={`hidden md:block ${className}`} onClick={() => redirect(`/${id}/addSubtopic`)}>
				{text || <Plus className={"mx-auto"} />}
			</button>
			<button type={"button"} aria-label={ariaLabel} className={`block md:hidden ${className}`} onClick={() => redirect(`/${id}/addSubtopic`)}>
				{id ? "Add a subtopic" : "Add a main topic"}
			</button>
		</>
	);
}
