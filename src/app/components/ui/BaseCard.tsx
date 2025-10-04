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
    <div className="group rounded-xl border border-pink-500/30 bg-[var(--color-panel)] p-5 shadow-[0_0_8px_rgba(255,53,93,0.15)] backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(255,53,93,0.25)]">
      <div className="relative h-40 rounded-lg overflow-hidden">
        {/* Neon gradient frame */}
        <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-pink-500/30" />
        <div className="pointer-events-none absolute -inset-px rounded-lg bg-gradient-to-r from-pink-500/20 via-fuchsia-500/10 to-cyan-400/20 blur-xl opacity-60 group-hover:opacity-80 transition" />
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className="object-contain p-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
        />
      </div>
      <h3 className="mt-3 text-base font-semibold text-slate-100">{title}</h3>
      <p className="mt-1 text-sm text-slate-300">{description}</p>
    </div>
  );
};
