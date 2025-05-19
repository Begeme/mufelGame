"use client";
import { useEffect } from "react";
import { useUser } from "../../../context/UserContext";
import { useCart } from "../../../context/CartContext";
import Footer from "../../../components/ui/Footer";
import Navbar from "../../../components/ui/Navbar";
import { useRouter } from "next/navigation";
import CartItemEditable from "../../../components/cart/CartItemEditable";

export default function CartPage() {
  const context = useUser();
  const user = context !== "loading" ? context.user : null;
  const { carrito } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (context !== "loading" && !user) {
      router.push("/login");
    }
  }, [context, user, router]);

  if (context === "loading" || !user) return null;

  const precioTotal = carrito.reduce((acc, item) => {
    const precio = item.precio ?? 0;
    return acc + precio * item.cantidad;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white pt-32">
      <Navbar />
      <main className="flex-grow pt-24 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">🛒 Tu Cesta</h1>

        {carrito.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            Tu carrito está vacío.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {carrito.map((item, idx) => (
                <CartItemEditable key={idx} item={item} />
              ))}
            </div>

            <div className="text-right mb-16">
              <p className="text-xl font-bold">
                Total:{" "}
                <span className="text-yellow-400">
                  {precioTotal > 0
                    ? `${precioTotal.toFixed(2)}€`
                    : "Próximamente"}
                </span>
              </p>
              <button
                disabled
                className="mt-4 bg-yellow-500 text-black font-bold px-6 py-2 rounded hover:bg-yellow-400 transition disabled:opacity-50"
              >
                Pagar (deshabilitado)
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
