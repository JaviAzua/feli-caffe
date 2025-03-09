"use client";

import { analogProjects } from "@/lib/projects";
import { ProjectGallery } from "./project-gallery/project-gallery";

export default function AnalogPage() {
  return (
    <ProjectGallery
      title="ANALOG"
      projects={analogProjects}
      paramPrefix="analog-"
    />
  );
}
