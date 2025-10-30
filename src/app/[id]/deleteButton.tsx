"use client";

import { deleteSubtopic } from "@/actions";

export default function DeleteButton({ id }: Readonly<{ id: string }>) {
	return (
		<button
			className={"fixed right-13 bottom-4 z-10 w-45 rounded-lg bg-red-700 font-[500] text-white transition-all ease-out hover:cursor-pointer hover:bg-red-800"}
			onClick={() => deleteSubtopic(id)}
		>
			Fshi nentemen
		</button>
	);
}
