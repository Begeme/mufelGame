"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { supabase } from "../lib/supabaseClient";

type NotificationContextType = {
  soundEnabled: boolean;
  toggleSound: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useUser();
  const currentUser = context !== "loading" ? context.user : null;

  const [soundEnabled, setSoundEnabled] = useState(true);

  // Cargar desde Supabase si hay usuario
  useEffect(() => {
    if (!currentUser) return;

    const fetchSoundSetting = async () => {
      const { data } = await supabase
        .from("users")
        .select("chat_sound_enabled")
        .eq("id", currentUser.id)
        .single();

      if (data && typeof data.chat_sound_enabled === "boolean") {
        setSoundEnabled(data.chat_sound_enabled);
        localStorage.setItem("soundEnabled", String(data.chat_sound_enabled));
      }
    };

    fetchSoundSetting();
  }, [currentUser]);

  // Si no hay Supabase, intenta cargar de localStorage
  useEffect(() => {
    const stored = localStorage.getItem("soundEnabled");
    if (stored !== null) {
      setSoundEnabled(stored === "true");
    }
  }, []);

  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem("soundEnabled", String(newValue));
  };

  return (
    <NotificationContext.Provider value={{ soundEnabled, toggleSound }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification debe usarse dentro de <NotificationProvider>"
    );
  }
  return context;
};
