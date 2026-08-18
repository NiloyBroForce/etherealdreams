"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationBell from './Push';

export default function Header({ isActive }) {
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
 
      <Link href="/" className="brand-title" aria-label="EtherealDreams home">
        EtherealDreams
      </Link>
 
      <div className="right-group">
        <NotificationBell />
        <Link href="/About" className={`link ${isActive("/About") ? "active" : ""}`}>
          About
        </Link>
      </div>
 
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500;1,600&display=swap");
      `}</style>
 
      <style jsx>{`
        .site-header {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 14px clamp(14px, 4vw, 32px);
          background: #0b0b10;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
 
        .left-links {
          display: flex;
          align-items: center;
          gap: clamp(10px, 2.5vw, 24px);
          min-width: 0;
        }
 
        .right-group {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: clamp(8px, 2vw, 18px);
          min-width: 0;
        }
 
        .link {
          color: rgba(255, 255, 255, 0.62);
          text-decoration: none;
          font-size: clamp(0.78rem, 2vw, 0.92rem);
          font-weight: 500;
          letter-spacing: 0.01em;
          white-space: nowrap;
          transition: color 0.15s ease;
        }
 
        .link:hover {
          color: rgba(255, 255, 255, 0.92);
        }
 
        .link.active {
          color: #fff;
        }
 
        .brand-title {
          justify-self: center;
          font-family: "Cormorant Garamond", "Iowan Old Style", serif;
          font-style: italic;
          font-weight: 600;
          font-size: clamp(1.05rem, 4.2vw, 1.6rem);
          letter-spacing: 0.02em;
          text-decoration: none;
          white-space: nowrap;
          background: linear-gradient(90deg, #cbb9ff 0%, #f5d9ff 45%, #9fd6ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 22px rgba(180, 160, 255, 0.25);
        }
 
        .bell-wrap {
          position: relative;
          display: inline-flex;
        }
 
        .bell-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.85);
          cursor: pointer;
          transition: all 0.15s ease;
        }
 
        .bell-btn:hover:not(:disabled) {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
        }
 
        .bell-btn:active:not(:disabled) {
          transform: scale(0.96);
        }
 
        .bell-btn:disabled {
          cursor: default;
        }
 
        .bell-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 0 2px #0b0b10;
        }
 
        .bell-popup {
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translate(8px, -50%);
          margin-right: 10px;
          width: min(260px, 80vw);
          z-index: 50;
          opacity: 0;
          pointer-events: none;
          transition: all 0.15s ease-out;
        }
 
        .bell-popup.is-open {
          opacity: 1;
          pointer-events: auto;
          transform: translate(0, -50%);
        }
 
        .bell-card {
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(23, 23, 27, 0.97);
          backdrop-filter: blur(16px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          padding: 14px;
          color: #fff;
        }
 
        .bell-title {
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.92);
          margin: 0;
        }
 
        .bell-sub {
          font-size: 0.72rem;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.5);
          margin: 4px 0 0;
        }
 
        .bell-error {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          margin-top: 8px;
          padding: 6px 8px;
          border-radius: 8px;
          background: rgba(248, 113, 113, 0.1);
          color: #fca5a5;
          font-size: 0.7rem;
        }
 
        .bell-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 12px;
        }
 
        .bell-btn-ghost {
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.72rem;
          font-weight: 500;
          padding: 6px 10px;
          border-radius: 8px;
          cursor: pointer;
        }
 
        .bell-btn-ghost:hover {
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.92);
        }
 
        .bell-btn-solid {
          border: none;
          background: #fff;
          color: #17171b;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
 
        .bell-btn-solid:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.9);
        }
 
        .bell-btn-solid:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
 
        .bell-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
 
        .bell-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(52, 211, 153, 0.2);
          color: #34d399;
        }
 
        .bell-arrow {
          position: absolute;
          right: -6px;
          top: 50%;
          width: 12px;
          height: 12px;
          transform: translateY(-50%) rotate(45deg);
          background: rgba(23, 23, 27, 0.97);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          clip-path: polygon(100% 0, 0 0, 100% 100%);
        }
 
        @media (max-width: 480px) {
          .site-header {
            gap: 8px;
            padding: 12px 12px;
          }
          .left-links {
            gap: 10px;
          }
          .right-group {
            gap: 8px;
          }
        }
      `}</style>
    </header>
  );
}
 

