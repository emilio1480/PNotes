import { callSignOut } from "@/actions";

export default function LogoutButton() {
	return (
		<button
			onClick={async () => {
				await callSignOut();
			}}
			className={"z-10 w-max px-4 py-1.5 text-[1.08rem] font-[500] text-gray-700 hover:cursor-pointer hover:text-[#112d5f]"}
		>
			Sign out
		</button>
	);
}
