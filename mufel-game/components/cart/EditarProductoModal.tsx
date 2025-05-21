"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import toast from "react-hot-toast";
import type { Producto, Variante } from "@/data/productos";
import { ItemCarrito, useCart } from "../../context/CartContext";

const colorToHex = (color: string) => {
  switch (color.toLowerCase()) {
    case "negro":
      return "#000000";
    case "blanco":
      return "#ffffff";
    case "rojo":
      return "#ff0000";
    case "azul":
      return "#0000ff";
    case "amarillo":
      return "#ffff00";
    default:
      return "#777";
  }
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export default function EditarProductoModal({
  item,
  producto,
  onClose,
}: {
  item: ItemCarrito;
  producto: Producto;
  onClose: () => void;
}) {
  const { eliminarProducto, agregarProducto } = useCart();
  const esUnico = producto.tipoOpciones === "unico";
  const soloTalla = producto.tipoOpciones === "talla";

  const isMobile = useIsMobile();

  const [colorSeleccionado, setColorSeleccionado] = useState<Variante>(
    producto.variantes.find((v) => v.color === item.color) ||
      producto.variantes[0]
  );
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string>(
    item.talla || "M"
  );
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string>(
    colorSeleccionado.imagenes[0]
  );
  const [cantidad, setCantidad] = useState(item.cantidad);

  const handleGuardar = () => {
    eliminarProducto(item.id);

    const id = soloTalla
      ? `${producto.id}-${tallaSeleccionada}`
      : `${producto.id}-${colorSeleccionado.color}-${tallaSeleccionada}`;

    agregarProducto({
      id,
      nombre: producto.nombre,
      imagen: imagenSeleccionada,
      precio: colorSeleccionado.precio,
      cantidad,
      color: colorSeleccionado.color,
      talla: tallaSeleccionada,
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

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile]);

  const handleCantidadChange = (delta: number) => {
    setCantidad((prev) => Math.max(1, prev + delta));
  };

  return (
    <motion.div
      className={`fixed inset-0 ${
        isMobile ? "z-[10000]" : "z-50"
      } bg-black bg-opacity-80 flex items-center justify-center p-4`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-gray-900 w-full ${
          isMobile ? "h-full rounded-none" : "max-w-3xl max-h-[95vh] rounded-lg"
        } overflow-y-auto p-4 sm:p-6 relative`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl hover:text-red-400 cursor-pointer z-[10001]"
        >
          ×
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full h-[300px] relative">
            <Image
              src={imagenSeleccionada}
              alt={producto.nombre}
              fill
              className="object-contain rounded-md"
            />
          </div>

          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
              Editar {producto.nombre}
            </h2>

            <p className="text-xl text-yellow-400 font-bold mb-4">
              {colorSeleccionado.precio.toFixed(2)} €
            </p>

            {!esUnico && (
              <>
                {!soloTalla && (
                  <div className="mb-4">
                    <p className="font-semibold mb-2">Color:</p>
                    <div className="flex gap-3 flex-wrap">
                      {producto.variantes.map((v) => (
                        <button
                          key={v.color}
                          onClick={() => {
                            setColorSeleccionado(v);
                            setImagenSeleccionada(v.imagenes[0]);
                          }}
                          className={`w-10 h-10 rounded-full border-2 transition cursor-pointer ${
                            colorSeleccionado.color === v.color
                              ? "border-yellow-400"
                              : "border-gray-600 hover:border-yellow-400"
                          }`}
                          style={{ backgroundColor: colorToHex(v.color) }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {(producto.tipoOpciones === "completo" || soloTalla) &&
                  producto.tallas && (
                    <div className="mb-4">
                      <p className="font-semibold mb-2">Talla:</p>
                      <div className="flex gap-3 flex-wrap">
                        {producto.tallas.map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              setTallaSeleccionada(t);
                              if (soloTalla) {
                                const variante = producto.variantes.find(
                                  (v) =>
                                    v.color.toLowerCase() === t.toLowerCase()
                                );
                                if (variante) {
                                  setColorSeleccionado(variante);
                                  setImagenSeleccionada(variante.imagenes[0]);
                                }
                              }
                            }}
                            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition cursor-pointer ${
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
                  )}
              </>
            )}

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
