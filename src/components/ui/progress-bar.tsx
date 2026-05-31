import { cn } from '@/lib/utils';

type ProgressBarProps = {
  progress: number;
  className?: string;
  label?: string;
};

export function ProgressBar({ progress, className, label }: ProgressBarProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label ? <p className="text-sm font-medium text-slate-600">{label}</p> : null}
      <div
        aria-hidden="true"
        className="h-2 overflow-hidden rounded-full bg-slate-100"
      >
        <div
          className="h-full rounded-full bg-slate-950 transition-all duration-300"
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        />
      </div>
      <p className="text-right text-xs text-slate-500">{progress}%</p>
    </div>
  );
}
