import User from "@/schemas/User";
import dbConnect from "@/util/database";
import { hash } from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	await dbConnect();

	const { name, password } = await request.json();

	if (!name || !password) {
		return NextResponse.json({ message: "Missing email or password" }, { status: 405 });
	}

	const hashedPassword = await hash(password, 5);

	return await User.findOne({ name: name }).then(async (user) => {
		if (user) {
			return NextResponse.json({ message: "User already exists" }, { status: 400 });
		}

		return await User.create({ name: name, password: hashedPassword }).then(async (user) => {
			const res = NextResponse.json({ message: "OK" }, { status: 200 });

			const cookieStore = cookies();
			const hashedUser = name + ".LNKPW." + hashedPassword;

			cookieStore.set("session", hashedUser);
			res.headers.append("Set-Cookie", `session=${hashedUser}`);
			return res;
		});
	});
}
