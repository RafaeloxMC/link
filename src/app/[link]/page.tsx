import axios from "axios";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function Link({ params }: { params: { link: string } }) {
	const headersList = headers();
	let base = headersList.get("x-forwarded-host") as string;

	let response;
	try {
		response = await axios.get(`http://${base}/api/link/${params.link}`);
	} catch (error) {
		return redirect("/404");
	}
	if (response.status !== 200) {
		return redirect("/404");
	}

	const data = await response.data;
	return redirect(data.link.original);
}
