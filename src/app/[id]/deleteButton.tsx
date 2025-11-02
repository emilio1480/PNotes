"use client";

import { toast } from "react-hot-toast";
import { deleteSubtopic } from "@/actions";

export default function DeleteButton({ id }: Readonly<{ id: string }>) {
	const handleClick = () => {
		// Show a custom toast asking for confirmation
		toast.custom((t) => (
			<div className="flex flex-col gap-3 rounded-lg bg-white p-4 text-black shadow-lg">
				<p className="font-medium">A jeni e sigurt që doni ta fshini këtë nëntemë?</p>
				<div className="flex justify-end gap-2">
					<button onClick={() => toast.dismiss(t.id)} className="rounded-md border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100">
						Anulo
					</button>
					<button
						onClick={async () => {
							await deleteSubtopic(id);
							toast.dismiss(t.id);
							toast.success("Nentema u fshi!");
						}}
						className="rounded-md bg-red-700 px-3 py-1 text-white hover:bg-red-800"
					>
						Konfirmo
					</button>
				</div>
			</div>
		));
	};

	return (
		<button className={"fixed right-13 bottom-4 z-10 w-45 rounded-lg bg-red-700 font-[500] text-white transition-all ease-out hover:cursor-pointer hover:bg-red-800"} onClick={handleClick}>
			Fshi nentemen
		</button>
	);
}
