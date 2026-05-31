export type Event = {
  id: string;
  eventId: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  dateLabel: string;
  coverImage?: string;
};

export type GalleryImage = {
  id: string;
  eventId: string;
  thumbnailUrl: string;
  alt: string;
  authorName: string;
  category: string;
  uploadedAt: string;
};

export type GalleryPaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type UploadStatus = 'idle' | 'validating' | 'uploading' | 'success' | 'error';

export type UploadPayload = {
  eventId: string;
  guestName: string;
  category: string;
  files: File[];
};

export type UploadResponse = {
  id: string;
  status: UploadStatus;
  message: string;
  uploadedCount: number;
  progress: number;
  photos: GalleryImage[];
};

export type GalleryPageResult = {
  images: GalleryImage[];
  meta: GalleryPaginationMeta;
};
