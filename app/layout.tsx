import "@/styles/globals.css";
import { Raleway,Fraunces, Inter } from "next/font/google";
import ClientWrapper from "@/components/Layout";
import type { Metadata, Viewport } from "next";
import { InstallBanners } from "@/components/Banner";
import { ImageWarmup } from '@/components/ImageCache';
import { list } from '@vercel/blob';

const raleway = Raleway({
	subsets: ["latin"],
	variable: "--font-raleway", 
	display: "swap",
});
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["opsz"] });
  const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
export const metadata: Metadata = {
  metadataBase: new URL("https://etherealdreams.vercel.app"),
  title: {
    default: "EtherealDreams | Surreal Automotive & Abstract Visual Art",
    template: "%s | EtherealDreams",
  },
  description:
    "A curated collection of dreamlike automotive photography, paintings and refractive visual studies. Explore the intersection of light, reflection, and shadow in these abstract landscapes.",
  keywords: [
    "digital art bio",
    "Automotive Photography",
    "dreamlike paintings",
    "Abstract",
  ],

  manifest: "/site.webmanifest",

  openGraph: {
    title: "EtherealDreams | Surreal Automotive & Abstract Visual Art",
    description:
      "A curated collection of dreamlike automotive photography, paintings and refractive visual studies. Explore the intersection of light, reflection, and shadow in these abstract landscapes.",
    url: "https://etherealdreams.vercel.app/",
    siteName: "EtherealDreams",
    images: [
      {
        url: `/api/og?title=EtherealDreams`,
        width: 1200,
        height: 630,
        alt: "Gallery Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "EtherealDreams",
  },
};

export const viewport:Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { blobs } = await list();
    const imageUrls = blobs.map((blob) => blob.url);
    return (
			<html lang="en" className={`${raleway.variable} ${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
				<body suppressHydrationWarning>
          <div className="block min-h-screen overflow-x-hidden">
            <ImageWarmup imageUrls={imageUrls} />
            <ClientWrapper>
              {children}
						   </ClientWrapper>
					</div>
            <InstallBanners />  
				</body>
			</html>
		);
}