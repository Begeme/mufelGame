"use client";

import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import Footer from "../../../components/ui/Footer";
import { useRouter } from "next/navigation";
import ProfileSettings from "../../../components/settings/ProfileSettings";
import NotificationSettings from "../../../components/settings/NotificationSettings";
import SecuritySettings from "../../../components/settings/SecuritySettings";
import PrivacySettings from "../../../components/settings/PrivacySettings";
import AccountSettings from "../../../components/settings/AccountSettings";

const sections = [
  { id: "profile", label: "Perfil", icon: "👤" },
  { id: "notifications", label: "Notificaciones", icon: "🔔" },
  { id: "security", label: "Seguridad", icon: "🔒" },
  { id: "privacy", label: "Privacidad", icon: "📝" },
  { id: "account", label: "Cuenta", icon: "⚙️" },
];

export default function SettingsPage() {
  const context = useUser();
  const user = context !== "loading" ? context.user : null;

  const [activeSection, setActiveSection] = useState("profile");
  const [isFocused, setIsFocused] = useState(false); // flecha toggle

  const router = useRouter();

  useEffect(() => {
    if (!user && context !== "loading") {
      router.push("/login");
    }
  }, [user, context, router]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = 200;
      let currentSection = "profile";

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - offset <= 0) {
            currentSection = s.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -150;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (context === "loading") return null;
  if (!user) return <div className="p-6 text-white">Cargando usuario...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="block md:hidden sticky top-16 z-30 bg-gray-950 py-3">
          <div className="relative">
            <select
              onClick={() => setIsFocused((prev) => !prev)}
              onChange={(e) => {
                scrollTo(e.target.value);
                setIsFocused(false); // cerrar flecha al seleccionar
              }}
              className="appearance-none w-full bg-gray-800 text-white border border-red-600 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
              value={activeSection}
            >
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.icon} {s.label}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  isFocused ? "rotate-180" : "rotate-0"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 111.1 1.02l-4.25 4.65a.75.75 0 01-1.1 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 py-10">
          <aside className="hidden md:block space-y-3 sticky top-24 self-start">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`flex items-center gap-3 w-full text-left text-base font-medium px-4 py-3 rounded-lg transition
        ${
          activeSection === s.id
            ? "bg-red-600 text-white"
            : "hover:bg-gray-800 text-gray-300"
        }`}
              >
                <span className="text-lg">{s.icon}</span>
                <span className="tracking-wide">{s.label}</span>
              </button>
            ))}
          </aside>

          <section className="space-y-24 pb-20">
            <div id="profile" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl font-semibold">Perfil</h2>
              <ProfileSettings />
            </div>

            <div id="notifications" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl font-semibold">Notificaciones</h2>
              <NotificationSettings />
            </div>

            <div id="security" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl font-semibold">Seguridad</h2>
              <SecuritySettings />
            </div>

            <div id="privacy" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl font-semibold">Privacidad</h2>
              <PrivacySettings />
            </div>

            <div id="account" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl font-semibold">Cuenta</h2>
              <AccountSettings />
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
