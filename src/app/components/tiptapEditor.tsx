"use client";

import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import { addSubtopic, updateSubtopic } from "@/actions";
import { useState } from "react";

const extensions = [TextStyleKit, StarterKit];

export default function TipTapEditor({
	content,
	title,
	parentId,
	ifAddingSubtopic,
}: Readonly<{
	content?: string;
	title?: string;
	parentId?: string;
	ifAddingSubtopic?: boolean;
}>) {
	const editor = useEditor({
		extensions,
		content: JSON.parse(content || ""),
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none",
			},
		},
	});

	const [newTitle, setNewTitle] = useState(title);
	const [newContent, setNewContent] = useState(content);

	if (!editor) return null;

	return (
		<div>
			<form action={ifAddingSubtopic ? addSubtopic : updateSubtopic}>
				<Toolbar editor={editor} />
				<input className={'w-full text-center mb-5 text-2xl'} type={"textarea"} name={"title"} onChange={(e) => setNewTitle(e.target.value)} value={newTitle} placeholder={"Vendosni nje titull"} />
				<EditorContent editor={editor} className={"max-w-none"} />
				<input type={"text"} name={"content"} onChange={() => setNewContent(JSON.stringify(editor.getJSON()))} value={newContent} hidden={true} />
				<input type={"text"} name={ifAddingSubtopic ? "parentId" : "id"} value={parentId} hidden={true} />
				<input className={'bg-gray'} type={"submit"} name={"Submit"} value={ifAddingSubtopic ? "Shtoni nentement" : "Siguroni ndryshimet"} />
			</form>
		</div>
	);
}
