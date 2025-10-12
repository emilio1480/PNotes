import { getSubheadings } from "@/actions";

export default async function Home() {
    const subheadings = await getSubheadings();
    return (
        <p>Main page</p>
    );
}
