"use client";

import { Button } from "@/components/ui/button";
import type { GalleryImage } from "@/types";

type ImageModalProps = {
  image: GalleryImage | null;
  hasMultiple: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function ImageModal({
  image,
  hasMultiple,
  onClose,
  onNext,
  onPrevious,
}: ImageModalProps) {
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
        <img
          src={image.thumbnailUrl}
          alt={image.alt}
          className="max-h-[75vh] w-full object-contain bg-slate-950"
        />
        <div className="border-t border-border p-4 text-center sm:p-5">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-950">{image.authorName}</p>
            <p className="text-xs text-slate-500">{image.category}</p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {hasMultiple ? (
              <>
                <Button
                  variant="secondary"
                  onClick={onPrevious}
                  className="px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm"
                >
                  Anterior
                </Button>
                <Button
                  variant="secondary"
                  onClick={onNext}
                  className="px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm"
                >
                  Próxima
                </Button>
              </>
            ) : null}
            <Button className="px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
