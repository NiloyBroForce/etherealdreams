

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import {
  CacheFirst,
  ExpirationPlugin,
  Serwist,
  StaleWhileRevalidate,
} from "serwist";

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (string | PrecacheEntry)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// ─────────────────────────────────────────────
// Push notification
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// Push notification
// ─────────────────────────────────────────────

interface PushPayload {
  title?: string;
  body?: string;
  image?: string;
  url?: string;
}

// TS's built-in NotificationOptions doesn't include `image` yet
interface ExtendedNotificationOptions extends NotificationOptions {
  image?: string;
}

self.addEventListener("push", (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json() as PushPayload;

  event.waitUntil(
    self.registration.showNotification(data.title ?? "EtherealDreams", {
      body: data.body ?? "",
      image: data.image,
      data: {
        url: data.url ?? "/",
      },
    } as ExtendedNotificationOptions)
  );
});

// ─────────────────────────────────────────────
// Notification click
// ─────────────────────────────────────────────

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url ?? "/";

  event.waitUntil(
    self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          return client.focus();
        }
      }

      return self.clients.openWindow(url);
    })
  );
});


const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,

  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,

  runtimeCaching: [
    {
      matcher: ({ url }) =>
        url.pathname.endsWith("/images.json") ||
        url.pathname === "/api/images",

      handler: new StaleWhileRevalidate({
        cacheName: "image-routes-json-cache",

        plugins: [
          new ExpirationPlugin({
            maxEntries: 10,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          }),
        ],
      }),
    },

    {
      matcher: ({ request, url }) =>
        request.destination === "image" ||
        url.hostname.includes("public.blob.vercel-storage.com"),

      handler: new CacheFirst({
        cacheName: "gallery-images-cache",

        plugins: [
          new ExpirationPlugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
        ],
      }),
    },

    ...defaultCache,
  ],
});

serwist.addEventListeners();
