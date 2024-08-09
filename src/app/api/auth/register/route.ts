import User from "@/schemas/User";
import dbConnect from "@/util/database";
import { hash } from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

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

		const userId = name + Date.now().toString().slice(-10) + Math.floor(1000 + Math.random() * 9000).toString();
		const hashUserId = crypto.createHash('sha256').update(userId).digest('hex').slice(0, 16);

		return await User.create({ id: hashUserId, name: name, password: hashedPassword }).then(async (user) => {
			const res = NextResponse.json({ message: "OK" }, { status: 200 });

			const cookieStore = cookies();
			const hashedUser = user.id + ".LNKPW." + hashedPassword;

			cookieStore.set("session", hashedUser);
			res.headers.append("Set-Cookie", `session=${hashedUser}`);
			return res;
		});
	});
}
