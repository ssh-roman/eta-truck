import { getPayload } from 'payload'
import config from '../../payload.config'
import { getTranslations } from 'next-intl/server';

import DefaultButton from "../microComponents/DefaultButton"
import NewsCard from "../news/NewsCard"

export default async function News({locale}: {locale: string}) {
    const payload = await getPayload({ config });

    const news = await payload.find({
        collection: 'news',
        limit: 3,
        sort: '-date',
        locale: locale as 'ro' | 'en' | 'ru',
    });

    const t = await getTranslations('NewsPage');
    
    return (
        <>
            {news.docs.length > 0 && 
                <div className="container max-w-[1200px] py-20 lg:py-[150px] px-5 mx-auto w-full flex flex-col items-center gap-12">
                    <div className="flex items-center justify-between gap-5 w-full">
                        <h1 className="text-3xl md:text-5xl tracking-[-1px] max-w-[550px]">{t('title')}</h1>

                        <DefaultButton text={t('readMore')} href={`/${locale}/news`} filled color="blue"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
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
                </div>
            }
        </>
    )
}