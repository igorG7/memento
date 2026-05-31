'use client';

import { Button } from '@/components/ui/button';

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
};

export function HeroSection({ eyebrow, title, subtitle, description }: HeroSectionProps) {
  function scrollToUpload() {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-6 shadow-soft sm:p-8 lg:p-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(15,23,42,0.08),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(148,163,184,0.18),_transparent_30%)]" />
      <div className="max-w-3xl">
        <span className="inline-flex items-center rounded-full border border-border bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {eyebrow}
        </span>
        <h1 className="mt-5 font-display text-4xl leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{subtitle}</p>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={scrollToUpload}>Enviar minhas fotos</Button>
          <Button variant="secondary" onClick={scrollToUpload}>
            Começar agora
          </Button>
        </div>
      </div>
    </section>
  );
}
