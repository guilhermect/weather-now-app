export interface OpenMeteoForecastResponse {
  readonly current: {
    readonly temperature_2m: number;
    readonly weather_code: number;
  };
  readonly daily: {
    readonly time: readonly string[];
    readonly weather_code: readonly number[];
    readonly temperature_2m_min: readonly number[];
    readonly temperature_2m_max: readonly number[];
    readonly precipitation_probability_max: readonly number[];
    readonly precipitation_sum: readonly number[];
  };
  readonly hourly: {
    readonly time: readonly string[];
    readonly precipitation_probability: readonly number[];
    readonly precipitation: readonly number[];
    readonly weather_code: readonly number[];
  };
}
