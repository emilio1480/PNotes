import { redirect } from "next/navigation";

export async function getInfo(id: string) {
	const res = await fetch(`http://localhost:8080/subtopics/${id}`);
	if (!res.ok) throw new Error("Failed fetching subtopic");
	return res.json();
}

export async function getSubheadings() {
	const res = await fetch("http://localhost:8080/subtopics");
	return res.json();
}

export async function checkAuth() {
	const res = await fetch("http://localhost:8080/is-authenticated", {
		credentials: "include",
	});

	const authenticated: boolean = await res.json();

	if (!authenticated) {
		redirect("/login");
	}
}
