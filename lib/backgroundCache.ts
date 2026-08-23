// lib/backgroundCache.ts
'use client';

const state = {
    urls: [] as string[],
    priority: new Set<string>(),
};

export function setQueue(urls: string[]) {
    state.urls = urls;
}

export function bumpPriority(url: string) {
    state.priority.add(url);
}

export function getOrderedQueue(doneSet: Set<string>): string[] {
    const remaining = state.urls.filter((u) => !doneSet.has(u));
    const prioritized = remaining.filter((u) => state.priority.has(u));
    const rest = remaining.filter((u) => !state.priority.has(u));
    return [...prioritized, ...rest];
}