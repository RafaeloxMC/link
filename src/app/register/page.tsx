"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, movingDots } from "@/util/motion";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { AuthBox } from "@/components/AuthBox";
import dotColors from "@/util/colors";
import MovingDotsBackground from "@/components/MovingDotsBackground";

export default function Register() {
	const router = useRouter();
	const [error, setError] = React.useState<string | null>(null);

	async function submit(e: React.FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault();

			const formData = new FormData(e.currentTarget as HTMLFormElement);

			const username = formData.get("name") as string;
			const password = formData.get("password") as string;

			await axios.post("/api/auth/register", { name: username, password });
		} catch (error) {
			const axiosError = error as AxiosError;

			if (axiosError.response?.status === 405) {
				return setError("Missing username or password");
			} else if (axiosError.response?.status === 400) {
				return setError("Username already taken");
			} else {
				return setError("An error occurred. Try again later");
			}
		}

		return router.push("/login");
	}

	return (
		<main className="relative flex items-center justify-center min-h-screen p-6 sm:p-12 select-none overflow-hidden bg-gray-900">

			<MovingDotsBackground />

			<AuthBox>
				<h1 className="text-4xl font-bold text-center mb-6 text-white drop-shadow-glow_xl">LiNK</h1>
				<p className="text-lg text-center mb-6 text-white">Create a new account</p>

				{error && <p className="text-red-500 text-center mb-6 -mt-2">{error}</p>}

				<form className="flex flex-col w-full" onSubmit={submit}>
					<motion.input type="text" name="name" placeholder="Username" className="mb-4 p-3 rounded-full text-center border-none focus:outline-none focus:ring-transparent text-white bg-white bg-opacity-20 backdrop-blur-lg" aria-label="Username" initial="hidden" animate="visible" variants={slideInFromLeft(0.3)} />
					<motion.input type="password" name="password" placeholder="Password" className="mb-4 p-3 rounded-full text-center border-none focus:outline-none focus:ring-transparent text-white bg-white bg-opacity-20 backdrop-blur-lg" aria-label="Password" initial="hidden" animate="visible" variants={slideInFromRight(0.3)} />
					<motion.button type="submit" className="p-3 rounded-full backdrop-blur-lg text-white text-center font-semibold focus:outline-none focus:ring-0 bg-white bg-opacity-20 hover:bg-opacity-45 transition duration-300 shadow-lg" initial="hidden" animate="visible" variants={slideInFromLeft(0.3)}>
						Register
					</motion.button>
				</form>

				<p className="text-center mt-6 text-white">
					Already have an account?{" "}
					<a href="/login" className="underline underline-offset-2 text-white hover:underline">
						Login
					</a>
				</p>
			</AuthBox>
		</main>
	);
}
