import { getPayload } from 'payload'
import config from '../../payload.config'
import { getTranslations } from 'next-intl/server';

import DefaultButton from '../microComponents/DefaultButton';
import NewsCard from './NewsCard';

export default async function LatestNews({locale, excludeCurrentId} : {locale: string, excludeCurrentId: number}) {
    const payload = await getPayload({ config })
    const last3News = await payload.find({ collection: 'news', limit: 3, sort: '-publishedDate', where: { id: { not_equals: excludeCurrentId } } });

    const t = await getTranslations('LatestNews');

    return (
        <div className='bg-[#F3EBD2] w-full border-y border-[#1d4e1a27]'>
            {last3News && last3News.docs.length > 0 && (
                <div className="container max-w-[1000px] text-[#1D4E1A] mx-auto px-5 py-16 flex flex-col items-center gap-5">
                    <div className='flex justify-between w-full items-center mb-5'>
                        <h2 className="font-heading text-xl lg:text-3xl font-light">{t('title')}</h2>
                        <DefaultButton text={t('viewAll')} filled color='green' href='/news' />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                        {last3News.docs.map((newsItem) => (
                            <NewsCard 
                                key={newsItem.id}
                                date={newsItem.publishedDate}
                                image={newsItem.image}
                                title={newsItem.title}
                                locale={locale}
                                slug={newsItem.slug as string}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}