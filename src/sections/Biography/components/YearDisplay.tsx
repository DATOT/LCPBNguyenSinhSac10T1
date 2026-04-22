import React from "react";
import { motion, MotionValue } from "framer-motion";

type Props = {
  year: MotionValue<string>;
};

export default function YearDisplay({ year }: Props) {
  return (
    <motion.div className="text-6xl font-bold text-[rgb(var(--color-green-dark))]">
      <motion.span>{year}</motion.span>
    </motion.div>
  );
}