"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useUser } from "../../../context/UserContext";
import { Button } from "../../../components/ui/Button";
import { useChat } from "../../../context/ChatLayout";
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
  const [showOnline, setShowOnline] = useState(true);
  const [showOffline, setShowOffline] = useState(true);
  const channelRef = useRef<RealtimeChannel | null>(null);

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
  }, [user]);

  const fetchFriends = async () => {
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
  };

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

  if (!user) return <div className="p-4">Cargando usuario...</div>;

  return (
    <div className="pt-24 p-6 max-w-3xl mx-auto space-y-10 text-white">
      <section>
        <h2 className="text-xl font-semibold mb-1">Agrega a tus amigos</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre de usuario"
            className="px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md w-full"
          />
          <Button onClick={handleSearch}>Buscar</Button>
        </div>
        {searchResults.length > 0 && (
          <ul className="mt-4 space-y-2">
            {searchResults.map((u) => (
              <li
                key={u.id}
                className="bg-gray-800 rounded-xl p-3 shadow flex justify-between items-center"
              >
                <span className="text-white">{u.username}</span>
                <Button onClick={() => sendFriendRequest(u.id)}>Agregar</Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h1 className="text-3xl font-bold">👥 Amigos</h1>
        <input
          type="text"
          value={friendSearch}
          onChange={(e) => setFriendSearch(e.target.value)}
          placeholder="Buscar entre tus amigos"
          className="my-3 px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md w-full"
        />
        <div className="space-y-3">
          <div>
            <button onClick={() => setShowOnline((prev) => !prev)} className="text-left text-yellow-400 font-semibold mb-1">
              {showOnline ? "▼" : "▶"} Amigos en línea
            </button>
            {showOnline && (
              <div className="max-h-60 overflow-y-auto grid gap-4 scrollbar-thin scrollbar-thumb-gray-700">
                {onlineFriends.map((f) => (
                  <div
                    key={f.id}
                    className="bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center hover:bg-gray-700 transition cursor-pointer"
                    onClick={() => openChat(f)}
                  >
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">{f.username}</span>
                      <span className="text-xs text-green-400">● Online</span>
                    </div>
                    {unreadMessages[f.id] > 0 && (
                      <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                        {unreadMessages[f.id] > 99 ? "99+" : unreadMessages[f.id]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <button onClick={() => setShowOffline((prev) => !prev)} className="text-left text-yellow-400 font-semibold mb-1">
              {showOffline ? "▼" : "▶"} Amigos desconectados
            </button>
            {showOffline && (
              <div className="max-h-60 overflow-y-auto grid gap-4 scrollbar-thin scrollbar-thumb-gray-700">
                {offlineFriends.map((f) => (
                  <div
                    key={f.id}
                    className="bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center hover:bg-gray-700 transition cursor-pointer"
                    onClick={() => openChat(f)}
                  >
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">{f.username}</span>
                      <span className="text-xs text-gray-400">● Offline</span>
                    </div>
                    {unreadMessages[f.id] > 0 && (
                      <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                        {unreadMessages[f.id] > 99 ? "99+" : unreadMessages[f.id]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Solicitudes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-xl p-4 shadow">
            <h3 className="text-lg font-medium mb-2">📥 Recibidas</h3>
            {pendingReceived.length === 0 ? (
              <p className="text-gray-400">Sin solicitudes</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                {pendingReceived.map((p) => (
                  <div
                    key={p.id}
                    className="bg-gray-700 p-3 rounded-lg flex justify-between items-center"
                  >
                    <span>{p.user_id.username}</span>
                    <div className="flex gap-2">
                      <Button onClick={() => handleAccept(p.id)}>Aceptar</Button>
                      <Button onClick={() => handleReject(p.id)} className="bg-red-600 hover:bg-red-700">
                        Rechazar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-xl p-4 shadow">
            <h3 className="text-lg font-medium mb-2">📤 Enviadas</h3>
            {pendingSent.length === 0 ? (
              <p className="text-gray-400">No has enviado solicitudes</p>
            ) : (
              <ul className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                {pendingSent.map((p) => (
                  <li key={p.id} className="bg-gray-700 p-3 rounded-lg">
                    <span>{p.friend_id.username}</span>
                    <span className="text-yellow-400 text-sm ml-2">(pendiente)</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}