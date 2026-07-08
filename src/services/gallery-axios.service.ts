import { axiosApi } from "@/services/axios-api.service";
import type {
  GalleryImage,
  GalleryPageResult,
  GalleryPaginationMeta,
} from "@/types";
import type { ApiPhoto, ApiPhotosListResponse } from "@/types/api";

export const GALLERY_PAGE_SIZE = 10;

function formatRelativeTime(isoDate: string) {
  const diffInMinutes = Math.max(
    1,
    Math.floor((Date.now() - new Date(isoDate).getTime()) / 60000),
  );

  if (diffInMinutes < 60) {
    return `há ${diffInMinutes} min`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `há ${diffInHours} h`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `há ${diffInDays} d`;
}

function mapPhotoToGalleryImage(photo: ApiPhoto): GalleryImage {
  return {
    id: photo._id,
    eventId: photo.eventId,
    thumbnailUrl: photo.cloudinary.secureUrl,
    alt: `${photo.category} compartilhada por ${photo.guestName}`,
    authorName: photo.guestName,
    category: photo.category,
    uploadedAt: formatRelativeTime(photo.uploadedAt),
  };
}

function normalizeMeta(
  meta: ApiPhotosListResponse["meta"],
  fallbackPage: number,
  fallbackLimit: number,
): GalleryPaginationMeta {
  const total = meta?.total ?? 0;
  const limit = meta?.limit ?? fallbackLimit;
  const page = meta?.page ?? fallbackPage;
  const computedTotalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));
  const totalPages = meta?.totalPages ?? computedTotalPages;

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: meta?.hasNextPage ?? page < totalPages,
    hasPrevPage: meta?.hasPrevPage ?? page > 1,
  };
}

export async function getGalleryPage(
  page = 1,
  limit = GALLERY_PAGE_SIZE,
): Promise<GalleryPageResult> {
  try {
    const response = await axiosApi.get<ApiPhotosListResponse>("/photos", {
      params: {
        page,
        limit,
      },
    });

    const payload = response.data;

    return {
      images: (payload.data ?? []).map(mapPhotoToGalleryImage),
      meta: normalizeMeta(payload.meta, page, limit),
    };
  } catch {
    throw new Error("Não foi possível carregar a galeria.");
  }
}

export async function getGalleryByEventId(
  eventId: string,
): Promise<GalleryImage[]> {
  const result = await getGalleryPage(1, GALLERY_PAGE_SIZE);
  return result.images.filter((image) => image.eventId === eventId);
}

export function mapUploadedPhotoToGalleryImage(photo: ApiPhoto): GalleryImage {
  return mapPhotoToGalleryImage(photo);
}
