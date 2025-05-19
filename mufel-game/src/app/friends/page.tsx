"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useUser } from "../../../context/UserContext";
import { Button } from "../../../components/ui/Button";
import { useChat } from "../../../context/ChatLayout";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { RealtimeChannel } from "@supabase/supabase-js";

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
  const { refreshFriends, openChat, unreadMessages } = useChat();
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
      friendships?.map((f) => (f.user_id === user.id ? f.friend_id : f.user_id)) ?? [];

    const { data: friendsData } = await supabase
      .from("users")
      .select("id, username, is_online")
      .in("id", friendIds);

    setFriends((friendsData || []).map((f) => ({ ...f, is_online: !!f.is_online })));

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
    await supabase.from("friendships").update({ status: "accepted" }).eq("id", id);
    await fetchFriends();
    await refreshFriends();
  };

  const handleReject = async (id: number) => {
    await supabase.from("friendships").delete().eq("id", id);
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
    <main className="min-h-screen bg-gray-950 text-white pt-28 px-6 pb-16">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tu Comunidad
      </motion.h1>

      <div className="max-w-3xl mx-auto space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Buscar jugadores</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Introduce un nombre de usuario"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <Button onClick={handleSearch}>Buscar</Button>
          </div>

          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 space-y-3"
              >
                {searchResults.map((u) => (
                  <li
                    key={u.id}
                    className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border border-gray-700 hover:border-yellow-500 transition"
                  >
                    <span>{u.username}</span>
                    <Button onClick={() => sendFriendRequest(u.id)}>Agregar</Button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Amigos</h2>
          <input
            type="text"
            value={friendSearch}
            onChange={(e) => setFriendSearch(e.target.value)}
            placeholder="Buscar entre tus amigos"
            className="w-full px-4 py-2 mb-6 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">🟢 En línea</h3>
              <div className="grid gap-4">
                {onlineFriends.map((f) => (
                  <motion.div
                    key={f.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-yellow-500 transition cursor-pointer"
                    onClick={() => openChat(f)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{f.username}</span>
                      {unreadMessages[f.id] > 0 && (
                        <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                          {unreadMessages[f.id] > 99 ? "99+" : unreadMessages[f.id]}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">⚫ Desconectados</h3>
              <div className="grid gap-4">
                {offlineFriends.map((f) => (
                  <motion.div
                    key={f.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-500 transition cursor-pointer"
                    onClick={() => openChat(f)}
                  >
                    <span>{f.username}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Solicitudes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">📥 Recibidas</h3>
              <div className="space-y-3">
                {pendingReceived.length === 0 ? (
                  <p className="text-gray-400">Sin solicitudes</p>
                ) : (
                  pendingReceived.map((p) => (
                    <div
                      key={p.id}
                      className="bg-gray-800 p-3 rounded-lg flex justify-between items-center border border-gray-700"
                    >
                      <span>{p.user_id.username}</span>
                      <div className="flex gap-2">
                        <Button onClick={() => handleAccept(p.id)} className="px-3 py-1 text-sm bg-green-600 hover:bg-green-500 text-white rounded-md">Aceptar</Button>
                        <Button onClick={() => handleReject(p.id)} className="px-3 py-1 text-sm bg-red-600 hover:bg-red-500 text-white rounded-md">Rechazar</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">📤 Enviadas</h3>
              <div className="space-y-3">
                {pendingSent.length === 0 ? (
                  <p className="text-gray-400">No has enviado solicitudes</p>
                ) : (
                  pendingSent.map((p) => (
                    <div key={p.id} className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <span>{p.friend_id.username}</span>
                      <span className="ml-2 text-yellow-500 text-sm">(pendiente)</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}