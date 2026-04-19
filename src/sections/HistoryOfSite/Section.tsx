import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import TimelineCard from "./components/TimelineCard";

export type TimelineItem = {
  time: string | number;
  title: string;
  description: string;
};

export interface SectionProps {
  title: string;
  data: TimelineItem[];
}

export default function Section({ data, title }: SectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  useLayoutEffect(() => {
    const measure = () => {
      if (!scrollRef.current) return;
      const totalWidth = scrollRef.current.scrollWidth;
      setMaxScroll(totalWidth - window.innerWidth + 100);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const xRaw = useTransform(scrollYProgress, [0.05, 0.9], [0, -maxScroll]);
  const x = useSpring(xRaw, { stiffness: 90, damping: 20 });

  return (
    <div
      ref={containerRef}
      className="h-[600vh]"
      style={{
        background: "rgb(var(--color-bg-yellow))",
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* HEADER */}
        <div
          className="flex items-center px-10 h-[10%] border-b"
          style={{ borderColor: "rgb(var(--color-border))" }}
        >
          <h1
            className="text-3xl font-bold"
            style={{ color: "rgb(var(--color-text))" }}
          >
            {title}
          </h1>
        </div>

        {/* TIMELINE */}
        <div className="relative flex items-center h-[90%]">
          {/* LINE */}
          <div
            className="absolute top-1/2 left-0 h-[2px] w-full"
            style={{ background: "rgb(var(--color-border))" }}
          />

          {/* TRACK */}
          <motion.div
            ref={scrollRef}
            style={{ x }}
            className="flex gap-40 px-32"
          >
            {data.map((item, index) => (
              <TimelineNode
                key={index}
                item={item}
                isTop={index % 2 === 0}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TimelineNode({
  item,
  isTop,
}: {
  item: TimelineItem;
  isTop: boolean;
}) {
  return (
    <div className="relative min-w-[300px] flex flex-col items-center">
      {/* CONNECTOR */}
      <div
        className={`absolute left-1/2 w-[2px] ${
          isTop ? "bottom-1/2 h-24" : "top-1/2 h-24"
        }`}
        style={{ background: "rgb(var(--color-border))" }}
      />

      {/* TIME */}
      <div
        className={`absolute text-sm font-medium ${
          isTop ? "top-4" : "bottom-4"
        }`}
        style={{ color: "rgb(var(--color-text-muted))" }}
      >
        {item.time}
      </div>

      {/* DOT */}
      <div
        className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 z-20"
        style={{
          background: "rgb(var(--color-secondary))",
          boxShadow: "0 0 12px rgba(var(--color-secondary), 0.5)",
        }}
      />

      {/* CARD */}
      <div className={`absolute ${isTop ? "bottom-24" : "top-24"}`}>
        <TimelineCard
          isTop={isTop}
          title={item.title}
          description={item.description}
        />
      </div>
    </div>
  );
}