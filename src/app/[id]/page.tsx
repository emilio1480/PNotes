import type { ListSubheading, Subheading } from "@/types";
import TipTapEditor from "@/app/components/tiptapEditor";
import { getInfo, getSubheadings } from "@/actions";

async function generateStaticParams() {
    const data: ListSubheading[] = await getSubheadings();
    return data.map(subheading =>
        ({id: subheading.id.toString()})
    )
}

async function generateMetaData({params}: { params: string }) {
    const subheading:Subheading = await getInfo(params);
    return {title: subheading.title};
}

export default async function Subheading({ params }: Readonly<{ params: string }>) {
	const subheading: Subheading = await getInfo(params);
	return <>
		<TipTapEditor content={subheading.content} />
		{subheading.subheadings.map(subheading => (
			<div key={subheading.id}>{subheading.title}</div>
			))}
		<button>

		</button>
	</>
}