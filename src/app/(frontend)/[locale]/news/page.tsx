import { getPayload } from 'payload'
import config from '../../../../payload.config'
import { getTranslations } from 'next-intl/server';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import NewsCard from "@/components/news/NewsCard";

export default async function NewsPage({params}: {params: Promise<{ locale: string }>}) {
    const { locale } = await params;

    const payload = await getPayload({ config });
    const news = await payload.find({
        collection: 'news',
        depth: 1,
        sort: '-date',
        locale: locale as 'ro' | 'en' | 'ru',
    });

    const t = await getTranslations('NewsPage');

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="container max-w-[1280px] mx-auto mb-20 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {news.docs.map((item) => (
                    <NewsCard 
                        key={item.id}
                        image={item.image}
                        date={item.publishedDate}
                        title={item.title}
                        locale={locale}
                        slug={item.slug as string}
                    />
                ))}
            </div>

            <Footer locale={locale as 'ro' | 'en' | 'ru'} />
        </div>
    );
}