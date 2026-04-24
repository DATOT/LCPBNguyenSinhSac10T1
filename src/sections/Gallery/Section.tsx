import { useEffect, useState } from "react";
import GalleryCard from "./components/GalleryCard";
import GalleryModal from "./components/GalleryModal";
import PostForm from "./components/PostForm";

import { GalleryItem, SectionProps } from "./types";
import { fetchPosts, createPost } from "../../lib/api";

export default function Section({ config }: { config: SectionProps }) {
  const [posts, setPosts] = useState<GalleryItem[]>([]);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(0);
  console.log(posts)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleAdd(data: {
    title: string;
    description: string;
    author: string;
    file: File;
  }) {
    const newPost = await createPost(data);
    setPosts((prev) => [newPost, ...prev]);
  }

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  const pages = Array.from({ length: totalPages }).map((_, i) =>
    posts.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE)
  );

  return (
    <div
      className="min-h-screen p-2"
      style={{ background: "rgb(var(--color-bg-beige))" }}
    >
      <h1 className="mb-6 text-3xl font-semibold text-[rgb(var(--color-text))]">{config.title}</h1>

      {loading && (
        <p className="text-center mt-10">{config.loadingText}</p>
      )}

      {!loading && (
        <div className="grid md:grid-cols-3 gap-6">
          {pages[page]?.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => setSelected(item)}
              ctaText={config.card.cta}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mb-6 gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className="w-3 h-3 rounded-full"
            style={{
              background:
                page === i
                  ? "rgb(var(--color-secondary))"
                  : "rgb(var(--color-border))",
            }}
          />
        ))}
      </div>

      {selected && (
        <GalleryModal
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <PostForm onSubmit={handleAdd} config={config.form} />
    </div>
  );
}