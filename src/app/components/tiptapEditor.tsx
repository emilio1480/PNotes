"use client";

import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import { addSubtopic, addRootSubtopic, updateSubtopic } from "@/actions";
import { useState } from "react";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import toast, { Toaster } from "react-hot-toast";

const extensions = [
	StarterKit,
	TextStyleKit,
	Table.configure({
		resizable: false,
	}),
	TableRow,
	TableHeader,
	TableCell,
];

export default function TipTapEditor({
	content,
	title,
	parentId,
	ifAddingSubtopic,
}: Readonly<{
	content?: string;
	title?: string;
	parentId: string;
	ifAddingSubtopic?: boolean;
}>) {
	const editor = useEditor({
		extensions,
		content: JSON.parse(content || '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"----- Shkruani ketu -----"}]}]}'),
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "prose prose-md sm:prose lg:prose-lg mx-auto focus:outline-none",
			},
		},
	});

	const [newTitle, setNewTitle] = useState(title);

	if (!editor) return null;

	const handleSubmit = async (formData: FormData) => {
		const editorContent = JSON.stringify(editor.getJSON());

		formData.set("content", editorContent);

		try {
			if (parentId == "null") {
				await addRootSubtopic(formData);
				return;
			}

			if (ifAddingSubtopic) {
				await addSubtopic(formData);
			} else {
				await updateSubtopic(formData);
			}
		}catch (err){
			const error = err as Error;
			if (error.message !== "NEXT_REDIRECT") {
				toast.error(error.message);
			}
		}
	};

	return (
		<div>
			<Toaster/>
			<form action={handleSubmit}>
				<Toolbar editor={editor} />
				<input
					className={"mb-5 w-full text-center text-2xl focus:outline-none"}
					autoComplete={"off"}
					type={"text"}
					name={"title"}
					onChange={(e) => setNewTitle(e.target.value)}
					value={newTitle}
					placeholder={"Vendosni nje titull"}
				/>
				<EditorContent editor={editor} className={"max-w-none"} />
				<input type={"hidden"} name={"content"} value="" />
				<input className={"hover:cursor-pointer"} type={"hidden"} name={ifAddingSubtopic ? "parentId" : "id"} value={parentId} />
				<input
					className={"fixed bottom-4 z-10 ml-[50%] w-40 -translate-x-1/2 rounded-lg bg-yellow-500 font-[500] text-white transition-all ease-out hover:cursor-pointer hover:bg-yellow-600"}
					type={"submit"}
					value={"Siguro ndryshimet"}
				/>
			</form>

			<div className={"fixed bottom-0 h-15 w-full border-t-1 border-gray-100 bg-white"} />
		</div>
	);
}
