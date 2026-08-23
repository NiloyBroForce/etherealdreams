import MyForm from "@/components/Form"
import { img }  from "@/data/Data"; 
import Image from "next/image";


export const metadata = {
	title: "About ",
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

export const dynamic = 'force-static';
export const revalidate = 300;

export default function About() {
  return (<div>
    <section className="relative w-full bg-[#05050a] text-white">
      <div className="grid min-h-[calc(100dvh-80px)] grid-cols-1 lg:grid-cols-[1.15fr_1px_1fr]">
        {/* Image side */}
        <div className="relative h-[55vh] lg:h-full">
          <Image
            src={img()}
            alt="Sky image"
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#05050a]/90" />
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-cyan-300 via-fuchsia-500 to-transparent" />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center rotate-90 whitespace-nowrap text-[10px] font-[family-name:var(--font-body)] uppercase tracking-[0.4em] text-white/30"
          >
            Photography — Artwork
          </span>
        </div>

        <div className="flex flex-col justify-center gap-5 px-6 py-12 sm:px-12 lg:px-16 lg:py-12">
          <span className="text-[11px] font-[family-name:var(--font-body)] uppercase tracking-[0.35em] text-cyan-300/80">
            About
          </span>
        
          <h1 className="-mt-2 font-[family-name:var(--font-display)] text-[10vw] leading-[0.96] tracking-tight sm:text-5xl lg:text-[3.8vw] xl:text-6xl">
            Transient{" "}
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
              traveler
            </span>{" "}
            <br />
            leaving behind the best of what I learned.
          </h1>
        
          <p className="max-w-md font-[family-name:var(--font-body)] text-base leading-relaxed text-white/55">
            I have a passion for photography and a deep interest in artwork.
            All of my photography work is original and created by me.
          </p>
        
          <div className="-mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.2em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-400" />
            No AI-generated artwork
          </div>
        </div>
      </div>
    </section>
    <MyForm />
  </div>
  );
}