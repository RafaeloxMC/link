import Link from "@/schemas/Link";
import User from "@/schemas/User";
import connect from "@/util/database";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	await connect();

	const cookieStorage = cookies();

	const token = cookieStorage.get("session")?.value as string;

	return await axios
		.post(new URL("/api/auth/validate", request.nextUrl.origin).toString(), { token: token })
		.then(async (response) => {
			if (response.status !== 200) {
				return NextResponse.json({ status: 401, body: "Unauthorized" });
			} else {
				return await User.findOne({ id: token.split(".LNKPW.")[0] }).then(async (user) => {
					return await Link.find({ owner: user.id }).then(async (links) => {
						return NextResponse.json({
							id: user.id,
							name: user.name,
							links: links.map((link) => {
								return {
									id: link.short,
									url: link.original,
									clicks: link.clicks,
									lastClick: link.lastClick ? link.lastClick : null,
									createdAt: link.createdAt,
								};
							}),
						});
					});
				});
			}
		})
		.catch((error) => {
			return NextResponse.json({ status: 401, body: "Unauthorized" });
		});
}
