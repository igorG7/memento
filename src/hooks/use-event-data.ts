import { useEffect, useState } from 'react';

import type { Event, GalleryImage } from '@/types';
import { getEventBySlug } from '@/services/event.service';
import { getGalleryByEventId } from '@/services/gallery.service';

type EventDataState = {
  event: Event | null;
  gallery: GalleryImage[];
  loading: boolean;
  error: string | null;
};

export function useEventData(slug: string) {
  const [state, setState] = useState<EventDataState>({
    event: null,
    gallery: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setState((current) => ({ ...current, loading: true, error: null }));

        const event = await getEventBySlug(slug);
        const gallery = await getGalleryByEventId(event.eventId);

        if (!active) {
          return;
        }

        setState({
          event,
          gallery,
          loading: false,
          error: null,
        });
      } catch {
        if (!active) {
          return;
        }

        setState((current) => ({
          ...current,
          loading: false,
          error: 'Não foi possível carregar este evento.',
        }));
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [slug]);

  return state;
}
