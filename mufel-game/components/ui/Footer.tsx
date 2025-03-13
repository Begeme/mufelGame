"use client";
import Image from "next/image";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative z-50 bg-black text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
        {/* Sección 1: Logo */}
        <div>
          <Image
            src={"/window.svg"}
            alt={"Logo"}
            width={250}
            height={250}
            className="h-10 cursor-pointer flex justify-start"
          />
          <p className="mt-4 text-gray-400 text-sm/6">
            © {new Date().getFullYear()} Mufel.
          </p>
          <p className="mt-4 text-gray-400 text-sm/6"> Todos los derechos reservados.</p>
        </div>

        {/* Sección 2: Navegación */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Explorar</h3>
          <ul className="space-y-2">
            <li>
              <a href="/game" className="hover:text-yellow-400">
                Juego
              </a>
            </li>
            <li>
              <a href="/tracker" className="hover:text-yellow-400">
                Tracker
              </a>
            </li>
            <li>
              <a href="/news" className="hover:text-yellow-400">
                Noticias
              </a>
            </li>
            <li>
              <a href="/merch" className="hover:text-yellow-400">
                Merchandising
              </a>
            </li>
          </ul>
        </div>

        {/* Sección 3: Soporte */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Soporte</h3>
          <ul className="space-y-2">
            <li>
              <a href="/help" className="hover:text-yellow-400">
                Centro de Ayuda
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-yellow-400">
                Preguntas Frecuentes
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-yellow-400">
                Términos de Servicio
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-yellow-400">
                Política de Privacidad
              </a>
            </li>
          </ul>
        </div>

        {/* Sección 4: Redes Sociales */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Síguenos</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} className="hover:text-yellow-400 transition duration-300" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={24} className="hover:text-yellow-400 transition duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} className="hover:text-yellow-400 transition duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
