"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiGlobe, FiMenu, FiX } from "react-icons/fi";
import { Button } from "./Button";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

export default function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mapea los idiomas disponibles
  const languages = {
    es: "Español",
    en: "English",
  };

  // Maneja el cierre del desplegable al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <Link href="/game" className="hover:text-yellow-400">{t("navbar.game")}</Link>
          <Link href="/tracker" className="hover:text-yellow-400">{t("navbar.tracker")}</Link>
          <Link href="/news" className="hover:text-yellow-400">{t("navbar.news")}</Link>
          <Link href="/merch" className="hover:text-yellow-400">{t("navbar.merch")}</Link>
        </div>

        {/* Selector de idioma y botón Registrarse */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {/* Botón para abrir el desplegable de idiomas */}
          <div ref={dropdownRef} className="relative">
            <button
              className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FiGlobe size={20} className="mr-2" />
              {languages[i18n.language as keyof typeof languages]} {/* Muestra el idioma seleccionado */}
            </button>

            {/* Desplegable de idiomas */}
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-32 bg-black text-white rounded-md shadow-lg">
                {Object.entries(languages).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      i18n.changeLanguage(key);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
                      i18n.language === key ? "bg-gray-700" : ""
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botón de Registro */}
          <Link href="/auth">
            <Button>{t("navbar.signup")}</Button>
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
