import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const cookieStorage = cookies();

	cookieStorage.delete("session");

	return NextResponse.json({ message: "OK" }, { status: 200 });
}
