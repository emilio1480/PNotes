"use client"
import { createContext, useContext } from "react";
import { SetStateAction, useState } from "react";
import {Dispatch} from "preact/compat";

export type contextType = {
    isToolbarVisible: boolean;
    setIsToolbarVisible: Dispatch<SetStateAction<boolean>>,
}

export const ToolContext = createContext<contextType | null>(null);


export default function ToolBarContext({ children }: Readonly<{ children: React.ReactNode }>) {
	const [isToolbarVisible, setIsToolbarVisible] = useState(false);

	return <ToolContext value={{ isToolbarVisible, setIsToolbarVisible }}>{children}</ToolContext>;
}