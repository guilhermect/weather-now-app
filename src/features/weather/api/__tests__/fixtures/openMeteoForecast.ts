import type { OpenMeteoForecastResponse } from "../../openMeteoTypes";

export const openMeteoForecastFixture: OpenMeteoForecastResponse = {
  current: {
    temperature_2m: 22.4,
    weather_code: 2,
  },
  daily: {
    time: ["2026-10-30", "2026-10-31"],
    weather_code: [2, 61],
    temperature_2m_min: [17.2, 18.1],
    temperature_2m_max: [27.5, 25.3],
    precipitation_probability_max: [20, 85],
    precipitation_sum: [0.2, 6.4],
  },
  hourly: {
    time: [
      "2026-10-30T00:00",
      "2026-10-30T13:00",
      "2026-10-31T00:00",
      "2026-10-31T23:00",
    ],
    precipitation_probability: [0, 20, 70, 85],
    precipitation: [0, 0.2, 1.3, 2.1],
    weather_code: [2, 3, 61, 63],
  },
};
