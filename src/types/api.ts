export type ApiPhoto = {
  _id: string;
  eventId: string;
  guestName: string;
  category: string;
  cloudinary: {
    publicId: string;
    secureUrl: string;
    width: number;
    height: number;
    bytes: number;
    format: string;
  };
  status: string;
  uploadedAt: string;
};

export type ApiPhotosListResponse = {
  message: string;
  data: ApiPhoto[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export type ApiUploadPhotosResponse = {
  message: string;
  data: ApiPhoto[];
};
