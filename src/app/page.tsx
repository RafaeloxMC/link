"use client";
import CodeBox from "@/components/CodeBox";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop, fadeInWithDelay, movingDots, fadeIn } from "@/util/motion";
import Footer from "@/components/Footer";
import dotColors from "@/util/colors";
import MovingDotsBackground from "@/components/MovingDotsBackground";

export default function Home() {
	const router = useRouter();

	return (
		<motion.main className="relative flex items-center justify-center min-h-screen p-6 sm:p-8 select-none overflow-hidden bg-gray-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
			<MovingDotsBackground />

			<div className="relative z-20 flex flex-col bg-white bg-opacity-10 backdrop-blur-3xl backdrop-filter rounded-3xl p-8 w-full h-full">
				<motion.div className="text-center sm:mx-10" initial="hidden" animate="visible" variants={slideInFromTop}>
					<h1 className="text-6xl sm:text-9xl drop-shadow-xl font-bold text-white">LiNK</h1>
					<p className="mt-2 sm:mt-4 text-white">
						by{" "}
						<a href="https://xvcf.dev/" className="underline">
							{" "}
							@xvcf
						</a>
					</p>
				</motion.div>

				<motion.div className="mt-6 sm:mt-10 sm:mx-10 flex flex-col justify-center items-center" initial="hidden" animate="visible" variants={slideInFromLeft(0.3)}>
					<p className="text-xl sm:text-2xl text-white">Create short links in seconds!</p>
					<p className="mt-2 sm:mt-0 mb-2 text-white">Use LiNK to shorten your long link in not much more than a few seconds!</p>
					<CodeBox />
				</motion.div>

				<motion.div className="mt-12 sm:mt-20 sm:ml-10 sm:mr-10" initial="hidden" animate="visible" variants={fadeInWithDelay(0.9)}>
					<h2 className="text-4xl sm:text-6xl font-bold text-white text-center">Why Choose LiNK?</h2>
					<div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
						<div className="p-4 bg-white bg-opacity-20 backdrop-blur-3xl backdrop-filter rounded-3xl">
							<h3 className="text-2xl font-bold">Fast</h3>
							<p>Shorten your links in seconds with our fast and efficient service.</p>
						</div>
						<div className="p-4 bg-white bg-opacity-20 backdrop-blur-3xl backdrop-filter rounded-3xl">
							<h3 className="text-2xl font-bold">Reliable</h3>
							<p>Count on our reliable infrastructure to keep your links accessible at all times.</p>
						</div>
						<div className="p-4 bg-white bg-opacity-20 backdrop-blur-3xl backdrop-filter rounded-3xl">
							<h3 className="text-2xl font-bold">Secure</h3>
							<p>Your links are safe with us, with top-notch security measures in place.</p>
						</div>
					</div>
				</motion.div>

				<motion.div className="mt-6 sm:mt-10 sm:ml-10 sm:mr-10 flex flex-col items-center justify-center" initial="hidden" animate="visible" variants={slideInFromRight(0.6)}>
					<p className="text-xl sm:text-2xl text-white">Get started now!</p>
					<button onClick={() => router.push("/register")} className="mt-2 bg-white text-black rounded-full px-4 py-2 hover:bg-gray-200 transition-transform transform hover:scale-105 drop-shadow-xl">
						Register
					</button>
					<p className="mt-2 text-white">
						Already have an account?{" "}
						<span className="underline underline-offset-2 cursor-pointer" onClick={() => router.push("/login")}>
							Login
						</span>
					</p>
				</motion.div>
				<Footer />
			</div>
		</motion.main>
	);
}
