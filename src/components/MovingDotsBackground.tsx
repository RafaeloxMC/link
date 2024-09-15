import { useMemo } from "react";
import { motion } from "framer-motion";
import { movingDots } from "@/util/motion";

const colors = [
	"bg-gradient-to-r from-blue-300 to-indigo-300",
	"bg-gradient-to-r from-red-300 to-orange-300",
	"bg-gradient-to-r from-green-300 to-teal-300",
	"bg-gradient-to-r from-yellow-300 to-green-300",
	"bg-gradient-to-r from-purple-300 to-pink-300",
	"bg-gradient-to-r from-indigo-300 to-blue-300",
	"bg-gradient-to-r from-orange-300 to-red-300",
	"bg-gradient-to-r from-cyan-300 to-blue-300",
	"bg-gradient-to-r from-lime-300 to-green-300",
	"bg-gradient-to-r from-rose-300 to-pink-300",
];

export default function MovingDotsBackground() {
	return useMemo(
		() => (
			<div>
				<div className="absolute inset-0 z-0 overflow-hidden">
					{Array.from({ length: 10 }).map((_, i) => (
						<motion.div
							key={i}
							className={`absolute w-[50vh] aspect-square rounded-full ${
								colors[i % colors.length]
							} backdrop-blur-3xl`}
							initial="hidden"
							animate="visible"
							variants={movingDots(15, i * 0.5) as any}
						/>
					))}
				</div>

				<div className="absolute inset-0 z-10 backdrop-blur-3xl" />
			</div>
		),
		[]
	);
}
