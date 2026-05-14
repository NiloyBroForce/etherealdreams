import MyForm from "@/components/Form"
import { img }  from "@/data/Data"; 
import Image from "next/image"


export const metadata = {
	title: "EtherealDreams ",
	description:
	"A curated collection of dreamlike automotive photography and refractive visual studies. Explore the intersection of light, reflection, and shadow in these abstract landscapes.",
	keywords: [
		"digital art bio",
		"Automotive Photography",
		"dreamlike paintings",
		"Abstract",
	],

	openGraph: {
				title: "EtherealDreams ",		
	
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
	icons: {
			icon: [
				{ url: "favicon-96x96.png", sizes: "96x96", type: "image/png" },
				{ url: "favicon.svg", type: "image/svg+xml" },
			],
			shortcut: "favicon.ico",
			apple: "apple-touch-icon.png",
		},
};

export default function About() {
    return (
        <>
            <Image
                src={img()}
				className="block mx-auto my-8 w-full max-w-full md:w-[900px] h-auto"
                alt="Ethereal Sky"
                width={1920}
                height={1080}
            />
                <MyForm />
        </>
    );
}