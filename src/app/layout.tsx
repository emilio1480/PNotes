import { Quicksand } from "next/font/google";
import "./globals.css";
import SideMenu from "@/app/components/sideMenu";
import { getSubtopics } from "@/actions";
import { ListSubtopic } from "@/types";
import { dummyListSubtopics } from "@/dummyData";

const quicksand = Quicksand({ weight: "variable", subsets: ["latin"] });

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

	const subtopics: ListSubtopic[] | null = process.env.NODE_ENV == "development" ? dummyListSubtopics : await getSubtopics();

	return (
		<html lang="en" className={"min-h-full"}>
			<body className={`${quicksand.className} min-h-svh antialiased`}>
				<div className="flex min-h-svh flex-col md:flex-row">
					{subtopics != null && <SideMenu subtopics={subtopics} className="md:w-72 md:max-w-[32vw] md:flex-shrink-0" />}
					<main className="min-w-0 flex-1">{children}</main>
				</div>
			</body>
		</html>
	);
}
