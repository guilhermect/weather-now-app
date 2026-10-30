import type { Location } from "../model/weather";
import type { WeatherForecast } from "../model/weather";
import type { OpenMeteoForecastResponse } from "./openMeteoTypes";
import { invalidWeatherResponse } from "./weatherApiError";

function valueAt<T>(
  values: readonly T[],
  index: number,
  field: string,
): T {
  const value = values[index];

  if (value === undefined) {
    throw invalidWeatherResponse(`missing "${field}[${index}]" during normalization`);
  }

  return value;
}

export function normalizeForecast(
  response: OpenMeteoForecastResponse,
  location: Location,
): WeatherForecast {
  const hourlyByDate = new Map<
    string,
    WeatherForecast["dailyForecasts"][number]["hourlyForecast"][number][]
  >();

  response.hourly.time.forEach((time, index) => {
    const date = time.slice(0, 10);
    const hours = hourlyByDate.get(date) ?? [];

    hours.push({
      time,
      precipitationProbability:
        valueAt(
          response.hourly.precipitation_probability,
          index,
          "hourly.precipitation_probability",
        ),
      precipitationAmount: valueAt(
        response.hourly.precipitation,
        index,
        "hourly.precipitation",
      ),
      weatherCode: valueAt(response.hourly.weather_code, index, "hourly.weather_code"),
    });
    hourlyByDate.set(date, hours);
  });

  return {
    location,
    current: {
      temperature: response.current.temperature_2m,
      weatherCode: response.current.weather_code,
    },
    dailyForecasts: response.daily.time.map((date, index) => ({
      date,
      weatherCode: valueAt(response.daily.weather_code, index, "daily.weather_code"),
      minimumTemperature: valueAt(
        response.daily.temperature_2m_min,
        index,
        "daily.temperature_2m_min",
      ),
      maximumTemperature: valueAt(
        response.daily.temperature_2m_max,
        index,
        "daily.temperature_2m_max",
      ),
      precipitationProbability:
        valueAt(
          response.daily.precipitation_probability_max,
          index,
          "daily.precipitation_probability_max",
        ),
      precipitationAmount: valueAt(
        response.daily.precipitation_sum,
        index,
        "daily.precipitation_sum",
      ),
      hourlyForecast: hourlyByDate.get(date) ?? [],
    })),
  };
}
