import { EmptyState } from "@/components/feedback/empty-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { GalleryCard } from "@/components/gallery/GalleryCard";
import { GalleryPagination } from "@/components/gallery/GalleryPagination";
import type { GalleryImage } from "@/types";

type GalleryGridProps = {
  images: GalleryImage[];
  loading?: boolean;
  onOpen: (index: number) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
};

export function GalleryGrid({
  images,
  loading = false,
  onOpen,
  currentPage,
  totalPages,
  onPageChange,
  onPreviousPage,
  onNextPage,
}: GalleryGridProps) {
  if (loading) {
    return <LoadingState />;
  }

  if (images.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="space-y-4">
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
        {images.map((image, index) => (
          <div key={image.id} className="mb-4 break-inside-avoid">
            <GalleryCard image={image} index={index} onOpen={onOpen} />
          </div>
        ))}
      </div>
      {currentPage && totalPages && onPageChange ? (
        <GalleryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          loading={loading}
          onPageChange={onPageChange}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        />
      ) : null}
    </section>
  );
}
