export type WeatherApiErrorKind =
  | "network"
  | "http"
  | "invalid_response"
  | "timeout"
  | "aborted";

export class WeatherApiError extends Error {
  readonly kind: WeatherApiErrorKind;
  readonly technicalMessage: string;
  readonly userMessage: string;
  readonly statusCode: number | undefined;

  constructor(
    kind: WeatherApiErrorKind,
    technicalMessage: string,
    userMessage: string,
    options: { cause?: unknown; statusCode?: number } = {},
  ) {
    super(technicalMessage, { cause: options.cause });
    this.name = "WeatherApiError";
    this.kind = kind;
    this.technicalMessage = technicalMessage;
    this.userMessage = userMessage;
    this.statusCode = options.statusCode;
  }
}

export function invalidWeatherResponse(message: string): WeatherApiError {
  return new WeatherApiError(
    "invalid_response",
    `Invalid Open-Meteo response: ${message}`,
    "Não foi possível interpretar a previsão do tempo. Tente novamente.",
  );
}
