'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function CTA() {
  const t = useTranslations('CTA');

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contacts">
              <motion.button
                className="cursor-pointer px-8 py-4 bg-[#1E3A8A] hover:bg-[#16357a] text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <EnvelopeIcon className="w-5 h-5" />
                {t('button1')}
              </motion.button>
            </Link>

            <motion.a
              href="tel:+123456789"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PhoneIcon className="w-5 h-5" />
              {t('button2')}
            </motion.a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{t('box1.title')}</h3>
              <p className="text-gray-300 text-sm">{t('box1.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{t('box2.title')}</h3>
              <p className="text-gray-300 text-sm">{t('box2.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{t('box3.title')}</h3>
              <p className="text-gray-300 text-sm">{t('box3.description')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
