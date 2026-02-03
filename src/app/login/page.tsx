import { signIn, signOut } from "@/auth"

export default function LoginForm() {
	return (
		<>
		<form
			action={async () => {
				"use server"
				await signIn()
			}}
		>
			<button type="submit">Sign in</button>
		</form>
	<form
		action={async () => {
			"use server"
			await signOut()
		}}
	>
		<button type="submit">Sign Out</button>
	</form>
		</>
	)
}