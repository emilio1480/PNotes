"use server";
import { redirect } from "next/navigation";

export async function getSubtopic(id: string) {
	const res = await fetch(`http://localhost:8080/subtopics/${id}`, {
		cache: "no-store",
	});
	if (!res.ok) {
		console.log("FAILED");
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
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: formData.get("title"),
			content: formData.get("content"),
		}),
	});

	const resData = await res.text();

	redirect(`/${resData}`);
}

export async function updateSubtopic(formData: FormData) {
	const id = formData.get("id");

	await fetch(`http://localhost:8080/subtopics/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "PATCH",
		body: JSON.stringify({
			title: formData.get("title"),
			content: formData.get("content"),
		}),
	});

	redirect(`http://localhost:3000/${id}`);
}

export async function addRootSubtopic(formData: FormData) {
	const res = await fetch(`http://localhost:8080/subtopics`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: formData.get("title"),
			content: formData.get("content"),
		}),
	});

	const resData = await res.text();

	redirect(`/${resData}`);
}

export async function deleteSubtopic(id: string) {
	await fetch(`http://localhost:8080/subtopics/${id}`, {
		method: "DELETE",
	});
}