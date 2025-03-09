"use client";

import { digitalProjects } from "@/lib/projects";
import { ProjectGallery } from "./project-gallery/project-gallery";

export default function DigitalPage() {
  return (
    <ProjectGallery
      title="DIGITAL"
      projects={digitalProjects}
      paramPrefix="digital-"
    />
  );
}
