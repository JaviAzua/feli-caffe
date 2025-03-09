"use client";

import { digitalProjects } from "@/lib/projects";
import { ProjectGallery } from "./project-gallery/project-gallery";
import { Suspense } from "react";

export default function DigitalPage() {
  return (
    <Suspense fallback="...Loading">
      <ProjectGallery
        title="DIGITAL"
        projects={digitalProjects}
        paramPrefix="digital-"
      />
    </Suspense>
  );
}
