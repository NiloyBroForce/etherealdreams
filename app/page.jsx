import Index from "@/components/Index";
import { canvasData,getPaintUrl } from "@/data/Data"; 
import { getImg }  from "@/data/Data"; 

export const metadata = {
	title: "EtherealDreams",
	description: "Explore dreamlike visuals and mystic art.",
	keywords:
		"art, design, 2d, 3d, lto, livetooffend, automotive, concept, concept art, sci-fi, scifi, cyberpunk, future, drift, automotive, vehicles, prints, 3dsmax, keyshot, corona, artist, digital",
	
		openGraph: {
		title: "Ethereal Dreams",
		description: "Explore dreamlike visuals and mystic art.",
		url: "https://etherealdreams.vercel.app/",
		siteName: "EtherealDreams",
		images: [
			{
				url: getImg(), 
				width: 1200,
				height: 630,
			},
		],
		locale: "en_US",
		type: "website",
	},
};


export default function HomePage() {
	const paintingsWithUrls = canvasData.map(img => ({ ...img, link: getPaintUrl(img.link) }));
	return <Index Data={paintingsWithUrls} />;
}
