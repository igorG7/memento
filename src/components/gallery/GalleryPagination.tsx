import { Button } from '@/components/ui/button';

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
  return (
    <nav
      aria-label="Paginação da galeria"
      className="flex flex-col gap-4 rounded-[1.5rem] border border-border bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-slate-600">
        Página <span className="font-semibold text-slate-950">{currentPage}</span> de{' '}
        <span className="font-semibold text-slate-950">{totalPages}</span>
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            if (onPreviousPage) {
              onPreviousPage();
              return;
            }

            onPageChange(Math.max(1, currentPage - 1));
          }}
          disabled={loading || totalPages <= 1 || currentPage === 1}
        >
          Anterior
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'primary' : 'secondary'}
              onClick={() => onPageChange(page)}
              disabled={loading}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            if (onNextPage) {
              onNextPage();
              return;
            }

            onPageChange(Math.min(totalPages, currentPage + 1));
          }}
          disabled={loading || totalPages <= 1 || currentPage === totalPages}
        >
          Próxima
        </Button>
      </div>
    </nav>
  );
}
