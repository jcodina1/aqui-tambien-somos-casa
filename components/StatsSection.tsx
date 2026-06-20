"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

// Migrantes colombianos en el exterior (2025), principales destinos.
const STATS = [
  { country: "Estados Unidos", value: 2_009_046 },
  { country: "España", value: 1_540_205 },
  { country: "Australia", value: 13_302 },
] as const;

const TOTAL = STATS.reduce((sum, s) => sum + s.value, 0); // 3.562.553
const CAMPIN_SEATS = 36_343; // capacidad del Estadio El Campín (Bogotá)
const TIMES = TOTAL / CAMPIN_SEATS; // ≈ 98,03

function format(value: number, decimals = 0): string {
  return value.toLocaleString("es-CO", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function Counter({
  to,
  inView,
  decimals = 0,
}: {
  to: number;
  inView: boolean;
  decimals?: number;
}) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => format(v, decimals));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, to, reduce, mv]);

  return <motion.span aria-hidden>{text}</motion.span>;
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="cifras" className="bg-black py-20 text-white lg:py-28">
      <div ref={ref} className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-totto-yellow">
          Colombianos en el mundo · 2025
        </p>
        <h2 className="mt-3 max-w-[18ch] text-3xl text-white md:text-5xl">
          Cada cifra es alguien que dejó su casa.
        </h2>
        <span className="mt-4 block h-1.5 w-24 rounded-full bg-totto-yellow" />

        {/* Contadores por país */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {STATS.map((s) => (
            <figure
              key={s.country}
              aria-label={`${s.country}: ${format(s.value)} migrantes colombianos`}
              className="border-t border-white/15 pt-6"
            >
              <div className="font-mono text-4xl font-medium leading-none text-totto-yellow md:text-6xl">
                <Counter to={s.value} inView={inView} />
              </div>
              <figcaption className="mt-3 font-display text-lg font-bold text-white">
                {s.country}
              </figcaption>
              <p className="text-sm text-white/55">migrantes colombianos</p>
            </figure>
          ))}
        </div>

        {/* Comparación con el estadio */}
        <div className="mt-14 rounded-card border border-white/12 bg-white/[0.04] p-7 md:p-9">
          <p className="text-xl leading-relaxed text-white/90 md:text-2xl">
            Solo en estos tres países viven más de{" "}
            <span className="font-bold text-totto-yellow">3,5 millones</span> de
            colombianos. Son tantos que, juntos, podrían llenar el estadio{" "}
            <span className="font-bold text-white">El Campín</span>{" "}
            <span className="font-mono font-medium text-totto-red">
              <Counter to={TIMES} inView={inView} decimals={2} />
            </span>{" "}
            veces.
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-white/40">
            {format(TOTAL)} personas · El Campín ≈ {format(CAMPIN_SEATS)} asientos
          </p>
        </div>
      </div>
    </section>
  );
}
