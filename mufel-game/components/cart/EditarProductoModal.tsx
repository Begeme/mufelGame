"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ItemCarrito, useCart } from "../../context/CartContext";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import toast from "react-hot-toast";

const tallas = ["XS", "S", "M", "L", "XL"];
const colores = ["#000000", "#ff0000", "#0000ff", "#008000", "#ffffff"];

export default function EditarProductoModal({
  item,
  onClose,
}: {
  item: ItemCarrito;
  onClose: () => void;
}) {
  const { eliminarProducto, agregarProducto } = useCart();
  const [color, setColor] = useState(item.color);
  const [talla, setTalla] = useState(item.talla || "M");
  const [cantidad, setCantidad] = useState(item.cantidad);

  const handleGuardar = () => {
    eliminarProducto(item.id);

    agregarProducto({
      ...item,
      id: `${item.id.split("-")[0]}-${color}-${talla}`,
      color,
      talla,
      cantidad,
    });

    toast.success("Cambios guardados", {
      icon: "✅",
      duration: 2500,
      style: {
        background: "#1f2937",
        color: "#facc15",
        border: "1px solid #facc15",
      },
    });

    onClose();
  };

  const handleCantidadChange = (delta: number) => {
    setCantidad((prev) => Math.max(1, prev + delta));
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-gray-900 w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-lg p-4 sm:p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl hover:text-red-400"
          title="Cerrar sin guardar"
        >
          <FiX />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Imagen */}
          <div className="w-full h-[300px] relative">
            <Image
              src={item.imagen}
              alt={item.nombre}
              fill
              className="object-contain rounded-md"
            />
          </div>

          {/* Info */}
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
              Editar {item.nombre}
            </h2>

            {/* Color */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Color:</p>
              <div className="flex gap-3 flex-wrap">
                {colores.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full border-2 transition ${
                      color === c
                        ? "border-yellow-400"
                        : "border-gray-600 hover:border-yellow-400"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Talla */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Talla:</p>
              <div className="flex gap-3 flex-wrap">
                {tallas.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTalla(t)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition ${
                      talla === t
                        ? "bg-white text-black border-white"
                        : "text-white border-gray-600 hover:border-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Cantidad:</p>
              <div className="flex items-center border border-gray-600 rounded overflow-hidden w-32">
                <button
                  onClick={() => handleCantidadChange(-1)}
                  className="w-10 h-10 text-xl text-white hover:bg-gray-700"
                >
                  -
                </button>
                <div className="flex-1 text-center text-white font-bold">
                  {cantidad}
                </div>
                <button
                  onClick={() => handleCantidadChange(1)}
                  className="w-10 h-10 text-xl text-white hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Guardar */}
            <button
              onClick={handleGuardar}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded transition"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
