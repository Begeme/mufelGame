"use client";
import { useState } from "react";
import Link from "next/link";
import { FiGlobe, FiMenu, FiX } from "react-icons/fi";
import { Button } from "./Button";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md text-white z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" passHref>
          <Image
            src={"/img/logo-sin-fondo.png"}
            alt={"Logo"}
            width={40}
            height={40}
            className="h-10 cursor-pointer"
          />
        </Link>

        {/* Menú en escritorio */}
        <div className="hidden md:flex space-x-6">
          <Link href="/game" className="hover:text-yellow-400">
            Juego
          </Link>
          <Link href="/tracker" className="hover:text-yellow-400">
            Tracker
          </Link>
          <Link href="/news" className="hover:text-yellow-400">
            Noticias
          </Link>
          <Link href="/merch" className="hover:text-yellow-400">
            Merchandising
          </Link>
        </div>

        {/* Selector de idioma y botón Registrarse */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center hover:text-yellow-400">
            <FiGlobe size={20} className="mr-1" /> Español
          </button>
          {/* ✅ Botón que redirige a /auth */}
          <Link href="/auth">
            <Button>Registrarse</Button>
          </Link>
        </div>

        {/* Menú hamburguesa en móvil */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  );
}
