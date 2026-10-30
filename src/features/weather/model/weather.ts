export interface Location {
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly timezone: string;
}

export interface CurrentWeather {
  readonly temperature: number;
  readonly weatherCode: number;
}

export interface HourlyForecast {
  readonly time: string;
  readonly precipitationProbability: number;
  readonly precipitationAmount: number;
  readonly weatherCode: number;
}

export interface DailyForecast {
  readonly date: string;
  readonly weatherCode: number;
  readonly minimumTemperature: number;
  readonly maximumTemperature: number;
  readonly precipitationProbability: number;
  readonly precipitationAmount: number;
  readonly hourlyForecast: readonly HourlyForecast[];
}

export interface WeatherForecast {
  readonly location: Location;
  readonly current: CurrentWeather;
  readonly dailyForecasts: readonly DailyForecast[];
}
