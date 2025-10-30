"use client";

import {TextStyleKit} from "@tiptap/extension-text-style";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import {addSubtopic, updateSubtopic} from "@/actions";
import {useState} from "react";
import {Table} from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

const extensions = [
    StarterKit,
    TextStyleKit,
    Table.configure({
        resizable: false,
    }),
    TableRow,
    TableHeader,
    TableCell,
]

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
        content: JSON.parse(content || "{}"),
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none",
            },
        },
    });

    const [newTitle, setNewTitle] = useState(title);

    if (!editor) return null;

    const handleSubmit = async (formData: FormData) => {
        const editorContent = JSON.stringify(editor.getJSON());

        formData.set('content', editorContent);

        if (ifAddingSubtopic) {
            await addSubtopic(formData);
        } else {
            await updateSubtopic(formData);
        }
    };

    return (
        <div>
            <form action={handleSubmit}>
                <Toolbar editor={editor}/>
                <input
                    className={'w-full text-center mb-5 text-2xl focus:outline-none'}
                    type={"text"}
                    name={"title"}
                    onChange={(e) => setNewTitle(e.target.value)}
                    value={newTitle}
                    placeholder={"Vendosni nje titull"}
                />
                <EditorContent editor={editor} className={"max-w-none"}/>
                <input
                    type={"hidden"}
                    name={"content"}
                    value=""
                />
                <input
                    className={"hover:cursor-pointer"}
                    type={"hidden"}
                    name={ifAddingSubtopic ? "parentId" : "id"}
                    value={parentId}
                />
                <input
                    className={"z-10 fixed bottom-4 border-1 rounded-2xl w-42 bg-green-500 text-white hover:bg-green-600 hover:cursor-pointer mx-[50%] -translate-x-1/2"}
                    type={"submit"}
                    value={"Siguroni ndryshimet"}
                />
            </form>

            <div className={"fixed bottom-0 h-15 w-full border-t-1 border-gray-100 bg-white"}/>
        </div>
    );
}
