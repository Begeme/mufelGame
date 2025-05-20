"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false, // 🔁 animar al entrar/salir de pantalla, no solo una vez
    margin: "-50px", // se activa un poco antes de estar completamente visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 30, scale: 0.98 }
      }
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
