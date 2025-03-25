"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useUser } from "../../../context/UserContext";
import { Button } from "../../../components/ui/Button";
import { useRouter } from "next/navigation";
import ChatModal from "../../../components/chat/ChatModal";

// Tipos
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
  const router = useRouter();

  const [friends, setFriends] = useState<UserBasic[]>([]);
  const [pendingReceived, setPendingReceived] = useState<PendingRequest[]>([]);
  const [pendingSent, setPendingSent] = useState<PendingRequest[]>([]);
  const [searchResults, setSearchResults] = useState<UserBasic[]>([]);
  const [search, setSearch] = useState("");
  const [activeChat, setActiveChat] = useState<UserBasic | null>(null);

  useEffect(() => {
    if (user) fetchFriends();
  }, [user]);

  const fetchFriends = async () => {
    if (!user) return;

    const { data: friendships } = await supabase
      .from("friendships")
      .select("*")
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq("status", "accepted");

    const friendIds = friendships?.map((f) =>
      f.user_id === user.id ? f.friend_id : f.user_id
    ) ?? [];

    const { data: friendsData } = await supabase
      .from("users")
      .select("id, username")
      .in("id", friendIds);

    setFriends(friendsData || []);

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
    await supabase.from("friendships").update({ status: "accepted" }).eq("id", id);
    fetchFriends();
  };

  const handleReject = async (id: number) => {
    await supabase.from("friendships").delete().eq("id", id);
    fetchFriends();
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
        (p) => p.friend_id.username === u.username || p.user_id.username === u.username
      );
      const alreadyReceived = pendingReceived.some(
        (p) => p.friend_id.username === u.username || p.user_id.username === u.username
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
    fetchFriends();
  };

  if (!user) return <div className="p-4">Cargando usuario...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-10 text-white">
      <h1 className="text-3xl font-bold">👥 Amigos</h1>

      <section>
        <h2 className="text-xl font-semibold mb-3">Tus amigos</h2>
        {friends.length === 0 ? (
          <p className="text-gray-400">No tienes amigos todavía 😢</p>
        ) : (
          <div className="grid gap-4">
            {friends.map((f) => (
              <div
                key={f.id}
                className="bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center hover:bg-gray-700 transition cursor-pointer"
              >
                <div onClick={() => router.push(`/profile/${f.id}`)} className="flex flex-col">
                  <span className="text-lg font-semibold">{f.username}</span>
                  <span className="text-xs text-green-400">● Online</span>
                </div>
                <Button onClick={() => setActiveChat(f)}>Chat</Button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Solicitudes recibidas</h2>
        {pendingReceived.length === 0 ? (
          <p className="text-gray-400">No tienes solicitudes nuevas</p>
        ) : (
          <div className="grid gap-4">
            {pendingReceived.map((p) => (
              <div key={p.id} className="bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center">
                <span className="text-lg font-medium">{p.user_id.username}</span>
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
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Solicitudes enviadas</h2>
        {pendingSent.length === 0 ? (
          <p className="text-gray-400">No has enviado solicitudes</p>
        ) : (
          <ul className="space-y-2">
            {pendingSent.map((p) => (
              <li key={p.id} className="bg-gray-800 p-3 rounded-xl shadow">
                {p.friend_id.username} <span className="text-yellow-400 text-sm ml-2">(pendiente)</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Buscar usuarios</h2>
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

      {activeChat && <ChatModal user={activeChat} onClose={() => setActiveChat(null)} />}
    </div>
  );
}
