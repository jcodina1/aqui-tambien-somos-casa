"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react";

const LINKS = [
  { href: "#mapa", label: "El mapa" },
  { href: "#historias", label: "Historias" },
  { href: "#comunidad", label: "La comunidad" },
  { href: "#morral", label: "El morral" },
  { href: "#actividades", label: "Eventos" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Activa el modo "poner banderita" en el mapa del hero.
  function startPlacing() {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("atsc:place"));
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-black transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_24px_-8px_rgba(0,0,0,0.8)]" : ""
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 lg:px-8">
        {/* Logo de campaña (marca de la casa + texto) */}
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/images/logos/mark-white.webp"
            alt=""
            aria-hidden
            width={516}
            height={503}
            className="h-9 w-auto"
          />
          <span className="font-logo text-[13px] leading-[1.05] tracking-tight text-white">
            AQUÍ TAMBIÉN
            <br />
            SOMOS <span className="text-totto-yellow">CASA</span>
          </span>
        </a>

        {/* Enlaces desktop - una sola línea */}
        <div className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-sm font-bold text-white/85 transition-colors hover:text-totto-yellow"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={startPlacing}
            className="rounded-full bg-totto-red px-5 py-2.5 font-display text-sm font-extrabold text-white shadow-[0_8px_20px_-8px_rgba(246,48,62,0.7)] transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0"
          >
            Pon tu banderita
          </button>
        </div>

        {/* Botón móvil */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full text-white lg:hidden"
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-white/10 bg-black px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 font-display text-base font-bold text-white hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={startPlacing}
              className="mt-2 rounded-full bg-totto-red px-5 py-3 text-center font-display text-base font-extrabold text-white"
            >
              Pon tu banderita
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
