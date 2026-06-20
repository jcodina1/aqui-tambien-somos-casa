import Image from "next/image";
import { Reveal } from "./Reveal";

const PHOTOS = [
  { file: "videollamada.jpeg", caption: "Las 6pm en Bogotá", city: "Madrid", rot: "-rotate-2" },
  { file: "cafe.jpg", caption: "Café como en casa", city: "Londres", rot: "rotate-1" },
  { file: "aeropuerto.jpeg", caption: "Listo para volver", city: "Tokio", rot: "-rotate-1" },
  { file: "diciembre.jpg", caption: "Diciembre lejos", city: "Melbourne", rot: "rotate-2" },
  { file: "ruana.jpg", caption: "La ruana de mi abuela", city: "Berlín", rot: "rotate-1" },
  { file: "pandebono.jpg", caption: "Pandebono cada mañana", city: "París", rot: "-rotate-2" },
] as const;

export function StoryGallery() {
  return (
    <section id="historias" className="paper-grain bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl text-ink md:text-5xl">
            Pedazos de Colombia repartidos por el mundo.
          </h2>
          <span className="mt-4 block h-1.5 w-24 rounded-full bg-totto-yellow" />
          <p className="mt-4 max-w-[52ch] text-ink-soft">
            Cada foto es un recordatorio de que la casa no es solo un lugar: es
            todo lo que cargamos cuando nos vamos.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.file} delay={(i % 3) * 0.08} className="w-full max-w-[300px]">
              <figure className={`polaroid relative ${p.rot} transition-transform duration-300 hover:rotate-0`}>
                <span className="tape left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 -rotate-3 rounded-[1px]" aria-hidden />
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand-deep">
                  <Image
                    src={`/images/galeria/${p.file}`}
                    alt={p.caption}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 flex items-end justify-between gap-2 px-1">
                  <span className="font-hand text-xl leading-tight text-ink">
                    {p.caption}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-tight text-home-brown">
                    {p.city}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
