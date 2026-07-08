import axios from "axios";

import { axiosApi } from "@/services/axios-api.service";
import { mapUploadedPhotoToGalleryImage } from "@/services/gallery-axios.service";
import type { UploadPayload, UploadResponse } from "@/types";
import type { ApiUploadPhotosResponse } from "@/types/api";

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
]);
const allowedExtensions = [".jpg", ".jpeg", ".png", ".heic"];
const maxFiles = 5;
const maxFileSizeInBytes = 20 * 1024 * 1024;

export type ValidationError = {
  field: "guestName" | "category" | "files";
  message: string;
};

function sleep(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

function hasAllowedExtension(fileName: string) {
  return allowedExtensions.some((extension) =>
    fileName.toLowerCase().endsWith(extension),
  );
}

export function validateUploadPayload(
  payload: UploadPayload,
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!payload.guestName.trim()) {
    errors.push({
      field: "guestName",
      message: "Informe seu nome para identificar a foto.",
    });
  }

  if (!payload.category.trim()) {
    errors.push({
      field: "category",
      message: "Escolha uma categoria para organizar o álbum.",
    });
  }

  if (payload.files.length === 0) {
    errors.push({
      field: "files",
      message: "Selecione ao menos uma foto para enviar.",
    });
  }

  if (payload.files.length > maxFiles) {
    errors.push({
      field: "files",
      message: `Você pode enviar no máximo ${maxFiles} fotos por vez.`,
    });
  }

  for (const file of payload.files) {
    if (!allowedMimeTypes.has(file.type) && !hasAllowedExtension(file.name)) {
      errors.push({
        field: "files",
        message: "Aceitamos apenas arquivos JPG, JPEG, PNG ou HEIC.",
      });
      break;
    }

    if (file.size > maxFileSizeInBytes) {
      errors.push({
        field: "files",
        message: "Cada arquivo deve ter no máximo 20 MB.",
      });
      break;
    }
  }

  return errors;
}

export async function simulateUploadProgress(
  onProgress: (progress: number) => void,
) {
  const steps = [8, 18, 32, 47, 63, 78, 90, 100];

  for (const step of steps) {
    await sleep(180);
    onProgress(step);
  }
}

type UploadOptions = {
  onProgress?: (progress: number) => void;
};

export async function uploadEventPhotos(
  payload: UploadPayload,
  options: UploadOptions = {},
): Promise<UploadResponse> {
  const validationErrors = validateUploadPayload(payload);

  if (validationErrors.length > 0) {
    throw new Error(validationErrors[0]?.message ?? "Falha de validação.");
  }

  await simulateUploadProgress((progress) => {
    options.onProgress?.(progress);
  });

  const formData = new FormData();

  for (const file of payload.files) {
    formData.append("files", file, file.name);
  }

  formData.append("eventId", payload.eventId);
  formData.append("guestName", payload.guestName);
  formData.append("category", payload.category);

  try {
    const response = await axiosApi.post<ApiUploadPhotosResponse>(
      "/photos",
      formData,
    );
    const payloadResponse = response.data;
    const photos = (payloadResponse.data ?? []).map(
      mapUploadedPhotoToGalleryImage,
    );

    return {
      id: `upload_${Date.now()}`,
      status: "success",
      message: payloadResponse.message ?? "Recebemos suas fotos!",
      uploadedCount: photos.length,
      progress: 100,
      photos,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const diagnostics = {
        errorCode: error.code,
        errorMessage: error.message,
        hasResponse: !!error.response,
        responseStatus: error.response?.status ?? null,
        hasRequest: !!error.request,
        online: navigator.onLine,
        connectionType:
          (navigator as any).connection?.effectiveType ?? "unknown",
        rtt: (navigator as any).connection?.rtt ?? "unknown",
        downlink: (navigator as any).connection?.downlink ?? "unknown",
        timestamp: new Date().toISOString(),
      };

      fetch("/api/log-client-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(diagnostics),
      }).catch(() => {});

      const errorPayload = error.response?.data as { message?: string } | null;
      throw new Error(
        errorPayload?.message ??
          "Não foi possível enviar suas fotos. Tente novamente.",
      );
    }

    throw new Error("Não foi possível enviar suas fotos. Tente novamente.");
  }
}
