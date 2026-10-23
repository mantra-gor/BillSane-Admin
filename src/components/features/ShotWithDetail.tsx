import Image from "next/image";
import ProductShot from "@/components/ui/ProductShot";

interface Shot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** A full app window with one close-up laid over its lower corner. */
export default function ShotWithDetail({
  shot,
  detail,
  title,
  detailWidth = "w-[62%]",
}: {
  shot: Shot;
  detail: Shot;
  title: string;
  detailWidth?: string;
}) {
  return (
    <div className="relative pb-16 sm:pb-20">
      <ProductShot {...shot} title={title} />
      <div className={`absolute bottom-0 right-3 sm:right-6 ${detailWidth}`}>
        <Image
          src={detail.src}
          alt={detail.alt}
          width={detail.width}
          height={detail.height}
          className="h-auto w-full rounded-xl shadow-pop"
          sizes="(min-width: 1024px) 420px, 60vw"
        />
      </div>
    </div>
  );
}
