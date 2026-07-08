"use client";

import { use, forwardRef, useImperativeHandle } from "react";
import type { GalleryPageResult } from "@/types";
import { useGalleryPagination } from "@/hooks/use-gallery-pagination";
import { GalleryGrid } from "../gallery/GalleryGrid";
import { ImageModal } from "../gallery/ImageModal";
import { useImageModal } from "@/hooks/use-image-modal";

type GallerySectionProps = {
  galleryPromise: Promise<GalleryPageResult>;
};

export type GallerySectionHandle = {
  loadPage: (page: number) => void;
};

export const GallerySection = forwardRef<
  GallerySectionHandle,
  GallerySectionProps
>(function GallerySection({ galleryPromise }: GallerySectionProps, ref) {
  const gallery = use(galleryPromise);

  useImperativeHandle(ref, () => ({
    loadPage,
  }));

  const {
    images,
    meta,
    loading,
    error,
    loadPage,
    goToNextPage,
    goToPreviousPage,
  } = useGalleryPagination({
    initialGallery: gallery,
    pageSize: gallery.meta.limit,
  });

  const modal = useImageModal(images);

  return (
    <div>
      <section className="min-w-0 space-y-4 rounded-[2rem] border border-border bg-white/95 p-6 shadow-soft sm:p-8">
        <div className="space-y-2">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              Momentos Compartilhados
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {meta.total > 0
                ? `${meta.total} foto${meta.total > 1 ? "s" : ""} compartilhada${meta.total > 1 ? "s" : ""}`
                : "Nenhuma foto ainda — seja o primeiro!"}
            </p>
          </div>
          {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        </div>

        <GalleryGrid
          images={images}
          loading={loading}
          onOpen={modal.openAt}
          currentPage={meta.page}
          totalPages={meta.totalPages}
          onPageChange={(page) => {
            void loadPage(page);
          }}
          onPreviousPage={goToPreviousPage}
          onNextPage={goToNextPage}
        />
      </section>

      {/* <p>Total de fotos: {gallery.meta.total}</p> */}

      <ImageModal
        image={modal.activeImage}
        hasMultiple={images.length > 1}
        onClose={modal.close}
        onNext={modal.showNext}
        onPrevious={modal.showPrevious}
      />
    </div>
  );
});
