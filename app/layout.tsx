import type { Metadata } from "next";
import {
  Archivo_Black,
  IBM_Plex_Mono,
  Indie_Flower,
  Montserrat,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source",
  display: "swap",
});

// Logo y elementos especiales (alternativa de Google a "Lemon Milk").
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo",
  display: "swap",
});

// Slogan, dedicatorias y notas manuscritas ("Indie Flow" -> Indie Flower).
const indieFlower = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-indie",
  display: "swap",
});

// Datos: coordenadas, fechas, tickets (estilo viajero/documental).
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aquitambiensomoscasa.co",
  ),
  title: "Aquí también somos casa | Totto",
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  description:
    "Un mapa de colombianos en el mundo. Pon tu banderita, cuenta qué pedazo de Colombia llevas siempre encima y encuentra tu comunidad.",
  openGraph: {
    title: "Aquí también somos casa",
    description:
      "Colombianos en el exterior conectando desde la nostalgia, la identidad y el sentido de pertenencia.",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Aquí también somos casa - colombianos en el mundo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${sourceSans.variable} ${archivoBlack.variable} ${indieFlower.variable} ${plexMono.variable}`}
    >
      <body className="bg-sand text-ink font-body antialiased">{children}</body>
    </html>
  );
}
