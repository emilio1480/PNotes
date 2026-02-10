import TipTapEditor from "@/app/components/tiptapEditor";
import { getSubtopic } from "@/actions";

export default async function Subtopic({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
	const { id } = await params;
	const subtopic = await getSubtopic(id);

	return (
		<div>
			<TipTapEditor id={id} content={subtopic.content} title={subtopic.title} addingSubtopic={false} />
		</div>
	);
}
