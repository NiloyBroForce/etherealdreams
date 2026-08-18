'use client';

import { useEffect } from 'react';

interface PrefetchImagesProps {
  imageUrls: string[]; // List of all 100 Vercel Blob image URLs passed from server
}

export function ImageWarmup({ imageUrls }: PrefetchImagesProps) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    const warmupCache = async () => {
      await navigator.serviceWorker.ready;

      const cache = await caches.open('vercel-blob-images');

      await Promise.all(
        imageUrls.map(async (url) => {
          const existing = await cache.match(url);
          if (!existing) {
            try {
              // mode: 'cors' ensures complete caching control
              await fetch(url, { mode: 'cors' });
            } catch (err) {
              console.error(`Failed to pre-cache image: ${url}`, err);
            }
          }
        })
      );
    };

    warmupCache();
  }, [imageUrls]);

  return null;
}