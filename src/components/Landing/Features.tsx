'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TruckIcon, ClockIcon, ShieldCheckIcon, MapPinIcon, CurrencyDollarIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const features = [
  {
    icon: TruckIcon,
    key: 'feature1'
  },
  {
    icon: ClockIcon,
    key: 'feature2'
  },
  {
    icon: ShieldCheckIcon,
    key: 'feature3'
  },
  {
    icon: MapPinIcon,
    key: 'feature4'
  },
  {
    icon: CurrencyDollarIcon,
    key: 'feature5'
  },
  {
    icon: UserGroupIcon,
    key: 'feature6'
  }
];

export default function Features() {
  const t = useTranslations('Features');

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50" />
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {t(`${feature.key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`${feature.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
