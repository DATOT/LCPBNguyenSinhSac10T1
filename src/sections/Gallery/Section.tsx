import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import GalleryModal from "./components/GalleryModal";
import GalleryCard from "./components/GalleryCard";

/* ========================= */
type GalleryItem = {
  id: number;
  title: string;
  description: string;
  image: string;
};

/* ========================= */
const data: GalleryItem[] = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  title: `Gallery Item ${i + 1}`,
  description: "A beautiful cultural moment captured in time.",
  image: `https://picsum.photos/600/${400 + (i % 5) * 80}?random=${i}`,
}));
export default function GallerySection() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const ITEMS_PER_PAGE = 6;
  const AUTO_PLAY_DELAY = 4000;

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const pages = Array.from({ length: totalPages }).map((_, i) =>
    data.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(interval);
  }, [paused, totalPages]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "rgb(var(--color-bg-beige))" }}
    >
      {/* HEADER */}
      <div
        className="flex items-center px-10 h-[80px] border-b"
        style={{ borderColor: "rgb(var(--color-border))" }}
      >
        <h1
          className="text-3xl font-semibold"
          style={{ color: "rgb(var(--color-text))" }}
        >
          Gallery
        </h1>
      </div>

      {/* CONTENT */}
      <div
        className="flex-1 flex flex-col justify-center px-10 py-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* GRID SLIDER */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${page * 100}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            {pages.map((group, i) => (
              <div key={i} className="w-full shrink-0 px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {group.map((item) => (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      onClick={() => setSelected(item)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ARROWS */}
          <button
            onClick={() =>
              setPage((p) => (p - 1 + totalPages) % totalPages)
            }
            className="group absolute left-4 top-1/2 -translate-y-1/2 z-10"
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all"
              style={{
                background: "rgb(var(--color-surface-elevated))",
                border: "1px solid rgb(var(--color-border))",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <span
                className="text-lg transition-transform group-hover:-translate-x-0.5"
                style={{ color: "rgb(var(--color-text))" }}
              >
                ←
              </span>
            </div>
          </button>

          <button
            onClick={() =>
              setPage((p) => (p + 1) % totalPages)
            }
            className="group absolute right-4 top-1/2 -translate-y-1/2 z-10"
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all"
              style={{
                background: "rgb(var(--color-surface-elevated))",
                border: "1px solid rgb(var(--color-border))",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <span
                className="text-lg transition-transform group-hover:translate-x-0.5"
                style={{ color: "rgb(var(--color-text))" }}
              >
                →
              </span>
            </div>
          </button>
        </div>

        {/* DOTS */}
        <div className="flex justify-center mt-6 gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="w-2.5 h-2.5 rounded-full transition"
              style={{
                background:
                  page === i
                    ? "rgb(var(--color-secondary))"
                    : "rgb(var(--color-border))",
              }}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <GalleryModal
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}