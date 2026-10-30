import type { Location } from "../model/weather";
import { buildForecastUrl } from "./forecastUrl";
import { WeatherApiError } from "./weatherApiError";

export const WEATHER_REQUEST_TIMEOUT_MS = 10_000;

export interface OpenMeteoRequestOptions {
  readonly signal?: AbortSignal;
}

function createAbortError(timedOut: boolean): WeatherApiError {
  if (timedOut) {
    return new WeatherApiError(
      "timeout",
      `Open-Meteo request timed out after ${WEATHER_REQUEST_TIMEOUT_MS} ms.`,
      "A previsão demorou para carregar. Tente novamente.",
    );
  }

  return new WeatherApiError(
    "aborted",
    "Open-Meteo request was aborted by the caller.",
    "A solicitação da previsão foi cancelada.",
  );
}

function errorDetail(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function requestOpenMeteoForecast(
  location: Location,
  options: OpenMeteoRequestOptions = {},
): Promise<unknown> {
  const controller = new AbortController();
  let timedOut = false;
  const abortFromCaller = () => controller.abort(options.signal?.reason);
  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, WEATHER_REQUEST_TIMEOUT_MS);

  if (options.signal?.aborted) {
    abortFromCaller();
  } else {
    options.signal?.addEventListener("abort", abortFromCaller, { once: true });
  }

  try {
    if (controller.signal.aborted) {
      throw createAbortError(timedOut);
    }

    let response: Response;

    try {
      response = await fetch(buildForecastUrl(location), {
        signal: controller.signal,
      });
    } catch (error) {
      if (controller.signal.aborted) {
        throw createAbortError(timedOut);
      }

      throw new WeatherApiError(
        "network",
        `Open-Meteo network request failed: ${errorDetail(error)}`,
        "Não foi possível conectar ao serviço de previsão. Verifique sua conexão e tente novamente.",
        { cause: error },
      );
    }

    if (controller.signal.aborted) {
      throw createAbortError(timedOut);
    }

    if (!response.ok) {
      throw new WeatherApiError(
        "http",
        `Open-Meteo returned HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ""}.`,
        "O serviço de previsão está indisponível no momento. Tente novamente mais tarde.",
        { statusCode: response.status },
      );
    }

    try {
      const payload: unknown = await response.json();

      if (controller.signal.aborted) {
        throw createAbortError(timedOut);
      }

      return payload;
    } catch (error) {
      if (error instanceof WeatherApiError) {
        throw error;
      }

      if (controller.signal.aborted) {
        throw createAbortError(timedOut);
      }

      throw new WeatherApiError(
        "invalid_response",
        `Open-Meteo returned invalid JSON: ${errorDetail(error)}`,
        "Não foi possível interpretar a previsão do tempo. Tente novamente.",
        { cause: error },
      );
    }
  } finally {
    clearTimeout(timeoutId);
    options.signal?.removeEventListener("abort", abortFromCaller);
  }
}
