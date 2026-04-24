import { motion } from "framer-motion";

export interface MemberCardProps {
  image: string;
  name: string;
}

export function MemberCard({ image, name }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex items-center gap-4 p-3 rounded-xl transition"
      style={{
        backgroundColor: "rgb(var(--color-surface) / 0.6)",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
      whileHover={{
        y: -2,
        backgroundColor: "rgb(var(--color-surface) / 0.9)",
      }}
    >
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full object-cover"
      />

      <div>
        <p
          className="font-semibold text-xl"
          style={{ color: "rgb(var(--color-text))" }}
        >
          {name}
        </p>
      </div>
    </motion.div>
  );
}
