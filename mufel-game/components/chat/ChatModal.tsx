"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useUser } from "../../context/UserContext";
import { useChat } from "../../context/ChatLayout";
import { useNotification } from "../../context/NotificationContext";
import { Button } from "../ui/Button";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";

interface ChatModalProps {
  user: { id: string; username: string };
  onClose: () => void;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  tempId?: string;
}

export default function ChatModal({ user }: ChatModalProps) {
  const context = useUser();
  const currentUser = context !== "loading" ? context.user : null;
  const { soundEnabled } = useNotification();
  const { resetUnread } = useChat();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showTypingDots, setShowTypingDots] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const markInteraction = () => {
      hasInteracted.current = true;
      document.removeEventListener("click", markInteraction);
      document.removeEventListener("keydown", markInteraction);
    };

    document.addEventListener("click", markInteraction);
    document.addEventListener("keydown", markInteraction);

    return () => {
      document.removeEventListener("click", markInteraction);
      document.removeEventListener("keydown", markInteraction);
    };
  }, []);

  const playNotificationSound = () => {
    if (!soundEnabled || !hasInteracted.current) return;
    const audio = new Audio("/sounds/notification.mp3");
    audio.volume = 0.4;
    audio.play().catch((e) => console.warn("Error al reproducir sonido:", e));
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchMessages();

    const messageChannel = supabase
      .channel("chat-modal-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const msg = payload.new as Message;
          if (
            (msg.sender_id === currentUser.id && msg.receiver_id === user.id) ||
            (msg.sender_id === user.id && msg.receiver_id === currentUser.id)
          ) {
            setMessages((prev) => {
              const index = prev.findIndex(
                (m) =>
                  m.sender_id === msg.sender_id &&
                  m.receiver_id === msg.receiver_id &&
                  m.content === msg.content &&
                  Math.abs(
                    new Date(m.created_at).getTime() -
                      new Date(msg.created_at).getTime()
                  ) < 1000
              );

              if (index !== -1) {
                const updated = [...prev];
                updated[index] = msg;
                return updated;
              }

              const exists = prev.some((m) => m.id === msg.id);
              return exists ? prev : [...prev, msg];
            });

            if (msg.sender_id !== currentUser.id) {
              playNotificationSound();
            }
          }
        }
      )
      .subscribe();

    const typingChannel = supabase
      .channel("typing-status")
      .on("broadcast", { event: "typing" }, (payload) => {
        if (
          payload.payload.sender === user.id &&
          payload.payload.receiver === currentUser?.id
        ) {
          setShowTypingDots(true);
          if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = setTimeout(() => {
            setShowTypingDots(false);
          }, 3000);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(typingChannel);
    };
  }, [user.id, currentUser?.id, soundEnabled]);

  useEffect(() => {
    if (!currentUser) return;
    resetUnread(user.id);

    const markAsRead = async () => {
      await supabase
        .from("messages")
        .update({ read: true })
        .eq("sender_id", user.id)
        .eq("receiver_id", currentUser.id)
        .eq("read", false);
    };

    markAsRead();
  }, [user.id, currentUser?.id]);

  const fetchMessages = async () => {
    if (!currentUser) return;
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${currentUser.id},receiver_id.eq.${user.id}),and(sender_id.eq.${user.id},receiver_id.eq.${currentUser.id})`
      )
      .order("created_at", { ascending: true });

    setMessages(data || []);
  };

  const emitTyping = async () => {
    if (!currentUser) return;
    await supabase.channel("typing-status").send({
      type: "broadcast",
      event: "typing",
      payload: {
        sender: currentUser.id,
        receiver: user.id,
      },
    });
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    emitTyping();
    typingTimeoutRef.current = setTimeout(() => {
      setShowTypingDots(false);
    }, 3000);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !currentUser) return;

    const tempId = uuidv4();
    const tempMessage: Message = {
      id: tempId,
      sender_id: currentUser.id,
      receiver_id: user.id,
      content: newMessage,
      created_at: new Date().toISOString(),
      tempId,
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");
    setShowTypingDots(false);

    await supabase.from("messages").insert({
      sender_id: currentUser.id,
      receiver_id: user.id,
      content: newMessage,
      read: false,
    });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const groupMessagesByDate = (msgs: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    msgs.forEach((msg) => {
      const date = parseISO(msg.created_at);
      let label = "";
      if (isToday(date)) label = "Hoy";
      else if (isYesterday(date)) label = "Ayer";
      else label = format(date, "dd 'de' MMMM 'de' yyyy", { locale: es });
      if (!groups[label]) groups[label] = [];
      groups[label].push(msg);
    });
    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[90vh] bg-gray-900 rounded-lg shadow-xl flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 text-sm scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          {Object.entries(groupedMessages).map(([label, msgs]) => (
            <div key={label} className="space-y-2">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1 h-px bg-gray-700" />
                <span className="text-center text-xs text-gray-400 font-medium whitespace-nowrap">
                  {label}
                </span>
                <div className="flex-1 h-px bg-gray-700" />
              </div>
              {msgs.map((msg) => (
                <div
                  key={msg.tempId ?? msg.id}
                  className={`px-4 py-2 rounded-lg max-w-[85%] break-words text-sm shadow-sm relative ${
                    msg.sender_id === currentUser?.id
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {msg.content}
                  <div className="text-[10px] text-gray-300 mt-1 text-right">
                    {format(parseISO(msg.created_at), "HH:mm")}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {showTypingDots && (
            <div className="text-xs text-gray-400 italic ml-2 mb-2 animate-pulse">
              {user.username} está escribiendo
              <span className="inline-block animate-bounce">...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-2 border-t border-gray-700 flex items-center gap-2 bg-gray-800"
        >
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Button type="submit" className="px-4 py-2 text-sm">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}
