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
      className="
        p-4 space-y-3
        rounded-[var(--radius-md)]
        bg-[rgb(var(--color-surface))]
      "
    >
      <h2
        className="
          text-2xl font-bold
          text-[rgb(var(--color-text))]
        "
      >
        {title}
      </h2>

      <div
        className="
          text-sm leading-relaxed
          text-[rgb(var(--color-text-muted))]
        "
      >
        {children}
      </div>
    </motion.div>
  );
}