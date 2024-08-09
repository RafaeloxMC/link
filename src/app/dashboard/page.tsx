"use client";
import { ContentBox } from "@/components/ContentBox";
import { movingDots } from "@/util/motion";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const colors = ["bg-gradient-to-r from-pink-300 to-purple-300", "bg-gradient-to-r from-yellow-300 to-green-300", "bg-gradient-to-r from-blue-300 to-indigo-300", "bg-gradient-to-r from-red-300 to-orange-300"];

interface Link {
	id: string;
	url: string;
	clicks: number;
	lastClick: string;
	createdAt: string;
}

export default function Dashboard() {
	const router = useRouter();

	async function logout() {
		axios.post("/api/auth/logout");
		router.push("/login");
	}

	const [links, setLinks] = useState<Link[]>([]);

	useEffect(() => {
		async function fetchLinks() {
			try {
				const response = await axios.get("/api/me");
				setLinks(response.data.links);
			} catch (error) {
				console.error("Error fetching links:", error);
			}
		}
		fetchLinks();
	}, []);

	return (
		<main className="relative flex items-center justify-center min-h-screen select-none overflow-hidden bg-gray-900">
			<div className="absolute inset-0 z-0 overflow-hidden">
				{Array.from({ length: 5 }).map((_, i) => (
					<motion.div key={i} className={`absolute w-96 h-96 rounded-full ${colors[i % colors.length]} opacity-20 backdrop-blur-3xl`} initial="hidden" animate="visible" variants={movingDots(15, i * 0.5) as any} />
				))}
			</div>

			<div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-3xl z-10"></div>

			<div className="relative z-20 flex w-full h-screen p-4 gap-4">
				<div className="w-1/4 bg-white bg-opacity-5 backdrop-blur-xl rounded-3xl flex flex-col p-4">
					<h1 className="text-4xl text-white font-bold mb-4 text-center">Your LiNKs</h1>
					<div className="h-full flex flex-col justify-start gap-4">
						{links && links.length > 0 ? (
							links.map((link, index) => (
								<button key={index} className="w-full p-2 text-white bg-gray-800 bg-opacity-50 rounded-3xl hover:bg-opacity-75" onClick={() => console.log(link)}>
									{link.id}
								</button>
							))
						) : (
							<p className="text-center text-xl mt-2">You don&apos;t have any links yet!</p>
						)}
					</div>
				</div>

				<div className="w-3/4 h-full flex flex-col items-center justify-center gap-5">
					<ContentBox className="w-full h-full max-w-full flex flex-col justify-between p-6 bg-gray-800 bg-opacity-40 rounded-2xl shadow-lg">
						<h1 className="text-white text-3xl mb-2 border-b border-gray-600 pb-2 w-full">Link Information</h1>
						<div className="h-full flex flex-col gap-2 flex-grow">
							<p className="text-gray-300">
								Short link: <span className="text-white">https://l.xvcf.dev/abc123</span>
							</p>
							<p className="text-gray-300">
								Redirects to: <span className="text-white">https://example.com/reeeeeaaaaaally-long-link</span>
							</p>
							<p className="text-gray-300">
								Created: <span className="text-white">2024-10-4 12:34:56</span>
							</p>
						</div>
						<div className="border-t border-gray-600 pt-2 mt-2 w-full">
							<div className="flex flex-row gap-2">
								<button className="w-full p-2 text-white bg-gray-500 rounded-3xl hover:bg-opacity-75 backdrop-blur-lg bg-opacity-50">Edit</button>
								<button className="w-full p-2 text-white bg-red-500 rounded-3xl hover:bg-opacity-75 backdrop-blur-lg bg-opacity-50">Delete</button>
							</div>
						</div>
					</ContentBox>
					<ContentBox className="w-full h-full max-w-full flex flex-col justify-between p-6 bg-gray-800 bg-opacity-40 rounded-2xl shadow-lg">
						<h1 className="text-white text-3xl mb-2 border-b border-gray-600 pb-2 w-full">Link Data</h1>
						<div className="flex flex-col gap-2 flex-grow">
							<p className="text-gray-300">
								Total clicks: <span className="text-white">1234</span>
							</p>
							<p className="text-gray-300">
								Last click: <span className="text-white">2024-10-4 12:34:56</span>
							</p>
						</div>
					</ContentBox>
				</div>
			</div>
		</main>
	);
}
