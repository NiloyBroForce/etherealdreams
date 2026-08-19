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


export default function About() {
  return (<div>
    <section className="relative w-full bg-[#05050a] text-white">
      <div className="grid min-h-[calc(100dvh-80px)] grid-cols-1 lg:grid-cols-[1.15fr_1px_1fr]">
        {/* Image side */}
        <div className="relative h-[55vh] lg:h-full">
          <Image
            src={img()}
            alt="Ethereal Sky"
            fill
            unoptimized
            priority
            className="object-cover"
          />
          {/* fade into the canvas so the split feels stitched, not cropped */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#05050a]/90" />
        </div>

        {/* Signature divider — the site's own gradient bar, reused as structure */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-cyan-300 via-fuchsia-500 to-transparent" />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center rotate-90 whitespace-nowrap text-[10px] font-[family-name:var(--font-body)] uppercase tracking-[0.4em] text-white/30"
          >
            Photography — Artwork
          </span>
        </div>

        {/* Statement side */}
        <div className="flex flex-col justify-center gap-8 px-8 py-16 sm:px-14 lg:px-16 lg:py-0">
          <span className="text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.35em] text-cyan-300/80">
            About
          </span>

          <h1 className="font-[family-name:var(--font-display)] text-[13vw] leading-[0.94] tracking-tight sm:text-6xl lg:text-[4.5vw] xl:text-7xl">
            A temporary
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
              traveler
            </span>
            <br />
            in this world.
          </h1>

          <p className="max-w-md font-[family-name:var(--font-body)] text-lg leading-relaxed text-white/55">
            I have a passion for photography and a deep interest in artwork.
            All of my photography work is original and created by me.
          </p>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-white/70">
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