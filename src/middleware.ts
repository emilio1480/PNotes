export {auth as middleware} from "./auth"

export const config = {
	matcher: [
		/*
		 * Exclude:
		 * - auth routes
		 * - static files
		 * - images
		 */
		"/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
	],
};