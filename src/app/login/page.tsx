"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
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
			const res = await fetch("http://localhost:8080/login", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: new URLSearchParams({ username, password }),
				credentials: "include", // very important for JSESSIONID cookie
			});

			if (res.ok) {
				router.push("/");
			} else {
				alert("Vendosni te dhenat e sakta")
				setError("Invalid username or password");
			}
		} catch (err) {
			console.error(err);
			alert("Ju lutem vendosni te dhenat e sakta");
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
				<h1 className="mb-6 text-center text-2xl font-bold text-gray-700">Login</h1>

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

				<button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-60">
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
		</div>
	);
}
