"use client";
import { ContentBox } from "@/components/ContentBox";
import { movingDots } from "@/util/motion";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const colors = ["bg-gradient-to-r from-pink-300 to-purple-300", "bg-gradient-to-r from-yellow-300 to-green-300", "bg-gradient-to-r from-blue-300 to-indigo-300", "bg-gradient-to-r from-red-300 to-orange-300"];

export default function Dashboard() {
	const router = useRouter();

	async function logout() {
		axios.post("/api/auth/logout");
		router.push("/login");
	}

	return (
		<main className="relative flex items-center justify-center min-h-screen p-6 sm:p-12 select-none overflow-hidden bg-gray-900">
			
			<div className="absolute inset-0 z-0 overflow-hidden">
				{Array.from({ length: 5 }).map((_, i) => (
					<motion.div key={i} className={`absolute w-96 h-96 rounded-full ${colors[i % colors.length]} opacity-20 backdrop-blur-3xl`} initial="hidden" animate="visible" variants={movingDots(15, i * 0.5) as any} />
				))}
			</div>

			<div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-3xl z-10"></div>

			<ContentBox>
				<h1 className="text-4xl font-bold text-center mb-6 text-white">Dashboard</h1>
				<p className="text-lg text-center mb-6 text-white">Welcome to your dashboard</p>

				<div className="flex flex-col w-full">
					<button className="p-3 rounded-full backdrop-blur-lg text-white text-center font-semibold focus:outline-none focus:ring-0">Profile</button>
					<button className="p-3 rounded-full backdrop-blur-lg text-white text-center font-semibold focus:outline-none focus:ring-0">Settings</button>
					<button className="p-3 rounded-full backdrop-blur-lg text-white text-center font-semibold focus:outline-none focus:ring-0" onClick={logout}>Logout</button>
				</div>
			</ContentBox>
		</main>
	);
}
