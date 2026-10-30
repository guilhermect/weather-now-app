import { DEFAULT_LOCATION } from "../model/location";
import type { Location } from "../model/weather";

export const OPEN_METEO_FORECAST_ENDPOINT =
  "https://api.open-meteo.com/v1/forecast";

const CURRENT_FIELDS = ["temperature_2m", "weather_code"];
const DAILY_FIELDS = [
  "weather_code",
  "temperature_2m_min",
  "temperature_2m_max",
  "precipitation_probability_max",
  "precipitation_sum",
];
const HOURLY_FIELDS = [
  "precipitation_probability",
  "precipitation",
  "weather_code",
];

export function buildForecastUrl(
  location: Location = DEFAULT_LOCATION,
): URL {
  const url = new URL(OPEN_METEO_FORECAST_ENDPOINT);
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: CURRENT_FIELDS.join(","),
    daily: DAILY_FIELDS.join(","),
    hourly: HOURLY_FIELDS.join(","),
    forecast_days: "15",
    timezone: location.timezone,
    temperature_unit: "celsius",
    precipitation_unit: "mm",
  });

  url.search = params.toString();
  return url;
}
