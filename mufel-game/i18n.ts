// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./src/locales/es.json";
import en from "./src/locales/en.json";

const resources = {
  es: { translation: es },
  en: { translation: en },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "es",
    fallbackLng: "es",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });
}

export default i18n;
