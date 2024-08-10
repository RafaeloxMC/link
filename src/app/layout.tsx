import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dotColors from "@/util/colors";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Link | xvcf.dev",
	description: "Link shortener by @xvcf. Made for private use.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-gray-900 relative`}>
				<div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-3xl z-10"></div>
				<div className="relative z-20 flex flex-col min-h-screen">
					<div className="flex-grow">{children}</div>
				</div>
			</body>
		</html>
	);
}
