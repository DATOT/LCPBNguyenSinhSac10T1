import { useTransform, MotionValue } from "framer-motion";

export function useActiveIndex(
  scrollYProgress: MotionValue<number>,
  length: number,
) {
  // map scroll progress → index space
  return useTransform(scrollYProgress, (v) => {
    return Math.round(v * (length - 1));
  });
}
