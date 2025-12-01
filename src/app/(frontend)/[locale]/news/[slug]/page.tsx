import { getPayload } from 'payload'
import config from '../../../../../payload.config'
import Link from 'next/link'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { getTranslations } from 'next-intl/server';

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LatestNews from '@/components/news/LatestNews'

// Type for your news item based on Payload collection
interface Media {
    id: number
    url: string
    altText?: string
    filename: string
    mimeType: string
    filesize: number
    width: number
    height: number
}

interface NewsItem {
    id: number
    title: string
    subtitle: string
    slug: string
    publishedDate: string
    content: SerializedEditorState
    image: Media
    excerpt?: string
    status: 'draft' | 'published'
    createdAt: string
    updatedAt: string
}

export default async function NewsDetails({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>
}) {
    const { slug, locale } = await params
    const payload = await getPayload({ config })

    const response = await payload.find({
        collection: 'news',
        where: {
            slug: {
                equals: slug
            }
        },
        depth: 1,
        locale: locale as 'ro' | 'en' | 'ru',
    })

    const t = await getTranslations('NewsDetails');

    const newsItem = response.docs[0] as NewsItem

    if (!newsItem) {
        return <div>News item not found</div>
    }

    // Format the date
    const publishedDate = new Date(newsItem.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className='w-full bg-[#1D4E1A] h-[360px]'></div>
            <div className="container max-w-[700px] mx-auto px-5 flex-grow -translate-y-[200px]">
                {/* Back to news link */}
                <Link
                    href="/news"
                    className="inline-flex items-center text-[#1D4E1A] bg-[#ECE6CC] hover:underline border-b-1 border-black/10 py-4 px-6 w-full border rounded-t-3xl"
                >
                    ← {t('backToNews')}
                </Link>

                {/* News article container */}
                <article className="bg-[#F2EAD1] border border-t-0 border-black/10 overflow-hidden rounded-b-3xl">
                    <div className='flex flex-col gap-4 border-b-1 border-black/10 p-6'>
                        {/* Date */}
                        <div className="text-[#1D4E1A]/60">
                            {publishedDate}
                        </div>

                        <div className='flex flex-col gap-3'>
                            {/* Title */}
                            <h1 className="text-2xl lg:text-3xl font-heading text-[#1D4E1A] leading-tight">
                                {newsItem.title}
                            </h1>

                            {/* Subtitle */}
                            {newsItem.subtitle && (
                                <p className="text-[#1D4E1A] leading-relaxed">
                                    {newsItem.subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Featured Image */}
                    {newsItem.image && (
                        <div className='p-6 bg-[#ECE6CC] border-b border-black/10'>
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                <Image
                                    src={newsItem.image.url}
                                    alt={newsItem.image.altText || newsItem.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    )}

                    {/* Content with RichText component */}
                    <div className="px-6">
                        <RichText data={newsItem.content} />
                    </div>
                </article>
            </div>

            <LatestNews locale={locale} excludeCurrentId={newsItem.id} />

            <Footer locale={locale as 'ro' | 'en' | 'ru'} />
        </div>
    )
}