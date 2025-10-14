import {ChevronDown, ChevronRight} from "lucide-react";
import React from "react";

export default function DropdownButton({hasKids, isExpanded}: {hasKids: boolean, isExpanded: boolean}) {
    return (
     <>
        {hasKids ? (
            <button className="flex-shrink-0 w-5 h-5 flex items-center justify-center cursor-pointer">
                {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-600"/>
                ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600"/>
                )}
            </button>
        ) : (
            <div className="w-5 h-5 flex-shrink-0"/>
        )}
    </>
    )
}