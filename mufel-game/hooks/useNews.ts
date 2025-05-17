// hooks/useNews.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export interface NewsItem {
  id: string;
  titulo: string;
  descripcion: string;
  contenido?: string;
  imagen: string;
  categoria: string;
  created_at: string;
}

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setNews(data);
      setLoading(false);
    };

    fetchNews();
  }, []);

  return { news, loading };
}
