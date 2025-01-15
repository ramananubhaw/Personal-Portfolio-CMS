import { StaticImageData } from "next/image";
import Image from "next/image";

export default function Account({ src, alt }: { src: StaticImageData, alt: string }) {
    return (
        <div className="h-10 w-10 bg-inherit rounded-lg hover:cursor-pointer">
            <Image src={src} alt={alt} className="object-contain h-full w-full bg-inherit rounded-lg"></Image>
        </div>
    )
}