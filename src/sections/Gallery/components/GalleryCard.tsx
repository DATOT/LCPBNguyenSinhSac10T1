import { motion } from "framer-motion";

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  image: string;
};

function trimText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export default function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  return (
    <motion.div
      layoutId={`card-${item.id}`}
      onClick={onClick}
      className="relative mb-4 break-inside-avoid cursor-pointer rounded-xl overflow-hidden group"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      {/* IMAGE */}
      <img
        src={item.image}
        className="w-full h-full object-cover"
      />

      {/* GRADIENT OVERLAY */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.2), transparent)",
        }}
      />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-end p-4">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          
          {/* TITLE */}
          <h3 className="text-sm font-semibold text-white leading-tight drop-shadow">
            {item.title}
          </h3>

          {/* DESCRIPTION (trimmed teaser) */}
          <p className="text-xs text-white/80 mt-1 leading-snug">
            {trimText(item.description, 60)}
          </p>

          {/* CTA hint */}
          <span className="text-[10px] text-white/60 mt-1 block">
            Click to explore →
          </span>
        </div>
      </div>
    </motion.div>
  );
}