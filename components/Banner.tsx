// app/components/InstallBanners.tsx
"use client";

import { InstallBanner } from "./InstallBanner";
import { InstallBannerIOS } from "./InstallBanner";

export function InstallBanners() {
  return (
    <>
      <InstallBanner />
      <InstallBannerIOS />
    </>
  );
}