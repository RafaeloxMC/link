"use client";
import { motion } from "framer-motion";
import { ContentBox } from "./ContentBox";
import { movingDots } from "@/util/motion";
import dotColors from "@/util/colors";
import MovingDotsBackground from "./MovingDotsBackground";

export default function NotFound() {
	return (
		<motion.div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 select-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
			<MovingDotsBackground />

			<div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-3xl z-10"></div>
			<ContentBox className="p-8 bg-gray-800 shadow-lg">
				<motion.h1 className="text-6xl font-bold text-gray-200 mb-4" initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
					404
				</motion.h1>
				<motion.p className="text-xl text-gray-200 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
					Page or link not found
				</motion.p>
				<motion.a href="/" className="text-blue-400 hover:underline" whileHover={{ scale: 1.1 }}>
					Go back home
				</motion.a>
			</ContentBox>
		</motion.div>
	);
}
