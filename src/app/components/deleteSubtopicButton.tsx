"use client";

import {toast} from "react-hot-toast";
import {deleteSubtopic} from "@/actions";
import {Delete, Trash} from "lucide-react";

export default function DeleteSubtopicButton({id}: Readonly<{ id: string }>) {
    const handleClick = () => {
        // Show a custom toast asking for confirmation
        toast.custom((t) => (
            <div className="flex flex-col gap-3 rounded-lg bg-white p-4 text-black shadow-lg">
                <p className="font-medium">Proceed with deletion?</p>
                <div className="flex justify-end gap-2">
                    <button type={"button"} onClick={() => toast.dismiss(t.id)}
                            className="rounded-md border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100">
                        No
                    </button>
                    <button type={"button"}
                            onClick={async () => {
                                toast.dismiss(t.id);
                                await deleteSubtopic(id);
                            }}
                            className="rounded-md bg-red-700 px-3 py-1 text-white hover:bg-red-800"
                    >
                        Yes
                    </button>
                </div>
            </div>
        ),{duration: Infinity, });
    };

    return (
        <button type={"button"}
                className={"z-10 w-max rounded-lg bg-gray-300 p-2 text-gray-700 font-[500]  transition-all ease-out hover:text-gray-100 hover:cursor-pointer hover:bg-gray-600"}
                onClick={handleClick}>
            <Trash/>
        </button>
    );
}
