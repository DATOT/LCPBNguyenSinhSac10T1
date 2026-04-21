import { useEffect, useRef, useState } from "react";
import type { Info } from "./types";
import { NON_INTERACTIVE_GROUPS } from "./constants";

type TooltipState = {
  x: number;
  y: number;
  visible: boolean;
  content: Info | null;
};

export function useMapInteractions(
  mapInfo: Record<string, Info>,
  activeColors: Set<string>,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const groupsRef = useRef<NodeListOf<SVGGElement> | null>(null);

  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [selected, setSelected] = useState<Info | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    x: 0,
    y: 0,
    visible: false,
    content: null,
  });
  const activeColorsRef = useRef(activeColors);
  useEffect(() => {
    activeColorsRef.current = activeColors;
  }, [activeColors]);

  const restoreSelectionState = () => {
    const groups = groupsRef.current;
    if (!groups) return;

    groups.forEach((g) => {
      if (!g.id || NON_INTERACTIVE_GROUPS.has(g.id)) return;
      const info = mapInfo[g.id];
      const isAllowed =
        activeColorsRef.current.size === 0 ||
        (info?.color != null && activeColorsRef.current.has(info.color));

      g.style.opacity = isAllowed ? "1" : "0.4";
      g.style.filter = "none";
      g.style.pointerEvents = isAllowed ? "auto" : "none";
    });
  };

  const applyHoverFocus = (target: SVGGElement | null) => {
    const groups = groupsRef.current;
    if (!groups) return;

    groups.forEach((g) => {
      if (!g.id || NON_INTERACTIVE_GROUPS.has(g.id)) return;
      const info = mapInfo[g.id];
      const isAllowed =
        activeColorsRef.current.size === 0 ||
        (info?.color != null && activeColorsRef.current.has(info.color));

      if (!target) {
        g.style.opacity = isAllowed ? "1" : "0.4";
        g.style.filter = "none";
        g.style.pointerEvents = isAllowed ? "auto" : "none";
        return;
      }

      if (g === target) {
        g.style.opacity = "1";
        g.style.filter =
          "brightness(1.2) saturate(1.2) drop-shadow(0px 6px 10px rgba(0,0,0,0.25))";
        g.style.pointerEvents = "auto";
      } else {
        g.style.opacity = isAllowed ? "0.4" : "0.15";
        g.style.filter = "none";
        g.style.pointerEvents = isAllowed ? "auto" : "none";
      }
    });
  };

  // Intersection observer
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry && setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Load SVG + attach events
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
                color: "#000000",
              },
            });
          });
          group.addEventListener("pointermove", (e: PointerEvent) => {
            setTooltip((p) => ({ ...p, x: e.clientX, y: e.clientY }));
          });
          group.addEventListener("pointerleave", () => {
            setTooltip((p) => ({ ...p, visible: false }));
            restoreSelectionState();
          });
          group.addEventListener("click", () => {
            if (!info?.showFull) return;
            setSelected(info);
          });
        });

        setReady(true);
      });
  }, [mapInfo]);

  // Animate in when scrolled into view
  useEffect(() => {
    if (!ready || !inView) return;
    const svg = svgRef.current;
    if (!svg) return;
    requestAnimationFrame(() => {
      svg.style.opacity = "1";
      svg.style.transform = "scale(1)";
    });
  }, [ready, inView]);

  const highlightByTitle = (titles: string[] | null) => {
    const groups = groupsRef.current;
    if (!groups) return;

    groups.forEach((g) => {
      if (!g.id || NON_INTERACTIVE_GROUPS.has(g.id)) return;
      const info = mapInfo[g.id];
      const isAllowed =
        activeColors.size === 0 ||
        (info?.color != null && activeColors.has(info.color));

      if (!titles) {
        g.style.opacity = isAllowed ? "1" : "0.4";
        g.style.filter = "none";
        g.style.pointerEvents = isAllowed ? "auto" : "none";
        return;
      }

      const match = info && titles.includes(info.title);
      g.style.opacity = match ? "1" : "0.4";
      g.style.filter = match
        ? "brightness(1.2) saturate(1.2) drop-shadow(0px 6px 10px rgba(0,0,0,0.25))"
        : "none";
      g.style.pointerEvents = isAllowed ? "auto" : "none";
    });
  };
  useEffect(() => {
    restoreSelectionState();
  }, [activeColors]);

  return {
    containerRef,
    tooltip,
    showHint,
    selected,
    setSelected,
    highlightByTitle,
  };
}
