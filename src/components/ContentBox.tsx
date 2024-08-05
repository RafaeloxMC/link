import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { ReactNode } from "react";

export function ContentBox({ children }: { children: ReactNode }) {
	const router = useRouter();

	return (
		<div className="relative z-20 flex flex-col items-center bg-white bg-opacity-10 backdrop-blur-3xl backdrop-filter rounded-3xl p-8 w-full max-w-md">
			<span className="mb-4 text-white hover:cursor-pointer" onClick={() => router.push("/")}>
				Go back
			</span>
			<motion.div className="flex flex-col justify-center items-center w-full" initial="hidden" animate="visible">
				{children}
			</motion.div>
		</div>
	);
}
