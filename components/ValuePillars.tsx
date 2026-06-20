import { Heart, House, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

const PILLARS = [
  {
    icon: Heart,
    title: "Humana",
    body: "Detrás de cada migración hay una persona buscando dónde volver a sentirse en casa. Aquí esa historia importa.",
    chip: "bg-totto-red",
    iconColor: "text-white",
  },
  {
    icon: House,
    title: "Acogedora",
    body: "La comunidad es el primer refugio de quien llega. Encontrar a otro colombiano es encontrar orientación y compañía.",
    chip: "bg-totto-yellow",
    iconColor: "text-black",
  },
  {
    icon: PaperPlaneTilt,
    title: "Esperanzadora",
    body: "Migrar es dejar una vida para construir otra. Cada banderita clavada es una raíz nueva en otro rincón del mundo.",
    chip: "bg-sunset",
    iconColor: "text-white",
  },
] as const;

export function ValuePillars() {
  return (
    <section id="comunidad" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <Reveal>
          <h2 className="mt-3 max-w-[18ch] text-3xl text-ink md:text-5xl">
            Uno no extraña un lugar. Extraña cómo se sentía estar ahí.
          </h2>
          <span className="mt-4 block h-1.5 w-24 rounded-full bg-totto-yellow" />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.1}>
                <article className="flex h-full flex-col gap-4 rounded-card border border-home-brown/10 bg-sand/50 p-7 transition-transform duration-300 hover:-translate-y-1">
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl ${p.chip} ${p.iconColor}`}
                  >
                    <Icon size={30} weight="fill" />
                  </span>
                  <h3 className="text-2xl text-ink">{p.title}</h3>
                  <p className="text-ink-soft leading-relaxed">{p.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
