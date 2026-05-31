import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingState() {
  return (
    <section className="rounded-[1.75rem] border border-border bg-white/90 p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <Spinner />
        <div>
          <p className="text-sm font-semibold text-slate-900">Carregando experiência</p>
          <p className="text-sm text-slate-500">Preparando o evento e os últimos momentos enviados.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="h-60" />
        <Skeleton className="h-60" />
        <Skeleton className="h-60 hidden xl:block" />
      </div>
    </section>
  );
}
