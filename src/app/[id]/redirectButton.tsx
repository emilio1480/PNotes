'use client'
import { redirect } from "next/navigation";

export default function Button({ id }: Readonly<{ id: string }>) {
	return <button className={"border-1 z-10 fixed bottom-4 left-0 rounded-2xl w-35 bg-blue-400 text-white hover:bg-blue-500 hover:cursor-pointer mx-[50%] -translate-x-1/2"} onClick={() => redirect(`/${id}/addSubtopic`)}>Shtoni nenteme</button>;
}