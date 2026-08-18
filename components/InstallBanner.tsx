"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "pwa-install-dismissed-at";
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

function wasRecentlyDismissed(): boolean {
  if (typeof window === "undefined") return false;

  const dismissedAt = window.localStorage.getItem(DISMISS_KEY);
  if (!dismissedAt) return false;

  const elapsed = Date.now() - Number(dismissedAt);
  return elapsed < DISMISS_DURATION_MS;
}

export function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) return;
    if (wasRecentlyDismissed()) return;

    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    }

    function handleAppInstalled() {
      setVisible(false);
      setDeferredPrompt(null);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setVisible(false);
    }
    setDeferredPrompt(null);
  }

function handleDismiss() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
  }
  setVisible(false);
}

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-4 w-[calc(100%-2rem)] max-w-md px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg text-white">
      <div className="text-sm font-medium">
        Install this app for a faster experience
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleInstall}
          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white text-black hover:bg-white/90 transition"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/10 border border-white/25 text-white hover:bg-white/20 transition"
        >
          Later
        </button>
      </div>
    </div>
  );
}

function isIos(): boolean {
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
}

function isInStandaloneMode(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true
  );
}

export function InstallBannerIOS() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isIos()) return;
    if (isInStandaloneMode()) return;
    if (wasRecentlyDismissed()) return;

    setVisible(true);
  }, []);

  function handleDismiss() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
  }
  setVisible(false);
}

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[calc(100%-2rem)] max-w-md px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg text-white">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-medium leading-snug">
          Install this app: tap{" "}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="inline -mt-0.5 mx-0.5"
          >
            <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 10H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>{" "}
          then <strong>"Add to Home Screen"</strong>
        </div>
        <button
          onClick={handleDismiss}
          className="shrink-0 text-white/70 hover:text-white text-lg leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}