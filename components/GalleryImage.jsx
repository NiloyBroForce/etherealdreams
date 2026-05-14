"use client";

import { useState } from "react";
import Image from "next/image";

const GalleryImage = ({ image, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const aspectRatio = image.fldWidth / image.fldHeight;
  const src = image.link;
  const flexVal = (aspectRatio * 100).toFixed(3);

  return (
    <div
      className="gallery-item relative cursor-pointer overflow-hidden self-start align-top"
      style={{
        flexGrow: flexVal,
        flexShrink: 1,
        flexBasis: "0%",
        minWidth: aspectRatio > 1 ? "200px" : "120px",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      onTouchCancel={() => setIsActive(false)}
      suppressHydrationWarning
    >
      <div
        className="relative w-full block leading-[0] overflow-hidden"
        style={{
          paddingBottom: `${(image.fldHeight / image.fldWidth) * 100}%`,
        }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 bg-neutral-800 animate-pulse z-0" />
        )}

        <Image
          src={src}
          alt={image.title || "Artwork"}
          width={image.fldWidth}
          height={image.fldHeight}
          sizes="(max-width: 768px) 50vw, 33vw"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
					className={`absolute inset-0 z-10 bg-black/70 flex flex-col justify-center items-center px-10 py-5 text-center transition-opacity duration-900 ${
            isActive ? "scale-105" : "scale-100"
          } ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />

       <div
					className={`absolute inset-0 z-10 bg-black/70 flex flex-col justify-center items-center px-10 py-5 text-center transition-opacity duration-900 ${
						isActive ? "opacity-100" : "opacity-0"
					}`}
				>
					<h3 className="text-[clamp(1rem,4vw,1.5rem)] text-white font-semibold uppercase leading-tight mb-5">
						{image.title}
					</h3>
					<div className="w-[3.125rem] h-[0.3rem] bg-cyan-400" />
				</div>
			</div>
		</div>
	);
};

export default GalleryImage;