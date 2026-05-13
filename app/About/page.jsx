import MyForm from "@/components/Form"
import { getImg,img }  from "@/data/Data"; 
import Image from "next/image"


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
				url: getImg(), 
				width: 1200,
				height: 630,
				alt: "Gallery Preview",
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
                src={img()}
				className="block mx-auto my-5 w-full max-w-200 h-auto"
                alt="Ethereal Sky"
                width={1920}
                height={1080}
            />
                <MyForm />
        </>
    );
}