import { redirect } from "next/navigation";

export async function getSubtopic(id: string) {
	const res = await fetch(`http://localhost:8080/subtopics/${id}`, {
		cache: "no-store",
	});
	if (!res.ok) throw new Error("Failed fetching subtopic");
	return res.json();
}

export async function getSubtopics() {
	const res = await fetch("http://localhost:8080/subtopics", {
		cache: "no-store",
	});
	return res.json();
}

export async function addSubtopic(formData: FormData) {
	const res = await fetch(`http://localhost:8080/subtopics/${formData.get("parentId")}`, {
		method: "POST",
		body: formData.get("content"),
	});

	if (!res.ok) throw new Error("Failed to update subtopic");

	const newId = await res.json();

	redirect(`/subtopics/${newId}`);
}

export async function updateSubtopic(formData: FormData) {
	const res = await fetch(`http://localhost:8080/subtopics/${formData.get("id")}`, {
		method: "PATCH",
		body: formData.get("content"),
	});

	if (!res.ok) throw new Error("Failed to update subtopic");

	redirect(`http://localhost:8080/subtopics/${formData.get("id")}`);
}
