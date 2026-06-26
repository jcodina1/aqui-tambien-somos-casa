import { NextResponse } from "next/server";
import { getDb, ensureSchema } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Historia tal como se expone al cliente (sin el correo, que es privado). */
type PublicStory = {
  id: string;
  author: string;
  city: string;
  lat: number;
  lng: number;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE = 8;
const MAX_LEN = 280;

type ValidInput = {
  author: string;
  email: string;
  city: string;
  message: string;
  lat: number;
  lng: number;
};

/** Valida y normaliza el cuerpo del POST. Devuelve un mensaje de error o los datos. */
function validate(body: unknown): { error: string } | { data: ValidInput } {
  if (typeof body !== "object" || body === null) {
    return { error: "Cuerpo inválido." };
  }
  const b = body as Record<string, unknown>;

  const author = String(b.author ?? "").trim();
  const email = String(b.email ?? "").trim();
  const city = String(b.city ?? "").trim();
  const message = String(b.message ?? "").trim();
  const lat = Number(b.lat);
  const lng = Number(b.lng);

  if (!author || author.length > MAX_LEN) return { error: "Nombre inválido." };
  if (!EMAIL_RE.test(email)) return { error: "Correo inválido." };
  if (!city || city.length > MAX_LEN) return { error: "Ciudad inválida." };
  if (message.length < MIN_MESSAGE || message.length > MAX_LEN) {
    return { error: "La historia debe tener entre 8 y 280 caracteres." };
  }
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
    return { error: "Latitud inválida." };
  }
  if (!Number.isFinite(lng) || lng < -180 || lng > 180) {
    return { error: "Longitud inválida." };
  }

  return { data: { author, email, city, message, lat, lng } };
}

export async function GET() {
  try {
    await ensureSchema();
    const result = await getDb().execute(
      "SELECT id, author, city, lat, lng, message FROM stories ORDER BY created_at ASC",
    );
    const stories = result.rows as unknown as PublicStory[];
    return NextResponse.json({ stories });
  } catch (error) {
    console.error("GET /api/stories falló:", error);
    return NextResponse.json(
      { error: "No se pudieron cargar las historias." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const checked = validate(body);
  if ("error" in checked) {
    return NextResponse.json({ error: checked.error }, { status: 400 });
  }

  const { author, email, city, message, lat, lng } = checked.data;
  const id = crypto.randomUUID();

  try {
    await ensureSchema();
    await getDb().execute({
      sql: "INSERT INTO stories (id, author, email, city, lat, lng, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [id, author, email, city, lat, lng, message],
    });

    const story: PublicStory = { id, author, city, lat, lng, message };
    return NextResponse.json({ story }, { status: 201 });
  } catch (error) {
    console.error("POST /api/stories falló:", error);
    return NextResponse.json(
      { error: "No se pudo guardar tu banderita." },
      { status: 500 },
    );
  }
}
