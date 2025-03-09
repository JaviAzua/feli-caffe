"use client";

import { analogProjects } from "@/lib/projects";
import { ProjectGallery } from "./project-gallery/project-gallery";
import { Suspense } from "react";

export default function AnalogPage() {
  return (
    <Suspense fallback="...Loading">
      <ProjectGallery
        title="ANALOG"
        projects={analogProjects}
        paramPrefix="analog-"
      />
    </Suspense>
  );
}
