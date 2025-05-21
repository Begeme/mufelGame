"use client";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useChat } from "../context/ChatLayout";
import ChatModal from "../components/chat/ChatModal";
import { supabase } from "../lib/supabaseClient";

// Hook para detectar si es móvil
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export default function ChatPanel() {
  const context = useUser();
  const currentUser = context !== "loading" ? context.user : null;
  const {
    openChat,
    unreadMessages,
    resetUnread,
    openChats,
    friends,
    closeChat,
  } = useChat();

  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [typingStatus, setTypingStatus] = useState<string | null>(null);
  const isMobile = useIsMobile();

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
    if (!currentUser) return;
    const channel = supabase
      .channel("typing-status")
      .on("broadcast", { event: "typing" }, (payload) => {
        if (
          payload.payload.sender === activeUserId &&
          payload.payload.receiver === currentUser.id
        ) {
          setTypingStatus("escribiendo...");
          setTimeout(() => setTypingStatus(null), 3000);
        }
      });
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
            Chats
          </button>
        </div>
      )}

      {isFriendsOpen && (
        <div className="fixed bottom-4 right-4 w-[280px] max-h-[500px] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl flex flex-col z-50">
          <div className="p-3 border-b border-gray-700 flex justify-between items-center">
            <span className="font-semibold text-white">💬 Chats</span>
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
                    {unreadMessages[friend.id] > 99
                      ? "99+"
                      : unreadMessages[friend.id]}
                  </span>
                )}
              </div>
            ))}
            {friends.length === 0 && (
              <div className="text-sm text-gray-400 text-center mt-4">
                No tienes amigos aún
              </div>
            )}
          </div>
        </div>
      )}

      {activeUser && (
        <div
          className={`fixed inset-0 flex flex-col bg-gray-900 border border-gray-700 shadow-2xl ${
            isMobile
              ? "z-[10000] rounded-none w-full h-full"
              : "z-50 sm:bottom-4 sm:left-4 sm:top-auto sm:right-auto sm:w-[380px] sm:h-[500px] sm:rounded-xl"
          }`}
        >
          <div className="sticky top-0 z-10 bg-gray-900 p-3 border-b border-gray-700 flex justify-between items-center shadow">
            <div>
              <span className="font-semibold text-white">
                💬 {activeUser.username}
              </span>
              {typingStatus && (
                <span className="text-xs text-gray-400 ml-2 italic">
                  {typingStatus}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setActiveUserId(null);
                closeChat(activeUser.id);
              }}
              className="text-sm text-gray-400 hover:text-red-400"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col">
            <ChatModal
              user={activeUser}
              onClose={() => setActiveUserId(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
