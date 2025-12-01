'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-6 justify-center flex-col py-20 px-4">
        <motion.div
          className="flex flex-col items-center justify-center gap-6 text-center text-black/90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-medium text-4xl sm:text-5xl leading-tight max-w-5xl">
            {t('title')}
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
