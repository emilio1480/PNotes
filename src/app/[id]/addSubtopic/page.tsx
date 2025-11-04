import TipTapEditor from "@/app/components/tiptapEditor";

export default async function SaveSubtopicForm({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
	const { id } = await params;

	return <TipTapEditor title={"Titulli juaj"} id={id} ifAddingSubtopic={true} />;
}
