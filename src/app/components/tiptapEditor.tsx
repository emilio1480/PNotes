"use client";

import {TextStyleKit} from "@tiptap/extension-text-style";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import {addSubtopic, updateSubtopic} from "@/actions";
import {useState} from "react";

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
                    className={'w-full text-center mb-5 text-2xl'}
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
                    type={"hidden"}
                    name={ifAddingSubtopic ? "parentId" : "id"}
                    value={parentId}
                />
                <input
                    className={'bg-gray'}
                    type={"submit"}
                    value={ifAddingSubtopic ? "Shtoni nentemen" : "Siguroni ndryshimet"}
                />
            </form>
        </div>
    );
}
