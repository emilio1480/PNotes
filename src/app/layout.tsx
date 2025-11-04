import { Quicksand } from "next/font/google";
import "./globals.css";
import SideMenu from "@/app/components/sideMenu";
import { getSubtopics } from "@/actions";
import { ListSubtopic } from "@/types";
import LogoutButton from "@/app/components/logoutButton";

const quicksand = Quicksand({ weight: "variable" });

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const subtopics: ListSubtopic[] | null = await getSubtopics();
	console.log(subtopics);

	return (
		<html lang="en">
			<body className={`${quicksand.className} antialiased`}>
				{subtopics != null && <SideMenu subtopics={subtopics} className={`w-1/6`} />}
				<div className={`${subtopics ? "ml-[16.66%] w-5/6" : "w-full"}`}>{children}</div>
				{subtopics != null && <LogoutButton/>}
			</body>
		</html>
	);
}
