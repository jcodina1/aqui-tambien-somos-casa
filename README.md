# Aquí también somos casa — Microsite Totto

Microsite interactivo de campaña social: colombianos en el exterior **clavan su banderita** en un mapa, dejan un mensaje (texto o voz de 15 s) sobre qué pedazo de Colombia llevan siempre encima, y encuentran su comunidad.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4** (tokens de marca en `app/globals.css`)
- **Leaflet** para el mapa interactivo (pines con bandera, arcos a Bogotá, popups)
- **Motion** para animaciones (con `prefers-reduced-motion`)
- **Phosphor Icons**

## Correr en local

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # build de producción
```

## Estructura

```
app/
  layout.tsx        Fuentes (Montserrat + Source Sans 3), metadata
  globals.css       Sistema de diseño: paleta, tipografía, polaroid, pines Leaflet
  page.tsx          Composición de secciones
components/
  Nav.tsx           Header fijo, navegación + CTA
  Hero.tsx          Titular + mapa interactivo (columna derecha)
  ValuePillars.tsx  Pilares: Humana / Acogedora / Esperanzadora
  MapExperience.tsx Estado del mapa, persistencia, modo "clavar", contador
  InteractiveMap.tsx Mapa Leaflet (carga client-only)
  AddStoryModal.tsx Modal para agregar historia + grabador de voz 15 s
  StoryGallery.tsx  Galería de polaroids
  ProductShowcase.tsx Showcase del morral Totto
  Footer.tsx        Redes, coordenadas de Bogotá
lib/
  stories.ts        Historias semilla + origen (Bogotá)
```

## Sistema de diseño

| Token | Valor | Uso |
|---|---|---|
| `totto-red` | `#F6303E` | CTAs principales |
| `totto-yellow` | `#FCCE01` | Acentos, resaltado |
| `home-brown` | `#885A3C` | Fondos cálidos |
| `sand` | `#F4E8DA` | Fondo suave alternativo |
| `sunset` | `#5B7A95` | Distancia / reflexión |
| `palm` | `#738B5A` | Crecimiento / naturaleza |

Tipografía: **Montserrat** (titulares) + **Source Sans 3** (cuerpo).

## Notas

- Las imágenes reales de campaña viven en `public/images/` (hero, morral, OG y `galeria/`).
- Las historias que agrega el usuario al "clavar su banderita" se guardan en `localStorage` (solo texto; los mensajes de voz viven en la sesión). Conectar a la API/CRM real de la campaña antes de publicar.
- Tiles del mapa: CartoDB Voyager (sin API key).
