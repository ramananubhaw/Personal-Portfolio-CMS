import { StaticImageData } from "next/image";
import Image from "next/image";

export default function Account({ src, alt, href }: { src: StaticImageData, alt: string, href?: string }) {
    return (
        <div className="h-10 w-10 bg-inherit rounded-lg hover:cursor-pointer">
            <a href={href} target="_blank" className="bg-transparent"><Image src={src} alt={alt} className="object-contain h-full w-full bg-inherit rounded-lg"></Image></a>
        </div>
    )
}