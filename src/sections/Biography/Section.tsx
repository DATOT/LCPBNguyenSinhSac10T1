import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";

import { InfoSection } from "./components/InfoSection";
import Timeline from "./components/Timeline";
import YearDisplay from "./components/YearDisplay";
import { SectionProps } from "./types";

export default function Section({ title, data }: SectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const total = data.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const yearMotion = useMotionValue(data[0]?.year ?? 0);

  const animatedYear = useSpring(yearMotion, {
    stiffness: 100,
    damping: 20,
  });

  const displayYear = useTransform(animatedYear, (v) =>
    Math.round(v).toString()
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const nextIndex = Math.min(
      total - 1,
      Math.round(v * (total - 1))
    );

    setActiveIndex((prev) => {
      if (!data[nextIndex]) return 0;

      if (prev !== nextIndex) {
        yearMotion.set(data[nextIndex].year);
        return nextIndex;
      }

      return prev;
    });
  });

  const scrollToIndex = (index: number) => {
  const section = ref.current;
  if (!section) return;

  const rect = section.getBoundingClientRect();
  const absoluteTop = window.scrollY + rect.top;

  const height = section.scrollHeight - window.innerHeight;
  const target = (index / (total - 1)) * height;

  window.scrollTo({
    top: absoluteTop + target,
    behavior: "smooth",
  });
};

  const current = data[activeIndex];
  if (!current) return null;

  const visibleOffsets = [-1, 0, 1];

  const visibleItems = visibleOffsets
    .map((offset) => {
      const item = data[activeIndex + offset];
      return item ? { item, offset } : null;
    })
    .filter(Boolean) as { item: any; offset: number }[];

  return (
    <section
      ref={ref}
      className="h-[1100vh] relative"
      style={{
        backgroundColor: "rgb(var(--color-bg-beige))",
      }}
    >
      <div className="sticky top-0 h-screen flex">

        {/* TIMELINE */}
        <Timeline
          data={data}
          activeIndex={activeIndex}
          hoveredIndex={hoveredIndex}
          onSelect={scrollToIndex}
          onHover={setHoveredIndex}
        />

        {/* MAIN */}
        <div className="flex flex-col flex-1 relative">

          {/* HEADER */}
          <div className="h-1/12 flex items-center justify-center relative">
            <h2
              className="text-3xl md:text-4xl font-semibold"
              style={{ color: "rgb(var(--color-text))" }}
            >
              {title}
            </h2>

            {/* soft divider */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-[2px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(var(--color-background-opposite)/0.2), transparent)",
              }}
            />
          </div>

          {/* BODY */}
          <div className="h-11/12 flex">

            {/* YEAR */}
            <div className="w-1/4 flex items-center justify-end pr-10 relative">
              <div className="relative">
                {/* glow behind year */}
                <div
                  className="absolute inset-0 blur-2xl"
                  style={{
                    backgroundColor: "rgb(var(--color-primary) / 0.15)",
                  }}
                />

                <YearDisplay year={displayYear} />
              </div>

              {/* vertical soft line */}
              <div
                className="absolute top-1/2 right-0 -translate-y-1/2 w-[2px] h-[60%]"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(var(--color-background-opposite)/0.2), transparent)",
                }}
              />
            </div>

            {/* CONTENT */}
            <div className="w-3/4 flex items-center justify-center px-5 relative overflow-hidden">
              {visibleItems.map(({ item, offset }) => {
                const isActive = offset === 0;

                return (
                  <motion.div
                    key={item.year}
                    className="absolute w-full max-w-xl cursor-pointer"
                    initial={false}
                    onClick={() => scrollToIndex(activeIndex + offset)}
                    onHoverStart={() =>
                      setHoveredIndex(activeIndex + offset)
                    }
                    onHoverEnd={() => setHoveredIndex(null)}
                    animate={{
                      y: offset * 140,
                      opacity: isActive ? 1 : 0.15,
                      scale: isActive ? 1 : 0.96,
                      filter: isActive ? "blur(0px)" : "blur(1px)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 22,
                    }}
                    style={{
                      zIndex: isActive ? 30 : 20 - Math.abs(offset),
                    }}
                  >
                    <div
                      className="rounded-2xl p-6 transition-all duration-300"
                      style={{
                        backgroundColor: isActive
                          ? "rgb(var(--color-surface))"
                          : "transparent",
                        boxShadow: isActive
                          ? "0 10px 30px rgba(var(--color-background-opposite)/0.1)"
                          : "none",
                      }}
                    >
                      <InfoSection title={item.title}>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: isActive
                              ? "rgb(var(--color-text))"
                              : "rgb(var(--color-text-muted))",
                          }}
                        >
                          {item.description}
                        </p>
                      </InfoSection>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}