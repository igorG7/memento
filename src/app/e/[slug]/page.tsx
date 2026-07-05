import type { Metadata } from "next";

import { EventPageClient } from "@/components/event/EventPageClient";
import { GALLERY_PAGE_SIZE, getGalleryPage } from "@/services/gallery.service";
import { getEventBySlug } from "@/services/event.service";

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const event = await getEventBySlug(slug);

  return {
    title: `${event.name} | Memento`,
    description: event.description,
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const event = await getEventBySlug(slug);
  const gallery = getGalleryPage(1, GALLERY_PAGE_SIZE);

  return <EventPageClient event={event} galleryPromise={gallery} />;
}
