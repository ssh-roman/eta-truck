'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcher from './LocaleSwitcher'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations('Navbar')
  const locale = useLocale()

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.25
      setScrolled(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: "Acasa", href: '/' },
    { name: "Transport Agabaritic", href: '/news' },
    { name: "Transport Auto", href: '/about' },
    { name: "Destinatii", href: '/about' },
    { name: "Parc Auto", href: '/truck' },
    { name: "Contact", href: '/contacts' },
  ]

  return (
    <header className="top-0 z-30 relative">
      <nav
        className={`z-30 flex flex-col justify-center w-full bg-[#212356] backdrop-blur-md`}
        aria-label="Global"
      >
        <div className='w-full h-[30vh] lg:h-[45vh] relative border-b-4 border-white'>
          <Image src="/header/hqimage.jpg" alt="Eta Truck Logo" quality={100} fill className='object-cover' />
          <div className='absolute h-full left-0 w-[10%] lg:w-[3%] bg-[#212356]/80'></div>
          <div className='absolute h-full right-0 w-[30%] lg:w-[20%] bg-[#212356]/80'></div>
          <Image src="/logo/logo.svg" alt="Eta Truck Logo" width={200} height={50} className='absolute right-0 m-8 lg:m-12 w-[15vw] lg:w-[13vw]' />
        </div>
        <div className="container max-w-[1200px] mx-auto flex gap-8 justify-between items-center">
          <div className='hidden sm:flex'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                locale={locale}
                className="cursor-pointer text-white hover:bg-[#505176] p-4 uppercase font-bold whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:hidden px-2">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed w-fit left-0 top-0 hidden sm:flex items-center justify-center gap-2 m-8 px-5 py-2 rounded-full ${scrolled ? 'bg-[#212356]/90 backdrop-blur-md' : 'bg-[#212356]/80 backdrop-blur-sm'}`}>
        <LocaleSwitcher />
      </div>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-blue-900 px-6 py-12 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex gap-4 text-white font-bold text-xl">
              {t('logo')}
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white transition-all duration-300 hover:bg-white/10"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="py-6 flex items-center justify-between">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
