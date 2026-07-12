import Image from "next/image";

type CoverVisualProps = {
  title: string;
  src: string;
  alt: string;
};

export function CoverVisual({ title, src, alt }: CoverVisualProps) {
  const isSvg = src.endsWith(".svg");

  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-surface">
      {isSvg ? (
        <Image className="aspect-[5/3] w-full object-cover" src={src} alt={alt} width={1200} height={720} unoptimized />
      ) : (
        <Image className="aspect-[5/3] w-full object-cover" src={src} alt={alt} width={1200} height={720} />
      )}
      <figcaption className="sr-only">Topic image for {title}</figcaption>
    </figure>
  );
}
