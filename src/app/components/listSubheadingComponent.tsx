'use client'

import type {ListSubheading} from "@/types";
import React from "react";
import DropdownButton from "@/app/components/dropdownButton";

function handleTitleClick(id: number) {
    // In Next.js, you would use: router.push(`/subtopic/${id}`)
    console.log(`Navigating to /subtopic/${id}`);
    window.location.hash = `subtopic/${id}`;
}

export default function ListSubheadingComponent({depth,hasKids,isExpanded, listSubheading}: {depth: number; hasKids: boolean; isExpanded: boolean, listSubheading:ListSubheading}) {
    return (
        <div className={`flex items-center gap-2 p-2 hover:bg-gray-200 rounded cursor-pointer transition-color`} style={{paddingLeft: `${depth * 1.5 + 0.5}rem`}}>
            <DropdownButton hasKids={hasKids} isExpanded={isExpanded}/>
            <span className={`${hasKids ? 'font-medium' : ''} text-gray-800`} onClick={() => handleTitleClick(listSubheading.id)}>{listSubheading.title}</span>
        </div>
    )
}