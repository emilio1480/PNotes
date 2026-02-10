"use client";
import { redirect } from "next/navigation";
import {Plus} from "lucide-react";

export default function AddSubtopicButton({
	id,
	className,
	text,
}: Readonly<{
	id: string | null;
	text?: string;
	className?: string;
}>) {
	return (
		<button type={"button"} className={className} onClick={() => redirect(`/${id}/addSubtopic`)}>
			{text || (<Plus className={"mx-auto"}/>)}
		</button>
	);
}
