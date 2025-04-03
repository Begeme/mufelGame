"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useUser } from "./UserContext";
import { supabase } from "../lib/supabaseClient";
import ChatPanel from "./ChatPanel";

export interface UserInfo {
  id: string;
  username: string;
}

interface ChatContextType {
  openChats: UserInfo[];
  unreadMessages: { [userId: string]: number };
  openChat: (user: UserInfo) => void;
  closeChat: (userId: string) => void;
  incrementUnread: (userId: string) => void;
  resetUnread: (userId: string) => void;
  friends: UserInfo[];
  refreshFriends: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat debe usarse dentro de <ChatProvider>");
  return context;
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [openChats, setOpenChats] = useState<UserInfo[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<{
    [userId: string]: number;
  }>({});
  const [friends, setFriends] = useState<UserInfo[]>([]);

  const context = useUser();
  const user = context !== "loading" ? context.user : null;

  const refreshFriends = useCallback(async () => {
    if (!user) return;

    const { data: friendships, error } = await supabase
      .from("friendships")
      .select("*")
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq("status", "accepted");

    if (error) {
      console.error("Error al cargar friendships:", error);
      return;
    }

    const friendIds =
      friendships?.map((f) =>
        f.user_id === user.id ? f.friend_id : f.user_id
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
  }, [user]);

  useEffect(() => {
    if (!user) return;

    refreshFriends();

    const loadUnreadMessages = async () => {
      const { data: unreadData, error } = await supabase
        .from("messages")
        .select("sender_id, id")
        .eq("receiver_id", user.id)
        .eq("read", false);

      if (error) {
        console.error("Error al cargar mensajes no leídos:", error);
        return;
      }

      const counts: { [userId: string]: number } = {};
      unreadData.forEach((msg) => {
        if (!counts[msg.sender_id]) counts[msg.sender_id] = 0;
        counts[msg.sender_id]++;
      });

      for (const senderId of Object.keys(counts)) {
        const { data: userInfo, error: userError } = await supabase
          .from("users")
          .select("username")
          .eq("id", senderId)
          .single();

        if (userError) {
          console.error("Error al obtener username:", userError);
          continue;
        }

        const username = userInfo?.username || "Usuario";

        setOpenChats((prev) => {
          const exists = prev.find((u) => u.id === senderId);
          return exists ? prev : [...prev, { id: senderId, username }];
        });

        setUnreadMessages((prev) => ({
          ...prev,
          [senderId]: counts[senderId],
        }));
      }
    };

    loadUnreadMessages();
  }, [user, refreshFriends]);

  const openChat = (user: UserInfo) => {
    setOpenChats((prev) => {
      const exists = prev.find((u) => u.id === user.id);
      return exists ? prev : [...prev, user];
    });
    resetUnread(user.id);
  };

  const closeChat = (userId: string) => {
    setOpenChats((prev) => prev.filter((u) => u.id !== userId));
  };

  const incrementUnread = (userId: string) => {
    setUnreadMessages((prev) => ({
      ...prev,
      [userId]: (prev[userId] || 0) + 1,
    }));
  };

  const resetUnread = (userId: string) => {
    setUnreadMessages((prev) => ({ ...prev, [userId]: 0 }));
  };

  return (
    <ChatContext.Provider
      value={{
        openChats,
        unreadMessages,
        openChat,
        closeChat,
        incrementUnread,
        resetUnread,
        friends,
        refreshFriends,
      }}
    >
      {children}
      <ChatPanel />
    </ChatContext.Provider>
  );
}
