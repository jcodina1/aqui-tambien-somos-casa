import Image from "next/image";
import { Reveal } from "./Reveal";

export function ProductShowcase() {
  return (
    <section id="morral" className="bg-home-brown py-20 text-sand lg:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
            <Image
              src="/images/morral.jpg"
              alt="Morral Totto sobre los hombros de un viajero colombiano"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="max-w-[40rem]">
            <h2 className="text-3xl text-sand md:text-5xl">
              El único pedazo de casa que cabe en tus hombros.
            </h2>
            <span className="mt-4 block h-1.5 w-24 rounded-full bg-totto-yellow" />
            <p className="mt-5 text-lg leading-relaxed text-sand/85">
              El morral Totto acompaña a quien se va y a quien apenas empieza de
              nuevo. No es solo lo que llevas: es lo que te recuerda de dónde
              vienes mientras construyes a dónde vas.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-sand/85">
              Te reconoce en un aeropuerto, en un metro, en una ciudad nueva. Y
              en ese instante, otro colombiano sabe que no está solo.
            </p>
            <a
              href="#mapa"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-totto-yellow px-7 py-3.5 font-display text-base font-extrabold text-ink shadow-[0_12px_28px_-12px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-[1px] active:translate-y-0"
            >
              Pon tu banderita
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
