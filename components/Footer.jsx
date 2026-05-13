"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, Facebook, Instagram } from "lucide-react";

function FloatingBackToTop() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (typeof window !== "undefined") {
				setIsVisible(window.scrollY > 300);
			}
		};
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			onClick={scrollToTop}
			className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#13aff0] to-[#0d8bc2] text-white shadow-lg shadow-[#13aff0]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#13aff0]/40 ${isVisible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-4 pointer-events-none"
				}`}
			aria-label="Scroll to top"
		>
			<ArrowUp className="w-5 h-5" />
		</button>
	);
}


export default function Footer() {
	return (
		<footer className="bg-footer-bg border-t border-white/5 py-8 px-6 mt-auto">
			<FloatingBackToTop />

			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
					{/* 1. Social Icons (Left) */}
					<div className="flex items-center gap-4 justify-center md:justify-start">
						{/* Facebook */}
						<a
							href="https://www.facebook.com/rafin.islam.niloy.2024"
							target="_blank"
							rel="noreferrer"
							className="group s-icon hover:bg-linear-to-br hover:from-[#1877F2] hover:via-[#1800F2] hover:to-[#1823F2] hover:border-transparent hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]"
						>
							<Facebook
								size={18}
								className="text-white/70 group-hover:text-white transition-all duration-300 group-hover:scale-110"
							/>
						</a>

						{/* Instagram */}
						<a
							href="https://www.instagram.com/niloy_of_rivia/"
							target="_blank"
							rel="noreferrer"
							className="group s-icon hover:bg-linear-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent hover:shadow-[0_0_20px_rgba(230,104,60,0.4)]"
						>
							<Instagram
								size={18}
								className="text-white/70 group-hover:text-white transition-all duration-300 group-hover:scale-110"
							/>
						</a>
					</div>

					{/* 2. Contact Link (Center) */}
					<div className="text-center">
						<Link
							href="/About#get"
							className="text-primary/80 hover:text-primary hover:underline transition-colors duration-300 font-medium tracking-wide uppercase text-xs"
						>
							Contact Me
						</Link>
					</div>

					{/* 3. Copyright (Right) */}
					<div className="text-foreground-muted text-[11px] uppercase tracking-widest md:text-right pr-15 opacity-60">
						©2026 All rights reserved
					</div>
				</div>
			</div>
		</footer>
	);
}