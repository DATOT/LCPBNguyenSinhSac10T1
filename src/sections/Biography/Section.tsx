import React, { useRef, useState } from "react";
import { InfoSection } from "./components/InfoSection";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

type HistoryItem = {
  year: number;
  component: React.ReactNode;
};

const data: HistoryItem[] = [
  {
    year: 1800,
    component: (
      <InfoSection title="Foundation">
        <p>Something important happened.</p>
      </InfoSection>
    ),
  },
  {
    year: 1850,
    component: (
      <InfoSection title="Expansion">
        <p>More detailed custom content here.</p>
      </InfoSection>
    ),
  },
  {
    year: 1900,
    component: (
      <InfoSection title="1900 thing">
        <p>More detailed custom content here.</p>
      </InfoSection>
    ),
  },
];

function Section() {
  const ref = useRef(null);
  const total = data.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const yearMotion = useMotionValue(data[0].year);

  const animatedYear = useSpring(yearMotion, {
    stiffness: 100,
    damping: 20,
  });

  const displayYear = useTransform(animatedYear, (v) =>
    Math.round(v).toString(),
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(total - 1, Math.round(v * (total - 1)));

    if (index !== activeIndex) {
      setActiveIndex(index);
      yearMotion.set(data[index].year);
    }
  });

  return (
    <div ref={ref} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen">
        <div className="h-1/12 w-1/4 content-center pr-10 font-bold text-2xl flex flex-col items-center">
          <div>Tiểu sử cụ Sắc</div>
        </div>
        <div className="h-11/12 flex">
          <div className="w-1/4 flex items-center justify-end pr-10">
            <motion.div className="text-6xl font-bold">
              <motion.span>{displayYear}</motion.span>
            </motion.div>
          </div>

          <div className="w-3/4 flex items-center justify-center px-5 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 80 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="absolute w-full max-w-xl"
              >
                {data[activeIndex].component}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
