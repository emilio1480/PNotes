"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { authService } from "@/authService";

export async function getSubtopic(id: string) {
	const cookieStore = await cookies();
	const cookie = cookieStore.get("JSESSIONID");

	const res = await authService.apiRequest(
		`/subtopics/${id}`,
		{
			cache: "no-store",
		},
		cookie?.value
	);

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message);
	}

	return data;
}

export async function getSubtopics() {
	const cookieStore = await cookies();
	const cookie = cookieStore.get("JSESSIONID");
	const res = await authService.apiRequest(
		"/subtopics",
		{
			cache: "no-store",
		},
		cookie?.value
	);

	if (!res.ok) {
		return null;
	}

	return res.json();
}

export async function addSubtopic(formData: FormData) {
	const cookieStore = await cookies();
	const cookie = cookieStore.get("JSESSIONID");
	const res = await authService.apiRequest(
		`/subtopics/${formData.get("id")}`,
		{
			method: "POST",
			body: JSON.stringify({
				title: formData.get("title"),
				content: formData.get("content"),
			}),
		},
		cookie?.value
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

	const cookieStore = await cookies();
	const cookie = cookieStore.get("JSESSIONID");
	const res = await authService.apiRequest(
		`/subtopics/${id}`,
		{
			method: "PATCH",
			body: JSON.stringify({
				title: formData.get("title"),
				content: formData.get("content"),
			}),
		},
		cookie?.value
	);

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message);
	}
}

export async function addRootSubtopic(formData: FormData) {
	const cookieStore = await cookies();
	const cookie = cookieStore.get("JSESSIONID");
	const res = await authService.apiRequest(
		`/subtopics`,
		{
			method: "POST",
			body: JSON.stringify({
				title: formData.get("title"),
				content: formData.get("content"),
			}),
		},
		cookie?.value
	);

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message);
	}
	const data = await res.text();

	redirect(`/${data}`);
}

export async function deleteSubtopic(id: string) {
	const cookieStore = await cookies();
	const cookie = cookieStore.get("JSESSIONID");
	const res = await authService.apiRequest(
		`/subtopics/${id}`,
		{
			method: "DELETE",
		},
		cookie?.value
	);

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message);
	}
	redirect("/");
}
