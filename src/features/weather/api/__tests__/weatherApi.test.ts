import { afterEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_LOCATION } from "../../model/location";
import { buildForecastUrl } from "../forecastUrl";
import { normalizeForecast } from "../normalizeForecast";
import { WEATHER_REQUEST_TIMEOUT_MS } from "../openMeteoClient";
import { validateForecastResponse } from "../validateForecastResponse";
import { fetchWeatherForecast } from "../weatherService";
import { WeatherApiError } from "../weatherApiError";
import { openMeteoForecastFixture } from "./fixtures/openMeteoForecast";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

function stubFetch(response: Response): ReturnType<typeof vi.fn<typeof fetch>> {
  const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("buildForecastUrl", () => {
  it("requests only the required fields, units, location, and 15 days", () => {
    const url = buildForecastUrl();

    expect(url.origin + url.pathname).toBe(
      "https://api.open-meteo.com/v1/forecast",
    );
    expect(url.searchParams.get("latitude")).toBe(
      String(DEFAULT_LOCATION.latitude),
    );
    expect(url.searchParams.get("longitude")).toBe(
      String(DEFAULT_LOCATION.longitude),
    );
    expect(url.searchParams.get("current")).toBe(
      "temperature_2m,weather_code",
    );
    expect(url.searchParams.get("daily")).toBe(
      "weather_code,temperature_2m_min,temperature_2m_max,precipitation_probability_max,precipitation_sum",
    );
    expect(url.searchParams.get("hourly")).toBe(
      "precipitation_probability,precipitation,weather_code",
    );
    expect(url.searchParams.get("forecast_days")).toBe("15");
    expect(url.searchParams.get("timezone")).toBe("America/Sao_Paulo");
    expect(url.searchParams.get("temperature_unit")).toBe("celsius");
    expect(url.searchParams.get("precipitation_unit")).toBe("mm");
    expect([...url.searchParams.keys()]).toHaveLength(9);
  });
});

describe("normalizeForecast", () => {
  it("normalizes daily and current values and groups hours by local date", () => {
    const result = normalizeForecast(
      openMeteoForecastFixture,
      DEFAULT_LOCATION,
    );

    expect(result.location).toEqual(DEFAULT_LOCATION);
    expect(result.current).toEqual({ temperature: 22.4, weatherCode: 2 });
    expect(result.dailyForecasts).toHaveLength(2);
    expect(result.dailyForecasts[0]).toMatchObject({
      date: "2026-10-30",
      weatherCode: 2,
      minimumTemperature: 17.2,
      maximumTemperature: 27.5,
      precipitationProbability: 20,
      precipitationAmount: 0.2,
    });
    expect(result.dailyForecasts[0]?.hourlyForecast.map((hour) => hour.time)).toEqual([
      "2026-10-30T00:00",
      "2026-10-30T13:00",
    ]);
    expect(
      result.dailyForecasts[1]?.hourlyForecast.map((hour) => hour.time),
    ).toEqual(["2026-10-31T00:00", "2026-10-31T23:00"]);
    expect(result.dailyForecasts[1]?.hourlyForecast[0]).toEqual({
      time: "2026-10-31T00:00",
      precipitationProbability: 70,
      precipitationAmount: 1.3,
      weatherCode: 61,
    });
  });
});

describe("validateForecastResponse", () => {
  it("rejects a response with an inconsistent daily array", () => {
    const malformed: unknown = {
      ...openMeteoForecastFixture,
      daily: {
        ...openMeteoForecastFixture.daily,
        time: openMeteoForecastFixture.daily.time.slice(0, 1),
      },
    };

    expect(() => validateForecastResponse(malformed)).toThrow(
      /inconsistent or empty arrays at "daily"/,
    );
  });

  it("rejects missing required fields", () => {
    const malformed: unknown = {
      ...openMeteoForecastFixture,
      daily: {
        time: openMeteoForecastFixture.daily.time,
        weather_code: openMeteoForecastFixture.daily.weather_code,
        temperature_2m_min: openMeteoForecastFixture.daily.temperature_2m_min,
        temperature_2m_max: openMeteoForecastFixture.daily.temperature_2m_max,
        precipitation_probability_max:
          openMeteoForecastFixture.daily.precipitation_probability_max,
      },
    };

    expect(() => validateForecastResponse(malformed)).toThrow(
      /expected array at "daily.precipitation_sum"/,
    );
  });

  it("rejects non-finite essential numeric values", () => {
    const malformed: unknown = {
      ...openMeteoForecastFixture,
      current: { temperature_2m: Number.NaN, weather_code: 2 },
    };

    expect(() => validateForecastResponse(malformed)).toThrow(
      /expected finite number at "current.temperature_2m"/,
    );
  });
});

describe("fetchWeatherForecast", () => {
  it("returns a typed integration error for an unsuccessful HTTP response", async () => {
    stubFetch(
      new Response(null, { status: 503, statusText: "Service Unavailable" }),
    );

    await expect(fetchWeatherForecast()).rejects.toMatchObject({
      kind: "http",
      statusCode: 503,
      technicalMessage: expect.stringContaining("HTTP 503"),
      userMessage: expect.stringContaining("indisponível"),
    } satisfies Partial<WeatherApiError>);
  });

  it("rejects malformed JSON as an invalid response", async () => {
    stubFetch(new Response("{", { status: 200 }));

    await expect(fetchWeatherForecast()).rejects.toMatchObject({
      kind: "invalid_response",
      technicalMessage: expect.stringContaining("invalid JSON"),
    });
  });

  it("rejects malformed response fields before normalization", async () => {
    const malformed: unknown = { ...openMeteoForecastFixture, daily: null };
    stubFetch(new Response(JSON.stringify(malformed), { status: 200 }));

    await expect(fetchWeatherForecast()).rejects.toMatchObject({
      kind: "invalid_response",
      technicalMessage: expect.stringContaining('"daily"'),
    });
  });

  it("wraps network failures with technical and user-facing messages", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockRejectedValue(
      new TypeError("connection refused"),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchWeatherForecast()).rejects.toMatchObject({
      kind: "network",
      technicalMessage: expect.stringContaining("connection refused"),
      userMessage: expect.stringContaining("Verifique sua conexão"),
    });
  });

  it("propagates a caller AbortSignal as a cancellation error", async () => {
    const fetchMock = vi.fn<typeof fetch>(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener(
            "abort",
            () => reject(new DOMException("Aborted", "AbortError")),
            { once: true },
          );
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const controller = new AbortController();
    const request = fetchWeatherForecast({ signal: controller.signal });

    controller.abort();

    await expect(request).rejects.toMatchObject({
      kind: "aborted",
      technicalMessage: expect.stringContaining("aborted by the caller"),
    });
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("aborts requests after the configured timeout", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn<typeof fetch>(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener(
            "abort",
            () => reject(new DOMException("Aborted", "AbortError")),
            { once: true },
          );
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const request = fetchWeatherForecast();
    const requestRejection = expect(request).rejects.toMatchObject({
      kind: "timeout",
      technicalMessage: expect.stringContaining("timed out"),
      userMessage: expect.stringContaining("demorou"),
    });

    await vi.advanceTimersByTimeAsync(WEATHER_REQUEST_TIMEOUT_MS);

    await requestRejection;
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
