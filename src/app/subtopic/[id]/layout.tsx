"use client";
import { useEffect } from "react";
import { checkAuth } from "@/actions";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	useEffect(() => {
		checkAuth();
	});
	return (
		<>
			{ children }
		</>
	);
}
