"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiGlobe, FiMenu, FiX } from "react-icons/fi";
import { Button } from "./Button";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const { t } = useTranslation();
  const router = useRouter();
  const context = useUser();
  const user = context !== "loading" ? context.user : null;

  const [language, setLanguage] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [langDropdownMobile, setLangDropdownMobile] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [userDropdownMobile, setUserDropdownMobile] = useState(false);

  const langRefDesktop = useRef<HTMLDivElement>(null);
  const langRefMobile = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const userMobileRef = useRef<HTMLDivElement>(null);

  const languages = {
    es: "Español",
    en: "English",
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "es";
    i18n.changeLanguage(savedLang).then(() => {
      setLanguage(savedLang);
    });
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      localStorage.setItem("lang", lang);
      setLanguage(lang);
      setLangDropdown(false);
      setLangDropdownMobile(false);
    });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (langRefDesktop.current && !langRefDesktop.current.contains(target)) {
        setLangDropdown(false);
      }
      if (langRefMobile.current && !langRefMobile.current.contains(target)) {
        setLangDropdownMobile(false);
      }
      if (userRef.current && !userRef.current.contains(target)) {
        setUserDropdown(false);
      }
      if (userMobileRef.current && !userMobileRef.current.contains(target)) {
        setUserDropdown(false);
      }
      if (userMobileRef.current && !userMobileRef.current.contains(target)) {
        setUserDropdownMobile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-95 backdrop-blur-sm text-white z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center h-14 px-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/img/logo-sin-fondo.png"
            alt="Logo"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </Link>

        {/* Menú principal - Desktop */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 items-center text-sm font-semibold tracking-wide uppercase">
          <Link href="/game" className="hover:text-yellow-400">
            {t("navbar.game")}
          </Link>
          <Link href="/tracker" className="hover:text-yellow-400">
            {t("navbar.tracker")}
          </Link>
          <Link href="/news" className="hover:text-yellow-400">
            {t("navbar.news")}
          </Link>
          <Link href="/merch" className="hover:text-yellow-400">
            {t("navbar.merch")}
          </Link>
        </div>

        {/* Idioma + Usuario - Desktop */}
        <div className="hidden md:flex items-center space-x-3 text-sm">
          {/* Selector de idioma */}
          <div className="relative" ref={langRefDesktop}>
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center px-3 py-1 bg-gray-800 hover:bg-gray-700 transition"
            >
              <FiGlobe size={16} className="mr-1" />
              {languages[language as keyof typeof languages]}
            </button>

            {langDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute left-0 mt-2 w-32 bg-black text-white rounded-md shadow-lg z-50 border border-gray-700 text-sm"
              >
                {Object.entries(languages).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => changeLanguage(key)}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
                      language === key ? "bg-gray-700" : ""
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Usuario o botón de registro */}
          {user ? (
            <div ref={userRef} className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 transition font-semibold flex items-center gap-1"
              >
                {user.username}
                <span className="text-xs">▼</span>
              </button>
              {userDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-2 w-44 bg-black text-white rounded-md shadow-lg z-50 border border-gray-700 text-sm"
                >
                  <Link
                    href="/download"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Descargar
                  </Link>
                  <Link
                    href="/friends"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Amigos
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Configuración
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Cerrar sesión
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => router.push("/register")}
              className="text-sm px-3 py-1"
            >
              {t("navbar.signup")}
            </Button>
          )}
        </div>

        {/* Selector de idioma - Móvil */}
        <div className="md:hidden relative" ref={langRefMobile}>
          <button
            className="ml-2 flex items-center text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700"
            onClick={() => setLangDropdownMobile(!langDropdownMobile)}
          >
            <FiGlobe className="mr-1" size={14} />
            {languages[language as keyof typeof languages]}
          </button>

          {langDropdownMobile && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute left-0 mt-2 w-32 bg-black text-white rounded-md shadow-lg z-50 border border-gray-700 text-sm"
            >
              {Object.entries(languages).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => changeLanguage(key)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
                    language === key ? "bg-gray-700" : ""
                  }`}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Menú hamburguesa - Móvil */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Menú desplegable - Móvil */}
      {menuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 p-4 space-y-2 text-left text-sm">
          {/* Menú principal */}
          {[
            { href: "/game", label: t("navbar.game") },
            { href: "/tracker", label: t("navbar.tracker") },
            { href: "/news", label: t("navbar.news") },
            { href: "/merch", label: t("navbar.merch") },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-3 font-semibold tracking-wide uppercase hover:text-yellow-400 transition"
            >
              {label}
            </Link>
          ))}

          {/* Usuario logueado con dropdown */}
          {user ? (
            <div className="mt-4" ref={userMobileRef}>
              <button
                onClick={() => setUserDropdownMobile((prev) => !prev)}
                className="w-full px-3 py-3 text-left bg-gray-800 text-white rounded-md flex justify-between items-center font-semibold text-base"
              >
                {user.username}
                <span className="text-sm">
                  {userDropdownMobile ? "▲" : "▼"}
                </span>
              </button>

              {/* Dropdown: visible si userDropdownMobile === true */}
              <div
                className={`transition-all duration-200 overflow-hidden ${
                  userDropdownMobile
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="mt-2 bg-gray-900 text-white rounded-md shadow-md border border-gray-700 overflow-hidden">
                  <Link
                    href="/download"
                    onClick={() => {
                      setUserDropdownMobile(false);
                      setMenuOpen(false);
                    }}
                    className="block px-4 py-3 hover:bg-gray-700"
                  >
                    Descargar
                  </Link>
                  <Link
                    href="/friends"
                    onClick={() => {
                      setUserDropdownMobile(false);
                      setMenuOpen(false);
                    }}
                    className="block px-4 py-3 hover:bg-gray-700"
                  >
                    Amigos
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => {
                      setUserDropdownMobile(false);
                      setMenuOpen(false);
                    }}
                    className="block px-4 py-3 hover:bg-gray-700"
                  >
                    Configuración
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdownMobile(false);
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-700"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/register");
                }}
                className="w-full"
              >
                {t("navbar.signup")}
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
