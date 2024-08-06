"use server";
import { cookies } from "next/headers";

export async function getSession() {
	const session = cookies().get("session")?.value;

	return session || null;
}

export async function isSessionValid() {}
