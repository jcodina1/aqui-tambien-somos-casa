"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, PushPin } from "@phosphor-icons/react";
import { SEED_STORIES, type Story } from "@/lib/stories";
import { AddStoryModal, type NewStory } from "./AddStoryModal";

const STORAGE_KEY = "atsc:historias";

const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <div className="flex flex-col items-center gap-3 text-home-brown">
        <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-home-brown/30 border-t-home-brown" />
        <span className="font-display text-sm font-bold">Cargando el mapa...</span>
      </div>
    </div>
  ),
});

type StoredStory = Pick<
  Story,
  "id" | "author" | "email" | "city" | "lat" | "lng" | "message"
>;

export function MapExperience() {
  const [userStories, setUserStories] = useState<Story[]>([]);
  const [placing, setPlacing] = useState(false);
  const [pending, setPending] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [focus, setFocus] = useState<{
    lat: number;
    lng: number;
    key: number;
  } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredStory[];
        setUserStories(
          parsed.map((s) => ({ ...s, country: "", fromUser: true })),
        );
      }
    } catch {
      /* almacenamiento no disponible: seguimos solo con las semilla */
    }
  }, []);

  // El botón del navbar dispara este evento para activar el modo "poner banderita".
  useEffect(() => {
    const handler = () => {
      document
        .getElementById("mapa")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      setPlacing(true);
    };
    window.addEventListener("atsc:place", handler);
    return () => window.removeEventListener("atsc:place", handler);
  }, []);

  const stories = useMemo(
    () => [...SEED_STORIES, ...userStories],
    [userStories],
  );

  function handleMapClick(lat: number, lng: number) {
    setPending({ lat, lng });
    setPlacing(false);
  }

  function handleAddStory(data: NewStory) {
    if (!pending) return;
    const story: Story = {
      id: `user-${Date.now()}`,
      author: data.author,
      email: data.email,
      city: data.city,
      country: "",
      lat: pending.lat,
      lng: pending.lng,
      message: data.message,
      voiceUrl: data.voiceUrl,
      fromUser: true,
    };
    const next = [...userStories, story];
    setUserStories(next);
    setFocus({ lat: story.lat, lng: story.lng, key: Date.now() });

    try {
      const toStore: StoredStory[] = next.map(
        ({ id, author, email, city, lat, lng, message }) => ({
          id,
          author,
          email,
          city,
          lat,
          lng,
          message,
        }),
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch {
      /* sin persistencia: la historia vive en esta sesión */
    }
    setPending(null);
  }

  return (
    <div id="mapa">
      <div className="relative overflow-hidden rounded-card border border-home-brown/15 bg-white shadow-[0_30px_60px_-30px_rgba(31,26,22,0.45)]">
        {placing && (
          <div className="absolute inset-x-0 top-0 z-[1000] flex items-center justify-center gap-2 bg-totto-red px-4 py-2.5 text-center font-display text-sm font-bold text-white">
            <MapPin size={18} weight="fill" />
            Haz clic en el mapa, justo donde estás ahora.
          </div>
        )}
        <div className="h-[380px] w-full sm:h-[440px] lg:h-[500px]">
          <InteractiveMap
            stories={stories}
            placing={placing}
            onMapClick={handleMapClick}
            focus={focus}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold text-home-brown">
          <span className="text-totto-red">{stories.length}</span> colombianos
          ya están en el mapa
        </p>
        <button
          type="button"
          onClick={() => setPlacing((v) => !v)}
          className={`flex shrink-0 items-center gap-2 rounded-full px-6 py-3 font-display text-base font-extrabold text-white shadow-[0_12px_28px_-10px_rgba(246,48,62,0.8)] transition-transform hover:-translate-y-[1px] active:translate-y-0 ${
            placing ? "bg-home-brown" : "bg-totto-red"
          }`}
        >
          <PushPin size={20} weight="fill" />
          {placing ? "Cancelar" : "Pon tu banderita"}
        </button>
      </div>

      <AddStoryModal
        open={pending !== null}
        lat={pending?.lat ?? null}
        lng={pending?.lng ?? null}
        onClose={() => setPending(null)}
        onSubmit={handleAddStory}
      />
    </div>
  );
}
