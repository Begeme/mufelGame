"use client";
import Image from "next/image";
import { useState } from "react";
import { ItemCarrito, useCart } from "../../context/CartContext";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import EditarProductoModal from "./EditarProductoModal";
import toast from "react-hot-toast";
import { productos } from "@/data/productos";

export default function CartItemEditable({ item }: { item: ItemCarrito }) {
  const { eliminarProducto } = useCart();
  const [editarAbierto, setEditarAbierto] = useState(false);

  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
        <Image
          src={item.imagen}
          alt={item.nombre}
          width={100}
          height={100}
          className="rounded-md object-contain"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold">{item.nombre}</h3>
          <p className="text-gray-300 text-sm">Talla: {item.talla}</p>
          <p className="text-gray-300 text-sm">Color: {item.color}</p>
          <p className="text-gray-300 text-sm">Cantidad: {item.cantidad}</p>
          <p className="text-yellow-400 font-semibold">
            {(item.precio ?? 0 * item.cantidad).toFixed(2)} €
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setEditarAbierto(true)}
            className="text-gray-300 hover:text-yellow-400"
            title="Editar"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => {
              eliminarProducto(item.id);
              toast.success("Producto eliminado", {
                icon: "🗑️",
                duration: 2500,
                style: {
                  background: "#1f2937",
                  color: "#f87171",
                  border: "1px solid #f87171",
                },
              });
            }}
            className="text-red-400 hover:text-red-300"
            title="Eliminar"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      {editarAbierto && (
        <EditarProductoModal
          item={item}
          producto={productos.find((p) => p.nombre === item.nombre)!}
          onClose={() => setEditarAbierto(false)}
        />
      )}
    </>
  );
}
