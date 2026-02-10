import { Quicksand } from "next/font/google";
import "./globals.css";
import SideMenu from "@/app/components/sideMenu";
import { getSubtopics } from "@/actions";
import { ListSubtopic } from "@/types";

const quicksand = Quicksand({ weight: "variable" });

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const subtopics: ListSubtopic[] | null = await getSubtopics();
	console.log(subtopics);

	return (
		<html lang="en" className={"h-full overflow-hidden"}>
			<body className={`${quicksand.className} antialiased flex justify-between`}>
				{subtopics != null && <SideMenu subtopics={subtopics} className={`w-max max-w-2/9`} />}
				<div className={`w-full`}>{children}</div>
			</body>
		</html>
	);
}
