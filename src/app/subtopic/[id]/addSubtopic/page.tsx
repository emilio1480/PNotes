import TipTapEditor from "@/app/components/tiptapEditor";

export default async function SaveSubtopicForm({ params }: Readonly<{ params: Promise<{ parentId: string }> }>) {
	const { parentId } = await params;

	return <TipTapEditor content={"Shkruani ketu"} title={"Titulli juaj"} parentId={parentId} ifAddingSubtopic={true} />;
}
