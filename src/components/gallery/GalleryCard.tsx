import { Button } from '@/components/ui/button';
import type { GalleryImage } from '@/types';

type GalleryCardProps = {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
};

export function GalleryCard({ image, index, onOpen }: GalleryCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
      <button
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
        onClick={() => onOpen(index)}
        aria-label={`Abrir imagem de ${image.authorName}`}
      >
        <img
          src={image.thumbnailUrl}
          alt={image.alt}
          className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </button>
      <div className="space-y-1 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-950">{image.authorName}</p>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {image.category}
          </span>
        </div>
        <p className="text-xs text-slate-500">{image.uploadedAt}</p>
        <Button variant="ghost" className="px-0 text-xs" onClick={() => onOpen(index)}>
          Ver foto
        </Button>
      </div>
    </article>
  );
}
