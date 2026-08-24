

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import {
  NetworkFirst,
  Serwist,
} from "serwist";

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (string | PrecacheEntry)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

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
  // 1. Disable navigationPreload to prevent offline fetch errors
  navigationPreload: false,

  runtimeCaching: [
    {
      // Match Vercel Blob URLs
      matcher: /^https:\/\/.*\.public\.blob\.vercel-storage\.com\/.*$/,
      handler: new NetworkFirst({
        cacheName: "vercel-blob-images",
        networkTimeoutSeconds: 3,
        plugins: [
          {
            cacheWillUpdate: async ({ response }) => {
              // 2. Only cache valid 200 responses (avoid opaque response quota bloating)
              if (response && response.status === 200) {
                return response;
              }
              return null;
            },
          },
        ],
      }),
    },
    ...defaultCache,
  ],
});

serwist.addEventListeners();
