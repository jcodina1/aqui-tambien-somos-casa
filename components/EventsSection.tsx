import Image from "next/image";
import {
  CalendarBlank,
  CheckCircle,
  Clock,
  MapPin,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import { RegistrationForm } from "./RegistrationForm";

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
    note: "Bienestar, conexión y nuevos amigos",
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

        {/* Evento destacado: tarjeta poster con foto de fondo */}
        <Reveal delay={0.1}>
          <article className="mt-12 overflow-hidden rounded-card bg-black text-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
            {/* Encabezado con foto de la playa + scrim */}
            <div className="relative flex min-h-[380px] items-end md:min-h-[480px]">
              <Image
                src="/images/eventos/playa.jpg"
                alt="Comunidad colombiana en una playa de Melbourne al atardecer"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

              <div className="relative p-8 md:p-12">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-totto-yellow">
                  Próximo encuentro · Melbourne
                </p>
                <h3 className="mt-3 font-logo text-4xl leading-[0.92] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-6xl">
                  TRAEMOS LA <span className="text-totto-yellow">CASA</span>
                  <br />A LA <span className="text-totto-red">PLAYA</span>
                </h3>
                <p className="mt-4 font-hand text-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] md:text-3xl">
                  Yoga, ice bath y comunidad colombiana en Melbourne.
                </p>
              </div>
            </div>

            {/* Cuerpo: detalles + formulario */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-2 gap-6">
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

                <div className="mt-8">
                  <p className="font-display text-xs font-bold uppercase tracking-wide text-white/55">
                    Incluye
                  </p>
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {INCLUYE.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/90">
                        <CheckCircle size={18} weight="fill" className="text-palm" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Formulario de reserva */}
              <div className="border-t border-white/10 bg-white/[0.05] p-8 md:p-12 lg:border-l lg:border-t-0">
                <p className="font-hand text-3xl leading-tight text-totto-yellow">
                  ¡Ven a conectar con tu gente!
                </p>
                <p className="mb-5 mt-1 text-sm text-white/65">
                  Déjanos tus datos y aseguramos tu lugar en la playa.
                </p>
                <RegistrationForm />
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center font-hand text-2xl text-home-brown">
            Pronto, más encuentros en otras ciudades del mundo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
