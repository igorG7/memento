import type { SelectHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm text-slate-900 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300/70',
        className,
      )}
      {...props}
    />
  );
}
