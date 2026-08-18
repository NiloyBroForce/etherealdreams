"use client";

import { useEffect ,useState ,useRef } from "react";
import { Bell, Check, AlertTriangle } from "lucide-react";

const VAPID_PUBLIC_KEY ="BE3PSQtBMa66s8h0mhllVDdxIS3lWT0S8M6tPH-K3VTnANKJiK1HYcdrfR1FiSsJI7-WgPPSKEipQuiXAcPq4m8";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const wrapRef = useRef(null);
 
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.ready.then(async (registration) => {
      const existing = await registration.pushManager.getSubscription();
      setSubscribed(!!existing);
    });
  }, []);
 
  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);
 
  async function handleEnable() {
    if (!("serviceWorker" in navigator) || !("PushManager" in globalThis)) {
      setError("Notifications aren't supported in this browser.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const existing = await registration.pushManager.getSubscription();
      const subscription =
        existing ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        }));
      await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });
      setSubscribed(true);
      setTimeout(() => setOpen(false), 700);
    } catch (err) {
      console.error("Push subscription failed:", err);
      setError("Couldn't turn on notifications. Try again.");
    } finally {
      setLoading(false);
    }
  }
 
  return (
    <div ref={wrapRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => !subscribed && setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Notifications"
        disabled={subscribed}
        className="relative inline-flex h-8 w-8 sm:h-9 sm:w-9 appearance-none items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-white/85 outline-none transition-colors hover:border-white/20 hover:bg-white/[0.1] active:scale-95 disabled:cursor-default"
      >
        <Bell size={17} strokeWidth={1.75} />
        {subscribed && (
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0b0b10]" />
        )}
      </button>
 
      <div
        role="dialog"
        aria-modal="true"
        className={`absolute right-full top-1/2 z-50 mr-2 w-64 max-w-[80vw] -translate-y-1/2 transition-all duration-150 ease-out ${
          open
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-2 opacity-0"
        }`}
      >
        <div className="relative rounded-xl border border-white/10 bg-neutral-900/95 p-3.5 text-white shadow-2xl backdrop-blur-xl">
          {subscribed ? (
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-400">
                <Check size={13} strokeWidth={2.5} />
              </span>
              <p className="text-sm font-medium text-white/90">Notifications enabled</p>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-white/90">Turn on notifications?</p>
              <p className="mt-1 text-xs leading-relaxed text-white/50">
                You&apos;ll get alerts for updates and messages. You can turn this off anytime.
              </p>
              {error && (
                <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-red-400/10 px-2 py-1.5 text-xs text-red-300">
                  <AlertTriangle size={12} strokeWidth={2} className="mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white/90"
                >
                  Not now
                </button>
                <button
                  type="button"
                  onClick={handleEnable}
                  disabled={loading}
                  className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 transition-all hover:bg-white/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Enabling…" : "Turn on"}
                </button>
              </div>
            </>
          )}
          <div
            className="absolute right-[-6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-white/10 bg-neutral-900/95"
            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
          />
        </div>
      </div>
    </div>
  );
}