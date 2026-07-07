const SKELETON_IMAGE_HEIGHTS = [220, 280, 200, 260, 240, 300, 210, 250];

export function GallerySkeleton() {
  return (
    <section className="space-y-4">
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
        {SKELETON_IMAGE_HEIGHTS.map((height, index) => (
          <div
            key={index}
            className="mb-4 break-inside-avoid overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-sm"
          >
            <div
              className="w-full animate-pulse bg-slate-200"
              style={{ height: `${height}px` }}
            />
            <div className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
                <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200" />
              </div>
              <div className="h-3 w-20 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
