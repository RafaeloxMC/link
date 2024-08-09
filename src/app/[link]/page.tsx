import { redirect } from "next/navigation";

export default function Link({ params }: { params: { link: string } }) {

	return <p>Current: {params.link}</p>;
}
