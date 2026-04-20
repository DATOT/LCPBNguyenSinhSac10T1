import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Info = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  showFull?: boolean;
};

interface SectionProps {
  title: string;
  hint: string;
  mapInfo: Record<string, Info>;
}

const NON_INTERACTIVE_GROUPS = new Set([
  "grass",
  "street",
  "water",
  "road",
]);

export default function Section({ mapInfo, title, hint }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const groupsRef = useRef<NodeListOf<SVGGElement> | null>(null);

  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [showHint, setShowHint] = useState(true);

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

  const [selected, setSelected] = useState<Info | null>(null);

  /* =========================
     HOVER FOCUS EFFECT
  ========================= */
  const applyHoverFocus = (target: SVGGElement | null) => {
    const groups = groupsRef.current;
    if (!groups) return;

    groups.forEach((g) => {
      if (!g.id || NON_INTERACTIVE_GROUPS.has(g.id)) return;

      if (!target) {
        g.style.opacity = "1";
        g.style.filter = "none";
        return;
      }

      if (g === target) {
        g.style.opacity = "1";
        g.style.filter =
          "brightness(1.2) saturate(1.2) drop-shadow(0px 6px 10px rgba(0,0,0,0.25))";
      } else {
        g.style.opacity = "0.4";
        g.style.filter = "none";
      }
    });
  };

  /* =========================
     VIEW OBSERVER
  ========================= */
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry ? setInView(entry.isIntersecting) : null,
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* =========================
     LOAD SVG
  ========================= */
  useEffect(() => {
    fetch("/assets/Map/SoDoKhuDiTich.svg")
      .then((res) => res.text())
      .then((svgText) => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = svgText;

        const svg = containerRef.current.querySelector("svg") as SVGSVGElement;
        if (!svg) return;

        svgRef.current = svg;

        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.display = "block";

        const groups =
          containerRef.current.querySelectorAll<SVGGElement>("#layer1 > g");

        groupsRef.current = groups;

        /* =========================
           EVENTS
        ========================= */
        groups.forEach((group) => {
          if (!group.id || NON_INTERACTIVE_GROUPS.has(group.id)) return;

          group.style.cursor = "pointer";

          const info = mapInfo[group.id];

          group.addEventListener("pointerenter", (e: PointerEvent) => {
            setShowHint(false);

            applyHoverFocus(group);

            setTooltip({
              x: e.clientX,
              y: e.clientY,
              visible: true,
              content: info || {
                title: group.id,
                shortDescription: "No data available",
                fullDescription: "No data available",
                image: "",
              },
            });
          });

          group.addEventListener("pointermove", (e: PointerEvent) => {
            setTooltip((p) => ({
              ...p,
              x: e.clientX,
              y: e.clientY,
            }));
          });

          group.addEventListener("pointerleave", () => {
            setTooltip((p) => ({ ...p, visible: false }));
            applyHoverFocus(null);
          });

          /* =========================
             CLICK → MODAL
          ========================= */
          group.addEventListener("click", () => {
            if (!info) return;

            if (!info.showFull) return;

            setSelected(info);
          });
        });

        setReady(true);
      });
  }, [mapInfo]);

  /* =========================
     ANIMATION ON VIEW
  ========================= */
  useEffect(() => {
    if (!ready || !inView) return;

    const svg = svgRef.current;
    const groups = groupsRef.current;
    if (!svg || !groups) return;

    requestAnimationFrame(() => {
      svg.style.opacity = "1";
      svg.style.transform = "scale(1)";
    });
  }, [ready, inView]);

  /* =========================
     MODAL
  ========================= */
  function Modal({
    data,
    onClose,
  }: {
    data: Info;
    onClose: () => void;
  }) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          {/* content */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-[90%] max-w-lg bg-white rounded-xl overflow-hidden shadow-2xl"
          >
            <img
              src={data.image}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold">{data.title}</h2>
              <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                {data.fullDescription}
              </p>
            </div>

            <button
              onClick={onClose}
              className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="relative w-full h-full overflow-hidden bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text))]">

      <div className="text-3xl font-semibold p-2">
        {title}
      </div>

      {/* hint */}
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

      {/* map */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
      />

      {/* tooltip */}
      <AnimatePresence>
        {tooltip.visible && tooltip.content && (
          <motion.div
            initial={{ scale: 0.1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.1 }}
            className="fixed z-50 pointer-events-none max-w-xs"
            style={{
              left: tooltip.x + 14,
              top: tooltip.y + 14,
            }}
          >
            <div className="p-3 rounded-md bg-white/30 backdrop-blur text-black">
              <h3 className="text-sm font-semibold">
                {tooltip.content.title}
              </h3>
              <p className="text-xs opacity-80">
                {tooltip.content.shortDescription}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* modal */}
      {selected && (
        <Modal
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}