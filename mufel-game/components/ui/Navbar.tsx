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
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { t } = useTranslation();
  const router = useRouter();
  const context = useUser();
  const user = context !== "loading" ? context.user : null;
  const { carrito } = useCart();

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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-95 backdrop-blur-sm text-white z-[9999] shadow-sm">
      <div className="container mx-auto flex justify-between items-center h-14 px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/img/logo-sin-fondo.png"
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 justify-center space-x-6 items-center text-sm font-semibold tracking-wide uppercase ml-50">
          <Link href="/" className="hover:text-yellow-400">
            Inicio
          </Link>
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

        <div className="hidden lg:flex items-center space-x-3 text-sm ml-auto">
          <div className="relative" ref={langRefDesktop}>
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center text-xs px-2 py-0.5 bg-gray-800 hover:bg-gray-700 transition cursor-pointer"
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
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-700  ${
                      language === key ? "bg-gray-700" : ""
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          {user ? (
            <div ref={userRef} className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="text-xs  px-2 py-0.5 text-black bg-amber-600 hover:bg-amber-500 transition font-bold flex items-center gap-1 cursor-pointer"
              >
                {user.username}
                <span className="text-xs">{userDropdown ? "▲" : "▼"}</span>
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
                    onClick={() => setUserDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Descargar
                  </Link>
                  <Link
                    href="/friends"
                    onClick={() => setUserDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Amigos
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setUserDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setUserDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Configuración
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdown(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    Cerrar sesión
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => router.push("/register")}
              className="text-xs px-2 py-0.5 cursor-pointer"
            >
              {t("navbar.signup")}
            </Button>
          )}
          <Link
            href="/cart"
            className="relative px-3 py-2 bg-gray-800 hover:bg-gray-700 transition rounded flex items-center"
          >
            🛒
            {carrito.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
              </span>
            )}
          </Link>
        </div>

        <button
          className="block lg:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="block lg:hidden fixed top-14 left-0 w-full max-h-[calc(100vh-56px)] overflow-y-auto bg-black bg-opacity-95 p-4 pb-24 space-y-4 text-left text-sm z-[9999]">
          {[
            { href: "/", label: "Inicio" },
            { href: "/game", label: t("navbar.game") },
            { href: "/tracker", label: t("navbar.tracker") },
            { href: "/news", label: t("navbar.news") },
            { href: "/merch", label: t("navbar.merch") },
            {
              href: "/cart",
              label: (
                <span className="flex items-center gap-2">
                  🛒 Ver Cesta
                  {carrito.length > 0 && (
                    <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                      {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
                    </span>
                  )}
                </span>
              ),
            },
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
          <div ref={langRefMobile}>
            <button
              className="mt-2 flex items-center text-xs px-2 py-2 bg-gray-800 hover:bg-gray-700 rounded w-full cursor-pointer"
              onClick={() => setLangDropdownMobile(!langDropdownMobile)}
            >
              <FiGlobe className="mr-2" size={16} />
              {languages[language as keyof typeof languages]}
              <span className="ml-auto text-xs">
                {langDropdownMobile ? "▲" : "▼"}
              </span>
            </button>

            {langDropdownMobile && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-2 w-full max-h-[160px] overflow-y-auto overscroll-contain touch-pan-y bg-black text-white rounded-md shadow-lg border border-gray-700 text-sm z-50"
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

          {user ? (
            <div className="mt-4" ref={userMobileRef}>
              <button
                onClick={() => setUserDropdownMobile((prev) => !prev)}
                className="w-full px-3 py-3 text-left bg-amber-600 text-black cursor-pointer rounded-md flex justify-between items-center font-semibold text-base"
              >
                {user.username}
                <span className="text-sm">
                  {userDropdownMobile ? "▲" : "▼"}
                </span>
              </button>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={
                  userDropdownMobile
                    ? { opacity: 1, height: 250 }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="h-full overflow-y-auto bg-gray-900 text-white rounded-md shadow-md border border-gray-700">
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
                    href="/profile"
                    onClick={() => {
                      setUserDropdownMobile(false);
                      setMenuOpen(false);
                    }}
                    className="block px-4 py-3 hover:bg-gray-700"
                  >
                    Mi Perfil
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
                    className="w-full text-left px-4 py-3 hover:bg-gray-700 cursor-pointer"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="mt-4">
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/register");
                }}
                className="w-full text-xs px-2 py-0.5"
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
