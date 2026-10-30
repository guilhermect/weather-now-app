import type { Location } from "./weather";

export const DEFAULT_LOCATION = {
  name: "Guarulhos, SP",
  latitude: -23.4628,
  longitude: -46.5333,
  timezone: "America/Sao_Paulo",
} as const satisfies Location;
