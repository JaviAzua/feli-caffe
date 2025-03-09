"use client";

import type React from "react";
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import TextBorderAnimation from "./animata/text/text-border-animation";
import { useRouter } from "next/navigation";

interface SplitLayoutProps {
  activeSide: "split" | "left" | "right";
  setActiveSide: (side: "split" | "left" | "right") => void;
  leftComponent: ReactNode;
  rightComponent: ReactNode;
  leftLabel: string;
  rightLabel: string;
  leftBackground: string;
  rightBackground: string;
}

export default function SplitLayout({
  activeSide,
  setActiveSide,
  leftComponent,
  rightComponent,
  leftLabel,
  rightLabel,
  leftBackground,
  rightBackground,
}: SplitLayoutProps) {
  const router = useRouter();
  const [hoveredSide, setHoveredSide] = useState<"none" | "left" | "right">(
    "none"
  );

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();

    // First update the local state
    setActiveSide("split");

    // Then navigate to the root path with Next.js router
    router.push("/");
  };

  // Get clip-path values based on state
  const getLeftClipPath = () => {
    if (activeSide === "left") return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    if (activeSide === "right") return "polygon(0 0, 0 0, 0 100%, 0 100%)"; // Hide completely when right is active
    if (hoveredSide === "left") return "polygon(0 0, 45% 0, 75% 100%, 0 100%)";
    if (hoveredSide === "right") return "polygon(0 0, 15% 0, 65% 100%, 0 100%)"; // Retract slightly when hovering right side
    return "polygon(0 0, 31% 0, 69% 100%, 0 100%)";
  };

  const getRightClipPath = () => {
    if (activeSide === "right")
      return "polygon(100% 0, 0 0, 0 100%, 100% 100%)"; // Full screen
    if (hoveredSide === "right")
      return "polygon(100% 0, 14% 0, 64% 100%, 100% 100%)";
    return "polygon(100% 0, 26% 0, 57% 100%, 100% 100%)";
  };

  return (
    <div className="h-dvh max-h-dvh w-full relative overflow-hidden">
      {/* LEFT */}
      <motion.div
        initial={{
          clipPath: "polygon(0 0, 31% 0, 69% 100%, 0 100%)",
        }}
        animate={{
          clipPath: getLeftClipPath(),
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`bg-center absolute inset-0 bg-cover ${
          activeSide === "split" ? "cursor-pointer" : ""
        } ${activeSide === "right" ? "pointer-events-none" : "z-10"}`}
        style={{ backgroundImage: `url(${leftBackground})` }}
        onClick={() => activeSide === "split" && setActiveSide("left")}
        onMouseEnter={() => activeSide === "split" && setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide("none")}
      >
        {/* Black Effect with hover disappear */}
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{
            opacity: hoveredSide === "left" ? 0 : 0.4,
            backdropFilter: hoveredSide === "left" ? "blur(0px)" : "blur(0px)",
          }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 bg-black ${
            activeSide === "split" ? "pointer-events-none" : ""
          }`}
        ></motion.div>

        {/* Content container - only visible when left side is active */}
        {activeSide === "left" ? (
          <motion.div
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 z-20 p-16 pt-24 overflow-auto"
          >
            {leftComponent}
          </motion.div>
        ) : (
          /* Label container - positioned to follow the clip-path angle */
          <div className="absolute bottom-0 left-0 w-full h-full flex items-end group">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute bottom-8 left-8 z-20"
            >
              <TextBorderAnimation className="font-raleway" text={leftLabel} />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* RIGHT */}
      <motion.div
        initial={{
          clipPath: "polygon(100% 0, 26% 0, 57% 100%, 100% 100%)",
        }}
        animate={{
          clipPath: getRightClipPath(),
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`absolute inset-0 bg-cover bg-center ${
          activeSide === "split" ? "cursor-pointer" : ""
        } ${activeSide === "right" ? "z-20" : "z-0"}`}
        style={{ backgroundImage: `url(${rightBackground})` }}
        onClick={() => activeSide === "split" && setActiveSide("right")}
        onMouseEnter={() => activeSide === "split" && setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide("none")}
      >
        {/* Black overlay with hover effect */}
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{
            opacity: hoveredSide === "right" ? 0 : 0.4,
            backdropFilter: hoveredSide === "right" ? "blur(0px)" : "blur(0px)",
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black"
        ></motion.div>

        {/* Content container - only visible when right side is active */}
        {activeSide === "right" ? (
          <motion.div
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 z-20 p-16 pt-24 overflow-auto"
          >
            {rightComponent}
          </motion.div>
        ) : (
          /* Label container - positioned to follow the clip-path angle */
          <div className="absolute bottom-0 right-0 w-full h-full flex items-end justify-end group">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute bottom-8 lg:top-8 right-8 z-20"
            >
              <TextBorderAnimation className="font-raleway" text={rightLabel} />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Back Button - only visible when a side is expanded */}
      {activeSide !== "split" && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={handleReset}
          className="absolute top-6 left-6 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
}
