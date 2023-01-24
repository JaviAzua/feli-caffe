import { urlFor } from "@/lib/client";
import { PhotosT } from "@/types";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  photo: PhotosT;
}

function ImageAlone({ photo }: Props) {
  const src = urlFor(photo.image && photo.image).url();

  const [loading, setLoading] = useState(true);

  return (
    <Image
      className={`object-cover cursor-pointer hover:opacity-75 duration-700 ease-in-out ${
        loading
          ? "grayscale blur-2xl scale-110"
          : " grayscale-0 blur-0 scale-100"
      }`}
      src={src}
      alt=""
      width={500}
      height={"100"}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}

export default ImageAlone;
