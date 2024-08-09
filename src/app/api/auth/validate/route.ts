import User from "@/schemas/User";
import connect from "@/util/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	await connect();

	const { token } = await request.json();

	if (!token) return NextResponse.json({ message: "Missing token" }, { status: 400 });

	const id = token.split(".LNKPW.")[0];
	const password = token.split(".LNKPW.")[1];

	if (!id || !password) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

	return await User.findOne({ id: id, password: password }).then(async (user) => {
		if (!user) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

		return NextResponse.json({ message: "OK" }, { status: 200 });
	});
}
