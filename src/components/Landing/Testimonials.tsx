'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const testimonials = [
  { key: 'testimonial1' },
  { key: 'testimonial2' },
  { key: 'testimonial3' },
  { key: 'testimonial4' },
  { key: 'testimonial5' },
  { key: 'testimonial6' }
];

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          className="relative max-w-5xl mx-auto mb-16 bg-gradient-to-br from-blue-600 to-blue-800 p-10 md:p-14 rounded-3xl shadow-2xl overflow-hidden"
          key={activeIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex mb-6">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-yellow-300" />
              ))}
            </div>
            <p className="text-2xl md:text-3xl text-white mb-8 leading-relaxed font-light">
              "{t(`${testimonials[activeIndex].key}.quote`)}"
            </p>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl border-2 border-white/30">
                {t(`${testimonials[activeIndex].key}.name`).charAt(0)}
              </div>
              <div>
                <div className="font-bold text-xl text-white">
                  {t(`${testimonials[activeIndex].key}.name`)}
                </div>
                <div className="text-base text-blue-100">
                  {t(`${testimonials[activeIndex].key}.company`)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.key}
              className={`group bg-white p-7 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 border-2 ${
                index === activeIndex
                  ? 'border-blue-600 shadow-xl scale-105'
                  : 'border-transparent hover:border-blue-200 hover:shadow-xl hover:scale-102'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setActiveIndex(index)}
              whileHover={{ y: -4 }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-base mb-5 line-clamp-3 leading-relaxed">
                "{t(`${testimonial.key}.quote`)}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {t(`${testimonial.key}.name`).charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-base text-gray-900">
                    {t(`${testimonial.key}.name`)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t(`${testimonial.key}.company`)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
