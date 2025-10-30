'use client'
import { redirect } from "next/navigation";

export default function Button({ id }: Readonly<{ id: string }>) {
	return <button onClick={() => redirect(`/${id}/addSubtopic`)}>Shto nenteme</button>;
}