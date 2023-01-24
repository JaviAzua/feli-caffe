import { PhotosT } from "@/types";
import React, { useEffect, useState } from "react";
import ImageAlone from "./ImageAlone";
import Link from "next/link";

interface Props {
  photos: PhotosT[];
}

function Gallery({ photos }: Props) {
  const [mixedPhotos, setMixedPhotos] = useState<PhotosT[]>();

  function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  useEffect(() => {
    const shuffledPhotos = shuffle(photos);

    setMixedPhotos(shuffledPhotos);
  }, [photos]);

  return (
    <div className="mt-20 flex flex-wrap gap-20 items-center flex-grow-1 justify-center">
      {mixedPhotos?.map((photo) => (
        <Link href={""} key={photo?.slug.current}>
          <ImageAlone photo={photo} />
        </Link>
      ))}
    </div>
  );
}

export default Gallery;
