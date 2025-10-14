import { Quicksand } from "next/font/google";
import "./globals.css";
import SideMenu from "@/app/components/sideMenu";

const quicksand = Quicksand({ weight: "variable" });

const sideMenuWidth = 64;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${quicksand.className} antialiased`}>
				<SideMenu className={`w-${sideMenuWidth}`} />
				<div className={`ml-${sideMenuWidth}`}>{children}</div>
			</body>
		</html>
	);
}
