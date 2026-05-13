import MyForm from "@/components/Form"
import { getImg }  from "@/data/Data"; 
import Image from "next/image"


// app/about/page.jsx
export const metadata = {
	title: "EtherealDreams",
	description:
		"Learn about the vision behind EtherealDreams. The artist is specializing in automotive art, and dreamlike paintings.",
	keywords: [
		"digital art bio",
		"automotive artist",
		"dreamlike paintings",
		"EtherealDreams creator",
	],

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
				alt: "Digital Artist",
			},
		],
        locale: "en_US",
		type: "website",
	},
};

export default function About() {
    return (
        <>
            <Image
                src={getImg()}
				className="block mx-auto my-5 w-full max-w-200 h-auto"
                alt="Ethereal Sky"
                width={1920}
                height={1080}
            />
                <MyForm />
        </>
    );
}