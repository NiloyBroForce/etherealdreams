import { list } from '@vercel/blob';
import { unstable_cache } from 'next/cache';

export const getCachedBlobList = unstable_cache(
    async () => {
        const { blobs } = await list();
        return blobs.map((blob) => blob.url);
    },
    ['blob-list'],
    { revalidate: 300 } // refresh every 5 min
);