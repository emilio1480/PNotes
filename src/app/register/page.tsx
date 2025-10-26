"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const res = await fetch("http://localhost:8080/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			if (res.ok) {
				router.push("/login");
			} else {
				const err = await res.text();
				setError(err || "Registration failed");
			}
		} catch (err) {
			console.error(err);
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
				<h1 className="mb-6 text-center text-2xl font-bold text-gray-700">Register</h1>

				{error && <div className="mb-4 rounded bg-red-100 p-2 text-red-700">{error}</div>}

				<div className="mb-4">
					<label className="mb-1 block text-gray-600" htmlFor="username">
						Username
					</label>
					<input
						id="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
					/>
				</div>

				<div className="mb-6">
					<label className="mb-1 block text-gray-600" htmlFor="password">
						Password
					</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
					/>
				</div>

				<button type="submit" disabled={loading} className="w-full rounded-lg bg-green-600 py-2 text-white transition hover:bg-green-700 disabled:opacity-60">
					{loading ? "Registering..." : "Register"}
				</button>

				<p className="mt-4 text-center text-sm text-gray-600">
					Already have an account?{" "}
					<a href="/login" className="text-blue-600 hover:underline">
						Login
					</a>
				</p>
			</form>
		</div>
	);
}
