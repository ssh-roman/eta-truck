import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { Roboto_Condensed, Calistoga, Cabin_Condensed } from 'next/font/google'
import { routing } from '@/i18n/routing'
import clsx from 'clsx'
import '../globals.css'
import { Toaster } from 'react-hot-toast'

const calistoga = Calistoga({ subsets: ['latin'], variable: '--font-calistoga', weight: '400' });
const cabinCondensed = Cabin_Condensed({ subsets: ['latin'], variable: '--font-cabin-condensed', weight: ['400', '700'] });
const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], variable: '--font-roboto-condensed', weight: ['400', '700'] });

export const metadata = {
  title: 'ETA Truck - Transportation Solutions',
  description: 'Professional trucking and transportation services',
  keywords: 'trucking, transportation, logistics, freight, delivery',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={clsx(robotoCondensed.variable)}>
      <body>
        <NextIntlClientProvider>
          {children}
          <Toaster position="bottom-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
