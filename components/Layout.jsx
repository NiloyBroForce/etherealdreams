"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientWrapper({ children }) {
	const pathname = usePathname();

	useEffect(() => {
		const timer = setTimeout(() => {
			window.dispatchEvent(new Event("resize"));
		}, 150);

		return () => clearTimeout(timer);
	}, [pathname]);

	return (
		<>
			<Header />
			<main className="flex-grow">{children}</main>
			<Footer />
		</>
	);
}