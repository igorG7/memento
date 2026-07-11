"use client";

import { HeroSection } from "@/components/hero/HeroSection";
import { UploadForm } from "@/components/upload/UploadForm";
import type { Event, GalleryPageResult } from "@/types";
import { Suspense } from "react";
import { useRef } from "react";
import { GallerySection, type GallerySectionHandle } from "./GallerySection";
import { GallerySkeleton } from "../gallery/GallerySkeleton";

type EventPageClientProps = {
  event: Event;
  galleryPromise: Promise<GalleryPageResult>;
};

export function EventPageClient({
  event,
  galleryPromise,
}: EventPageClientProps) {
  const gallerySectionRef = useRef<GallerySectionHandle>(null);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 overflow-x-hidden px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <HeroSection
        eyebrow={event.name}
        title="Álbum Instantâneo"
        subtitle="Ajude a gente a guardar os momentos mais espontâneos desse dia."
        description="Vale selfie, bastidor, foto tremida, flagra engraçado, pista de dança e tudo que tiver a nossa cara."
      />
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <UploadForm
          eventId={event.eventId}
          onUploaded={() => {
            gallerySectionRef.current?.loadPage(1);
          }}
        />

        <Suspense fallback={<GallerySkeleton />}>
          <GallerySection
            galleryPromise={galleryPromise}
            ref={gallerySectionRef}
          />
        </Suspense>
      </div>
    </main>
  );
}
