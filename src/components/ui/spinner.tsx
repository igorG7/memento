import { cn } from '@/lib/utils';

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-950',
        className,
      )}
      aria-hidden="true"
    />
  );
}
