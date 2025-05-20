"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const NewsModal = dynamic(() => import("../../news/NewsModal"));

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  created_at: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (data) setNews(data);
    };

    fetchNews();
  }, []);

  return (
    <section className="relative py-16 bg-black border-t border-gray-900 overflow-hidden">
      {/* Gradiente superior para integrarse con Hero */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#1c0f0a] to-transparent z-0" />

      {/* Gradiente inferior para la siguiente sección */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-0" />

      {/* Contenido */}
      <div className="relative z-10 container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-white mb-6 cursor-pointer hover:text-yellow-400 transition"
          onClick={() => router.push("/news")}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Últimas Noticias
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
          {news.map((noticia, index) => (
            <motion.div
              key={noticia.id}
              className="relative rounded-lg overflow-hidden group"
              onClick={() => setSelectedNews(noticia)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: false }}
            >
              <div className="relative w-full h-72">
                <Image
                  src={noticia.image}
                  alt={noticia.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent group-hover:from-black/80 transition duration-300" />
              <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                <h3 className="text-2xl font-bold">{noticia.title}</h3>
                <p className="text-gray-300">{noticia.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedNews && (
        <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </section>
  );
}
