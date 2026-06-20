import Image from "next/image";
import { Reveal } from "./Reveal";
import { MapExperience } from "./MapExperience";

export function Hero() {
  return (
    <section
      id="top"
      className="paper-grain relative flex min-h-[100dvh] items-center overflow-hidden bg-sand pb-12 pt-[96px] lg:pt-24"
    >
      {/* Calidez de fondo sin foto, para que el mapa transparente respire. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_15%,rgba(252,206,1,0.14),transparent_55%),radial-gradient(100%_80%_at_0%_100%,rgba(136,90,60,0.12),transparent_60%)]" />

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        {/* Columna izquierda: logo de campaña */}
        <Reveal>
          <div className="max-w-[34rem]">
            <h1 className="sr-only">
              Aquí también somos casa. Lejos del país, cerca de los nuestros.
            </h1>
            <Image
              src="/images/logos/logo-campana.png"
              alt="Aquí también somos casa"
              width={1101}
              height={816}
              priority
              className="h-auto w-full max-w-[480px]"
            />
            <p className="mt-6 max-w-[40ch] text-lg text-ink-soft md:text-xl">
              Un mapa de colombianos en el mundo. Abre las historias de otros y
              Pon tu banderita donde estés: cuenta qué pedazo de Colombia
              llevas siempre encima.
            </p>
          </div>
        </Reveal>

        {/* Columna derecha: mapa interactivo */}
        <Reveal delay={0.15} className="w-full">
          <MapExperience />
        </Reveal>
      </div>
    </section>
  );
}
