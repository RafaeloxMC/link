"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
    const router = useRouter();

    return (
        <footer className="w-full p-4 backdrop-filter text-white text-center">
            <p>© 2024 <span className="underline underline-offset-2 hover:cursor-pointer" onClick={() => router.push("/")}>LiNK</span> by <span className="underline underline-offset-2 hover:cursor-pointer" onClick={() => router.push("https://xvcf.dev/")}>@xvcf</span>. All rights reserved.</p>
            <p><span onClick={() => router.push("/privacy-policy")} className="hover:cursor-pointer">Privacy Policy</span> | <span onClick={() => router.push("/tos")} className="hover:cursor-pointer">Terms of Service</span></p>
        </footer>
    );
};

export default Footer;
