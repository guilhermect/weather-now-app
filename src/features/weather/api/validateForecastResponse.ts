import { invalidWeatherResponse } from "./weatherApiError";
import type { OpenMeteoForecastResponse } from "./openMeteoTypes";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireRecord(value: unknown, path: string): Record<string, unknown> {
  if (!isRecord(value)) {
    throw invalidWeatherResponse(`expected object at "${path}"`);
  }

  return value;
}

function requireArray(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) {
    throw invalidWeatherResponse(`expected array at "${path}"`);
  }

  return value;
}

function requireFiniteNumber(value: unknown, path: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw invalidWeatherResponse(`expected finite number at "${path}"`);
  }

  return value;
}

function requireWeatherCode(value: unknown, path: string): number {
  const code = requireFiniteNumber(value, path);

  if (!Number.isInteger(code)) {
    throw invalidWeatherResponse(`expected integer weather code at "${path}"`);
  }

  return code;
}

function requireProbability(value: unknown, path: string): number {
  const probability = requireFiniteNumber(value, path);

  if (probability < 0 || probability > 100) {
    throw invalidWeatherResponse(`expected probability from 0 to 100 at "${path}"`);
  }

  return probability;
}

function requirePrecipitation(value: unknown, path: string): number {
  const amount = requireFiniteNumber(value, path);

  if (amount < 0) {
    throw invalidWeatherResponse(`expected non-negative amount at "${path}"`);
  }

  return amount;
}

function requireDate(value: unknown, path: string): string {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    Number.isNaN(Date.parse(`${value}T00:00:00Z`)) ||
    new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) !== value
  ) {
    throw invalidWeatherResponse(`expected ISO date at "${path}"`);
  }

  return value;
}

function requireHourlyTime(value: unknown, path: string): string {
  if (typeof value !== "string") {
    throw invalidWeatherResponse(`expected hourly timestamp at "${path}"`);
  }

  const match =
    /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(value);
  const date = match?.[1];
  const hour = match?.[2];
  const minute = match?.[3];
  const second = match?.[4] ?? "0";

  if (
    !date ||
    hour === undefined ||
    minute === undefined ||
    !isValidDate(date) ||
    Number(hour) > 23 ||
    Number(minute) > 59 ||
    Number(second) > 59
  ) {
    throw invalidWeatherResponse(`expected ISO local timestamp at "${path}"`);
  }

  return value;
}

function isValidDate(value: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) &&
    new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value
  );
}

function mapArray<T>(
  value: unknown,
  path: string,
  mapValue: (item: unknown, itemPath: string) => T,
): T[] {
  return requireArray(value, path).map((item, index) =>
    mapValue(item, `${path}[${index}]`),
  );
}

function requireSameLength(
  arrays: readonly (readonly unknown[])[],
  path: string,
): void {
  const [first, ...rest] = arrays;

  if (!first || first.length === 0 || rest.some((array) => array.length !== first.length)) {
    throw invalidWeatherResponse(`inconsistent or empty arrays at "${path}"`);
  }
}

export function validateForecastResponse(
  value: unknown,
): OpenMeteoForecastResponse {
  const root = requireRecord(value, "root");
  const current = requireRecord(root.current, "current");
  const daily = requireRecord(root.daily, "daily");
  const hourly = requireRecord(root.hourly, "hourly");

  const dailyTime = mapArray(daily.time, "daily.time", requireDate);
  const dailyWeatherCode = mapArray(
    daily.weather_code,
    "daily.weather_code",
    requireWeatherCode,
  );
  const dailyMinimumTemperature = mapArray(
    daily.temperature_2m_min,
    "daily.temperature_2m_min",
    requireFiniteNumber,
  );
  const dailyMaximumTemperature = mapArray(
    daily.temperature_2m_max,
    "daily.temperature_2m_max",
    requireFiniteNumber,
  );
  const dailyPrecipitationProbability = mapArray(
    daily.precipitation_probability_max,
    "daily.precipitation_probability_max",
    requireProbability,
  );
  const dailyPrecipitation = mapArray(
    daily.precipitation_sum,
    "daily.precipitation_sum",
    requirePrecipitation,
  );

  requireSameLength(
    [
      dailyTime,
      dailyWeatherCode,
      dailyMinimumTemperature,
      dailyMaximumTemperature,
      dailyPrecipitationProbability,
      dailyPrecipitation,
    ],
    "daily",
  );

  const hourlyTime = mapArray(hourly.time, "hourly.time", requireHourlyTime);
  const hourlyPrecipitationProbability = mapArray(
    hourly.precipitation_probability,
    "hourly.precipitation_probability",
    requireProbability,
  );
  const hourlyPrecipitation = mapArray(
    hourly.precipitation,
    "hourly.precipitation",
    requirePrecipitation,
  );
  const hourlyWeatherCode = mapArray(
    hourly.weather_code,
    "hourly.weather_code",
    requireWeatherCode,
  );

  requireSameLength(
    [
      hourlyTime,
      hourlyPrecipitationProbability,
      hourlyPrecipitation,
      hourlyWeatherCode,
    ],
    "hourly",
  );

  return {
    current: {
      temperature_2m: requireFiniteNumber(
        current.temperature_2m,
        "current.temperature_2m",
      ),
      weather_code: requireWeatherCode(
        current.weather_code,
        "current.weather_code",
      ),
    },
    daily: {
      time: dailyTime,
      weather_code: dailyWeatherCode,
      temperature_2m_min: dailyMinimumTemperature,
      temperature_2m_max: dailyMaximumTemperature,
      precipitation_probability_max: dailyPrecipitationProbability,
      precipitation_sum: dailyPrecipitation,
    },
    hourly: {
      time: hourlyTime,
      precipitation_probability: hourlyPrecipitationProbability,
      precipitation: hourlyPrecipitation,
      weather_code: hourlyWeatherCode,
    },
  };
}
