"use client";

import type { ChangeEvent, DragEvent } from "react";
import { useId, useRef, useState } from "react";

const acceptedExtensions = ".jpg,.jpeg,.png,.heic";

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

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

  function removeFile(index: number) {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      addFiles(event.target.files);
    }
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  }

  return (
    <div className="min-w-0 space-y-3">
      <div
        className={`flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed p-6 text-center transition ${
          isDragging
            ? "border-slate-900 bg-slate-50"
            : "border-border bg-white hover:bg-slate-50"
        }`}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDrop={onDrop}
      >
        <span className="text-sm font-semibold text-slate-950">
          Arraste e solte suas fotos
        </span>
        <span className="mt-1 text-sm text-slate-500">
          JPG, JPEG, PNG e HEIC. Até {maxFiles} arquivos.
        </span>
        <span className="mt-1 text-xs text-slate-400">
          Tamanho máximo de {maxFileSizeInMB} MB por arquivo.
        </span>
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

      {/* File list indicator */}
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-sm font-semibold text-slate-900" aria-live="polite">
          {files.length === 0
            ? "Nenhum arquivo selecionado"
            : `${files.length} arquivo${files.length > 1 ? "s" : ""} selecionado${files.length > 1 ? "s" : ""}`}
        </p>
        {files.length > 0 && (
          <ul className="mt-3 min-w-0 space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex min-w-0 items-center justify-between gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
              >
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  aria-label={`Remover ${file.name}`}
                  className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
