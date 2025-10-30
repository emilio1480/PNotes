"use server";
import { redirect } from "next/navigation";

export async function getSubtopic(id: string) {
	const res = await fetch(`http://localhost:8080/subtopics/${id}`, {
		cache: "no-store",
	});
	if (!res.ok) {
		alert("Failed fetching subtopics");
		return;
	}
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
		body: JSON.stringify({
			title: formData.get("title"),
			content: formData.get("content"),
		}),
	});

	const resData = await res.json();

	if (!res.ok) {
		alert(resData.message);
	}

	const newId = resData;

	redirect(`/subtopics/${newId}`);
}

export async function updateSubtopic(formData: FormData) {
	const res = await fetch(`http://localhost:8080/subtopics/${formData.get("id")}`, {
		method: "PATCH",
		body: JSON.stringify({
			title: formData.get("title"),
			content: formData.get("content"),
		}),
	});

	const resData = await res.json();

	if (!res.ok) {
		alert(resData.message);
	}

	redirect(`http://localhost:8080/subtopics/${formData.get("id")}`);
}