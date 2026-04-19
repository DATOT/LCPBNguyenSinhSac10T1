import { motion } from "framer-motion";

interface InfoSectionProps {
  title: string;
  children?: React.ReactNode;
}

export function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="p-3 space-y-4"
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="text-gray-600">{children}</div>
    </motion.div>
  );
}
