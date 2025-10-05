"use client";

import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";

const extensions = [TextStyleKit, StarterKit];

export default function TipTapEditor() {
	const editor = useEditor({
		extensions,
		content: `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work! 👏
  <br />
  — Tiptap
</blockquote>
`,
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none",
			},
		},
	});
	return (
		<div>
			{editor ? <Toolbar editor={editor} /> : null}
			<EditorContent editor={editor} className={"max-w-none"} />
		</div>
	);
}
