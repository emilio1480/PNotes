import type { ListSubheading, Subheading } from "@/types";
import TipTapEditor from "@/app/components/tiptapEditor";
import { getInfo, getSubheadings } from "@/actions";

async function generateStaticParams() {
	const data: ListSubheading[] = await getSubheadings();
	return data.map((subheading) => ({ id: subheading.id.toString() }));
}

async function generateMetaData({ params }: { params: string }) {
	const subheading: Subheading = await getInfo(params);
	return { title: subheading.title };
}

export default async function Subheading({ params }: Readonly<{ params: Promise<{ id:string }> }>) {
	const { id } = await params;

	const subheading: Subheading = await getInfo(id);
	return (
		<>
			<TipTapEditor content={subheading.content} />
			<button></button>
		</>
	);
}
