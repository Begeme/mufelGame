"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useUser } from "../../../context/UserContext";
import { Button } from "../../../components/ui/Button";
import { useChat } from "../../../context/ChatLayout";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { RealtimeChannel } from "@supabase/supabase-js";
import Footer from "../../../components/ui/Footer";

interface UserBasic {
  id: string;
  username: string;
  is_online?: boolean;
}

interface PendingRequest {
  id: number;
  user_id: { username: string };
  friend_id: { username: string };
}

export default function FriendsPage() {
  const context = useUser();
  const user = context !== "loading" ? context.user : null;
  const { refreshFriends, unreadMessages } = useChat();
  const [friends, setFriends] = useState<UserBasic[]>([]);
  const [pendingReceived, setPendingReceived] = useState<PendingRequest[]>([]);
  const [pendingSent, setPendingSent] = useState<PendingRequest[]>([]);
  const [searchResults, setSearchResults] = useState<UserBasic[]>([]);
  const [search, setSearch] = useState("");
  const [friendSearch, setFriendSearch] = useState("");
  const channelRef = useRef<RealtimeChannel | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user && context !== "loading") {
      router.push("/login");
    }
  }, [user, context, router]);

  const fetchFriends = useCallback(async () => {
    if (!user) return;

    const { data: friendships } = await supabase
      .from("friendships")
      .select("*")
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq("status", "accepted");

    const friendIds =
      friendships?.map((f) =>
        f.user_id === user.id ? f.friend_id : f.user_id
      ) ?? [];

    const { data: friendsData } = await supabase
      .from("users")
      .select("id, username, is_online")
      .in("id", friendIds);

    setFriends(
      (friendsData || []).map((f) => ({ ...f, is_online: !!f.is_online }))
    );

    const { data: received } = await supabase
      .from("friendships")
      .select("id, user_id(username), friend_id(username)")
      .eq("friend_id", user.id)
      .eq("status", "pending");

    setPendingReceived(
      (received || []).map((r) => ({
        id: r.id,
        user_id: Array.isArray(r.user_id) ? r.user_id[0] : r.user_id,
        friend_id: Array.isArray(r.friend_id) ? r.friend_id[0] : r.friend_id,
      }))
    );

    const { data: sent } = await supabase
      .from("friendships")
      .select("id, user_id(username), friend_id(username)")
      .eq("user_id", user.id)
      .eq("status", "pending");

    setPendingSent(
      (sent || []).map((s) => ({
        id: s.id,
        user_id: Array.isArray(s.user_id) ? s.user_id[0] : s.user_id,
        friend_id: Array.isArray(s.friend_id) ? s.friend_id[0] : s.friend_id,
      }))
    );
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchFriends();
      if (!channelRef.current) {
        channelRef.current = supabase
          .channel("online-users")
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "users",
            },
            (payload) => {
              const updatedUser = payload.new as UserBasic;
              setFriends((prev) =>
                prev.map((f) =>
                  f.id === updatedUser.id
                    ? { ...f, is_online: updatedUser.is_online }
                    : f
                )
              );
            }
          )
          .subscribe();
      }
    }

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [user, fetchFriends]);

  const handleAccept = async (id: number) => {
    await supabase
      .from("friendships")
      .update({ status: "accepted" })
      .eq("id", id);
    await fetchFriends();
    await refreshFriends();
  };

  const handleReject = async (id: number) => {
    await supabase.from("friendships").delete().eq("id", id);
    await fetchFriends();
    await refreshFriends();
  };

  const handleUnfriend = async (friendId: string) => {
    if (!user) return;

    await supabase
      .from("friendships")
      .delete()
      .or(
        `and(user_id.eq.${user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${user.id})`
      );

    await fetchFriends();
    await refreshFriends();
  };

  const handleSearch = async () => {
    if (!user || !search.trim()) return;

    const { data } = await supabase
      .from("users")
      .select("id, username")
      .ilike("username", `%${search}%`);

    const results = (data || []).filter((u) => {
      const isSelf = u.id === user.id;
      const isFriend = friends.some((f) => f.id === u.id);
      const alreadySent = pendingSent.some(
        (p) =>
          p.friend_id.username === u.username ||
          p.user_id.username === u.username
      );
      const alreadyReceived = pendingReceived.some(
        (p) =>
          p.friend_id.username === u.username ||
          p.user_id.username === u.username
      );
      return !isSelf && !isFriend && !alreadySent && !alreadyReceived;
    });

    setSearchResults(results);
  };

  const sendFriendRequest = async (friendId: string) => {
    if (!user) return;

    const { error } = await supabase.from("friendships").insert({
      user_id: user.id,
      friend_id: friendId,
      status: "pending",
    });

    if (error) console.error("Error al enviar solicitud:", error);

    setSearch("");
    setSearchResults([]);
    await fetchFriends();
  };

  const sortedFriends = [...friends]
    .sort((a, b) => (unreadMessages[b.id] || 0) - (unreadMessages[a.id] || 0))
    .sort((a, b) => {
      if (a.is_online === b.is_online)
        return a.username.localeCompare(b.username);
      return a.is_online ? -1 : 1;
    });

  const filteredFriends = sortedFriends.filter((f) =>
    f.username.toLowerCase().includes(friendSearch.toLowerCase())
  );

  const onlineFriends = filteredFriends.filter((f) => f.is_online);
  const offlineFriends = filteredFriends.filter((f) => !f.is_online);

  if (context === "loading") return null;
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Redirigiendo al login...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white">
      <main className="flex-grow pt-28 px-4 md:px-6 pb-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tu Comunidad
        </motion.h1>

        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-10">
          <section className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">🔍 Buscar jugadores</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Introduce un nombre de usuario"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <Button onClick={handleSearch} className="cursor-pointer">
                Buscar
              </Button>
            </div>

            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.ul
                  key="search-list"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 space-y-3"
                >
                  {searchResults.map((u) => (
                    <motion.li
                      key={u.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:border-yellow-500 transition"
                    >
                      <span>{u.username}</span>
                      <Button onClick={() => sendFriendRequest(u.id)}>
                        Agregar
                      </Button>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </section>

          <section className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">👥 Tus amigos</h2>
            <input
              type="text"
              value={friendSearch}
              onChange={(e) => setFriendSearch(e.target.value)}
              placeholder="Buscar entre tus amigos"
              className="w-full px-4 py-2 mb-6 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-400">
                  🟢 En línea
                </h3>
                <div className="space-y-3">
                  {onlineFriends.length > 0 ? (
                    onlineFriends.map((f) => (
                      <div
                        key={f.id}
                        className="bg-gray-900 border border-gray-700 hover:border-yellow-500 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{f.username}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                router.push(`/perfil/${f.username}`)
                              }
                              title="Ver perfil"
                              className="hover:text-blue-400 text-white text-base transition-colors cursor-pointer"
                            >
                              👤
                            </button>
                            <button
                              onClick={() => handleUnfriend(f.id)}
                              title="Eliminar amigo"
                              className="hover:text-red-500 text-white text-base transition-colors cursor-pointer"
                            >
                              ❌
                            </button>
                          </div>
                        </div>
                        {unreadMessages[f.id] > 0 && (
                          <div className="text-right mt-2">
                            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                              {unreadMessages[f.id] > 99
                                ? "99+"
                                : unreadMessages[f.id]}
                            </span>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">Nadie en línea</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-400">
                  ⚫ Desconectados
                </h3>
                <div className="space-y-3">
                  {offlineFriends.length > 0 ? (
                    offlineFriends.map((f) => (
                      <div
                        key={f.id}
                        className="bg-gray-900 border border-gray-700 hover:border-yellow-500 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{f.username}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                router.push(`/perfil/${f.username}`)
                              }
                              title="Ver perfil"
                              className="hover:text-blue-400 text-white text-base transition-colors cursor-pointer"
                            >
                              👤
                            </button>
                            <button
                              onClick={() => handleUnfriend(f.id)}
                              title="Eliminar amigo"
                              className="hover:text-red-500 text-white text-base transition-colors cursor-pointer"
                            >
                              ❌
                            </button>
                          </div>
                        </div>
                        {unreadMessages[f.id] > 0 && (
                          <div className="text-right mt-2">
                            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                              {unreadMessages[f.id] > 99
                                ? "99+"
                                : unreadMessages[f.id]}
                            </span>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">
                      Todos están conectados 🎉
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              📨 Solicitudes de amistad
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">📥 Recibidas</h3>
                <div className="space-y-3">
                  {pendingReceived.length > 0 ? (
                    pendingReceived.map((p) => (
                      <div
                        key={p.id}
                        className="bg-gray-900 border border-gray-700 rounded-lg p-3 flex justify-between items-center"
                      >
                        <span>{p.user_id.username}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAccept(p.id)}
                            title="Aceptar"
                            className="hover:text-green-400 text-lg"
                          >
                            ✅
                          </button>
                          <button
                            onClick={() => handleReject(p.id)}
                            title="Rechazar"
                            className="hover:text-red-500 text-white text-base transition-colors cursor-pointer"
                          >
                            ❌
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">
                      No tienes solicitudes nuevas
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">📤 Enviadas</h3>
                <div className="space-y-3">
                  {pendingSent.length > 0 ? (
                    pendingSent.map((p) => (
                      <div
                        key={p.id}
                        className="bg-gray-900 border border-gray-700 rounded-lg p-3 flex justify-between items-center"
                      >
                        <div>
                          <span>{p.friend_id.username}</span>
                          <span className="ml-2 text-yellow-500 text-sm">
                            (pendiente)
                          </span>
                        </div>
                        <button
                          onClick={() => handleReject(p.id)}
                          title="Cancelar solicitud"
                          className="hover:text-red-500 text-white text-base transition-colors cursor-pointer"
                        >
                          ❌
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No has enviado solicitudes</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
