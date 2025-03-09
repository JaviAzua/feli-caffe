"use client";

import { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage, Project } from "./types";
import type React from "react";

interface ImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedImage: ProjectImage | null;
  selectedImageIndex: number | null;
  selectedProject: Project | null;
  onClose: () => void;
  onPrev: (e?: React.MouseEvent) => void;
  onNext: (e?: React.MouseEvent) => void;
}

export function ImageDialog({
  open,
  onOpenChange,
  selectedImage,
  selectedImageIndex,
  selectedProject,
  onClose,
  onPrev,
  onNext,
}: ImageDialogProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onPrev, onNext, onClose]);

  const showPrevButton = selectedImageIndex !== null && selectedImageIndex > 0;
  const showNextButton =
    selectedImageIndex !== null &&
    selectedProject &&
    selectedImageIndex < selectedProject.images.length - 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="absolute p-0 max-h-[90vh] w-[90vw] border-none shadow-none overflow-hidden ">
        <DialogTitle className="sr-only">
          {selectedImage?.description}
        </DialogTitle>
        {/* Navigation buttons - fixed position */}
        {showPrevButton && (
          <button
            className="fixed left-4 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-white p-3 rounded-full bg-black/50"
            onClick={(e) => onPrev(e)}
          >
            <ChevronLeft size={30} />
          </button>
        )}

        {showNextButton && (
          <button
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-white p-3 rounded-full bg-black/50"
            onClick={(e) => onNext(e)}
          >
            <ChevronRight size={30} />
          </button>
        )}

        {/* Image container - centered and maximized */}
        <div className="flex flex-col p-8 ">
          {selectedImage && (
            <>
              <div className="w-full h-[80vh] flex-grow flex items-center justify-center">
                <img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  className="object-contain"
                />
              </div>

              <div className="bg-black/60 backdrop-blur-md p-4 mt-4 rounded-lg max-w-3xl w-full">
                <h3 className="text-xl font-medium mb-2 text-white">
                  {selectedImage.alt}
                </h3>
                <p className="text-white/80">{selectedImage.description}</p>
                {selectedImageIndex !== null && selectedProject && (
                  <p className="text-white/60 text-sm mt-2">
                    {selectedImageIndex + 1} / {selectedProject.images.length}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
