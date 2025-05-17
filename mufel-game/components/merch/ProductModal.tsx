"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import type { Producto, Variante } from "@/data/productos";

interface Props {
  producto: Producto;
  onClose: () => void;
}

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
    case "clásica":
      return "#444";
    case "xl":
      return "#888";
    default:
      return "#777";
  }
};

export default function ProductoModal({ producto, onClose }: Props) {
  const { agregarProducto } = useCart();

  const esUnico = producto.tipoOpciones === "unico";
  const soloTalla = producto.nombre.toLowerCase().includes("alfombrilla");

  const [colorSeleccionado, setColorSeleccionado] = useState<Variante>(
    producto.variantes.find((v) => v.disponible) || producto.variantes[0]
  );
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string>(
    producto.tallas?.[0] || "M"
  );
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string>(
    colorSeleccionado.imagenes[0]
  );

  useEffect(() => {
    const varianteDefault =
      producto.variantes.find((v) => v.disponible) || producto.variantes[0];
    setColorSeleccionado(varianteDefault);
    setImagenSeleccionada(varianteDefault.imagenes[0]);

    if (soloTalla && producto.tallas) {
      const tallaPorDefecto = producto.tallas[0];
      setTallaSeleccionada(tallaPorDefecto);
      const variantePorTalla = producto.variantes.find(
        (v) => v.color.toLowerCase() === tallaPorDefecto.toLowerCase()
      );
      if (variantePorTalla) {
        setColorSeleccionado(variantePorTalla);
        setImagenSeleccionada(variantePorTalla.imagenes[0]);
      }
    } else {
      setTallaSeleccionada(producto.tallas?.[0] || "M");
    }
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

    const id = soloTalla
      ? `${producto.id}-${tallaSeleccionada}`
      : `${producto.id}-${colorSeleccionado.color}-${tallaSeleccionada}`;

    agregarProducto({
      id,
      nombre: producto.nombre,
      imagen: imagenSeleccionada,
      precio: colorSeleccionado.precio,
      cantidad: 1,
      color: colorSeleccionado.color,
      talla: tallaSeleccionada,
    });

    showToastEnCola("🛒 Producto añadido a la cesta");
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-lg p-4 sm:p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl hover:text-red-400 cursor-pointer"
        >
          ×
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="w-full h-[300px] relative">
              <Image
                src={imagenSeleccionada}
                alt={producto.nombre}
                fill
                className="object-contain rounded-md"
              />
            </div>
            {colorSeleccionado.imagenes.length > 1 && (
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
            )}
          </div>

          <div
            className={`text-white ${
              esUnico
                ? "flex flex-col items-center justify-center text-center gap-4"
                : ""
            }`}
          >
            <h2 className="text-2xl font-bold mb-2">{producto.nombre}</h2>

            {colorSeleccionado.color.toLowerCase().includes("edición") && (
              <div className="inline-block px-3 py-1 mb-2 rounded-full text-xs font-bold bg-yellow-400 text-black animate-pulse shadow-md">
                🎖 Edición Limitada
              </div>
            )}

            {producto.descripcion && (
              <p className="text-sm text-gray-400 max-w-md mb-2">
                {producto.descripcion}
              </p>
            )}
            <p className="text-xl text-yellow-400 font-bold">
              {colorSeleccionado.disponible
                ? `${colorSeleccionado.precio.toFixed(2)}€`
                : "Próximamente"}
            </p>

            {!esUnico && (
              <>
                {!soloTalla && (
                  <div className="mb-4">
                    <p className="font-semibold mb-2">Color:</p>
                    <div className="flex gap-3 flex-wrap">
                      {producto.variantes.map((variante, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setColorSeleccionado(variante);
                            setImagenSeleccionada(variante.imagenes[0]);
                          }}
                          className={`w-10 h-10 rounded-full border-2 transition cursor-pointer ${
                            colorSeleccionado.color === variante.color
                              ? "border-yellow-400"
                              : "border-gray-700 hover:border-yellow-300"
                          }`}
                          style={{
                            backgroundColor: colorToHex(variante.color),
                          }}
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

            <button
              onClick={handleAddToCart}
              disabled={!colorSeleccionado.disponible}
              className={`w-full max-w-xs py-2 rounded font-bold transition cursor-pointer ${
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
