"use server";
import { redirect } from "next/navigation";

export async function getSubtopic(id: string) {
		const res = await fetch(`http://localhost:8080/subtopics/${id}`, {
			cache: "no-store",
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message)
		}

		return data;

}

export async function getSubtopics() {
	const res = await fetch("http://localhost:8080/subtopics", {
		cache: "no-store",
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message)
	}

	return data;
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

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message)
	}

	const data = await res.text();

	redirect(`/${data}`);
}

export async function updateSubtopic(formData: FormData) {
	const id = formData.get("id");

	const res = await fetch(`http://localhost:8080/subtopics/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "PATCH",
		body: JSON.stringify({
			title: formData.get("title"),
			content: formData.get("content"),
		}),
	});

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message)
	};
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

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message)
	}

	const data = await res.text();

	redirect(`/${data}`);
}

export async function deleteSubtopic(id: string) {
	const res = await fetch(`http://localhost:8080/subtopics/${id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message)
	}

	redirect("/")
}
