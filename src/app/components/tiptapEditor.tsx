"use client";

import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { addSubtopic, addRootSubtopic, updateSubtopic } from "@/actions";
import { useState } from "react";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { toast, Toaster } from "sonner";
import ActionButtons from "@/app/components/actionButtons";
import Navbar from "@/app/components/navbar";

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
	id,
	addingSubtopic,
}: Readonly<{
	content?: string;
	title?: string;
	id: string;
	addingSubtopic?: boolean;
}>) {
	const editor = useEditor({
		extensions,
		content: JSON.parse(content || '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Write here"}]}]}'),
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
			if (id == "null") {
				await addRootSubtopic(formData);
				return;
			}

			if (addingSubtopic) {
				await addSubtopic(formData);
			} else {
				await updateSubtopic(formData);
				toast.success("Changes saved", {duration: 2000});
			}
		} catch (err) {
			const error = err as Error;
			throw new Error(error.message);
		}
	};

	return (
		<div className="min-h-svh pb-24 md:pb-0">
			<Toaster expand={false} visibleToasts={1} />
			<Navbar editor={editor} />
			<form action={handleSubmit} className="min-w-0">
				<input
					className="mb-4 w-full px-4 text-center text-2xl leading-tight break-words focus:outline-none sm:text-3xl"
					autoComplete={"off"}
					name={"title"}
					onChange={(e) => setNewTitle(e.target.value)}
					value={newTitle}
					placeholder={"Add a title"}
				/>
				<div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
					<div className="min-w-0 overflow-x-auto pb-6">
						<EditorContent editor={editor} className="max-w-none" placeholder={"Type here"} />
					</div>
				</div>
				<input type={"hidden"} name={"content"} value="" />
				<input type={"hidden"} name={"id"} value={id} />
				<input type={"hidden"} name={"ifAddingSubtopic"} value={`${addingSubtopic}`} />

				<ActionButtons id={id} addingSubtopic={addingSubtopic} />
			</form>
		</div>
	);
}
