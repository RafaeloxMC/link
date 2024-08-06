import User from "@/schemas/User";
import connect from "@/util/database";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	await connect();

	const { token } = await request.json();

	if (!token) return NextResponse.json({ message: "Missing token" }, { status: 400 });

	const username = token.split(".LNKPW.")[0];
	const password = token.split(".LNKPW.")[1];

	if (!username || !password) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

	return await User.findOne({ name: username, password: password }).then(async (user) => {
		if (!user) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

		return NextResponse.json({ message: "OK" }, { status: 200 });
	});
}
