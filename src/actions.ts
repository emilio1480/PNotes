export async function getInfo(id: string) {
	const res = await fetch(`http://localhost:8080/subheadings/${id}`);
	if (!res.ok) throw new Error("Failed fetching subtopic");
	return res.json();
}

export async function getSubheadings(){
	const res = await fetch("http://localhost:8080/subheadings");
	return res.json()
}