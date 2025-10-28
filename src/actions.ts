export async function getSubtopic(id: string) {
	const res = await fetch(`http://localhost:8080/subtopics/${id}`);
	if (!res.ok) throw new Error("Failed fetching subtopic");
	return res.json();
}

export async function getSubheadings() {
	const res = await fetch("http://localhost:8080/subtopics");
	return res.json();
}
