import Image from "next/image";
import { images, type ImageKey } from "@/config/images";

type PhotoProps = {
  name: ImageKey;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  alt?: string;
  position?: string;
};

/** Fills its (positioned) parent with a registry image. */
export function Photo({ name, sizes, className = "", imgClassName = "", priority, alt, position }: PhotoProps) {
  const img = images[name];
  return (
    <div className={`relative overflow-hidden bg-ink-3 ${className}`}>
      <Image
        src={img.src}
        alt={alt ?? img.alt}
        fill
        sizes={sizes}
        preload={priority}
        className={`object-cover ${imgClassName}`}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
