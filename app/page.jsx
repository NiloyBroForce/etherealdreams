import Index from "@/components/Index";
import { canvasData,getPaintUrl } from "@/data/Data"; 
import { getImg }  from "@/data/Data"; 

export const metadata = {
	title: "EtherealDreams | Surreal Automotive & Abstract Visual Art",
	description:
	"A curated collection of dreamlike automotive photography and refractive visual studies. Explore the intersection of light, reflection, and shadow in these abstract landscapes.",
	keywords: [
		"digital art bio",
		"Automotive Photography",
		"dreamlike paintings",
		"Abstract",
	],

	openGraph: {
				title: "EtherealDreams | Surreal Automotive & Abstract Visual Art",		
	
			description:"A curated collection of dreamlike automotive photography and refractive visual studies. Explore the intersection of light, reflection, and shadow in these abstract landscapes.",
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
};


export default function HomePage() {
	const paintingsWithUrls = canvasData.map(img => ({ ...img, link: getPaintUrl(img.link) }));
	return <Index Data={paintingsWithUrls} />;
}
