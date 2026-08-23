// components/ImageCache.tsx
'use client';

import { useEffect } from 'react';
import { setQueue, getOrderedQueue } from '@/lib/backgroundCache';

interface PrefetchImagesProps {
  imageUrls: string[];
}

const CACHE_NAME = 'vercel-blob-images';
const PROGRESS_KEY = 'bg-cache-progress-v1';
const BATCH_DELAY_MS = 400;
const IDLE_START_DELAY_MS = 4000;

export function ImageWarmup({ imageUrls }: PrefetchImagesProps) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    const conn = (navigator as any).connection;
    if (conn?.saveData || ['slow-2g', '2g'].includes(conn?.effectiveType)) return;

    setQueue(imageUrls);
    let cancelled = false;

    const run = async () => {
      await navigator.serviceWorker.ready;
      const cache = await caches.open(CACHE_NAME);

      let doneSet: Set<string>;
      try {
        doneSet = new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]'));
      } catch {
        doneSet = new Set();
      }

      // recompute order on each step so a mid-run scroll re-prioritizes
      while (!cancelled) {
        const queue = getOrderedQueue(doneSet);
        const url = queue[0];
        if (!url) break;

        const existing = await cache.match(url);
        if (!existing) {
          try {
            await fetch(url, { mode: 'cors', priority: 'low' });
          } catch (err) {
            console.error(`Background pre-cache failed: ${url}`, err);
            // skip permanently-broken URLs so we don't loop forever
            doneSet.add(url);
            localStorage.setItem(PROGRESS_KEY, JSON.stringify([...doneSet]));
            continue;
          }
        }

        doneSet.add(url);
        localStorage.setItem(PROGRESS_KEY, JSON.stringify([...doneSet]));
        await new Promise((r) => setTimeout(r, BATCH_DELAY_MS));
      }
    };

    const startTimer = window.setTimeout(() => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(run, { timeout: 5000 });
      } else {
        run();
      }
    }, IDLE_START_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, [imageUrls]);

  return null;
}