"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import NotificationBell from "./Push";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const trackNavClick = (linkName, destination) => {
    posthog.capture("nav_link_clicked", {
      link_name: linkName,
      destination,
    });
  };

  return (
    <header className="site-header">
      <div className="left-links">
        <Link
          href="/"
          className={`link ${isActive("/") ? "active" : ""}`}
          onClick={() => trackNavClick("DreamCanvas", "/")}
        >
          DreamCanvas
        </Link>

        <Link
          href="/car-canvas"
          className={`link ${isActive("/car-canvas") ? "active" : ""}`}
          onClick={() => trackNavClick("CarCanvas", "/car-canvas")}
        >
          CarCanvas
        </Link>
      </div>

      <span className="brand-title">EtherealDreams</span>

      <div className="right-group">
        <NotificationBell />

        <Link
          href="/About"
          className={`link ${isActive("/About") ? "active" : ""}`}
          onClick={() => trackNavClick("About", "/About")}
        >
          About
        </Link>
      </div>
    </header>
  );
}