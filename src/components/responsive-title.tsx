"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ResponsiveTitle() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") as "split" | "left" | "right" | null;

  // Determinar si debe estar centrado
  const isCentered = view === "left" || view === "right";

  return (
    <motion.h1
      className="tracking-wider absolute top-3 z-50 font-raleway text-5xl text-white text-pretty"
      initial={false}
      animate={{
        left: isCentered ? "50%" : "40px",
        x: isCentered ? "-50%" : 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        stiffness: 100,
        damping: 50,
      }}
    >
      <span className="text-nowrap">Felipe Cafferata</span>
      <span
        className={`
        ${isCentered && "hidden"} font-light transition-all`}
      >
        {" -"}photographer
      </span>
      <span className="sr-only">
        {`Felipe Cafferata is a passionate photographer and traveler, capturing the beauty of life's fleeting moments through his lens.`}
      </span>
    </motion.h1>
  );
}
