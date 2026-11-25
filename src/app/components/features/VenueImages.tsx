"use client";

import type { Venue } from "@/app/types/venues";
import { useState } from "react";
import { ImageOff } from "lucide-react";

type VenueImagesProps = {
  images: Venue["media"];
  name: Venue["name"];
};

export function VenueImages({ images, name }: VenueImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center w-full bg-sage rounded-lg aspect-3/2">
        <p className="sr-only">No images available</p>
        <ImageOff aria-hidden="true" size={60} className="text-primary" />
      </div>
    );
  }
  const selectedImage = images[selectedIndex];

  return (
    <div className="flex flex-col gap-3">
      <img
        src={selectedImage.url}
        alt={selectedImage.alt || name}
        className="aspect-3/2 w-full object-cover rounded-lg"
      />
      {images.length > 1 && (
        <div className="flex flex-row gap-3 flex-wrap">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === selectedIndex}
              className="cursor-pointer h-16.75 w-25 sm:h-36.75 sm:w-55 rounded-lg aria-pressed:ring-2 aria-pressed:ring-primary"
            >
              <img
                src={image.url}
                alt=""
                className="rounded-lg w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
