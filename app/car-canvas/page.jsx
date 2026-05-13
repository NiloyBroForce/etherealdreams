import Index from "@/components/Index";
import { carData,  getCarsUrl, } from "@/data/Data"; 


export default function CarCanvasPage() {
	const carsWithUrls = carData.map(img => ({ ...img, link: getCarsUrl(img.link) }));
	return <Index Data={carsWithUrls}/>;
}
