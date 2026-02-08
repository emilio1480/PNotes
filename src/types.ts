import "next-auth/jwt"
import { DefaultSession } from "next-auth";
export interface Tool {
    name: string;
    onClick: () => void;
    isActive: boolean;
    disabled: boolean;
}

export interface Subtopic {
    title: string;
    content: string;
}

export interface ListSubtopic {
	id: number;
	title: string;
	parentId: number | null;
}

export interface User{
	username:string,
	password:string,
}

declare module "next-auth" {
	interface Session extends DefaultSession{
		id_token?: string;
		error?: "RefreshTokenError";
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id_token?: string;
		access_token?: string;
		expires_at?: number;
		refresh_token?: string;
		error?: "RefreshTokenError";
	}
}