"use client";

import { deleteSubtopic } from "@/actions";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export default function DeleteSubtopicButton({ id }: Readonly<{ id: string }>) {
	const handleClick = () => {
		toast("Proceed with deletion?", {
			style: {
				fontSize: "0.9rem",
			},
			action: {
				label: <p className={"text-[0.84rem]"}>Yes</p>,
				onClick: async () => await deleteSubtopic(id),
			},
			cancel: {
				label: <p className={"text-[0.84rem]"}>No</p>,
				onClick: () => toast.dismiss(),
			},
			duration: Infinity,
			dismissible: true,
		});
	};

	return (
		<button
			type={"button"}
			className={"z-10 w-max rounded-lg bg-gray-300 p-2 font-[500] text-gray-700 transition-all ease-out hover:cursor-pointer hover:bg-gray-600 hover:text-gray-100"}
			onClick={handleClick}
		>
			<Trash />
		</button>
	);
}
