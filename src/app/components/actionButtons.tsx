import DeleteSubtopicButton from "@/app/components/deleteSubtopicButton";
import AddSubtopicButton from "@/app/components/addSubtopicButton";
import { Save } from "lucide-react";

export default function ActionButtons({ id, addingSubtopic }: Readonly<{ id: string; addingSubtopic?: boolean }>) {
	const buttonClass =
		"z-10 flex h-10 md:w-10 items-center justify-center rounded-md md:bg-gray-300 p-2 font-[500] text-gray-700 transition-all ease-out hover:cursor-pointer hover:bg-gray-600 hover:text-gray-100 md:h-auto md:w-max";

	return (
		<div className="fixed inset-x-0 bottom-0 z-30 flex justify-around gap-x-1 border-t border-gray-200 bg-gray-300 p-2 text-[0.9rem] shadow-lg backdrop-blur md:inset-x-auto md:right-0 md:bottom-1/2 md:grid md:translate-y-1/2 md:grid-cols-1 md:gap-y-10 md:border-0 md:bg-transparent md:bg-white/95 md:p-0 md:shadow-none md:backdrop-blur-none">
			<AddSubtopicButton id={null} ariaLabel="Add note" className={`${buttonClass} md:hidden`} />
			{!addingSubtopic && <AddSubtopicButton className={buttonClass} id={id} />}
			<button type={"submit"} className={`${buttonClass} hidden md:block`} value={"Save"}>
				<Save />
			</button>
			<button type={"submit"} className={`${buttonClass} block md:hidden`} value={"Save"}>
				Save
			</button>
			{!addingSubtopic && <DeleteSubtopicButton id={id} className={buttonClass} />}
		</div>
	);
}
