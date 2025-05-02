"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export interface Variante {
  color: string;
  disponible: boolean;
  imagenes: string[];
  precio: number;
}

export interface Producto {
  id: number;
  nombre: string;
  variantes: Variante[];
}

interface Props {
  producto: Producto;
  onClose: () => void;
}

const tallasPorDefecto = ["XS", "S", "M", "L", "XL"];
const coloresFake = ["#000000", "#ff0000", "#0000ff"]; // negro, rojo, azul

export default function ProductoModal({ producto, onClose }: Props) {
  const { agregarProducto } = useCart();

  const [colorSeleccionado, setColorSeleccionado] = useState<Variante>(
    producto.variantes.find((v) => v.disponible) || producto.variantes[0]
  );
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string>("M");
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string>(
    colorSeleccionado.imagenes[0]
  );

  useEffect(() => {
    const varianteDefault =
      producto.variantes.find((v) => v.disponible) || producto.variantes[0];
    setColorSeleccionado(varianteDefault);
    setImagenSeleccionada(varianteDefault.imagenes[0]);
    setTallaSeleccionada("M");
  }, [producto]);

  const [toastQueue, setToastQueue] = useState<string[]>([]);
  const [isToastActive, setIsToastActive] = useState(false);

  const showToastEnCola = (mensaje: string) => {
    setToastQueue((prev) => [...prev, mensaje]);
  };

  useEffect(() => {
    if (!isToastActive && toastQueue.length > 0) {
      const nextMessage = toastQueue[0];

      const toastId = toast.success(nextMessage, {
        icon: "✅",
        duration: 2500,
        style: {
          background: "#1f2937",
          color: "#facc15",
          border: "1px solid #facc15",
        },
      });

      setIsToastActive(true);

      setTimeout(() => {
        toast.dismiss(toastId);
        setIsToastActive(false);
        setToastQueue((prev) => prev.slice(1));
      }, 2500);
    }
  }, [toastQueue, isToastActive]);

  const handleAddToCart = () => {
    if (!colorSeleccionado.disponible) return;

    agregarProducto({
      id: `${producto.id}-${colorSeleccionado.color}-${tallaSeleccionada}`,
      nombre: producto.nombre,
      imagen: imagenSeleccionada,
      precio: colorSeleccionado.precio,
      cantidad: 1,
      color: colorSeleccionado.color,
      talla: tallaSeleccionada,
    });

    showToastEnCola("🛒 Producto añadido a la cesta");
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
        >
          ×
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Imagen principal */}
          <div>
            <div className="w-full h-[300px] relative">
              <Image
                src={imagenSeleccionada}
                alt={`${producto.nombre}`}
                fill
                className="object-contain rounded-md"
              />
            </div>
            {/* Miniaturas */}
            <div className="flex gap-2 mt-4 justify-center">
              {colorSeleccionado.imagenes.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Vista ${i + 1}`}
                  width={80}
                  height={80}
                  onClick={() => setImagenSeleccionada(img)}
                  className={`rounded-md cursor-pointer border transition ${
                    imagenSeleccionada === img
                      ? "border-yellow-400"
                      : "border-gray-700 hover:border-yellow-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Info producto */}
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">{producto.nombre}</h2>

            {/* Colores siempre visibles */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Color:</p>
              <div className="flex gap-3 flex-wrap">
                {coloresFake.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      setColorSeleccionado({
                        ...colorSeleccionado,
                        color: color,
                      })
                    }
                    className={`w-10 h-10 rounded-full border-2 transition ${
                      colorSeleccionado.color.toLowerCase() === color
                        ? "border-yellow-400"
                        : "border-gray-700 hover:border-yellow-300"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Tallas siempre visibles */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Talla:</p>
              <div className="flex gap-3 flex-wrap">
                {tallasPorDefecto.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTallaSeleccionada(t)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition ${
                      tallaSeleccionada === t
                        ? "bg-white text-black border-white"
                        : "text-white border-gray-600 hover:border-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Precio */}
            <p className="text-xl text-yellow-400 font-bold mb-4">
              {colorSeleccionado.disponible
                ? `${colorSeleccionado.precio.toFixed(2)}€`
                : "Próximamente"}
            </p>

            {/* Botón */}
            <button
              onClick={handleAddToCart}
              disabled={!colorSeleccionado.disponible}
              className={`w-full py-2 rounded font-bold transition ${
                colorSeleccionado.disponible
                  ? "bg-yellow-500 hover:bg-yellow-400 text-black"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
            >
              {colorSeleccionado.disponible
                ? "Añadir a la cesta"
                : "No disponible"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
