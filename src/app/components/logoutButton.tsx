"use client";
import { authService } from "@/authService";

export default function LogoutButton() {
	return (
		<button
			onClick={() => authService.logout()}
			className={"fixed top-4 right-2 z-10 w-25 rounded-lg bg-red-400 font-[500] text-white transition-all ease-out hover:cursor-pointer hover:bg-red-500"}
		>
			Log out
		</button>
	);
}
