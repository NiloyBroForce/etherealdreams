import "@/styles/globals.css";
import { getImg }  from "@/data/Data"; 
import { Raleway } from "next/font/google";

const raleway = Raleway({
	subsets: ["latin"],
	variable: "--font-raleway", 
	display: "swap",
});

import ClientWrapper from "@/components/Layout";

export const metadata = {
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

	openGraph: {
				title: "EtherealDreams | Surreal Automotive & Abstract Visual Art",		
	
			description:"A curated collection of dreamlike automotive photography, paintings and refractive visual studies. Explore the intersection of light, reflection, and shadow in these abstract landscapes.",
				url: "https://etherealdreams.vercel.app/",
						siteName: "EtherealDreams",
				
		images: [
			{
				
				url:`/api/og?title=EtherealDreams`,
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
			{ url: "favicon-96x96.png", sizes: "96x96", type: "image/png" },
			{ url: "favicon.svg", type: "image/svg+xml" },
		],
		shortcut: "favicon.ico",
		apple: "apple-touch-icon.png",
	},
};

export default function RootLayout({ children }) {
    return (
			<html lang="en" className={raleway.variable} suppressHydrationWarning>
				<body
					className="flex flex-col min-h-screen"
					suppressHydrationWarning
				>
					<ClientWrapper>{children}</ClientWrapper>
				</body>
			</html>
		);
}