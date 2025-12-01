'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const services = [
  {
    key: 'service1',
    image: '/images/service1.jpg'
  },
  {
    key: 'service2',
    image: '/images/service2.jpg'
  },
  {
    key: 'service3',
    image: '/images/service3.jpg'
  },
  {
    key: 'service4',
    image: '/images/service4.jpg'
  }
];

export default function Services() {
  const t = useTranslations('Services');

  return (
    <section className="py-20 px-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative h-80 bg-gray-200">
                {/* Placeholder for images - replace with actual images */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <span className="text-white text-6xl font-bold opacity-20">
                    {index + 1}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-white/90 text-sm">
                  {t(`${service.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
