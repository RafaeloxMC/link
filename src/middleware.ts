import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const isPublicPath = path === "/login" || path === "/register";

    const cookieStore = cookies();
    const token = cookieStore.get("session")?.value;

	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL("/login", request.nextUrl.origin).toString());
	}

    try {
        await axios.post(new URL("/api/auth/validate", request.nextUrl.origin).toString(), { token });
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.status !== 200) {
            return NextResponse.redirect(new URL("/login", request.nextUrl.origin).toString());
        }
    }
}

export const config = {
	matcher: ["/dashboard"],
};
