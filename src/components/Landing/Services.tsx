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
    <section className="py-24 px-4 bg-white">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-96 bg-gray-200">
                {/* Placeholder for images - replace with actual images */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center">
                  <span className="text-white text-7xl font-bold opacity-10">
                    {index + 1}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="text-white/95 text-base leading-relaxed">
                    {t(`${service.key}.description`)}
                  </p>
                </motion.div>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-lg">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
