"use client";

import { useEffect, useRef, useState } from "react";
import { Microphone, Stop, X } from "@phosphor-icons/react";

export type NewStory = {
  author: string;
  city: string;
  message: string;
  voiceUrl?: string;
};

type Props = {
  open: boolean;
  lat: number | null;
  lng: number | null;
  onClose: () => void;
  onSubmit: (story: NewStory) => void;
};

const MAX_SECONDS = 15;

export function AddStoryModal({ open, lat, lng, onClose, onSubmit }: Props) {
  const [voiceUrl, setVoiceUrl] = useState<string>();
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [canRecord, setCanRecord] = useState(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCanRecord(
      typeof navigator !== "undefined" &&
        !!navigator.mediaDevices?.getUserMedia &&
        typeof window !== "undefined" &&
        "MediaRecorder" in window,
    );
  }, []);

  const stopTracks = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  function stopRecording() {
    recorderRef.current?.state === "recording" && recorderRef.current.stop();
    setRecording(false);
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setVoiceUrl(URL.createObjectURL(blob));
        stopTracks();
      };
      recorderRef.current = rec;
      rec.start();
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_SECONDS) stopRecording();
          return s + 1;
        });
      }, 1000);
    } catch {
      setCanRecord(false);
    }
  }

  // Limpieza al desmontar o cerrar.
  useEffect(() => {
    if (!open) {
      stopRecording();
      stopTracks();
      setSeconds(0);
    }
    return () => {
      stopTracks();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const author = String(data.get("author") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!author || !city || message.length < 8) return;
    onSubmit({ author, city, message, voiceUrl });
    setVoiceUrl(undefined);
  }

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-ink/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Pon tu banderita"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-card bg-white p-7 shadow-[0_40px_80px_-30px_rgba(31,26,22,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-soft hover:bg-sand"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl text-ink">Pon tu banderita</h3>
        <p className="mt-1 text-sm text-ink-soft">
          Cuéntanos qué pedazo de Colombia llevas siempre encima.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="author" className="font-display text-sm font-bold text-ink">
                Tu nombre
              </label>
              <input
                id="author"
                name="author"
                required
                className="rounded-xl border border-home-brown/25 bg-sand/40 px-3 py-2.5 text-ink placeholder:text-ink-soft/60 focus:border-totto-red focus:outline-none focus:ring-2 focus:ring-totto-red/30"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="city" className="font-display text-sm font-bold text-ink">
                Tu ciudad
              </label>
              <input
                id="city"
                name="city"
                required
                placeholder="Ej. Berlín"
                className="rounded-xl border border-home-brown/25 bg-sand/40 px-3 py-2.5 text-ink placeholder:text-ink-soft/60 focus:border-totto-red focus:outline-none focus:ring-2 focus:ring-totto-red/30"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="font-display text-sm font-bold text-ink">
              Tu historia
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              required
              placeholder="Eso que te recuerda a casa, estés donde estés..."
              className="resize-none rounded-xl border border-home-brown/25 bg-sand/40 px-3 py-2.5 text-ink placeholder:text-ink-soft/60 focus:border-totto-red focus:outline-none focus:ring-2 focus:ring-totto-red/30"
            />
          </div>

          {/* Grabador de voz opcional (mejora progresiva) */}
          {canRecord && (
            <div className="flex items-center gap-3 rounded-xl bg-sand/60 p-3">
              {recording ? (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="flex items-center gap-2 rounded-full bg-totto-red px-4 py-2 font-display text-sm font-bold text-white"
                >
                  <Stop size={18} weight="fill" /> Detener ({MAX_SECONDS - seconds}s)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startRecording}
                  className="flex items-center gap-2 rounded-full bg-home-brown px-4 py-2 font-display text-sm font-bold text-white"
                >
                  <Microphone size={18} weight="fill" />
                  {voiceUrl ? "Grabar de nuevo" : "Grabar voz (15s)"}
                </button>
              )}
              {voiceUrl && !recording && (
                <audio controls src={voiceUrl} className="h-9 flex-1" />
              )}
            </div>
          )}

          <p className="text-xs text-ink-soft">
            Ubicación seleccionada: {lat?.toFixed(2)}, {lng?.toFixed(2)}
          </p>

          <button
            type="submit"
            className="rounded-full bg-totto-red px-6 py-3 font-display text-base font-extrabold text-white shadow-[0_12px_28px_-10px_rgba(246,48,62,0.8)] transition-transform hover:-translate-y-[1px] active:translate-y-0"
          >
            Clavar mi banderita
          </button>
        </form>
      </div>
    </div>
  );
}
