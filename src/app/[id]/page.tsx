import TipTapEditor from "@/app/components/tiptapEditor";
import { getSubtopic } from "@/actions";
import RedirectButton from "@/app/[id]/redirectButton";
import DeleteButton from "@/app/[id]/deleteButton";

export default async function Subtopic({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
	const { id } = await params;
	const subtopic = await getSubtopic(id);

	return (
		<div>
			<TipTapEditor id={id} content={subtopic.content} title={subtopic.title} ifAddingSubtopic={false} />
			<RedirectButton
				id={id}
				text={"Shto nje neteme te re"}
				className={"fixed bottom-4 left-0 z-10 ml-[50%] w-45 -translate-x-1/2 rounded-lg bg-blue-400 font-[500] text-white transition-all ease-out hover:cursor-pointer hover:bg-blue-500"}
			/>
			<DeleteButton id={id} />
		</div>
	);
}
