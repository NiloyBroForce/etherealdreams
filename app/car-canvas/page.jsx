import Index from "@/components/Index";
import { carData,  getCarsUrl, } from "@/data/Data"; 

export const metadata = {
	title: "CarCanvas",
	description:
	"A curated collection of dreamlike automotive photography and refractive visual studies. Explore the intersection of light, reflection, and shadow in these abstract landscapes.",
	keywords: [
		"digital art bio",
		"Automotive Photography",
		"dreamlike paintings",
		"Abstract",
	],

	openGraph: {
				title: "CarCanvas",		
	
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

export default function CarCanvasPage() {
	const carsWithUrls = carData.map(img => ({ ...img, link: getCarsUrl(img.link) }));
	return <Index Data={carsWithUrls}/>;
}
