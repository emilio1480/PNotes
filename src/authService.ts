import { User } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

class AuthService {
	async login(user: User) {
		const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (!res.ok) {
			throw new Error(`Could not login user`);
		}

		return await res.json();
	}

	async logout(): Promise<void> {
		const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			throw new Error(`Could not logout user`);
		}
	}

	async getCurrentUser(): Promise<User | null> {
		try {
			const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
				method: "GET",
				credentials: "include", // Sends JSESSIONID cookie
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				return null;
			}

			return await response.json();
		} catch (error) {
			console.error("Failed to get current user:", error);
			return null;
		}
	}

	async apiRequest(endpoint: string, options: RequestInit = {}, sessionId?:string): Promise<Response> {
		const headers: HeadersInit = {
			"Content-Type": "application/json",
			...(options.headers || {}),
		};

		try {
			const response = await fetch(`${API_BASE_URL}${endpoint}`, {
				...options,
				credentials: "include",
				headers: {
					'Cookie': `JSESSIONID=${sessionId}`,
					'Accept': 'application/json',
					...headers
				},
			});
			if(!response.ok){
				return new Response(null,{status: response.status});
			}
			return response;
		}catch{
			return new Response(null,{status: 500});
		}
	}
}

export const authService = new AuthService();
