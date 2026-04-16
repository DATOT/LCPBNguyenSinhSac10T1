import { motion } from "framer-motion";

export interface MemberCardProps {
  image: string;
  name: string;
  role: string;
}

export function MemberCard({ image, name, role }: MemberCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="flex items-center gap-4 p-3 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
    >
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </motion.div>
  );
}
