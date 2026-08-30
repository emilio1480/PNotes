import TipTapEditor from "@/app/components/tiptapEditor";
import { getSubtopic } from "@/actions";
import { dummySubtopics } from "@/dummyData";

export default async function Subtopic({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
	const { id } = await params;
	const subtopic = process.env.NODE_ENV === "development" ? dummySubtopics[id] : await getSubtopic(id);

	return (
		<div>
			<TipTapEditor id={id} content={subtopic.content} title={subtopic.title} addingSubtopic={false} />
		</div>
	);
}
