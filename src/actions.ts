"use server";
import { redirect } from "next/navigation";
import { auth } from "./auth";

const API_ORIGIN = process.env.API_ORIGIN!

async function secureRequest(endpoint: string, options: RequestInit = {}) {
	const session = await auth();
try{
	return await fetch(`${API_ORIGIN}${endpoint}`, {
		...options,
		headers: { Authorization: `Bearer ${session?.id_token}`, "Content-Type": "application/json"},
	});
}catch {
	return new Response('"message": "Fetch didn\'t go through"', {status: 500});
	}
}

export async function getSubtopic(id: string) {
	const res = await secureRequest(
		`/subtopics/${id}`,
		{
			cache: "no-store",
		},
	);
	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message);
	}

	return data;
}

export async function getSubtopics() {
	const res = await secureRequest(
		"/subtopics",
		{
			cache: "no-store",
		},
	);

	if (!res.ok) {
		return null;
	}

	return res.json();
}

export async function addSubtopic(formData: FormData) {
	const res = await secureRequest(
		`/subtopics/${formData.get("id")}`,
		{
			method: "POST",
			body: JSON.stringify({
				title: formData.get("title"),
				content: formData.get("content"),
			}),
		},
	);

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message);
	}

	const data = await res.text();

	redirect(`/${data}`);
}

export async function updateSubtopic(formData: FormData) {
	const id = formData.get("id");

	const res = await secureRequest(
		`/subtopics/${id}`,
		{
			method: "PATCH",
			body: JSON.stringify({
				title: formData.get("title"),
				content: formData.get("content"),
			}),
		}
	);

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message);
	}
}

export async function addRootSubtopic(formData: FormData) {
	const res = await secureRequest(
		`/subtopics`,
		{
			method: "POST",
			body: JSON.stringify({
				title: formData.get("title"),
				content: formData.get("content"),
			}),
		},
	);

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message);
	}
	const data = await res.text();

	redirect(`/${data}`);
}

export async function deleteSubtopic(id: string) {
	const res = await secureRequest(
		`/subtopics/${id}`,
		{
			method: "DELETE",
		},
	);

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message);
	}
	redirect("/");
}
