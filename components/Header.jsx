"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationBell from './Push';

export default function Header() {
 	const pathname = usePathname();
 
  const isActive = (path) => pathname === path;
	
    return (
      <header className="site-header">
        <div className="left-links">
          <Link href="/" className={`link ${isActive("/") ? "active" : ""}`}>
            DreamCanvas
          </Link>
          <Link href="/car-canvas" className={`link ${isActive("/car-canvas") ? "active" : ""}`}>
            CarCanvas
          </Link>
        </div>
   
        <span className="brand-title">EtherealDreams</span>
   
        <div className="right-group">
          <NotificationBell />
          <Link href="/About" className={`link ${isActive("/About") ? "active" : ""}`}>
            About
          </Link>
        </div>
     </header>
    );
  }
   