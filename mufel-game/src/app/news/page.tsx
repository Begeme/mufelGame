// app/news/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";
import dynamic from "next/dynamic";

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
    <div className="min-h-screen bg-gray-900 text-white pt-32 px-6 pb-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">📰 Últimas Noticias</h1>

        <NewsFilter active={activeCategory} onChange={handleFilter} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative rounded-xl overflow-hidden bg-gray-800 shadow hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedNews(item)}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={240}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
                <span className="text-xs text-yellow-500 block mt-2">
                  {item.category} • {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedNews && (
        <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  );
}
