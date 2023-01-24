import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="z-20 bg-white sticky top-0 py-6">
      <div className="font-andada max-w-[90%] mx-auto">
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
          <div className="flex-1 cursor-pointer hover:font-bold transition-all duration-500">
            #
          </div>

          <div className="flex-1 text-center cursor-pointer hover:font-bold transition-all duration-500">
            <Link href={"/"}>Proyects</Link>
          </div>
          <div className="flex-1 text-right cursor-pointer hover:font-bold transition-all duration-500">
            <Link href={"/about"}>About Me</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
