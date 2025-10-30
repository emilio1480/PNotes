"use client";

import { deleteSubtopic } from "@/actions";

export default function DeleteButton({ id }: Readonly<{ id: string }>) {
	return (
		<button
			className={"fixed bottom-4 right-13 z-10  w-45 rounded-lg bg-red-500 font-[500] text-white hover:cursor-pointer hover:bg-red-600"}
			onClick={() => deleteSubtopic(id)}
		>
			Fshi nentemen
		</button>
	);
}
