'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function CTA() {
  const t = useTranslations('CTA');

  return (
    <section className="relative py-28 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            {t('title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <Link href="/contacts">
              <motion.button
                className="cursor-pointer px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all flex items-center gap-3 shadow-2xl shadow-blue-500/30 text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <EnvelopeIcon className="w-6 h-6" />
                {t('button1')}
              </motion.button>
            </Link>

            <motion.a
              href="tel:+123456789"
              className="px-10 py-5 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl transition-all flex items-center gap-3 shadow-2xl text-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <PhoneIcon className="w-6 h-6" />
              {t('button2')}
            </motion.a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <motion.div
              className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              <h3 className="font-bold text-xl mb-3 text-white group-hover:text-blue-300 transition-colors">{t('box1.title')}</h3>
              <p className="text-gray-300 text-base leading-relaxed">{t('box1.description')}</p>
            </motion.div>
            <motion.div
              className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4 }}
            >
              <h3 className="font-bold text-xl mb-3 text-white group-hover:text-blue-300 transition-colors">{t('box2.title')}</h3>
              <p className="text-gray-300 text-base leading-relaxed">{t('box2.description')}</p>
            </motion.div>
            <motion.div
              className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <h3 className="font-bold text-xl mb-3 text-white group-hover:text-blue-300 transition-colors">{t('box3.title')}</h3>
              <p className="text-gray-300 text-base leading-relaxed">{t('box3.description')}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
