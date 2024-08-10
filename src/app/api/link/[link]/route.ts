import Link from "@/schemas/Link";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { link: string } }) {
	return await Link.findOne({ short: params.link }).then(async (link) => {
		if (!link) {
			return NextResponse.json({ message: "Link not found" }, { status: 404 });
		}

		await Link.updateOne({ short: params.link }, { $inc: { clicks: 1 }, $set: { lastClick: new Date().toISOString() } }).exec();

		return NextResponse.json({ message: "Link found", link: link }, { status: 200 });
	});
}

export async function DELETE(request: NextRequest, { params }: { params: { link: string } }) {
	const cookieStorage = cookies();
	const token = cookieStorage.get("session")?.value;

	if (!token) {
		return new Response("Unauthorized", { status: 401 });
	}

	try {
		const response = await axios.get(new URL("api/me", request.nextUrl.origin).toString(), {
			withCredentials: true,
			headers: {
				Cookie: `session=${token}`
			}
		});
        for(let i = 0; i < response.data.links.length; i++){
            if(response.data.links[i].id === params.link){
                await Link.deleteOne({ short: params.link }).exec();
                return NextResponse.json({ message: "Link deleted" }, { status: 200 });
            }
        }
        return NextResponse.json({ message: "Link not found" }, { status: 404 });
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axiosError.response?.status === 401) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		} else {
			return NextResponse.json({ message: "Internal server error" }, { status: 500 });
		}
	}
}

export async function POST(request: NextRequest, { params }: { params: { link: string } }) {
	const cookieStorage = cookies();
	const token = cookieStorage.get("session")?.value as string;

	try {
		const response = await axios.post(new URL("/api/auth/validate", request.nextUrl.origin).toString(), { token: token });
		if (response.status !== 200) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		if (!body.url) {
			return NextResponse.json({ message: "Missing parameters" }, { status: 400 });
		}

		return await Link.findOne({ short: params.link }).then(async (link) => {
			if (!link) {
				Link.create({ short: params.link, original: body.url, owner: token.split(".LNKPW.")[0] });
                return NextResponse.json({ message: "OK" }, { status: 200 });
			}

			return NextResponse.json({ message: "Link already exists" }, { status: 409 });
		});
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axiosError.response?.status === 401) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		} else if (axiosError.response?.status === 400) {
			return NextResponse.json({ message: "Missing parameters" }, { status: 400 });
		} else {
			return NextResponse.json({ message: "Internal server error" }, { status: 500 });
		}
	}
}
