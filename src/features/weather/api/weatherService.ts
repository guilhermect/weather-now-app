import { DEFAULT_LOCATION } from "../model/location";
import type { WeatherForecast } from "../model/weather";
import { normalizeForecast } from "./normalizeForecast";
import { requestOpenMeteoForecast } from "./openMeteoClient";
import { validateForecastResponse } from "./validateForecastResponse";
import type { OpenMeteoRequestOptions } from "./openMeteoClient";

export type FetchWeatherForecastOptions = OpenMeteoRequestOptions;

export async function fetchWeatherForecast(
  options: FetchWeatherForecastOptions = {},
): Promise<WeatherForecast> {
  const payload = await requestOpenMeteoForecast(DEFAULT_LOCATION, options);

  return normalizeForecast(validateForecastResponse(payload), DEFAULT_LOCATION);
}
