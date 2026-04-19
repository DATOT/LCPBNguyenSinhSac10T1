import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Info = {
  title: string;
  description: string;
};

interface SectionProps {
  title: string;
  mapInfo: Record<string, Info>;
}

const NON_INTERACTIVE_GROUPS = new Set(["grass", "street", "water", "road"]);

export default function Section({ mapInfo, title }: SectionProps) {
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

    fetch("/assets/Map/SoDoKhuDiTich.svg")
      .then((res) => res.text())
      .then((svgText) => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = svgText;

        const svg = containerRef.current.querySelector("svg");
        if (!svg) return;

        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.display = "block";
        svg.style.userSelect = "none";

        const groups =
          containerRef.current.querySelectorAll<SVGGElement>("#layer1 > g");

        groups.forEach((group) => {
          if (!group.id) return;
          if (NON_INTERACTIVE_GROUPS.has(group.id)) return;

          group.style.transition =
            "opacity 0.25s ease, filter 0.25s ease";
          group.style.cursor = "pointer";

          const handleEnter = (e: PointerEvent) => {
            setActiveId(group.id);

            // highlight hovered
            group.style.filter =
              "brightness(1.15) saturate(1.1) drop-shadow(0 4px 10px rgba(0,0,0,0.25))";
            group.style.opacity = "1";

            // dim others
            groups.forEach((other) => {
              if (other === group) return;
              if (NON_INTERACTIVE_GROUPS.has(other.id)) return;

              other.style.opacity = "0.25";
              other.style.filter = "blur(1px)";
            });

            const info = mapInfo[group.id];

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

          const handleMove = (e: PointerEvent) => {
            setTooltip((prev) => ({
              ...prev,
              x: e.clientX,
              y: e.clientY,
            }));
          };

          const handleLeave = () => {
            groups.forEach((el) => {
              el.style.opacity = "1";
              el.style.filter = "none";
            });

            setActiveId(null);
            setTooltip((prev) => ({ ...prev, visible: false }));
          };

          group.addEventListener("pointerenter", handleEnter);
          group.addEventListener("pointermove", handleMove);
          group.addEventListener("pointerleave", handleLeave);

          cleanups.push(() => {
            group.removeEventListener("pointerenter", handleEnter);
            group.removeEventListener("pointermove", handleMove);
            group.removeEventListener("pointerleave", handleLeave);
          });
        });
      });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [mapInfo]);

  return (
  <div
    className="relative w-full h-screen overflow-hidden"
    style={{
      background: `rgb(var(--color-surface))`,
      color: `rgb(var(--color-text))`,
    }}
  >
    <div
      className="absolute top-4 left-6 z-10 text-lg font-semibold"
      style={{
        position: "absolute", 
        color: `rgb(var(--color-primary))`,
      }}
    >
      {title}
    </div>

    {/* Map container */}
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center p-6"
    />

    {/* Tooltip */}
    <AnimatePresence>
      {tooltip.visible && tooltip.content && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className="fixed z-50 pointer-events-none max-w-xs"
          style={{
            left: tooltip.x + 14,
            top: tooltip.y + 14,
          }}
        >
          <div
            style={{
              background: `rgb(var(--color-surface-elevated) / 0.75)`,
              backdropFilter: "blur(14px)",
              border: `1px solid rgb(var(--color-border))`,
              borderRadius: "var(--radius-md)",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.15), 0 2px 10px rgba(0,0,0,0.08)",
              padding: "10px 14px",
            }}
          >
            <h3
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: `rgb(var(--color-primary))`,
              }}
            >
              {tooltip.content.title}
            </h3>

            <p
              style={{
                fontSize: "0.75rem",
                marginTop: "4px",
                color: `rgb(var(--color-text-muted))`,
              }}
            >
              {tooltip.content.description}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
}