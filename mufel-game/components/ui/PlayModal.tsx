"use client";
import { useEffect } from "react";

interface PlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlayModal({ isOpen, onClose }: PlayModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-[#000000d5] bg-opacity-50 "></div>

      <div className="relative bg-[#0D1221] p-12 rounded-lg shadow-lg w-[70%] max-w-4xl md:max-w-5xl h-[70%] flex flex-col justify-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-yellow-500 text-black p-3 rounded-lg hover:bg-yellow-400 transition"
        >
          ✖
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-8 italic">
          PREPÁRATE PARA JUGAR
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-[#0D1221] pt-7">
          <div className="text-center">
            <p className="text-gray-400 mb-3 text-lg">No tengo cuenta</p>
            <button className=" w-50 h-15 bg-blue-400 px-10 py-5 rounded-lg font-bold text-sm hover:bg-blue-300 transition">
              CREAR UNA
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-3 text-lg">Tengo una cuenta</p>
            <button className="w-50 h-15 bg-yellow-500 px-10 py-5 rounded-lg font-bold text-sm hover:bg-yellow-400 transition">
              INICIAR SESIÓN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
