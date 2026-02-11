"use client"
import {useState} from "react";
import {Menu} from "lucide-react";
import Toolbar from "@/app/components/toolbar";
import LogoutButton from "@/app/components/logoutButton";
import {Editor} from "@tiptap/core";

export default function Navbar({editor}: Readonly<{ editor: Editor }>) {
    const [isToolbarVisible, setIsToolbarVisible] = useState(true);

    return (
        <div className={"flex justify-between mt-1 mb-2"}>
                <button onClick={() => setIsToolbarVisible(!isToolbarVisible)}
                        className="hover:cursor-pointer px-3 py-2  h-1/2 text-gray-700  rounded-md hover:bg-gray-200 transition-colors">
                    <Menu size={24}/>
                </button>
                <div className={"pl-11.5"}>
                    <Toolbar editor={editor} isToolbarVisible={isToolbarVisible}/>
                </div>
            <div>
                <LogoutButton/>
            </div>
        </div>
    )
}