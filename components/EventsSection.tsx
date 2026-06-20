import {
  CalendarBlank,
  CheckCircle,
  Clock,
  MapPin,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

const DETAILS = [
  {
    icon: CalendarBlank,
    label: "Fecha",
    value: "Viernes 4 de julio",
    note: "",
    mono: true,
  },
  {
    icon: Clock,
    label: "Hora",
    value: "9:00 a.m.",
    note: "Llegada 8:30 a.m.",
    mono: true,
  },
  {
    icon: MapPin,
    label: "Lugar",
    value: "St Kilda Beach",
    note: "Junto al St Kilda Pier Pavilion",
    mono: false,
  },
  {
    icon: UsersThree,
    label: "Para quién",
    value: "Colombianos en Melbourne",
    note: "Que buscan bienestar, conexión y nuevos amigos",
    mono: false,
  },
] as const;

const INCLUYE = [
  "Clase de yoga",
  "Sesión de ice bath",
  "Café y snacks",
  "Comunidad y nuevas conexiones",
  "Sorpresas Totto",
];

export function EventsSection() {
  return (
    <section id="actividades" className="paper-grain bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-totto-red">
            Actividades · Nos vemos en persona
          </p>
          <h2 className="mt-3 max-w-[20ch] text-3xl text-ink md:text-5xl">
            La comunidad también se vive fuera de la pantalla.
          </h2>
          <span className="mt-4 block h-1.5 w-24 rounded-full bg-totto-yellow" />
        </Reveal>

        {/* Evento destacado */}
        <Reveal delay={0.1}>
          <article className="mt-12 overflow-hidden rounded-card bg-black text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr]">
              {/* Lado izquierdo: info del evento */}
              <div className="p-8 md:p-12">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-totto-yellow">
                  Próximo encuentro · Melbourne
                </p>
                <h3 className="mt-4 font-logo text-4xl leading-[0.95] md:text-6xl">
                  TRAEMOS LA <span className="text-totto-yellow">CASA</span>
                  <br />A LA <span className="text-totto-red">PLAYA</span>
                </h3>
                <p className="mt-4 font-hand text-2xl text-white/90">
                  Yoga, ice bath y comunidad colombiana en Melbourne.
                </p>

                {/* Detalles */}
                <div className="mt-8 grid grid-cols-2 gap-6">
                  {DETAILS.map((d) => {
                    const Icon = d.icon;
                    return (
                      <div key={d.label} className="flex gap-3">
                        <Icon
                          size={26}
                          weight="duotone"
                          className="mt-0.5 shrink-0 text-totto-yellow"
                        />
                        <div>
                          <p className="font-display text-xs font-bold uppercase tracking-wide text-white/55">
                            {d.label}
                          </p>
                          <p
                            className={`text-white ${
                              d.mono ? "font-mono text-sm md:text-base" : "font-bold"
                            }`}
                          >
                            {d.value}
                          </p>
                          {d.note && (
                            <p className="text-sm text-white/55">{d.note}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Incluye */}
                <div className="mt-8">
                  <p className="font-display text-xs font-bold uppercase tracking-wide text-white/55">
                    Incluye
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {INCLUYE.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/90">
                        <CheckCircle
                          size={18}
                          weight="fill"
                          className="text-palm"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lado derecho: llamado a registrarse */}
              <div className="flex flex-col justify-center gap-5 border-t border-white/10 bg-white/[0.04] p-8 md:p-12 lg:border-l lg:border-t-0">
                <p className="font-hand text-3xl leading-tight text-totto-yellow">
                  ¡Ven a conectar contigo mismo y con tu gente!
                </p>
                <p className="text-white/70">
                  Cuando un colombiano encuentra a otro en el exterior, encuentra
                  algo más que una nacionalidad. Encuentra hogar.
                </p>
                <a
                  href="#registro"
                  className="inline-flex items-center justify-center rounded-full bg-totto-red px-7 py-4 font-display text-base font-extrabold text-white shadow-[0_14px_30px_-10px_rgba(246,48,62,0.8)] transition-transform hover:-translate-y-[1px] active:translate-y-0"
                >
                  Reserva tu cupo
                </a>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-totto-yellow">
                  Cupos limitados
                </p>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Nota de más ciudades */}
        <Reveal delay={0.15}>
          <p className="mt-8 text-center font-hand text-2xl text-home-brown">
            Pronto, más encuentros en otras ciudades del mundo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
