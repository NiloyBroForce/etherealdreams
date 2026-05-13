"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image"


const CloseIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</svg>
);
const ImageModal = ({ image,onClose, onPrev, onNext }) => {
	const handleKeyDown = useCallback(
		(e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") onPrev();
			if (e.key === "ArrowRight") onNext();
		},
		[onClose, onPrev, onNext]
	);

	useEffect(() => {
		if (image) {
			document.body.style.overflow = "hidden";
			window.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [image, handleKeyDown]);

	if (!image) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
			onClick={onClose}
		>
			<button
				onClick={onClose}
				className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors z-10"
				aria-label="Close"
			>
				<CloseIcon />
			</button>

			<div
				className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
				onClick={(e) => e.stopPropagation()}
			>
				<Image
					src={image.link}
					alt={image.title}
					width={image.fldWidth}
					height={image.fldHeight}
					priority
					onContextMenu={(e) => e.preventDefault()}
					className="max-w-full max-h-[85vh] object-contain w-auto h-auto"
				/>

				<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
					<h4 className="text-sm text-white uppercase leading-tight tracking-wider font-medium mb-5 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
						{image.title}
					</h4>
				</div>
			</div>

			<button
				onClick={(e) => {
					e.stopPropagation();
					onPrev();
				}}
				className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-foreground hover:text-primary transition-colors"
				aria-label="Previous"
			>
				<svg
					className="w-8 h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>
			<button
				onClick={(e) => {
					e.stopPropagation();
					onNext();
				}}
				className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-foreground hover:text-primary transition-colors"
				aria-label="Next"
			>
				<svg
					className="w-8 h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>
		</div>
	);
};

export default ImageModal;
