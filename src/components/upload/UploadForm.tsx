'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

import { ErrorState } from '@/components/feedback/error-state';
import { SuccessMessage } from '@/components/feedback/success-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Select } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { FileUploader } from '@/components/upload/FileUploader';
import { uploadEventPhotos, validateUploadPayload } from '@/services/upload.service';
import type { UploadStatus } from '@/types';

type UploadFormProps = {
  eventId: string;
  onUploaded?: () => void;
};

const categories = [
  { label: 'Selfie', value: 'selfie' },
  { label: 'Bastidores', value: 'bastidores' },
  { label: 'Cerimônia', value: 'cerimonia' },
  { label: 'Festa', value: 'festa' },
  { label: 'Pista de dança', value: 'pista de dança' },
  { label: 'Aleatórias', value: 'aleatorias' },
];

export function UploadForm({ eventId, onUploaded }: UploadFormProps) {
  const [guestName, setGuestName] = useState('');
  const [category, setCategory] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const validationErrors = submitted
    ? validateUploadPayload({
        eventId,
        guestName,
        category,
        files,
      })
    : [];

  function resetForm() {
    setGuestName('');
    setCategory('');
    setFiles([]);
    setStatus('idle');
    setProgress(0);
    setMessage(null);
    setSubmitted(false);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const errors = validateUploadPayload({
      eventId,
      guestName,
      category,
      files,
    });

    if (errors.length > 0) {
      setStatus('error');
      setMessage(errors[0].message);
      return;
    }

    setStatus('uploading');
    setProgress(5);
    setMessage(null);

    try {
      const response = await uploadEventPhotos(
        {
          eventId,
          guestName,
          category,
          files,
        },
        {
          onProgress: setProgress,
        },
      );

      setProgress(response.progress);
      setStatus(response.status);
      setMessage(response.message);
      onUploaded?.();
    } catch (error) {
      setStatus('error');
      setProgress(0);
      setMessage(error instanceof Error ? error.message : 'Não foi possível enviar suas fotos. Tente novamente.');
    }
  }

  const isBusy = status === 'uploading';

  return (
    <section
      id="upload-section"
      className="rounded-[2rem] border border-border bg-white/95 p-6 shadow-soft sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Envie suas fotos</h2>
          <p className="mt-1 text-sm text-slate-500">
            Sem login, sem complicação. Seu momento entra no álbum em poucos segundos.
          </p>
        </div>
        {isBusy ? <Spinner /> : null}
      </div>

      <form className="mt-6 space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label htmlFor="guestName" className="text-sm font-medium text-slate-700">
            Nome do Convidado
          </label>
          <Input
            id="guestName"
            name="guestName"
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            placeholder="Seu nome"
            aria-describedby="guestName-help"
          />
          <p id="guestName-help" className="text-xs text-slate-500">
            Use um nome curto para facilitar a organização do álbum.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium text-slate-700">
            Categoria
          </label>
          <Select
            id="category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-describedby="category-help"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <p id="category-help" className="text-xs text-slate-500">
            Ajuda a organizar os momentos por contexto.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Upload de Fotos</label>
          <FileUploader files={files} onFilesChange={setFiles} />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900" aria-live="polite">
              {files.length === 0 ? 'Nenhum arquivo selecionado' : `${files.length} arquivo(s) selecionado(s)`}
            </p>
            {files.length > 0 ? (
              <div className="mt-3 grid gap-2">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {validationErrors.length > 0 && status !== 'error' ? (
          <p className="text-sm text-amber-700" role="status" aria-live="polite">
            {validationErrors[0]?.message}
          </p>
        ) : null}

        {status === 'uploading' ? <ProgressBar progress={progress} label="Enviando imagens..." /> : null}

        {status === 'error' ? <ErrorState message={message ?? undefined} onRetry={() => setStatus('idle')} /> : null}
        {status === 'success' ? <SuccessMessage onReset={resetForm} /> : null}

        {status !== 'success' ? (
          <Button type="submit" className="w-full" disabled={isBusy}>
            {isBusy ? 'Enviando...' : 'Publicar no álbum'}
          </Button>
        ) : null}
      </form>
    </section>
  );
}
