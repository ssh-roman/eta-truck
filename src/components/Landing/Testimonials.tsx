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
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          className="max-w-4xl mx-auto mb-12 bg-white p-8 md:p-12 rounded-2xl shadow-lg"
          key={activeIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
            ))}
          </div>
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            "{t(`${testimonials[activeIndex].key}.quote`)}"
          </p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl">
              {t(`${testimonials[activeIndex].key}.name`).charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {t(`${testimonials[activeIndex].key}.name`)}
              </div>
              <div className="text-sm text-gray-600">
                {t(`${testimonials[activeIndex].key}.company`)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.key}
              className={`bg-white p-6 rounded-xl shadow-sm cursor-pointer transition-all ${
                index === activeIndex ? 'ring-2 ring-blue-600' : 'hover:shadow-md'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                "{t(`${testimonial.key}.quote`)}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                  {t(`${testimonial.key}.name`).charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">
                    {t(`${testimonial.key}.name`)}
                  </div>
                  <div className="text-xs text-gray-600">
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
