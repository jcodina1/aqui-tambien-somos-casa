"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ORIGIN, type Story } from "@/lib/stories";

type Focus = { lat: number; lng: number; key: number } | null;

type Props = {
  stories: Story[];
  placing: boolean;
  onMapClick: (lat: number, lng: number) => void;
  focus: Focus;
};

/** Puntos a lo largo de una curva cuadrática entre dos coordenadas. */
function curvedPoints(
  from: [number, number],
  to: [number, number],
  bend = 0.18,
  segments = 48,
): [number, number][] {
  const [lat1, lng1] = from;
  const [lat2, lng2] = to;
  const mLat = (lat1 + lat2) / 2;
  const mLng = (lng1 + lng2) / 2;
  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;
  const ctrlLat = mLat - dLng * bend;
  const ctrlLng = mLng + dLat * bend;
  const pts: [number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const lat =
      (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * ctrlLat + t * t * lat2;
    const lng =
      (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * ctrlLng + t * t * lng2;
    pts.push([lat, lng]);
  }
  return pts;
}

function storyPinIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div class="totto-pin"><div class="totto-pin__flag"><span></span><span></span><span></span></div></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -24],
  });
}

function originIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div class="totto-origin"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -14],
  });
}

/** Coordenadas estilo documental: 40.4168° N, 3.7038° O */
function fmtCoords(lat: number, lng: number): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "O";
  return `${Math.abs(lat).toFixed(4)}° ${ns}, ${Math.abs(lng).toFixed(4)}° ${ew}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function popupHtml(story: Story): string {
  const audio = story.voiceUrl
    ? `<audio controls src="${story.voiceUrl}"></audio>`
    : "";
  return `
    <div class="story-popup">
      <div class="story-popup__city">${escapeHtml(story.city)}</div>
      <div class="story-popup__author">${escapeHtml(story.author)}</div>
      <div class="story-popup__coords">${fmtCoords(story.lat, story.lng)}</div>
      <p class="story-popup__msg">${escapeHtml(story.message)}</p>
      ${audio}
    </div>`;
}

export default function InteractiveMap({
  stories,
  placing,
  onMapClick,
  focus,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const placingRef = useRef(placing);
  const onClickRef = useRef(onMapClick);

  // Mantener refs sincronizadas para el handler persistente de clic.
  placingRef.current = placing;
  onClickRef.current = onMapClick;

  // 1) Inicializar el mapa una sola vez.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [22, 8],
      zoom: 2,
      minZoom: 2,
      maxZoom: 8,
      worldCopyJump: true,
      scrollWheelZoom: false,
      maxBounds: [
        [-82, -200],
        [85, 200],
      ],
      maxBoundsViscosity: 0.8,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
      },
    ).addTo(map);

    map.on("click", (e: L.LeafletMouseEvent) => {
      if (placingRef.current) {
        onClickRef.current(e.latlng.lat, e.latlng.lng);
      }
    });

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  // 2) Redibujar marcadores y arcos cuando cambian las historias.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.clearLayers();

    // Pin de origen: Bogotá, el corazón de la campaña.
    L.marker([ORIGIN.lat, ORIGIN.lng], { icon: originIcon() })
      .bindPopup(
        `<div class="story-popup"><div class="story-popup__city">${ORIGIN.city}</div><div class="story-popup__coords">${fmtCoords(ORIGIN.lat, ORIGIN.lng)}</div><p class="story-popup__msg">Donde empieza todo. Cada línea regresa aquí.</p></div>`,
      )
      .addTo(layer);

    for (const story of stories) {
      const arc = curvedPoints(
        [ORIGIN.lat, ORIGIN.lng],
        [story.lat, story.lng],
      );
      L.polyline(arc, {
        color: story.fromUser ? "#738B5A" : "#F6303E",
        weight: 1.6,
        opacity: 0.55,
        dashArray: "1 7",
        lineCap: "round",
      }).addTo(layer);

      L.marker([story.lat, story.lng], { icon: storyPinIcon() })
        .bindPopup(popupHtml(story))
        .addTo(layer);
    }
  }, [stories]);

  // 3) Cursor según el modo "clavar banderita".
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.style.cursor = placing ? "crosshair" : "";
  }, [placing]);

  // 4) Volar hacia una historia recién agregada.
  useEffect(() => {
    if (focus && mapRef.current) {
      mapRef.current.flyTo([focus.lat, focus.lng], 4, { duration: 1.1 });
    }
  }, [focus]);

  return <div ref={containerRef} className="h-full w-full" />;
}
