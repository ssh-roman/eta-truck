import Image from "next/image";
import Link from "next/link";
import { Media } from "@/payload-types";

const ServiceCard = ({title, subtitle, image, slug} : {title: string, subtitle: string, image: Media | number | null | undefined, slug: string | undefined}) => {
    const imageURL = image as Media;
    return (
        <Link href={`/services/${slug}`} className="rounded-lg flex flex-col gap-4 group transition-all duration-300 cursor-pointer hover:scale-[1.02]">
            <Image src={imageURL?.url as string} alt="News Image" width={400} height={300} className="w-full aspect-[3/2.2] object-cover rounded-2xl"/>
            <div className="flex flex-col gap-2 text-[#1D4E1A]">
                <h2 className="font-heading text-xl group-hover:opacity-70 transition-opacity duration-300">{title}</h2>
                <p className="opacity-90">{subtitle}</p>
            </div>
        </Link>
    )
}

export default ServiceCard;