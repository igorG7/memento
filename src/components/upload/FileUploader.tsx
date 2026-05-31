'use client';

import type { ChangeEvent, DragEvent } from 'react';
import { useId, useRef, useState } from 'react';

const acceptedExtensions = '.jpg,.jpeg,.png,.heic';

type FileUploaderProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxFileSizeInMB?: number;
};

export function FileUploader({
  files,
  onFilesChange,
  maxFiles = 5,
  maxFileSizeInMB = 20,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);

  function addFiles(nextFiles: FileList | File[]) {
    const incoming = Array.from(nextFiles);
    const filtered = incoming.filter((file) => {
      const fileSizeInMB = file.size / (1024 * 1024);
      const allowedExtension = /\.(jpg|jpeg|png|heic)$/i.test(file.name);
      return fileSizeInMB <= maxFileSizeInMB && allowedExtension;
    });

    const merged = [...files, ...filtered].slice(0, maxFiles);
    onFilesChange(merged);
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      addFiles(event.target.files);
    }
    event.target.value = '';
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed p-6 text-center transition ${
          isDragging ? 'border-slate-900 bg-slate-50' : 'border-border bg-white hover:bg-slate-50'
        }`}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDrop={onDrop}
      >
        <span className="text-sm font-semibold text-slate-950">Arraste e solte suas fotos</span>
        <span className="mt-1 text-sm text-slate-500">
          JPG, JPEG, PNG e HEIC. Até {maxFiles} arquivos.
        </span>
        <span className="mt-1 text-xs text-slate-400">Tamanho máximo de {maxFileSizeInMB} MB por arquivo.</span>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple
          accept={acceptedExtensions}
          className="sr-only"
          onChange={onInputChange}
        />
        <label
          htmlFor={inputId}
          className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
        >
          Selecionar fotos
        </label>
      </div>
    </div>
  );
}
