import { callSignOut } from "@/actions";

export default function LogoutButton() {
	return (
		<button
			onClick={async () => {
				await callSignOut();
			}}
			className={"hover:text-quaternary z-10 w-max px-4 py-1.5 text-[1.08rem] font-[500] text-gray-700 hover:cursor-pointer"}
		>
			Sign out
		</button>
	);
}
