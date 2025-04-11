"use client";
import { createContext, useContext, useEffect, useState } from "react";

export interface ItemCarrito {
  id: string;
  nombre: string;
  imagen: string;
  color: string;
  cantidad: number;
  precio?: number;
  talla?: string;
}

interface CartContextType {
  carrito: ItemCarrito[];
  agregarProducto: (item: ItemCarrito) => void;
  eliminarProducto: (id: string) => void;
  vaciarCarrito: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  // 🔁 Cargar carrito desde localStorage al inicio
  useEffect(() => {
    const guardado = localStorage.getItem("carrito");
    if (guardado) {
      setCarrito(JSON.parse(guardado));
    }
  }, []);

  // 💾 Guardar carrito cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (item: ItemCarrito) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === item.id);
  
      if (existe) {
        // ✅ Eliminar el producto antiguo y agregarlo con la cantidad actualizada
        const actualizado = prev
          .filter((p) => p.id !== item.id)
          .concat({ ...existe, cantidad: existe.cantidad + item.cantidad });
  
        return actualizado;
      }
  
      return [...prev, item];
    });
  };

  const eliminarProducto = (id: string) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider
      value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartContext fuera de proveedor");
  return context;
};
