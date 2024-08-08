import User from "@/schemas/User";
import dbConnect from "@/util/database";
import { compare, hash } from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	await dbConnect();

	const { name, password } = await request.json();

	if (!name || !password) {
		return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
	}

	return await User.findOne({ name: name }).then(async (user) => {
		if (!user) {
			return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
		}
		return compare(password, user.password).then(async (result) => {
			if (!result) {
				return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
			} else {
				const res = NextResponse.json({ message: "OK" }, { status: 200 });

				const cookieStore = cookies();
				const hashedUser = name + ".LNKPW." + (user.password as string);

				cookieStore.set("session", hashedUser);
				res.headers.append("Set-Cookie", `session=${hashedUser}`);
				return res;
			}
		});
	});
}
