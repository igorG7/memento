import { Button } from '@/components/ui/button';

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  message = 'Não foi possível enviar suas fotos. Tente novamente.',
  onRetry,
}: ErrorStateProps) {
  return (
    <section
      role="alert"
      className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-6 text-rose-950 shadow-soft"
    >
      <p className="text-sm font-semibold">Algo não saiu como esperado</p>
      <p className="mt-2 text-sm leading-6 text-rose-900/80">{message}</p>
      {onRetry ? (
        <Button className="mt-5" variant="secondary" onClick={onRetry}>
          Tentar novamente
        </Button>
      ) : null}
    </section>
  );
}
