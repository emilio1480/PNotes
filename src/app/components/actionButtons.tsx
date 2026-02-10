import DeleteSubtopicButton from "@/app/components/deleteSubtopicButton";
import AddSubtopicButton from "@/app/components/addSubtopicButton";
import { Save } from "lucide-react";

export default function ActionButtons({ id, addingSubtopic }: Readonly<{ id: string; addingSubtopic?: boolean }>) {
	return (
		<div className={"mb-1/2 fixed right-0 bottom-1/2 grid translate-y-1/2 grid-cols-1 gap-y-10"}>
			<button className={"z-10 w-max rounded-lg bg-gray-300 p-2 font-[500] text-gray-700 transition-all ease-out hover:cursor-pointer hover:bg-gray-600 hover:text-gray-100"} value={"Save"}>
				<Save />
			</button>
			{!addingSubtopic && (
				<>
					<DeleteSubtopicButton id={id} />
					<AddSubtopicButton className={"z-10 w-max rounded-lg bg-gray-300 p-2 font-[500] text-gray-700 transition-all ease-out hover:cursor-pointer hover:bg-gray-600 hover:text-gray-100"} id={id} />
				</>
			)}
		</div>
	);
}
