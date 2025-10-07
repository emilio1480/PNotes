"use client";

import { Editor } from "@tiptap/core";
import Tool from "@/app/components/tool";
import { useEditorState } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";

export default function Toolbar({ editor }: Readonly<{ editor: Editor }>) {
	const levels: Level[] = [1, 2, 3, 4, 5, 6];

	const editorState = useEditorState({
		editor,
		selector: (ctx) => ({
			isBold: ctx.editor.isActive("bold") ?? false,
			canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
			isItalic: ctx.editor.isActive("italic") ?? false,
			canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
			isStrike: ctx.editor.isActive("strike") ?? false,
			canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
			isCode: ctx.editor.isActive("code") ?? false,
			canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
			canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
			isParagraph: ctx.editor.isActive("paragraph") ?? false,
			isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
			isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
			isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
			isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
			isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
			isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
			isBulletList: ctx.editor.isActive("bulletList") ?? false,
			isOrderedList: ctx.editor.isActive("orderedList") ?? false,
			isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
			isBlockquote: ctx.editor.isActive("blockquote") ?? false,
			canUndo: ctx.editor.can().chain().undo().run() ?? false,
			canRedo: ctx.editor.can().chain().redo().run() ?? false,
		}),
	});

	if (!editor) return null;

	return (
		<div className="flex flex-wrap space-x-3 justify-center mb-10">
			<Tool onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editorState.canBold} isActive={editorState.isBold} name="Bold" />
			<Tool onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editorState.canItalic} isActive={editorState.isItalic} name="Italic" />
			<Tool onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editorState.canStrike} isActive={editorState.isStrike} name="Strike" />

			<Tool onClick={() => editor.chain().focus().unsetAllMarks().run()} disabled={!editorState.canClearMarks} isActive={false} name="Clear marks" />
			<Tool onClick={() => editor.chain().focus().clearNodes().run()} disabled={false} isActive={false} name="Clear nodes" />

			<Tool onClick={() => editor.chain().focus().setParagraph().run()} disabled={false} isActive={editorState.isParagraph} name="Paragraph" />

			{levels.map((level) => (
				<Tool key={level} onClick={() => editor.chain().focus().toggleHeading({ level }).run()} disabled={false} isActive={editorState[`isHeading${level}` as keyof typeof editorState]} name={`H${level}`} />
			))}

			<Tool onClick={() => editor.chain().focus().toggleBulletList().run()} disabled={false} isActive={editorState.isBulletList} name="Bullet list" />
			<Tool onClick={() => editor.chain().focus().toggleOrderedList().run()} disabled={false} isActive={editorState.isOrderedList} name="Ordered list" />
			<Tool onClick={() => editor.chain().focus().toggleCodeBlock().run()} disabled={false} isActive={editorState.isCodeBlock} name="Code block" />
			<Tool onClick={() => editor.chain().focus().toggleBlockquote().run()} disabled={false} isActive={editorState.isBlockquote} name="Blockquote" />
			<Tool onClick={() => editor.chain().focus().setHorizontalRule().run()} disabled={false} isActive={false} name="Horizontal rule" />
			<Tool onClick={() => editor.chain().focus().setHardBreak().run()} disabled={false} isActive={false} name="Hard break" />
			<Tool onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo} isActive={false} name="Undo" />
			<Tool onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo} isActive={false} name="Redo" />
		</div>
	);
}
