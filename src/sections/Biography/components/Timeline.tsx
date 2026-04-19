import React from "react";
import TimelineDot from "./TimelineDot";
import { HistoryItem } from "../types";

type Props = {
  data: HistoryItem[];
  activeIndex: number;
  hoveredIndex: number | null;
  onSelect: (i: number) => void;
  onHover: (i: number | null) => void;
};

export default function Timeline({
  data,
  activeIndex,
  hoveredIndex,
  onSelect,
  onHover,
}: Props) {
  return (
    <div className="w-12 h-full flex flex-col items-center justify-center gap-3 relative">
      <div className="absolute w-[2px] h-full bg-black/10" />

      {data.map((item, i) => (
        <TimelineDot
          key={i}
          item={item}
          isActive={i === activeIndex}
          isHovered={i === hoveredIndex}
          onClick={() => onSelect(i)}
          onHoverStart={() => onHover(i)}
          onHoverEnd={() => onHover(null)}
        />
      ))}
    </div>
  );
}