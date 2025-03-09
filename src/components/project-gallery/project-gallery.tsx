"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ProjectCard } from "./project-card";
import { ImageThumbnail } from "./image-thumbnail";
import { ImageDialog } from "./image-dialog";
import type { Project, ProjectImage, ProjectGalleryProps } from "./types";

export function ProjectGallery({
  title,
  projects,
  className = "",
  paramPrefix = "",
}: ProjectGalleryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get state from URL or use defaults
  const projectParam = `${paramPrefix}project`;
  const imageParam = `${paramPrefix}image`;

  const projectId = searchParams.get(projectParam);
  const imageIndex = searchParams.get(imageParam)
    ? Number.parseInt(searchParams.get(imageParam) as string)
    : null;

  const [activeTab, setActiveTab] = useState(
    projectId ? "gallery" : "projects"
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projectId ? projects.find((p) => p.id === projectId) || null : null
  );
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    imageIndex
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  // Update URL when state changes
  useEffect(() => {
    // Create a new URLSearchParams object with all current parameters
    const params = new URLSearchParams(searchParams.toString());

    if (selectedProject) {
      params.set(projectParam, selectedProject.id);

      if (selectedImageIndex !== null) {
        params.set(imageParam, selectedImageIndex.toString());
      } else {
        params.delete(imageParam);
      }
    } else {
      // Clear only project-related params when going back to projects
      params.delete(projectParam);
      params.delete(imageParam);
    }

    const newUrl =
      pathname + (params.toString() ? `?${params.toString()}` : "");
    router.push(newUrl, { scroll: false });
  }, [
    selectedProject,
    selectedImageIndex,
    pathname,
    router,
    searchParams,
    projectParam,
    imageParam,
  ]);

  // Update state when URL changes
  useEffect(() => {
    const projectFromUrl = searchParams.get(projectParam);
    const imageFromUrl = searchParams.get(imageParam);

    if (projectFromUrl) {
      const project = projects.find((p) => p.id === projectFromUrl);
      if (project) {
        setSelectedProject(project);
        setActiveTab("gallery");

        if (imageFromUrl) {
          const index = Number.parseInt(imageFromUrl);
          setSelectedImageIndex(index);
          setSelectedImage(project.images[index] || null);
          setDialogOpen(true);
        } else {
          setDialogOpen(false);
        }
      }
    } else {
      setSelectedProject(null);
      setActiveTab("projects");
      setSelectedImage(null);
      setSelectedImageIndex(null);
      setDialogOpen(false);
    }
  }, [searchParams, projectParam, imageParam, projects]);

  // Listen for custom event to clear parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleClearParams = () => {
        // Clear URL parameters
        const params = new URLSearchParams(searchParams.toString());
        params.delete(projectParam);
        params.delete(imageParam);

        const newUrl =
          pathname + (params.toString() ? `?${params.toString()}` : "");
        router.push(newUrl, { scroll: false });

        // Reset component state
        setSelectedProject(null);
        setActiveTab("projects");
        setSelectedImage(null);
        setSelectedImageIndex(null);
        setDialogOpen(false);
      };

      window.addEventListener("clearGalleryParams", handleClearParams);

      return () => {
        window.removeEventListener("clearGalleryParams", handleClearParams);
      };
    }
  }, [pathname, router, searchParams, projectParam, imageParam]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setActiveTab("gallery");
    setSelectedImage(null);
    setSelectedImageIndex(null);
    setDialogOpen(false);
  };

  const handleImageClick = (image: ProjectImage, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setDialogOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setSelectedImageIndex(null);
    setDialogOpen(false);

    // Update URL to remove image parameter
    if (selectedProject) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(imageParam);
      const newUrl =
        pathname + (params.toString() ? `?${params.toString()}` : "");
      router.push(newUrl, { scroll: false });
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (
      selectedProject &&
      selectedImageIndex !== null &&
      selectedImageIndex > 0
    ) {
      const newIndex = selectedImageIndex - 1;
      setSelectedImage(selectedProject.images[newIndex]);
      setSelectedImageIndex(newIndex);
    }
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (
      selectedProject &&
      selectedImageIndex !== null &&
      selectedImageIndex < selectedProject.images.length - 1
    ) {
      const newIndex = selectedImageIndex + 1;
      setSelectedImage(selectedProject.images[newIndex]);
      setSelectedImageIndex(newIndex);
    }
  };

  return (
    <div
      className={`text-white bg-black/40 backdrop-blur-md p-4 max-h-[80dvh] overflow-y-auto scrollbar scrollbar-thumb-black scrollbar-track-white ${className}`}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white/10 mb-6">
          <TabsTrigger
            value="projects"
            onClick={() => {
              setSelectedProject(null);
              setSelectedImage(null);
              setSelectedImageIndex(null);
              setDialogOpen(false);

              // Clear URL parameters when clicking Projects tab
              const params = new URLSearchParams(searchParams.toString());
              params.delete(projectParam);
              params.delete(imageParam);

              const newUrl =
                pathname + (params.toString() ? `?${params.toString()}` : "");
              router.push(newUrl, { scroll: false });
            }}
          >
            {title}
          </TabsTrigger>
          {selectedProject && (
            <TabsTrigger value="gallery">{selectedProject.title}</TabsTrigger>
          )}
        </TabsList>

        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="projects" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={handleProjectClick}
                    />
                  ))}
                </div>
              </TabsContent>
            </motion.div>
          )}

          {activeTab === "gallery" && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="gallery" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <motion.h2
                    className="text-2xl font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {selectedProject.title}
                  </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedProject.images.map((image, index) => (
                    <ImageThumbnail
                      key={index}
                      image={image}
                      index={index}
                      onClick={handleImageClick}
                    />
                  ))}
                </div>
              </TabsContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Tabs>

      {/* Image Dialog using the extracted component */}
      <ImageDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseModal();
          setDialogOpen(open);
        }}
        selectedImage={selectedImage}
        selectedImageIndex={selectedImageIndex}
        selectedProject={selectedProject}
        onClose={handleCloseModal}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />
    </div>
  );
}
