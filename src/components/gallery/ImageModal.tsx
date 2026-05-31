'use client';

import { Button } from '@/components/ui/button';
import type { GalleryImage } from '@/types';

type ImageModalProps = {
  image: GalleryImage | null;
  hasMultiple: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function ImageModal({ image, hasMultiple, onClose, onNext, onPrevious }: ImageModalProps) {
  if (!image) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visualização da imagem"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-glow"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={image.thumbnailUrl} alt={image.alt} className="max-h-[75vh] w-full object-contain bg-slate-950" />
        <div className="flex items-center justify-between gap-4 p-5">
          <div>
            <p className="text-sm font-semibold text-slate-950">{image.authorName}</p>
            <p className="text-xs text-slate-500">{image.category}</p>
          </div>
          <div className="flex items-center gap-2">
            {hasMultiple ? (
              <>
                <Button variant="secondary" onClick={onPrevious}>
                  Anterior
                </Button>
                <Button variant="secondary" onClick={onNext}>
                  Próxima
                </Button>
              </>
            ) : null}
            <Button onClick={onClose}>Fechar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
