import type { Event } from '@/types';

const eventCatalog: Record<string, Event> = {
  'marcelo-bianca': {
    id: 'event_marcelo_bianca',
    eventId: 'casamento',
    slug: 'marcelo-bianca',
    name: 'Marcelo e Bianca',
    subtitle: 'Um álbum vivo para capturar tudo o que escapa do roteiro.',
    description:
      'Compartilhe fotos espontâneas do evento em segundos, sem login e sem fricção.',
    dateLabel: 'Celebração especial',
    coverImage:
      'https://res.cloudinary.com/demo/image/upload/w_1400,c_fill,q_auto,f_auto/sample.jpg',
  },
};

function toTitleCase(input: string) {
  return input
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export async function getEventBySlug(slug: string): Promise<Event> {
  await new Promise((resolve) => setTimeout(resolve, 180));

  const fallbackName = toTitleCase(slug);

  return (
    eventCatalog[slug] ?? {
      id: `event_${slug}`,
      eventId: slug,
      slug,
      name: fallbackName,
      subtitle: 'Álbum colaborativo criado para celebrar memórias em tempo real.',
      description:
        'Este evento está preparado para integração futura com API REST, MongoDB Atlas e Cloudinary.',
      dateLabel: 'Evento ao vivo',
      coverImage:
        'https://res.cloudinary.com/demo/image/upload/w_1400,c_fill,q_auto,f_auto/sample.jpg',
    }
  );
}
