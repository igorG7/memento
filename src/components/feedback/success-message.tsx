import { Button } from '@/components/ui/button';

type SuccessMessageProps = {
  onReset: () => void;
};

export function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <section className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-6 shadow-soft">
      <p className="text-sm font-semibold text-emerald-950">Recebemos suas fotos!</p>
      <p className="mt-2 text-sm leading-6 text-emerald-900/80">
        Obrigado por fazer parte da nossa história.
      </p>
      <Button className="mt-5" variant="secondary" onClick={onReset}>
        Enviar mais fotos
      </Button>
    </section>
  );
}
