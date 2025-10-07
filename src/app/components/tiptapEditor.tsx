"use client";

import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";

const extensions = [TextStyleKit, StarterKit];

export default function TipTapEditor({content}: {content: string}) {
	const editor = useEditor({
		extensions,
		content: JSON.parse(content),
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none",
			},
		},
	});

    if(!editor) return null;

	return (
		<div>
			<Toolbar editor={editor} />
			<EditorContent editor={editor} className={"max-w-none"} />
		</div>
	);
}
