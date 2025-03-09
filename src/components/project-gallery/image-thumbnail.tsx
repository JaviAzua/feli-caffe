"use client";

import { motion } from "framer-motion";
import type { ProjectImage } from "./types";

interface ImageThumbnailProps {
  image: ProjectImage;
  index: number;
  onClick: (image: ProjectImage, index: number) => void;
}

export function ImageThumbnail({ image, index, onClick }: ImageThumbnailProps) {
  return (
    <motion.div
      className="aspect-[4/3] bg-black/40 backdrop-blur-md rounded-lg overflow-hidden cursor-pointer"
      onClick={() => onClick(image, index)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <img
        src={image.src || "/placeholder.svg"}
        alt={image.alt}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
