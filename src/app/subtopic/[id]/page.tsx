import TipTapEditor from "@/app/components/tiptapEditor";
import { getSubtopic } from "@/actions";

export default async function Subheading({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
	const { id } = await params;
	const subtopic = await getSubtopic(id);

	return (
		<>
			<TipTapEditor content={subtopic.content} />
			<button></button>
		</>
	);
}
