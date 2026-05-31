import { Button } from "@/components/ui/button";

type GalleryPaginationProps = {
  currentPage: number;
  totalPages: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
};

export function GalleryPagination({
  currentPage,
  totalPages,
  loading = false,
  onPageChange,
  onPreviousPage,
  onNextPage,
}: GalleryPaginationProps) {
  function handlePrevious() {
    if (onPreviousPage) {
      onPreviousPage();
    } else {
      onPageChange(Math.max(1, currentPage - 1));
    }
  }

  function handleNext() {
    if (onNextPage) {
      onNextPage();
    } else {
      onPageChange(Math.min(totalPages, currentPage + 1));
    }
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Paginação da galeria"
      className="flex w-full max-w-full flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-border bg-white px-4 py-3"
    >
      <p className="min-w-0 text-sm text-slate-600">
        Página{" "}
        <span className="font-semibold text-slate-950">{currentPage}</span> de{" "}
        <span className="font-semibold text-slate-950">{totalPages}</span>
      </p>

      <div className="flex max-w-full flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={loading || currentPage === 1}
        >
          Anterior
        </Button>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
          {currentPage}
        </span>

        <Button
          variant="secondary"
          onClick={handleNext}
          disabled={loading || currentPage === totalPages}
        >
          Próxima
        </Button>
      </div>
    </nav>
  );
}
