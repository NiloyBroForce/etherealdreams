"use client";

import { useState, useMemo, useEffect } from "react";
import GalleryImage from "./GalleryImage";
import ImageModal from "./ImageModal";

const MasonryGallery = ({ images = []}) => {
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const rows = useMemo(() => {
		if (windowWidth === 0) return [];

		const result = [];
		const maxRowWidth = windowWidth < 1024 ? windowWidth - 32 : 1400;
		const targetRowHeight = windowWidth < 1024 ? 250 : 350;

		// Mobile logic
		if (windowWidth < 640) return images.map((img) => [img]);

		let currentRow = [];
		let currentRowWidth = 0;

		images.forEach((image) => {
			const aspect = image.fldWidth / image.fldHeight;
			const imgW = targetRowHeight * aspect;

			if (currentRowWidth + imgW > maxRowWidth && currentRow.length > 0) {
				result.push([...currentRow]);
				currentRow = [image];
				currentRowWidth = imgW;
			} else {
				currentRow.push(image);
				currentRowWidth += imgW;
			}
		});
		if (currentRow.length > 0) result.push(currentRow);
		return result;
	}, [windowWidth, images]);

	// 3. HYDRATION GUARD
	if (windowWidth === 0) {
		return <div className="w-full px-2 min-h-screen opacity-0" />;
	}

	let runningIndex = 0;

	return (
		<>
			<div className="w-full px-2 pt-4 pb-4 bg-[#101018]">
				{rows.map((row, rowIndex) => (
					<div
						key={`row-${rowIndex}`}
						className="flex gap-2 mb-2"
						style={{ minHeight: "150px" }}
					>
						{row.map((image) => {
							const currentIndex = runningIndex++; 
							return (
								<GalleryImage
									key={image.link}
									image={image}
									onClick={() => setSelectedIndex(currentIndex)}
								/>
							);
						})}
					</div>
				))}
			</div>

			<ImageModal
				image={selectedIndex !== null ? images[selectedIndex] : null}
				onClose={() => setSelectedIndex(null)}
				onPrev={() =>
					setSelectedIndex((prev) =>
						prev === 0 ? images.length - 1 : prev - 1
					)
				}
				onNext={() =>
					setSelectedIndex((prev) =>
						prev === images.length - 1 ? 0 : prev + 1
					)
				}
			/>
		</>
	);
};

export default MasonryGallery;
