"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { ErrorState } from "@/components/feedback/error-state";
import { SuccessMessage } from "@/components/feedback/success-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Select } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { FileUploader } from "@/components/upload/FileUploader";
import {
  uploadEventPhotos,
  validateUploadPayload,
} from "@/services/upload-axios.service";
import type { UploadStatus } from "@/types";

type UploadFormProps = {
  eventId: string;
  onUploaded?: () => void;
};

const categories = [
  { label: "Selfie", value: "selfie" },
  { label: "Bastidores", value: "bastidores" },
  { label: "Cerimônia", value: "cerimonia" },
  { label: "Festa", value: "festa" },
  { label: "Aleatórias", value: "aleatorias" },
];

export function UploadForm({ eventId, onUploaded }: UploadFormProps) {
  const [guestName, setGuestName] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Only show inline field errors after first submit attempt
  const validationErrors = submitted
    ? validateUploadPayload({ eventId, guestName, category, files })
    : [];

  const fieldError = (field: "guestName" | "category" | "files") =>
    validationErrors.find((e) => e.field === field)?.message;

  function resetForm() {
    setGuestName("");
    setCategory("");
    setFiles([]);
    setStatus("idle");
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
      // Don't set status to error — just show inline field errors
      return;
    }

    setStatus("uploading");
    setProgress(5);
    setMessage(null);

    try {
      const response = await uploadEventPhotos(
        { eventId, guestName, category, files },
        { onProgress: setProgress },
      );

      setProgress(response.progress);
      setStatus(response.status);
      setMessage(response.message);
      setFiles([]);
      setSubmitted(false);
      onUploaded?.();
    } catch (error) {
      setStatus("error");
      setProgress(0);

      confirm(`${error}`);

      const diagnostics = {
        errorName: error instanceof Error ? error.name : "unknown",
        errorMessage: error instanceof Error ? error.message : String(error),
        online: navigator.onLine,
        connectionType:
          (navigator as any).connection?.effectiveType ?? "unknown",
        saveData: (navigator as any).connection?.saveData ?? "unknown",
        rtt: (navigator as any).connection?.rtt ?? "unknown",
        downlink: (navigator as any).connection?.downlink ?? "unknown",
        timestamp: new Date().toISOString(),
      };

      setMessage(
        `${diagnostics.errorName} | ${diagnostics.errorMessage} | online=${diagnostics.online} | conn=${diagnostics.connectionType} | saveData=${diagnostics.saveData} | rtt=${diagnostics.rtt} | downlink=${diagnostics.downlink}`,
      );

      console.error("Upload failed diagnostics:", diagnostics);

      fetch("/api/log-client-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(diagnostics),
      }).catch(() => {
        // Se até esse log falhar, ignora silenciosamente — não deve afetar o fluxo principal
      });
    }
  }

  const isBusy = status === "uploading";

  return (
    <section
      id="upload-section"
      className="min-w-0 rounded-[2rem] border border-border bg-white/95 p-6 shadow-soft sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">
            Envie suas fotos
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sem login, sem complicação. Seu momento entra no álbum em poucos
            segundos.
          </p>
        </div>
        {isBusy ? <Spinner /> : null}
      </div>

      <form className="mt-6 min-w-0 space-y-5" onSubmit={onSubmit} noValidate>
        {/* Guest name */}
        <div className="min-w-0 space-y-1.5">
          <label
            htmlFor="guestName"
            className="text-sm font-medium text-slate-700"
          >
            Nome do Convidado <span className="text-rose-500">*</span>
          </label>
          <Input
            id="guestName"
            name="guestName"
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            placeholder="Seu nome"
            aria-invalid={!!fieldError("guestName")}
            aria-describedby={
              fieldError("guestName") ? "guestName-error" : "guestName-help"
            }
            className={
              fieldError("guestName")
                ? "border-rose-400 focus:border-rose-400 focus:ring-rose-200/70"
                : ""
            }
          />
          {fieldError("guestName") ? (
            <p
              id="guestName-error"
              className="text-xs font-medium text-rose-600"
              role="alert"
            >
              {fieldError("guestName")}
            </p>
          ) : (
            <p id="guestName-help" className="text-xs text-slate-500">
              Use um nome curto para facilitar a organização do álbum.
            </p>
          )}
        </div>

        {/* Category */}
        <div className="min-w-0 space-y-1.5">
          <label
            htmlFor="category"
            className="text-sm font-medium text-slate-700"
          >
            Categoria <span className="text-rose-500">*</span>
          </label>
          <Select
            id="category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-invalid={!!fieldError("category")}
            aria-describedby={
              fieldError("category") ? "category-error" : "category-help"
            }
            className={
              fieldError("category")
                ? "border-rose-400 focus:border-rose-400 focus:ring-rose-200/70"
                : ""
            }
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {fieldError("category") ? (
            <p
              id="category-error"
              className="text-xs font-medium text-rose-600"
              role="alert"
            >
              {fieldError("category")}
            </p>
          ) : (
            <p id="category-help" className="text-xs text-slate-500">
              Ajuda a organizar os momentos por contexto.
            </p>
          )}
        </div>

        {/* File upload */}
        <div className="min-w-0 space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Fotos <span className="text-rose-500">*</span>
          </label>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-xs font-medium leading-5 text-amber-900">
              Em caso de erro ao enviar, remova as fotos, selecione novamente e
              clique no botão &quot;Publicar no álbum&quot; para tentar outra
              vez.
            </p>
          </div>
          <FileUploader files={files} onFilesChange={setFiles} />
          {fieldError("files") ? (
            <p className="text-xs font-medium text-rose-600" role="alert">
              {fieldError("files")}
            </p>
          ) : null}
        </div>

        {/* Upload progress */}
        {status === "uploading" ? (
          <ProgressBar progress={progress} label="Enviando imagens..." />
        ) : null}

        {/* Error / Success states */}
        {status === "error" ? (
          <ErrorState
            message={message ?? undefined}
            onRetry={() => setStatus("idle")}
          />
        ) : null}
        {status === "success" ? <SuccessMessage onReset={resetForm} /> : null}

        {validationErrors.length > 0 ? (
          <p className="text-xs font-medium text-rose-600">
            Termine de preencher o formulário para realizar o envio.
          </p>
        ) : null}

        {/* Submit */}
        {status !== "success" ? (
          <Button type="submit" className="w-full" disabled={isBusy}>
            {isBusy ? "Enviando..." : "Publicar no álbum"}
          </Button>
        ) : null}
      </form>
    </section>
  );
}
