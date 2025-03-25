"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useUser } from "../../context/UserContext";
import { Button } from "../ui/Button";

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
}

export default function ChatModal({ user, onClose }: ChatModalProps) {
  const context = useUser();
  const currentUser = context !== "loading" ? context.user : null;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    fetchMessages();

    const channel = supabase
      .channel(`chat-${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const msg = payload.new as Message;
          if (
            (msg.sender_id === currentUser.id && msg.receiver_id === user.id) ||
            (msg.sender_id === user.id && msg.receiver_id === currentUser.id)
          ) {
            setMessages((prev) => [...prev, msg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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

  const handleSend = async () => {
    if (!newMessage.trim() || !currentUser) return;
    const { error } = await supabase.from("messages").insert({
      sender_id: currentUser.id,
      receiver_id: user.id,
      content: newMessage,
    });
    if (!error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender_id: currentUser.id,
          receiver_id: user.id,
          content: newMessage,
          created_at: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 left-4 w-[340px] max-h-[500px] bg-gray-900 border border-gray-700 rounded-xl shadow-xl flex flex-col z-50">
      <div className="p-3 border-b border-gray-700 flex justify-between items-center">
        <span className="font-semibold text-white">💬 {user.username}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-400 transition text-sm"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`px-4 py-2 rounded-lg max-w-[85%] break-words text-sm shadow-sm ${
              msg.sender_id === currentUser?.id
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-700 text-white"
            }`}
          >
            {msg.content}
          </div>
        ))}
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
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <Button type="submit" className="px-4 py-2 text-sm">
          Enviar
        </Button>
      </form>
    </div>
  );
}