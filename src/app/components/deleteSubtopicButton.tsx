"use client";

import { deleteSubtopic } from "@/actions";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export default function DeleteSubtopicButton({ id, className }: Readonly<{ id: string; className?: string }>) {
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
		<>
			<button type={"button"} className={`${className} hidden md:block`} onClick={handleClick}>
				<Trash />
			</button>
			<button type={"button"} className={`${className} block md:hidden`} onClick={handleClick}>
				Delete
			</button>
		</>
	);
}
