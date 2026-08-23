

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
  navigationPreload: true,

  runtimeCaching: [
    {
      // Match Vercel Blob URLs
      matcher: /^https:\/\/.*\.public\.blob\.vercel-storage\.com\/.*$/,
      handler: new NetworkFirst({
        cacheName: 'vercel-blob-images',
        networkTimeoutSeconds: 3,
        plugins: [
          {
            // Cache HTTP 0 (opaque CORS) and HTTP 200 responses
            cacheWillUpdate: async ({ response }) => {
              if (response && (response.status === 200 || response.status === 0)) {
                return response;
              }
              return null;
            },
          },
        ],
      }),
    },
    {
      matcher: ({ request }) => request.mode === 'navigate',
      handler: new NetworkFirst({
        cacheName: 'pages',
        networkTimeoutSeconds: 3,
      }),
    },
    ...defaultCache,
  ],
});

serwist.addEventListeners();
