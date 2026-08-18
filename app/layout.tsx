import "@/styles/globals.css";
import { Raleway } from "next/font/google";
import ClientWrapper from "@/components/Layout";
import type { Metadata, Viewport } from "next";
import { InstallBanners } from "@/components/Banner";

const raleway = Raleway({
	subsets: ["latin"],
	variable: "--font-raleway", 
	display: "swap",
});

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
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
			<html lang="en" className={raleway.variable} suppressHydrationWarning>
				<body suppressHydrationWarning>
					<div className="block min-h-screen overflow-x-hidden">
						<ClientWrapper>{children}
						   </ClientWrapper>
					</div>
            <InstallBanners />  
				</body>
			</html>
		);
}