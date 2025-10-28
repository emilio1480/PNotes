"use client";

import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import { addSubtopic, updateSubtopic } from "@/actions";

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

	if (!editor) return null;

	return (
		<div>
			<form action={ifAddingSubtopic ? addSubtopic : updateSubtopic}>
				<Toolbar editor={editor} />
				<input type={"text"} name={"title"} value={title} placeholder={"Vendosni nje titull"} />
				<EditorContent editor={editor} className={"max-w-none"} />
				<input type={"text"} name={"content"} value={JSON.stringify(editor.getJSON())} hidden={true} />
				<input type={"text"} name={ifAddingSubtopic ? "parentId" : "id"} value={parentId} hidden={true} />
				<input type={"submit"} name={"Submit"} placeholder={ifAddingSubtopic ? "Shtoni nentement" : "Siguroni ndryshimet"} />
			</form>
		</div>
	);
}
