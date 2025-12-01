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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`${feature.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
