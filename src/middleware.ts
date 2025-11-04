// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const PUBLIC_ROUTES = ['/login', '/register'];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isPublicRoute = PUBLIC_ROUTES.some(route =>
		pathname.startsWith(route)
	);

	if (isPublicRoute) {
		return NextResponse.next();
	}

	const sessionCookie = request.cookies.get('JSESSIONID');

	if (!sessionCookie) {
		// No session cookie, redirect to login
		const loginUrl = new URL('/login', request.url);
		loginUrl.searchParams.set('callbackUrl', pathname);
		return NextResponse.redirect(loginUrl);
	}

	try {
		const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Cookie': `JSESSIONID=${sessionCookie.value}`,
				// Forward other relevant cookies if needed
				'Accept': 'application/json',
			},
		});

		if (!response.ok) {
			// Session is invalid or expired
			const loginUrl = new URL('/login', request.url);
			loginUrl.searchParams.set('callbackUrl', pathname);
			loginUrl.searchParams.set('error', 'session_expired');
			return NextResponse.redirect(loginUrl);
		}

	} catch (error) {
		console.error('Authentication check failed:', error);
		// On error, redirect to login
		const loginUrl = new URL('/login', request.url);
		loginUrl.searchParams.set('callbackUrl', pathname);
		loginUrl.searchParams.set('error', 'auth_failed');
		return NextResponse.redirect(loginUrl);
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public files (public folder)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
	],
};