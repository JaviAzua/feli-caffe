import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="font-andada max-w-[90%] z-20 bg-white mx-auto py-6 sticky top-0">
      <motion.div
        initial={{
          opacity: 0,
          y: -500,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex text-lg md:text-2xl items-center"
      >
        <div className="flex-1 cursor-pointer font-efect">#</div>
        <div className="flex-1 text-center cursor-pointer font-efect">
          Proyects
        </div>
        <div className="flex-1 text-right cursor-pointer font-efect">
          About Me
        </div>
      </motion.div>
    </div>
  );
}
