"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductoModal from "../merch/ProductModal";
import type { Producto } from "@/data/productos";
import { productos } from "@/data/productos";
import { motion } from "framer-motion";

export default function FeaturedMerch() {
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  const router = useRouter();

  return (
    <section className="relative py-16 -mt-10 bg-gradient-to-b from-black via-[#1c0f0a] to-[#2a0f0f] overflow-hidden">
      {/* Gradiente superior (para transición desde TopRoguelike) */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-0" />

      {/* Gradiente inferior (para unión con Testimonials) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#2a0f0f] to-transparent z-0" />

      <div className="relative z-10 container mx-auto text-center text-white">
        <motion.h2
          className="text-3xl font-bold mb-6 cursor-pointer hover:text-yellow-400 transition"
          onClick={() => router.push("/merch")}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Lo más vendido
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productos.slice(0, 3).map((producto, index) => {
            const varianteActiva =
              producto.variantes.find((v) => v.disponible) ||
              producto.variantes[0];

            return (
              <motion.div
                key={producto.id}
                className="bg-gray-900 p-4 rounded-lg cursor-pointer hover:shadow-lg transition"
                onClick={() => setProductoSeleccionado(producto)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.08 }}
                animate="pulse"
                variants={{
                  pulse: {
                    scale: [1, 1.05, 1],
                    opacity: [1, 0.8, 1],
                  },
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 6,
                  delay: index * 2,
                  ease: "easeInOut",
                }}
                viewport={{ once: false }}
              >
                <Image
                  src={varianteActiva.imagenes[0]}
                  alt={`${producto.nombre} - ${varianteActiva.color}`}
                  width={300}
                  height={200}
                  className="w-full h-64 object-contain rounded-md"
                />
                <h3 className="text-xl font-bold mt-4">{producto.nombre}</h3>
                <p
                  className={`text-lg ${
                    varianteActiva.disponible
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                >
                  {varianteActiva.disponible
                    ? `${varianteActiva.precio}€`
                    : "Próximamente"}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {productoSeleccionado && (
        <ProductoModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </section>
  );
}
