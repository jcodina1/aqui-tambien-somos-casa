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

## Base de datos (Turso / libSQL)

Las banderitas de la comunidad se guardan en **Turso** (SQLite serverless) y se
comparten entre todos los visitantes. El API vive en `app/api/stories/route.ts`
(`GET` lista pública sin correo, `POST` guarda un envío validado) y el cliente
en `lib/db.ts`.

### Crear la base (una sola vez)

```bash
# 1. Instalar la CLI de Turso
curl -sSfL https://get.tur.so/install.sh | bash   # macOS/Linux
# Windows: irm get.tur.so/install.ps1 | iex   (PowerShell)

# 2. Iniciar sesión (abre el navegador)
turso auth login

# 3. Crear la base
turso db create aqui-tambien-somos-casa

# 4. Obtener la URL
turso db show aqui-tambien-somos-casa --url

# 5. Crear un token de acceso
turso db tokens create aqui-tambien-somos-casa
```

> Alternativa sin CLI: crea la base desde https://turso.tech y copia la URL y el
> token desde el dashboard.

La tabla `stories` se crea sola en el primer request (`ensureSchema` en
`lib/db.ts`), no hace falta migración manual.

### Configurar credenciales

Copia `.env.example` a `.env.local` y pega los valores:

```bash
TURSO_DATABASE_URL=libsql://aqui-tambien-somos-casa-<org>.turso.io
TURSO_AUTH_TOKEN=<token>
```

En **Vercel**: Project → Settings → Environment Variables, agrega las mismas dos
variables (Production + Preview) y vuelve a desplegar.

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
  MapExperience.tsx Estado del mapa, fetch/POST al API, modo "clavar", contador
  InteractiveMap.tsx Mapa Leaflet (carga client-only)
  AddStoryModal.tsx Modal para agregar historia + grabador de voz 15 s
  StoryGallery.tsx  Galería de polaroids
  ProductShowcase.tsx Showcase del morral Totto
  Footer.tsx        Redes, coordenadas de Bogotá
app/api/
  stories/route.ts  API de banderitas: GET (lista) + POST (guardar) en Turso
lib/
  stories.ts        Historias semilla + origen (Bogotá)
  db.ts             Cliente Turso (libSQL) + creación de la tabla stories
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
- Las historias que agrega el usuario al "clavar su banderita" se guardan en **Turso** vía `POST /api/stories` y se ven en el mapa de todos al instante. El correo se guarda pero **no** se expone en el `GET` público. Los mensajes de voz no se persisten (viven solo en la sesión).
- Tiles del mapa: CartoDB Voyager (sin API key).
