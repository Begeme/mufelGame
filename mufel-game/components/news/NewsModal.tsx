// components/news/NewsModal.tsx
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  created_at: string;
}

interface Props {
  news: NewsItem;
  onClose: () => void;
}

export default function NewsModal({ news, onClose }: Props) {
  const isFuture = new Date(news.created_at) > new Date();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-3xl w-full overflow-hidden shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl hover:text-yellow-500"
        >
          ✕
        </button>
        <Image
          src={news.image}
          alt={news.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {news.title}
            {isFuture && news.category === "Torneos" && (
              <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                🕑 Próximo Evento
              </span>
            )}
          </h2>
          <span className="text-sm text-yellow-500">
            {news.category} • {new Date(news.created_at).toLocaleDateString()}
          </span>
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {news.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}