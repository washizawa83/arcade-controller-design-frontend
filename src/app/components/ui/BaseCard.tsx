import Image from "next/image";

export type BaseCardProps = {
  image: {
    url: string;
    alt: string;
  };
  title: string;
  description: string;
};

export const BaseCard = ({ image, title, description }: BaseCardProps) => {
  return (
    <div className="rounded-xl border border-pink-500/30 bg-[var(--color-panel)] p-5 shadow-sm backdrop-blur-sm">
      <div className="h-40 relative">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="mt-3 text-base font-semibold text-slate-100">{title}</h3>
      <p className="mt-1 text-sm text-slate-300">{description}</p>
    </div>
  );
};
