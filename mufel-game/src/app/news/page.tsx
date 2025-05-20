"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";
import dynamic from "next/dynamic";
import Footer from "../../../components/ui/Footer";
import { motion } from "framer-motion";

const NewsModal = dynamic(() => import("../../../components/news/NewsModal"));
const NewsFilter = dynamic(() => import("../../../components/news/NewsFilter"));

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  created_at: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filtered, setFiltered] = useState<NewsItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setNews(data);
        setFiltered(data);
      }
    };
    fetchNews();
  }, []);

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "Todos") return setFiltered(news);
    setFiltered(news.filter((n) => n.category === category));
  };

  return (
    <div className="min-h-screen pt-32 text-white bg-gradient-to-b from-black via-gray-900 to-gray-950 flex flex-col">
      <motion.main
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Últimas Noticias
          </motion.h1>

          <NewsFilter active={activeCategory} onChange={handleFilter} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                className="group relative rounded-xl overflow-hidden bg-gray-800 shadow transition-all duration-300 hover:shadow-2xl cursor-pointer"
                onClick={() => setSelectedNews(item)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                  <span className="text-xs text-yellow-500 block mt-2">
                    {item.category} • {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {selectedNews && (
          <NewsModal
            news={selectedNews}
            onClose={() => setSelectedNews(null)}
          />
        )}
      </motion.main>

      <Footer />
    </div>
  );
}
