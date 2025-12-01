import Image from "next/image";
import Link from "next/link";
import { Media } from "@/payload-types";

const NewsCard = ({image, date, title, locale, slug} : {image: Media | number | null | undefined , date: string, title: string, locale: string, slug: string | undefined}) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const imageURL = image as Media;
    return (
        <Link href={`/${locale}/news/${slug}`} className="rounded-lg flex flex-col gap-4 group transition-all duration-300 cursor-pointer hover:scale-[1.02]">
            <Image src={imageURL?.url as string} alt="News Image" width={400} height={300} className="w-full aspect-[3/2.2] object-cover rounded-2xl"/>
            <div className="flex flex-col px-2 gap-2 text-[#1D4E1A]">
                <span className="text-sm opacity-70">{formattedDate}</span>
                <h2 className="font-heading text-xl group-hover:opacity-70 transition-opacity duration-300">{title}</h2>
            </div>
        </Link>
    )
}

export default NewsCard;