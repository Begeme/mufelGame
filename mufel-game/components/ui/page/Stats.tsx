"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Stats() {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 -mt-10 bg-gradient-to-b from-black via-[#0e0e0e] to-[#1c0f0a] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1c0f0a] to-transparent z-0" />

      <div className="relative z-10 container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t("stats.title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          {[
            { valor: "500,000+", texto: t("stats.players") },
            { valor: "120,000+", texto: t("stats.matches") },
            { valor: "99%", texto: t("stats.uptime") },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: false }}
            >
              <h3 className="text-2xl font-bold">{item.valor}</h3>
              <p className="text-gray-400">{item.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
