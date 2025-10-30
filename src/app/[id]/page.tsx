import TipTapEditor from "@/app/components/tiptapEditor";
import { getSubtopic } from "@/actions";
import Button from "@/app/[id]/redirectButton";

export default async function Subtopic({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
	const { id } = await params;
	const subtopic = await getSubtopic(id);

	return (
		<div>
			<TipTapEditor parentId={id} content={subtopic.content} title={subtopic.title} ifAddingSubtopic={false} />
			<Button id={id} />
		</div>
	);
}
