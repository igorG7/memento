"use client";

import { useCallback, useState } from "react";

import { getGalleryPage } from "@/services/gallery.service";
import type {
  GalleryImage,
  GalleryPageResult,
  GalleryPaginationMeta,
} from "@/types";

type UseGalleryPaginationArgs = {
  initialGallery: GalleryPageResult;
  pageSize?: number;
};

export function useGalleryPagination({
  initialGallery,
  pageSize = 10,
}: UseGalleryPaginationArgs) {
  const [images, setImages] = useState<GalleryImage[]>(initialGallery.images);
  const [meta, setMeta] = useState<GalleryPaginationMeta>(initialGallery.meta);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);

      try {
        const result = await getGalleryPage(page, pageSize);
        setImages(result.images);
        setMeta(result.meta);
      } catch {
        setError("Não foi possível carregar a galeria.");
      } finally {
        setLoading(false);
      }
    },
    [pageSize],
  );

  const goToPreviousPage = useCallback(() => {
    setMeta((current) => {
      if (current.page > 1) {
        void loadPage(current.page - 1);
      }
      return current;
    });
  }, [loadPage]);

  const goToNextPage = useCallback(() => {
    setMeta((current) => {
      if (current.page < current.totalPages) {
        void loadPage(current.page + 1);
      }
      return current;
    });
  }, [loadPage]);

  const refresh = useCallback(() => {
    void loadPage(meta.page);
  }, [loadPage, meta.page]);

  return {
    images,
    meta,
    loading,
    error,
    loadPage,
    goToPreviousPage,
    goToNextPage,
    refresh,
  };
}
