"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface PlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlayModal({ isOpen, onClose }: PlayModalProps) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          className="fixed inset-0 flex justify-center items-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Fondo visible y suave */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gradient-to-br from-[#111827] via-[#0D1221] to-[#1f2937] p-10 md:p-12 rounded-xl shadow-2xl w-[90%] max-w-4xl h-auto md:h-[70%] flex flex-col justify-center items-center border border-gray-700"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-2 rounded-full hover:bg-yellow-400 transition text-lg cursor-pointer"
            >
              ✖
            </button>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8 italic tracking-wide">
              PREPÁRATE PARA JUGAR
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-center">
              <div>
                <p className="text-gray-300 mb-4 text-lg">No tengo cuenta</p>
                <button
                  onClick={() => router.push("/register")}
                  className="w-52 h-14 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg text-sm transition shadow-lg cursor-pointer"
                >
                  CREAR UNA
                </button>
              </div>

              <div>
                <p className="text-gray-300 mb-4 text-lg">Tengo una cuenta</p>
                <button
                  onClick={() => router.push("/login")}
                  className="w-52 h-14 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg text-sm transition shadow-lg cursor-pointer"
                >
                  INICIAR SESIÓN
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
