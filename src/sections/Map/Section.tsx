import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Info = {
  title: string;
  description: string;
};

const infoMap: Record<string, Info> = {
  g1: {
    title: "Group 1",
    description: "This is the main historical zone.",
  },
  path14: {
    title: "Region 14",
    description: "Important structure here.",
  },
};

// ✅ Groups that should NOT react on hover
const NON_INTERACTIVE_GROUPS = new Set(["grass"]);

export default function Section() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    visible: boolean;
    content: Info | null;
  }>({
    x: 0,
    y: 0,
    visible: false,
    content: null,
  });

  useEffect(() => {
    let cleanups: (() => void)[] = [];

    fetch("/assets/SoDoKhuDiTich.svg")
      .then((res) => res.text())
      .then((svgText) => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = svgText;

        const svg = containerRef.current.querySelector("svg");
        if (!svg) return;

        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.style.width = "100%";
        svg.style.height = "auto";
        svg.style.display = "block";

        const groups = containerRef.current.querySelectorAll("#layer1 > g");

        groups.forEach((g) => {
          const group = g as SVGGElement;
          if (!group.id) return;

          // ❌ Skip non-interactive groups
          if (NON_INTERACTIVE_GROUPS.has(group.id)) return;

          // smoother base transition
          group.style.transition =
            "transform 0.25s ease, opacity 0.25s ease, filter 0.25s ease";
          group.style.transformOrigin = "center";
          group.style.transformBox = "fill-box";

          const handleOver = (e: MouseEvent) => {
            if (group.contains(e.relatedTarget as Node)) return;

            setActiveId(group.id);

            // ✨ Emphasize hovered group
            group.style.transform = "scale(1.05)";
            group.style.filter = "opacity(2)";

            // ✨ De-emphasize others
            groups.forEach((other) => {
              if (other === group) return;
              const el = other as SVGGElement;

              if (NON_INTERACTIVE_GROUPS.has(el.id)) return;

              el.style.opacity = "0.4";
            });

            const info = infoMap[group.id];

            setTooltip({
              x: e.clientX,
              y: e.clientY,
              visible: true,
              content: info || {
                title: group.id,
                description: "No data available",
              },
            });
          };

          const handleMove = (e: MouseEvent) => {
            setTooltip((prev) => ({
              ...prev,
              x: e.clientX,
              y: e.clientY,
            }));
          };

          const handleOut = (e: MouseEvent) => {
            if (group.contains(e.relatedTarget as Node)) return;

            // reset all
            groups.forEach((other) => {
              const el = other as SVGGElement;
              el.style.opacity = "1";
              el.style.transform = "scale(1)";
              el.style.filter = "none";
            });

            setActiveId(null);
            setTooltip((prev) => ({ ...prev, visible: false }));
          };

          group.addEventListener("mouseover", handleOver);
          group.addEventListener("mousemove", handleMove);
          group.addEventListener("mouseout", handleOut);

          cleanups.push(() => {
            group.removeEventListener("mouseover", handleOver);
            group.removeEventListener("mousemove", handleMove);
            group.removeEventListener("mouseout", handleOut);
          });
        });
      });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* SVG */}
      <div ref={containerRef} className="w-full overflow-hidden p-5 bg-white" />

      {/* ✨ Tooltip */}
      <AnimatePresence>
        {tooltip.visible && tooltip.content && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.25 }}
            className="fixed pointer-events-none z-50 bg-white/15 backdrop-blur-sm shadow-xl rounded-lg px-3 py-2 border"
            style={{
              left: tooltip.x + 14,
              top: tooltip.y + 14,
            }}
          >
            <h3 className="font-semibold text-sm">{tooltip.content.title}</h3>
            <p className="text-xs text-gray-600">
              {tooltip.content.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Debug */}
      <div className="p-3 text-sm">
        <span className="font-medium">Active:</span> {activeId || "None"}
      </div>
    </div>
  );
}
