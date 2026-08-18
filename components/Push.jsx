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
    <div ref={wrapRef} className="bell-wrap">
      <button
        onClick={() => !subscribed && setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Notifications"
        disabled={subscribed}
        className="bell-btn"
      >
        <Bell size={18} strokeWidth={1.75} />
        {subscribed && <span className="bell-dot" />}
      </button>
 
      <div role="dialog" aria-modal="true" className={`bell-popup ${open ? "is-open" : ""}`}>
        <div className="bell-card">
          {subscribed ? (
            <div className="bell-row">
              <span className="bell-check">
                <Check size={14} strokeWidth={2.5} />
              </span>
              <p className="bell-title">Notifications enabled</p>
            </div>
          ) : (
            <>
              <p className="bell-title">Turn on notifications?</p>
              <p className="bell-sub">
                You&apos;ll get alerts for updates and messages. You can turn this off anytime.
              </p>
              {error && (
                <div className="bell-error">
                  <AlertTriangle size={12} strokeWidth={2} />
                  <span>{error}</span>
                </div>
              )}
              <div className="bell-actions">
                <button onClick={() => setOpen(false)} className="bell-btn-ghost">
                  Not now
                </button>
                <button onClick={handleEnable} disabled={loading} className="bell-btn-solid">
                  {loading ? "Enabling…" : "Turn on"}
                </button>
              </div>
            </>
          )}
        </div>
        <div className="bell-arrow" />
      </div>
    </div>
  );
}
 
