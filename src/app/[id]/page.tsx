import TipTapEditor from "@/app/components/tiptapEditor";
import { getSubtopic } from "@/actions";
import RedirectButton from "@/app/[id]/redirectButton";

export default async function Subtopic({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
	const { id } = await params;
	const subtopic = await getSubtopic(id);

	return (
		<div>
			<TipTapEditor parentId={id} content={subtopic.content} title={subtopic.title} ifAddingSubtopic={false} />
			<RedirectButton
				id={id}
				text={"Shto nje netemete re"}
				className={"fixed bottom-4 left-0 z-10 ml-[50%] w-45 -translate-x-1/2 rounded-2xl bg-blue-400 font-[500] text-white hover:cursor-pointer hover:bg-blue-500"}
			/>
		</div>
	);
}
