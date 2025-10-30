"use client";
import { redirect } from "next/navigation";

export default function RedirectButton({
	id,
	className,
	text,
}: Readonly<{
	id: string | null;
	text: string;
	className?: string;
}>) {
	return (
		<button className={className} onClick={() => redirect(`/${id}/addSubtopic`)}>
			{text}
		</button>
	);
}
