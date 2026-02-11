import { signIn, providerMap } from "@/auth";

export default async function SignInPage(
	props: Readonly<{
		searchParams?: Promise<{
			callbackUrl?: string;
		}>;
	}>
) {

	const searchParams = await props.searchParams;
	const callbackUrl = searchParams?.callbackUrl || "/";

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
			<div className="w-full max-w-md">
				{/* Logo / Brand */}
				<div className="mb-8 text-center">
					<h1 className="mb-2 text-5xl font-bold tracking-tight text-gray-900">PNotes</h1>
					<p className="text-sm text-gray-500">Your thoughts, beautifully organized</p>
				</div>

				<div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
					<div className="mb-6">
						<h2 className="mb-1 text-2xl font-semibold text-gray-900">Welcome back</h2>
						<p className="text-sm text-gray-500">Sign in to continue to your notes</p>
					</div>

					<div className="flex flex-col gap-3">
						{Object.values(providerMap).map((provider) => (
							<form
								key={provider.id}
								action={async () => {
									"use server";
									await signIn(provider.id, {
										redirectTo: callbackUrl ?? "",
									});
								}}
							>
								<button
									type="submit"
									className="bg-secondary flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:cursor-pointer hover:bg-[#2360b0] focus:ring-2 focus:outline-none"
								>
									Sign in with {provider.name}
								</button>
							</form>
						))}
					</div>

					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-200" />
						</div>
						<div className="relative flex justify-center text-xs">
							<span className="bg-white px-4 text-gray-400">Secure authentication</span>
						</div>
					</div>

					<p className="text-center text-xs text-gray-400">By signing in, you agree to our Terms of Service and Privacy Policy</p>
				</div>
			</div>
		</div>
	);
}
