import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-10">
      <section className="rounded-[2rem] border border-border bg-white/95 p-8 text-center shadow-soft sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Memento
        </p>
        <h1 className="mt-4 font-display text-4xl text-slate-950 sm:text-5xl">
          Gabriel & Nicole
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Um álbum colaborativo para registrar os momentos mais especiais da
          celebração.
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Compartilhe fotos sem login, acompanhe a galeria em tempo real e ajude
          a construir essa memória junto com os noivos.
        </p>
        <Link
          href="/e/marcelo-bianca"
          className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-soft"
        >
          Ver álbum do casamento
        </Link>
      </section>
    </main>
  );
}
