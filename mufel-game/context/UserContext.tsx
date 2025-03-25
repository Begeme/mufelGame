"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type UserData = {
  id: string;
  username: string;
  email: string;
};

type UserContextType = {
  user: UserData | null;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | "loading">("loading");

export function useUser() {
  const context = useContext(UserContext);
  if (context === "loading") return "loading";
  return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null | "loading">("loading");

  const fetchUser = async () => {
    const { data: session } = await supabase.auth.getSession();
    const currentUser = session?.session?.user;

    if (currentUser) {
      const { data: profile } = await supabase
        .from("users")
        .select("id, username, email")
        .eq("id", currentUser.id)
        .single();

      if (profile) {
        setUser(profile);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (user === "loading") return null;

  return (
    <UserContext.Provider value={{ user, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
