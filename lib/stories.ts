export type Story = {
  id: string;
  author: string;
  email?: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  message: string;
  /** Object URL de un mensaje de voz grabado en sesión (no se persiste). */
  voiceUrl?: string;
  /** true cuando la historia la agregó la persona usuaria en esta sesión. */
  fromUser?: boolean;
};

/** Punto de origen de la campaña: el corazón está en Bogotá. */
export const ORIGIN: { city: string; lat: number; lng: number } = {
  city: "Bogotá",
  lat: 4.711,
  lng: -74.0721,
};

/**
 * Historias semilla. En producción estas vendrían de la base de datos
 * de la campaña; aquí sirven para poblar el mapa al cargar.
 */
export const SEED_STORIES: Story[] = [
  {
    id: "seed-madrid",
    author: "Mariana Restrepo",
    city: "Madrid",
    country: "España",
    lat: 40.4168,
    lng: -3.7038,
    message:
      "Llevo en el morral la ruana de mi abuela. Cuando aprieta el frío de Madrid, me la pongo y vuelvo a Boyacá por un rato.",
  },
  {
    id: "seed-londres",
    author: "Santiago Quintero",
    city: "Londres",
    country: "Reino Unido",
    lat: 51.5074,
    lng: -0.1278,
    message:
      "Un extraño me ofreció un tinto cuando me vio perdido en Londres. Ese día entendí que la casa también son las manos de otro colombiano.",
  },
  {
    id: "seed-berlin",
    author: "Valentina Ocampo",
    city: "Berlín",
    country: "Alemania",
    lat: 52.52,
    lng: 13.405,
    message:
      "Escuché cumbia en un mercado de Berlín y terminé bailando con desconocidos. Por tres minutos, Alemania olía a Barranquilla.",
  },
  {
    id: "seed-paris",
    author: "Andrés Mejía",
    city: "París",
    country: "Francia",
    lat: 48.8566,
    lng: 2.3522,
    message:
      "Encontré una panadería en París que hacía pandebono cada mañana. Guardo uno en el morral para los días difíciles.",
  },
  {
    id: "seed-tokio",
    author: "Daniela Pulgarín",
    city: "Tokio",
    country: "Japón",
    lat: 35.6762,
    lng: 139.6503,
    message:
      "Encontré una arepería en Tokio que olía exactamente como la cocina de mi abuela. Lloré con la primera mordida.",
  },
  {
    id: "seed-melbourne",
    author: "Camilo Arango",
    city: "Melbourne",
    country: "Australia",
    lat: -37.8136,
    lng: 144.9631,
    message:
      "Celebré el Día de las Velitas con una familia colombiana en Melbourne. Prendimos velas frente al mar y nadie se sintió tan lejos.",
  },
  {
    id: "seed-sidney",
    author: "Laura Cifuentes",
    city: "Sídney",
    country: "Australia",
    lat: -33.8688,
    lng: 151.2093,
    message:
      "En el morral siempre cargo una bolsita de café de mi finca. El olor me devuelve a las montañas del Quindío en cualquier estación.",
  },
  {
    id: "seed-nyc",
    author: "Juan Esteban Vargas",
    city: "Nueva York",
    country: "Estados Unidos",
    lat: 40.7128,
    lng: -74.006,
    message:
      "Llevo la camiseta de la Selección debajo del abrigo. En el metro de Nueva York, otro colombiano la vio y me dijo: parcero, no estás solo.",
  },
  {
    id: "seed-toronto",
    author: "Sara Villegas",
    city: "Toronto",
    country: "Canadá",
    lat: 43.6532,
    lng: -79.3832,
    message:
      "Cargo la pulsera tricolor que me hizo mi mamá antes de viajar. La toco cuando extraño y siento que ella me alcanza la mano.",
  },
];
