import { motion } from "framer-motion";
import type { Info } from "../types";

interface MapLegendProps {
  mapInfo: Record<string, Info>;
  activeColors: Set<string>;
  onItemClick: (color: string, titles: string[]) => void;
}

export default function MapLegend({ mapInfo, activeColors, onItemClick }: MapLegendProps) {
  const groups = new Map<string, string[]>();

  for (const info of Object.values(mapInfo)) {
    if (!info.color) continue;
    const existing = groups.get(info.color);
    if (existing) {
      existing.push(info.title);
    } else {
      groups.set(info.color, [info.title]);
    }
  }

  if (groups.size === 0) return null;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } },
  };

  const item = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    show: {
      opacity: 0.4,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-flow-col auto-cols-max gap-2 p-3 text-sm max-w-fit"
      style={{ gridTemplateRows: "repeat(5, auto)" }}
    >
      {[...groups.entries()].map(([color, titles]) => {
        const isActive = activeColors.has(color);
        const isDimmed = activeColors.size > 0 && !isActive;

        return (
          <motion.div
            key={color}
            variants={item as any}
            animate={{
              opacity: isDimmed ? 0.2 : isActive ? 1 : 0.4,
              scale: isActive ? 1.05 : 1,
            }}
            whileHover={{
              opacity: 1,
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 },
            }}
            onClick={() => onItemClick(color, titles)}
            className="flex items-center gap-2 bg-[rgb(var(--color-surface))] border p-1 max-w-100 cursor-pointer select-none"
            style={{
              borderColor: isActive ? color : undefined,
            }}
          >
            <span
              className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-[rgb(var(--color-text))]">
              {titles.join(", ")}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}