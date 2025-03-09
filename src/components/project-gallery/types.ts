export interface ProjectImage {
  src: string;
  alt: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: ProjectImage[];
}

export interface ProjectGalleryProps {
  title: string; // Section title (e.g., "ANALOG" or "DIGITAL")
  projects: Project[];
  className?: string;
  paramPrefix?: string; // To differentiate URL params between different galleries
}
