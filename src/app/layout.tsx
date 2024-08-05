import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { movingDots } from "@/util/motion";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Link | xvcf.dev",
    description: "Link shortener by @xvcf. Made for private use.",
};

const colors = [
	'bg-gradient-to-r from-pink-300 to-purple-300',
	'bg-gradient-to-r from-yellow-300 to-green-300',
	'bg-gradient-to-r from-blue-300 to-indigo-300',
	'bg-gradient-to-r from-red-300 to-orange-300',
];

export default function RootLayout({
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
