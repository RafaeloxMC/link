import dotColors from "@/util/colors";
import { movingDots } from "@/util/motion";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function MovingDotsBackground() {
	return useMemo(() => {
		return (
			<div>
				<div className="absolute inset-0 z-0 overflow-hidden">
					{Array.from({ length: 5 }).map((_, i) => (
						<motion.div
							key={i}
							className={`absolute w-[75vh] h-[75vh] rounded-full ${
								dotColors()[i % dotColors().length]
							} backdrop-blur-3xl`}
							initial="hidden"
							animate="visible"
							variants={movingDots(15, i * 0.5) as any}
						/>
					))}
				</div>
	
				<div className="absolute inset-0 z-10 backdrop-blur-xl" />
			</div>
		);
	}, [])
}
