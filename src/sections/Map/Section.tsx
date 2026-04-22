import { motion, AnimatePresence } from "framer-motion";
import Modal from "./components/Modal";
import { useMapInteractions } from "./useMapInteractions";
import type { SectionProps } from "./types";
import MapLegend from "./components/MapLegend";
import { useState } from "react";

export default function Section({ mapInfo, title, hint }: SectionProps) {
  const [activeColors, setActiveColors] = useState<Set<string>>(new Set());
  const { containerRef, tooltip, showHint, selected, setSelected, highlightByTitle } =
    useMapInteractions(mapInfo, activeColors);

  const handleLegendClick = (color: string, titles: string[]) => {
    setActiveColors((prev) => {
      const next = new Set(prev);
      if (next.has(color)) {
        next.delete(color);
      } else {
        next.add(color);
      }
      return next;
    });

    // scroll on first selection
    if (!activeColors.has(color)) {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // clear all highlights when clicking outside the legend (optional but nice)
  const handleMapClick = () => {
    setActiveColors(new Set());
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text))]">
      <h1 className="text-3xl font-semibold text-[rgb(var(--color-text))] p-2">{title}</h1>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm"
          >
            {hint}
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef} onClick={handleMapClick} className="w-full h-full flex items-center justify-center" />

      <AnimatePresence>
        {tooltip.visible && tooltip.content && (
          <motion.div
            initial={{ scale: 0.1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.1 }}
            className="fixed z-50 pointer-events-none max-w-xs"
            style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}
          >
            <div className="p-3 rounded-md bg-[rgb(var(--color-background))]/30 backdrop-blur text-[rgb(var(--color-text))]">
              <h3 className="text-sm font-semibold">{tooltip.content.title}</h3>
              <p className="text-xs opacity-90">{tooltip.content.shortDescription}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selected && (
        <Modal data={selected} onClose={() => setSelected(null)} />
      )}

      <MapLegend
        mapInfo={mapInfo}
        activeColors={activeColors}
        onItemClick={handleLegendClick}
      />
    </div>
  );
}