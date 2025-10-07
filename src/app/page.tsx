import TiptapEditor from "@/app/components/tiptapEditor";

export default async function Home() {
    const res = await fetch("http://localhost:8080/getAllTitles");
    const titles: string[] = await res.json();

    return (
        <p>main page</p>
    );
}
