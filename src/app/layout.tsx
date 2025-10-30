import { Quicksand } from "next/font/google";
import "./globals.css";
import SideMenu from "@/app/components/sideMenu";
import { getSubtopics } from "@/actions";
import { ListSubtopic } from "@/types";

const quicksand = Quicksand({ weight: "variable" });


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const subtopics: ListSubtopic[] = await getSubtopics();

	return (
		<html lang="en">
			<body className={`${quicksand.className} antialiased` }>
				<SideMenu subtopics={subtopics} className={`w-1/6`} />
				<div className={`ml-[16.66%] w-5/6`}>{children}</div>
			</body>
		</html>
	);
}
