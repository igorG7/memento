import { Button } from '@/components/ui/button';

type EmptyStateProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title = 'Seja o primeiro a compartilhar um momento.',
  message = 'Nenhuma foto foi enviada ainda. Que tal abrir a festa por aqui?',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <section className="rounded-[1.75rem] border border-dashed border-slate-200 bg-white/90 p-8 text-center shadow-soft">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-900">
        <span aria-hidden="true">✦</span>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{message}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </section>
  );
}
