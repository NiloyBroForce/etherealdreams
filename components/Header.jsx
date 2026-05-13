"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
	const pathname = usePathname();

	const isActive = (path) => pathname === path;

	return (
		<header >
			<div className="left-links">
				<Link href="/" className={`link ${isActive("/") ? "active" : ""}`}>
					DreamCanvas
				</Link>
				<Link
					href="/car-canvas"
					className={`link ${isActive("/car-canvas") ? "active" : ""}`}
				>
					CarCanvas
				</Link>
			</div>

			<Link
				href="/About"
				className={`link ${isActive("/About") ? "active" : ""}`}
			>
				About
			</Link>
		</header>
	);
}
