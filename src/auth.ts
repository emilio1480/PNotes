import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { Provider } from "next-auth/providers";


const providers: Provider[] = [Google({ authorization: { params: { access_type: "offline", prompt: "consent" } } })];

export const providerMap = providers
	.map((provider) => {
		if (typeof provider === "function") {
			const providerData = provider()
			return { id: providerData.id, name: providerData.name }
		} else {
			return { id: provider.id, name: provider.name }
		}
	})
	.filter((provider) => provider.id !== "credentials")

export const { handlers, signIn, signOut, auth } = NextAuth({
	basePath: "/api/auth",
	providers: providers,
	trustHost: true,
	pages: {
		signIn: "/signIn"
	},
	callbacks: {
		authorized: async ({ auth }) => {
			// Logged in users are authenticated, otherwise redirect to login page
			return !!auth;
		},
		jwt: async({ token, account }) => {
			if(account){
				return {
					...token,
					access_token: account.access_token,
					id_token: account.id_token,
					expires_at: account.expires_at,
					refresh_token: account.refresh_token
				}
			}else if(Date.now() < token.expires_at! * 1000){
				return token;
			}else{
				if(!token.refresh_token) throw new TypeError("Missing refresh_token");

				try {
					const response = await fetch("https://oauth2.googleapis.com/token", {
						method: "POST",
						body: new URLSearchParams({
							client_id: process.env.AUTH_GOOGLE_ID!,
							client_secret: process.env.AUTH_GOOGLE_SECRET!,
							grant_type: "refresh_token",
							refresh_token: token.refresh_token,
						}),
					});

					const tokensOrError = await response.json();

					if (!response.ok) throw tokensOrError;

					const newTokens = tokensOrError as {
						access_token: string;
						id_token: string;
						expires_in: number;
						refresh_token?: string;
					};

					return {
						...token,
						access_token: newTokens.access_token,
						id_token: newTokens.id_token,
						expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
						refresh_token: newTokens.refresh_token ? newTokens.refresh_token : token.refresh_token,
					};
				} catch (error) {
					console.error("Error refreshing access_token", error);
					// If we fail to refresh the token, return an error so we can handle it on the page
					token.error = "RefreshTokenError";
					return token;
				}
			}
		},
		session: async({session, token}) => {
			return {...session, id_token: token.id_token, error: token.error}
		}
	},
});