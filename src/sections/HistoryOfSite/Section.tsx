import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type TimelineItem = {
  time: string | number;
  info: React.ReactNode;
};

const data: TimelineItem[] = [
  {
    time: 1800,
    info: (
      <>
        <h3 className="text-xl font-bold">Foundation</h3>
        <p className="text-gray-600">Something important happened here.</p>
      </>
    ),
  },
  {
    time: 1850,
    info: (
      <>
        <h3 className="text-xl font-bold">Expansion</h3>
        <p className="text-gray-600">Major growth and development.</p>
      </>
    ),
  },
  {
    time: 1900,
    info: (
      <>
        <h3 className="text-xl font-bold">Innovation</h3>
        <p className="text-gray-600">New ideas changed everything.</p>
      </>
    ),
  },
  {
    time: 2000,
    info: (
      <>
        <h3 className="text-xl font-bold">Modern Era</h3>
        <p className="text-gray-600">Entering the digital world.</p>
      </>
    ),
  },
];

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 w-64">
    {children}
  </div>
);

export default function Section() {
  const containerRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Measure actual width
  useLayoutEffect(() => {
    if (scrollRef.current) {
      const totalWidth = scrollRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      const extraOffset = 120; // 👈 small extra push at the end
      setMaxScroll(totalWidth - viewportWidth + extraOffset);
    }
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  return (
    <div ref={containerRef} className="h-[300vh] bg-gray-50">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* PROGRESS LINE */}
        <motion.div
          className="absolute top-1/2 left-0 h-0.75 bg-blue-500 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* BASE LINE */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300" />

        {/* HORIZONTAL CONTENT */}
        <motion.div ref={scrollRef} style={{ x }} className="flex gap-40 px-20">
          {data.map((item, index) => {
            const isTop = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex flex-col items-center min-w-75"
              >
                {/* CARD */}
                <div className={`absolute ${isTop ? "bottom-16" : "top-16"}`}>
                  <Card>{item.info}</Card>
                </div>

                {/* DOT */}
                <div className="w-5 h-5 bg-blue-500 rounded-full z-10" />

                {/* TIME */}
                <span className="mt-2 text-sm text-gray-500 font-medium">
                  {item.time}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
