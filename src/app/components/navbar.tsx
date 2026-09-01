"use client"
import { useContext} from "react";
import {Menu} from "lucide-react";
import Toolbar from "@/app/components/toolbar";
import LogoutButton from "@/app/components/logoutButton";
import {Editor} from "@tiptap/core";
import { ToolContext } from "@/app/components/toolBarContext";

export default function Navbar({editor}: Readonly<{ editor: Editor }>) {
    const { isToolbarVisible, setIsToolbarVisible } = useContext(ToolContext)!;

    return (
        <div className="sticky top-0 z-20 mb-3 flex flex-wrap items-start justify-between gap-2 px-2 py-1 backdrop-blur md:static bg-transparent shadow-none">
                <button onClick={() => setIsToolbarVisible(!isToolbarVisible)}
                        className="hidden md:block h-10 flex-shrink-0 rounded-md px-3 py-2 text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-200">
                    <Menu size={24}/>
                </button>
                <div className="min-w-0 flex-1 md:px-4">
                    <Toolbar editor={editor} isToolbarVisible={isToolbarVisible}/>
                </div>
            <div className="hidden flex-shrink-0 md:block">
                <LogoutButton/>
            </div>
        </div>
    )
}
