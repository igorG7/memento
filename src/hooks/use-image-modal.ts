import { useCallback, useEffect, useState } from 'react';

import type { GalleryImage } from '@/types';

export function useImageModal(images: GalleryImage[]) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage = activeIndex === null ? null : images[activeIndex] ?? null;

  const openAt = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (activeIndex === null || images.length === 0) {
      return;
    }

    setActiveIndex((current) => ((current ?? 0) + 1) % images.length);
  }, [activeIndex, images.length]);

  const showPrevious = useCallback(() => {
    if (activeIndex === null || images.length === 0) {
      return;
    }

    setActiveIndex((current) => ((current ?? 0) - 1 + images.length) % images.length);
  }, [activeIndex, images.length]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        close();
      }

      if (event.key === 'ArrowRight') {
        showNext();
      }

      if (event.key === 'ArrowLeft') {
        showPrevious();
      }
    }

    if (activeIndex !== null) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrevious]);

  return {
    activeImage,
    activeIndex,
    openAt,
    close,
    showNext,
    showPrevious,
  };
}
