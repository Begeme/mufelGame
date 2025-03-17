"use client";
import { useState } from "react";
import Link from "next/link";
import { FiGlobe, FiMenu, FiX } from "react-icons/fi";
import { Button } from "./Button";
import Modal from "./Modal";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md text-white z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
          <Image src={"/window.svg"} alt={"Logo"} width={250} height={250} className="h-10 cursor-pointer" />

        <div className="hidden md:flex space-x-6">
          <Link href="/game" className="hover:text-yellow-400">Juego</Link>
          <Link href="/tracker" className="hover:text-yellow-400">Tracker</Link>
          <Link href="/news" className="hover:text-yellow-400">Noticias</Link>
          <Link href="/merch" className="hover:text-yellow-400">Merchandising</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center hover:text-yellow-400">
            <FiGlobe size={20} className="mr-1" /> Español
          </button>
          <Button onClick={() => setModalOpen(true)}>Jugar Ahora</Button>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold mb-4">¿Listo para jugar?</h2>
          <Button className="w-full mb-2">Iniciar Sesión</Button>
          <Button className="w-full bg-yellow-500 text-black">Crear Cuenta</Button>
        </div>
      </Modal>
    </nav>
  );
}
