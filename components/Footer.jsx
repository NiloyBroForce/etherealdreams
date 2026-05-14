"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

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
			className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#13aff0] to-[#0d8bc2] text-white shadow-lg shadow-[#13aff0]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#13aff0]/40 ${
				isVisible
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
						<a
							href="https://www.facebook.com/rafin.islam.niloy.2024"
							target="_blank"
							rel="noreferrer"
							className="group s-icon hover:bg-linear-to-br hover:from-[#1877F2] hover:via-[#1800F2] hover:to-[#1823F2] hover:border-transparent hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1000 1000"
								width="24"
								height="24"
								className="fill-black group-hover:fill-white transition-all duration-300 group-hover:scale-110"
							>
								<path d="M182.594 0C81.445 0 0 81.445 0 182.594v634.813c0 101.149 81.445 182.594 182.594 182.594h344.063V609.063H423.282v-140.75h103.375v-120.25c0-94.475 61.079-181.219 201.781-181.219c56.968 0 99.094 5.469 99.094 5.469l-3.313 131.438s-42.963-.406-89.844-.406c-50.739 0-58.875 23.378-58.875 62.188v102.781h152.75l-6.656 140.75H675.5v390.938h141.906c101.149 0 182.594-81.445 182.594-182.594V182.595C1000 81.446 918.555.001 817.406.001H182.593z" />
							</svg>
						</a>
						<a
							href="https://www.instagram.com/niloy_of_rivia/"
							target="_blank"
							rel="noreferrer"
							className="group s-icon hover:bg-linear-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent hover:shadow-[0_0_20px_rgba(230,104,60,0.4)]"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 740 850"
								width="29"
								height="29"
								className="fill-black group-hover:fill-white transition-all duration-300 group-hover:scale-110"
							>
								<path d="M372 182q41 0 77 15t63 42t42 63t15 77t-15 76t-42 63t-63 42t-77 16t-77-16t-62-42t-42-63t-16-76t16-77t42-63t62-42t77-15m0 324q26 0 49-10t41-27t27-41t10-49t-10-50t-27-41t-41-27t-49-10t-49 10t-41 27t-27 41t-10 50t10 49t27 41t41 27t49 10m368-314q9 187 0 374q-2 36-17 68t-39 56t-57 40t-68 17q-47 2-93 3t-94 1t-93-1t-94-3q-36-2-68-17t-56-40t-40-56t-17-68q-8-187 0-374q2-36 17-68t40-57t56-39t68-17q187-9 374 0q36 2 68 17t57 39t39 57t17 68m-70 370q9-183 0-367q-1-22-11-42t-25-36t-36-26t-42-11q-46-2-92-3t-92-1t-92 1t-92 3q-22 1-42 11t-35 26t-26 36t-11 42q-9 184 0 368q1 22 11 42t26 35t35 26t42 11q184 9 368 0q22-1 42-11t36-26t25-36t11-42M569 138q18 0 31 13t13 31t-13 31t-31 13t-31-13t-13-31t13-31t31-13" />
							</svg>
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
					<div className="text-foreground-muted uppercase text-gray-400 text-sm text-center md:text-right md:mr-12 lining-nums">
						©2026 All rights reserved
					</div>
				</div>
			</div>
		</footer>
	);
}
