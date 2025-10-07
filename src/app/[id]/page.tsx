import type {Subtopic} from "@/types";
import TipTapEditor from "@/app/components/tiptapEditor";

async function generateStaticParams() {
    const res = await fetch("http://localhost:8080/getAllId");
    const data: number[] = await res.json();
    return data.map((id) =>
        ({id: id.toString()})
    )
}

async function getInfo(id: string) {
    const res = await fetch(`http://localhost:8080/${id}`);
    if (!res.ok) throw new Error("Failed fetching subtopic");
    return res.json();
}

async function generateMetaData({params}: { params: string }) {
    const subtopic:Subtopic = await getInfo(params);
    return {title: subtopic.title};
}

export default async function Subtopic({params}: { params: string }) {
    const subtopic:Subtopic = await getInfo(params);
    return (
        <TipTapEditor content={subtopic.content}/>
    )
}