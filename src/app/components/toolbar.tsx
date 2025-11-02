"use client";

import { Editor } from "@tiptap/core";
import Tool from "@/app/components/tool";
import { useEditorState } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";

export default function Toolbar({ editor }: Readonly<{ editor: Editor }>) {
	const editorState = useEditorState({
		editor,
		selector: (ctx) => ({
			isFocused: ctx.editor.isFocused ?? false,
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
			isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
			isBulletList: ctx.editor.isActive("bulletList") ?? false,
			isOrderedList: ctx.editor.isActive("orderedList") ?? false,
			isBlockquote: ctx.editor.isActive("blockquote") ?? false,
			isTable: ctx.editor.isActive("table") ?? false,
			canUndo: ctx.editor.can().chain().undo().run() ?? false,
			canRedo: ctx.editor.can().chain().redo().run() ?? false,
		}),
	});

	if (!editor) return null;

	return (
		<div className={`ease-in-out1 mb-6 border-b border-gray-100 pb-4 transition-all duration-300 pt-2`}>
			<div className="mb-4 flex flex-wrap justify-center gap-2">
				<Tool onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editorState.canBold} isActive={editorState.isBold} name="Bold" />
				<Tool onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editorState.canItalic} isActive={editorState.isItalic} name="Italic" />
				<Tool onClick={() => editor.chain().focus().unsetAllMarks().run()} disabled={!editorState.canClearMarks} isActive={false} name="Reset" />

				<Tool onClick={() => editor.chain().focus().setParagraph().run()} disabled={false} isActive={editorState.isParagraph} name="Paragraf" />
				<Tool key={3} onClick={() => editor.chain().focus().toggleHeading({level:3}).run()} disabled={false} isActive={editorState[`isHeading3` as keyof typeof editorState]} name={`Nentitull`} />

				<Tool onClick={() => editor.chain().focus().toggleBulletList().run()} disabled={false} isActive={editorState.isBulletList} name="List e parenditur" />
				<Tool onClick={() => editor.chain().focus().toggleOrderedList().run()} disabled={false} isActive={editorState.isOrderedList} name="List e renditur" />
				<Tool onClick={() => editor.chain().focus().toggleBlockquote().run()} disabled={false} isActive={editorState.isBlockquote} name="Citim" />
				<Tool onClick={() => editor.chain().focus().setHorizontalRule().run()} disabled={false} isActive={false} name="Ndarje horizontale" />
			</div>

			{/* Table Operations */}
			<div className="mb-4 flex flex-wrap justify-center gap-2">
				<Tool onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} disabled={false} isActive={false} name="Shto tabelë" />
				{editorState.isTable && (
					<><Tool onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={false} isActive={false} name="Shto kolonë para" />
						<Tool onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={false} isActive={false} name="Shto kolonë pas" />
						<Tool onClick={() => editor.chain().focus().deleteColumn().run()} disabled={false} isActive={false} name="Fshi kolonën" />
						<Tool onClick={() => editor.chain().focus().addRowBefore().run()} disabled={false} isActive={false} name="Shto rresht para" />
						<Tool onClick={() => editor.chain().focus().addRowAfter().run()} disabled={false} isActive={false} name="Shto rresht pas" />
						<Tool onClick={() => editor.chain().focus().deleteRow().run()} disabled={false} isActive={false} name="Fshi rreshtin" />
						<Tool onClick={() => editor.chain().focus().deleteTable().run()} disabled={false} isActive={false} name="Fshi tabelën" />
						<Tool onClick={() => editor.chain().focus().mergeCells().run()} disabled={false} isActive={false} name="Bashko qelizat" />
						<Tool onClick={() => editor.chain().focus().splitCell().run()} disabled={false} isActive={false} name="Ndaj qelizën" />
						<Tool onClick={() => editor.chain().focus().toggleHeaderColumn().run()} disabled={false} isActive={false} name="Thekso kolonën e parë" />
						<Tool onClick={() => editor.chain().focus().toggleHeaderRow().run()} disabled={false} isActive={false} name="Thekso rreshtin e parë" />
						<Tool onClick={() => editor.chain().focus().toggleHeaderCell().run()} disabled={false} isActive={false} name="Thekso qelizën" />
					</>
				)}
			</div>

			{/* Undo/Redo */}
			<div className="flex flex-wrap justify-center gap-2">
				<Tool onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo} isActive={false} name="Zhbëj" />
				<Tool onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo} isActive={false} name="Ribëj" />
			</div>
		</div>
	);
}
