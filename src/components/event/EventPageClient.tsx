"use client";

import { useImageModal } from "@/hooks/use-image-modal";
import { useGalleryPagination } from "@/hooks/use-gallery-pagination";
import { HeroSection } from "@/components/hero/HeroSection";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ImageModal } from "@/components/gallery/ImageModal";
import { UploadForm } from "@/components/upload/UploadForm";
import type { Event, GalleryPageResult } from "@/types";

type EventPageClientProps = {
  event: Event;
  gallery: GalleryPageResult;
};

export function EventPageClient({ event, gallery }: EventPageClientProps) {
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
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 overflow-x-hidden px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <HeroSection
        eyebrow={event.name}
        title="Álbum Instantâneo"
        subtitle="Ajude a gente a guardar os momentos mais espontâneos desse dia."
        description="Vale selfie, bastidor, foto tremida, flagra engraçado, pista de dança e tudo que tiver a nossa cara."
      />
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <UploadForm
          eventId={event.eventId}
          onUploaded={() => {
            void loadPage(1);
          }}
        />
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
      </div>
      <ImageModal
        image={modal.activeImage}
        hasMultiple={images.length > 1}
        onClose={modal.close}
        onNext={modal.showNext}
        onPrevious={modal.showPrevious}
      />
    </main>
  );
}
