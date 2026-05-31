import { Button } from '@/components/ui/button';

type ImagePreviewCardProps = {
  file: File;
  onRemove: () => void;
};

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function ImagePreviewCard({ file, onRemove }: ImagePreviewCardProps) {
  return (
    <article className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-slate-50 px-4 py-3 shadow-sm">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-950">{file.name}</p>
        <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
      </div>
      <Button variant="ghost" aria-label={`Remover ${file.name}`} onClick={onRemove}>
        Remover
      </Button>
    </article>
  );
}
