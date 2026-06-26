import { createClient, type Client } from "@libsql/client";

/**
 * Cliente de Turso (libSQL) compartido entre invocaciones serverless.
 * Las credenciales se leen de variables de entorno; nunca se hardcodean.
 */
let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

/**
 * Resuelve las credenciales de Turso de forma tolerante al nombre de la
 * variable. La integración de Turso en Vercel crea variables con un prefijo
 * (p. ej. `STORAGE_URL`, `STORAGE_AUTH_TOKEN`), mientras que la CLI usa
 * `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN`. Aceptamos ambos casos.
 */
function resolveCredentials(): { url?: string; authToken?: string } {
  const env = process.env;

  // 1) Nombres explícitos conocidos (CLI de Turso o configuración manual).
  const url =
    env.TURSO_DATABASE_URL ??
    env.TURSO_URL ??
    // 2) Cualquier variable inyectada por Vercel cuyo valor sea una URL libSQL.
    Object.values(env).find(
      (v) => typeof v === "string" && v.startsWith("libsql://"),
    );

  const authToken =
    env.TURSO_AUTH_TOKEN ??
    env.TURSO_TOKEN ??
    // 3) Cualquier variable cuyo nombre termine en AUTH_TOKEN (con prefijo).
    Object.entries(env).find(
      ([k, v]) => k.endsWith("AUTH_TOKEN") && typeof v === "string" && !!v,
    )?.[1];

  return { url, authToken };
}

export function getDb(): Client {
  if (client) return client;

  const { url, authToken } = resolveCredentials();

  if (!url) {
    throw new Error(
      "No se encontró la URL de Turso. Define TURSO_DATABASE_URL (o conecta " +
        "la base desde la integración de Turso en Vercel) y vuelve a desplegar.",
    );
  }

  client = createClient({ url, authToken });
  return client;
}

/**
 * Crea la tabla si no existe. Se memoiza para no ejecutar el DDL
 * en cada request dentro de la misma instancia.
 */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getDb()
      .execute(
        `CREATE TABLE IF NOT EXISTS stories (
           id         TEXT PRIMARY KEY,
           author     TEXT NOT NULL,
           email      TEXT NOT NULL,
           city       TEXT NOT NULL,
           lat        REAL NOT NULL,
           lng        REAL NOT NULL,
           message    TEXT NOT NULL,
           created_at TEXT NOT NULL DEFAULT (datetime('now'))
         )`,
      )
      .then(() => undefined)
      .catch((error) => {
        // Reintentar en la próxima llamada si el DDL falla.
        schemaReady = null;
        throw error;
      });
  }
  return schemaReady;
}
