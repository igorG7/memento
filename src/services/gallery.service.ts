import { apiUrl } from '@/lib/api';
import type { GalleryImage, GalleryPageResult, GalleryPaginationMeta } from '@/types';
import type { ApiPhotosListResponse, ApiPhoto } from '@/types/api';

export const GALLERY_PAGE_SIZE = 10;

function formatRelativeTime(isoDate: string) {
  const diffInMinutes = Math.max(1, Math.floor((Date.now() - new Date(isoDate).getTime()) / 60000));

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
  meta: ApiPhotosListResponse['meta'],
  fallbackPage: number,
  fallbackLimit: number,
): GalleryPaginationMeta {
  const total = meta?.total ?? 0;
  const limit = meta?.limit ?? fallbackLimit;
  const computedTotalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));

  return {
    total,
    page: meta?.page ?? fallbackPage,
    limit,
    totalPages: meta?.totalPages ?? computedTotalPages,
    hasNextPage: meta?.hasNextPage ?? (meta?.page ?? fallbackPage) < computedTotalPages,
    hasPrevPage: meta?.hasPrevPage ?? (meta?.page ?? fallbackPage) > 1,
  };
}

export async function getGalleryPage(page = 1, limit = GALLERY_PAGE_SIZE): Promise<GalleryPageResult> {
  const response = await fetch(apiUrl(`/photos?page=${page}&limit=${limit}`), {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Não foi possível carregar a galeria.');
  }

  const payload = (await response.json()) as ApiPhotosListResponse;
  return {
    images: (payload.data ?? []).map(mapPhotoToGalleryImage),
    meta: normalizeMeta(payload.meta, page, limit),
  };
}

export async function getGalleryByEventId(eventId: string): Promise<GalleryImage[]> {
  const result = await getGalleryPage(1, GALLERY_PAGE_SIZE);
  return result.images.filter((image) => image.eventId === eventId);
}

export function mapUploadedPhotoToGalleryImage(photo: ApiPhoto): GalleryImage {
  return mapPhotoToGalleryImage(photo);
}
