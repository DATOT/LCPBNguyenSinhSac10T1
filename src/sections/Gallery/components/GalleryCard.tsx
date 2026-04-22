import { motion } from "framer-motion";

type GalleryItem = {
  id: number;
  title: string;
  description?: string;
  image: string;
};

function trimText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export default function GalleryCard({
  item,
  onClick,
  ctaText,
}: {
  item: GalleryItem;
  onClick: () => void;
  ctaText: string;
}) {
  return (
    <motion.div
      layoutId={`card-${item.id}`}
      onClick={onClick}
      className="
        relative mb-4 break-inside-avoid cursor-pointer 
        rounded-[var(--radius-md)] overflow-hidden group
        bg-[rgb(var(--color-surface-elevated))]
      "
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <img
        src={item.image}
        className="w-full h-full object-cover"
      />

      {/* THEMED OVERLAY */}
      <div
        className="
          absolute inset-0 opacity-0 group-hover:opacity-100 
          transition duration-300
        "
        style={{
          background: `
            linear-gradient(
              to top,
              rgba(var(--color-text) / 0.85),
              rgba(var(--color-text) / 0.35),
              transparent
            )
          `,
        }}
      />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-end p-4">
        <div className="
          translate-y-4 opacity-0 
          group-hover:translate-y-0 group-hover:opacity-100 
          transition-all duration-300
        ">
          <h3
            className="
              text-sm font-semibold leading-tight
              text-[rgb(var(--color-text-opposite))]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              text-xs mt-1 leading-snug
              text-[rgb(var(--color-text-opposite)/0.8)]
            "
          >
            {item.description && trimText(item.description, 60)}
          </p>

          <span
            className="
              text-[10px] mt-1 block
              text-[rgb(var(--color-text-opposite)/0.6)]
            "
          >
            {ctaText}
          </span>
        </div>
      </div>
    </motion.div>
  );
}