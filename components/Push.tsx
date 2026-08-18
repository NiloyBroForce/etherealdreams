"use client";

import { useEffect ,useState  } from "react";

const VAPID_PUBLIC_KEY ="BAkLJfaeQLLtLfamVc_KbGerk3cjob3fnoEGt9xHkGAckHXISYK_FajbjmaJ3MziHibm_pVH3C3nwr2b-s9We5c";

function urlBase64ToUint8Array(base64String: string) {
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

export default function PushSubscribeButton() {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.ready.then(async (registration) => {
      const existing =
        await registration.pushManager.getSubscription();

      setSubscribed(!!existing);
    });
  }, []);

  async function handleEnable() {
    if (
  !("serviceWorker" in navigator) ||
  !("PushManager" in globalThis)
) {
  console.error("Push notifications aren't supported in this browser.");
  return;
}

    setLoading(true);

    try {
      const registration =
        await navigator.serviceWorker.ready;

      const existing =
        await registration.pushManager.getSubscription();

      const subscription =
        existing ??
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey:
            urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });

      await fetch("/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });

      setSubscribed(true);
    } catch (err) {
      console.error("Push subscription failed:", err);
    } finally {
      setLoading(false);
    }
  }

  if (subscribed) {
    return (
      <p className="text-sm text-white/60">
        Notifications enabled
      </p>
    );
  }

  return (
    <button
      onClick={handleEnable}
      disabled={loading}
      className="rounded-xl border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white/90 shadow-lg shadow-black/20 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.1] hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {loading
        ? "Enabling..."
        : "Enable push notifications 🔔"}
    </button>
  );
}

