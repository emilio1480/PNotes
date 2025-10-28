import TipTapEditor from "@/app/components/tiptapEditor";
import { getSubtopic } from "@/actions";
import { redirect } from "next/navigation";

export default async function Subtopic({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
	const { id } = await params;
	const subtopic = await getSubtopic(id);

	return (
		<>
			<TipTapEditor content={subtopic.content} title={subtopic.title} ifAddingSubtopic={false} />
			<button onClick={redirect(`/subtopic/${id}/saveSubtopic`)}>Shto nenteme</button>
		</>
	);
}
