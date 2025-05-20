"use client";

import { motion } from "framer-motion";

export default function Lore() {
  return (
    <section className="relative py-20 -mt-10 bg-gradient-to-b from-black via-[#1c0f0a] to-[#2a0f0f] text-white overflow-hidden">
      {/* Gradiente superior para conectar con GameModes */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-0" />
      {/* Gradiente inferior si el siguiente componente lo necesita */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#2a0f0f] to-transparent z-0" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.h2
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          La Historia de Mufel
        </motion.h2>

        <motion.p
          className="mt-4 text-lg text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          En lo más profundo del infierno, donde las llamas nunca se apagan y
          las sombras cobran vida, nació{" "}
          <span className="text-yellow-500 font-bold">Mufel</span>, hijo del
          despiadado soberano de los condenados. Criado en la oscuridad y
          forjado en la batalla, su destino parecía estar escrito: gobernar a
          los caídos y extender el dominio del inframundo. Sin embargo, su
          padre, temiendo su potencial, lo desterró, expulsándolo hacia el mundo
          de los mortales.
        </motion.p>

        <motion.div
          className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-yellow-500">
            El Viaje de Regreso
          </h3>
          <p className="mt-2 text-gray-300">
            Ahora, sin su poder demoníaco completo, Mufel deberá abrirse camino
            a través de diferentes mundos, enfrentándose a hordas de criaturas
            que intentarán impedir su regreso. Cada paso lo acercará más a su
            destino, cada batalla lo hará más fuerte, y cada enemigo derrotado
            le revelará un fragmento de su verdadero poder.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-yellow-500">
            Dos Caminos, Un Solo Destino
          </h3>
          <p className="mt-2 text-gray-300">
            Mufel puede escoger dos rutas en su travesía:
          </p>
          <motion.ul
            className="text-gray-300 mt-4 space-y-3 text-left list-disc list-inside"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {[
              {
                icon: "🏆",
                label: "Modo Plataformas",
                text: "Un camino de precisión y reflejos, donde deberá sortear abismos, trampas y estructuras inestables mientras avanza con determinación hacia su objetivo.",
              },
              {
                icon: "⚔️",
                label: "Modo Roguelike",
                text: "Un desafío impredecible donde cada mazmorra es única, con enemigos cada vez más feroces y poderes ocultos que lo acercarán, paso a paso, a la confrontación final con su padre.",
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                {item.icon}{" "}
                <span className="font-bold text-yellow-400">{item.label}:</span>{" "}
                {item.text}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.p
          className="mt-8 text-lg text-gray-300 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          &quot;El infierno no es solo un lugar... es el reflejo de aquellos que
          se atreven a desafiarlo. ¿Tendrás el valor de recuperar lo que es
          tuyo?&quot;
        </motion.p>
      </div>
    </section>
  );
}
