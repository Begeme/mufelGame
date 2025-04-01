"use client";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { supabase } from "../lib/supabaseClient";

export default function useOnlineStatus() {
  const context = useUser();
  const user = context !== "loading" ? context.user : null;

  useEffect(() => {
    if (!user) return;

    const updateOnlineStatus = async () => {
      await supabase.from("users").update({ is_online: true }).eq("id", user.id);
    };

    const markOffline = async () => {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;

      if (!accessToken) return;

      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users?id=eq.${user.id}`;

      await fetch(url, {
        method: "PATCH",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ is_online: false }),
        keepalive: true,
      });
    };

    updateOnlineStatus();
    const interval = setInterval(updateOnlineStatus, 5000);

    const handleUnload = () => markOffline();

    window.addEventListener("beforeunload", handleUnload);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        markOffline();
      }
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("visibilitychange", handleUnload);
      markOffline();
    };
  }, [user]);
}
