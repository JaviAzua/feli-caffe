// Definición de tipos para los proyectos y las imágenes
export interface ProjectImage {
  src: string;
  alt: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: ProjectImage[];
}

// Datos de los proyectos fotográficos
export const analogProjects: Project[] = [
  {
    id: "black-white",
    title: "Black White",
    description: "TEST BLACK WHITE MOCKUP TEXT",
    coverImage: "/images/analog/black-white/image-1.jpg",
    images: [
      {
        src: "/images/analog/black-white/image-1.jpg",
        alt: "Black White 1",
        description: "TEST BLACK WHITE MOCKUP TEXT",
      },
      {
        src: "/images/analog/black-white/image-2.jpg",
        alt: "Black White 2",
        description: "TEST BLACK WHITE MOCKUP TEXT",
      },
      {
        src: "/images/analog/black-white/image-3.jpg",
        alt: "Black White 3",
        description: "TEST BLACK WHITE MOCKUP TEXT",
      },
      {
        src: "/images/analog/black-white/image-4.jpg",
        alt: "Black White 4",
        description: "TEST BLACK WHITE MOCKUP TEXT",
      },
      {
        src: "/images/analog/black-white/image-5.jpg",
        alt: "Black White 1",
        description: "TEST BLACK WHITE MOCKUP TEXT",
      },
    ],
  },
  {
    id: "color-test",
    title: "Color Test",
    description: "TEST COLOR TEST MOCKUP TEXT",
    coverImage: "/images/analog/color-test/image-1.jpg",
    images: [
      {
        src: "/images/analog/color-test/image-1.jpg",
        alt: "Black White 1",
        description: "TEST BLACK WHITE MOCKUP TEXT",
      },
      {
        src: "/images/analog/color-test/image-2.jpg",
        alt: "Black White 2",
        description: "TEST BLACK WHITE MOCKUP TEXT",
      },
      {
        src: "/images/analog/color-test/image-3.jpg",
        alt: "Black White 3",
        description: "TEST BLACK WHITE MOCKUP TEXT",
      },
    ],
  },
];

export const digitalProjects: Project[] = [
  {
    id: "other",
    title: "Other",
    description: "TEST other MOCKUP TEXT",
    coverImage: "/images/digital/other/image-1.jpg",
    images: [
      {
        src: "/images/digital/other/image-1.jpg",
        alt: "other 1",
        description: "TEST other MOCKUP TEXT",
      },
      {
        src: "/images/digital/other/image-2.jpg",
        alt: "other 2",
        description: "TEST other MOCKUP TEXT",
      },
      {
        src: "/images/digital/other/image-3.jpg",
        alt: "other 3",
        description: "TEST other MOCKUP TEXT",
      },
      {
        src: "/images/digital/other/image-4.jpg",
        alt: "other 4",
        description: "TEST other MOCKUP TEXT",
      },
    ],
  },
  {
    id: "people",
    title: "people",
    description: "TEST PEOPLE MOCKUP TEXT",
    coverImage: "/images/digital/people/image-1.jpg",
    images: [
      {
        src: "/images/digital/people/image-1.jpg",
        alt: "PEOPLE 1",
        description: "TEST PEOPLE MOCKUP TEXT",
      },
      {
        src: "/images/digital/people/image-2.jpg",
        alt: "PEOPLE 2",
        description: "TEST PEOPLE MOCKUP TEXT",
      },
      {
        src: "/images/digital/people/image-3.jpg",
        alt: "PEOPLE 3",
        description: "TEST PEOPLE MOCKUP TEXT",
      },
      {
        src: "/images/digital/people/image-4.jpg",
        alt: "PEOPLE 4",
        description: "TEST PEOPLE MOCKUP TEXT",
      },
    ],
  },
];
