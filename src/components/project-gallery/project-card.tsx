"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="bg-transparent border-none overflow-hidden cursor-pointer h-full relative rounded-none"
        onClick={() => onClick(project)}
      >
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={project.coverImage || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="absolute">
          <CardHeader>
            <CardTitle className="font-raleway text-white text-3xl">
              {project.title}
            </CardTitle>
            <CardDescription className="text-white">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white">{project.images.length} photos</p>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
