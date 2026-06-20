"use client";

import { useState } from "react";
import { CheckCircle, Warning } from "@phosphor-icons/react";

type Status = "idle" | "submitting" | "success" | "error";

export function RegistrationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nombre = String(data.get("nombre") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (nombre.length < 2 || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setName(nombre.split(" ")[0]);
    setStatus("submitting");
    try {
      // Demo: sin backend. Conectar al CRM/formulario real de la campaña.
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-palm/20 text-palm">
          <CheckCircle size={34} weight="fill" />
        </span>
        <p className="font-hand text-3xl leading-tight text-totto-yellow">
          ¡Listo, {name}! Tu cupo está reservado.
        </p>
        <p className="text-white/70">
          Te enviaremos los detalles del encuentro a tu correo. Nos vemos en la
          playa.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-nombre" className="font-display text-xs font-bold uppercase tracking-wide text-white/55">
          Tu nombre
        </label>
        <input
          id="reg-nombre"
          name="nombre"
          autoComplete="name"
          placeholder="Como te dicen en casa"
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-totto-yellow focus:outline-none focus:ring-2 focus:ring-totto-yellow/30"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-email" className="font-display text-xs font-bold uppercase tracking-wide text-white/55">
          Tu correo
        </label>
        <input
          id="reg-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-totto-yellow focus:outline-none focus:ring-2 focus:ring-totto-yellow/30"
        />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-1.5 text-sm text-totto-yellow">
          <Warning size={16} weight="fill" />
          Escribe tu nombre y un correo válido para reservar.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 rounded-full bg-totto-red px-7 py-4 font-display text-base font-extrabold text-white shadow-[0_14px_30px_-10px_rgba(246,48,62,0.8)] transition-transform hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-70"
      >
        {status === "submitting" ? "Reservando..." : "Reserva tu cupo"}
      </button>
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-totto-yellow">
        Cupos limitados
      </p>
    </form>
  );
}
