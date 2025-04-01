"use client";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useChat } from "../context/ChatLayout";
import ChatModal from "../components/chat/ChatModal";
import { supabase } from "../lib/supabaseClient";

export default function ChatPanel() {
  const context = useUser();
  const currentUser = context !== "loading" ? context.user : null;
  const {
    openChat,
    unreadMessages,
    resetUnread,
    openChats
  } = useChat();

  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [friends, setFriends] = useState<{ id: string; username: string }[]>([]);
  const [typingStatus, setTypingStatus] = useState<string | null>(null);

  const activeUser = openChats.find((u) => u.id === activeUserId) || null;

  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (!currentUser || !activeUserId) return;
      const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("sender_id", activeUserId)
        .eq("receiver_id", currentUser.id)
        .eq("read", false);

      if (error) {
        console.error("Error al marcar mensajes como leídos:", error);
      } else {
        resetUnread(activeUserId);
      }
    };

    markMessagesAsRead();
  }, [activeUserId, currentUser, resetUnread]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!currentUser) return;

      const { data: friendships, error } = await supabase
        .from("friendships")
        .select("*")
        .or(`user_id.eq.${currentUser.id},friend_id.eq.${currentUser.id}`)
        .eq("status", "accepted");

      if (error) {
        console.error("Error al cargar friendships:", error);
        return;
      }

      const friendIds = friendships?.map((f) =>
        f.user_id === currentUser.id ? f.friend_id : f.user_id
      ) ?? [];

      const { data: friendsData, error: usersError } = await supabase
        .from("users")
        .select("id, username")
        .in("id", friendIds);

      if (usersError) {
        console.error("Error al cargar usuarios:", usersError);
        return;
      }

      setFriends(friendsData || []);
    };

    fetchFriends();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const channel = supabase.channel("typing-status").on(
      "broadcast",
      { event: "typing" },
      (payload) => {
        if (
          payload.payload.sender === activeUserId &&
          payload.payload.receiver === currentUser.id
        ) {
          setTypingStatus("escribiendo...");
          setTimeout(() => setTypingStatus(null), 3000);
        }
      }
    );
    channel.subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeUserId, currentUser]);

  if (!currentUser) return null;

  return (
    <>
      {!isFriendsOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setIsFriendsOpen(true)}
            className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded shadow"
          >
            Amigos
          </button>
        </div>
      )}

      {isFriendsOpen && (
        <div className="fixed bottom-4 right-4 w-[280px] max-h-[500px] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl flex flex-col z-50">
          <div className="p-3 border-b border-gray-700 flex justify-between items-center">
            <span className="font-semibold text-white">Amigos</span>
            <button
              onClick={() => setIsFriendsOpen(false)}
              className="text-sm text-gray-400 hover:text-red-400"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                onClick={() => {
                  setActiveUserId(friend.id);
                  openChat(friend);
                }}
                className="cursor-pointer hover:bg-gray-800 px-3 py-2 rounded-md flex justify-between items-center transition-colors"
              >
                <span className="text-white text-sm">{friend.username}</span>
                {unreadMessages[friend.id] > 0 && (
                  <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadMessages[friend.id] > 99 ? "99+" : unreadMessages[friend.id]}
                  </span>
                )}
              </div>
            ))}
            {friends.length === 0 && (
              <div className="text-sm text-gray-400 text-center mt-4">No tienes amigos aún</div>
            )}
          </div>
        </div>
      )}

      {activeUser && (
        <div className="fixed bottom-4 left-4 w-[380px] h-[500px] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl flex flex-col z-50">
          <div className="p-3 border-b border-gray-700 flex justify-between items-center shadow">
            <div>
              <span className="font-semibold text-white">💬 {activeUser.username}</span>
              {typingStatus && (
                <span className="text-xs text-gray-400 ml-2 italic">{typingStatus}</span>
              )}
            </div>
            <button
              onClick={() => setActiveUserId(null)}
              className="text-sm text-gray-400 hover:text-red-400"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col">
            <ChatModal user={activeUser} onClose={() => setActiveUserId(null)} />
          </div>
        </div>
      )}
    </>
  );
}
