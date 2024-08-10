"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import dotColors from "@/util/colors";
import { movingDots } from "@/util/motion";

const colors = dotColors();

const MovingDotsBackground: React.FC = () => {
	const movingDotsBackground = useMemo(
		() => (
			<div>
				<div className="absolute inset-0 z-0 overflow-hidden">
					{Array.from({ length: 5 }).map((_, i) => {
						return <motion.div key={i} className={`absolute w-96 h-96 rounded-full ${colors[i % colors.length]} opacity-20 backdrop-blur-3xl`} initial="hidden" animate="visible" variants={movingDots(15, i * 0.5) as any} />;
					})}
				</div>
				<div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-3xl z-10"></div>
			</div>
		),
		[],
	);

	return movingDotsBackground;
};

export default MovingDotsBackground;
