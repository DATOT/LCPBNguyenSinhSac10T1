import { motion } from "framer-motion";

export interface MemberCardProps {
  image: string;
  name: string;
  role: string;
}

export function MemberCard({ image, name, role }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -20, height: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-center gap-4 p-3 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
    >
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full object-cover"
      />

      <div>
        <p className="font-bold text-gray-800 text-3xl">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </motion.div>
  );
}
