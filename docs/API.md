# API — Weather Now App

## Status

A camada de integração e normalização da Fase 2 está implementada. A interface ainda não chama o serviço nem apresenta previsão; a atribuição visível à Open-Meteo continua pendente da fase de interface.

## Fonte e localização

- Endpoint: `https://api.open-meteo.com/v1/forecast`.
- Localização fixa: Guarulhos, SP (`latitude: -23.4628`, `longitude: -46.5333`).
- Fuso horário: `America/Sao_Paulo`.
- A URL é construída com `URLSearchParams`.
- Não há chave de API, backend ou variável de ambiente.

## Parâmetros enviados

| Parâmetro | Valor |
| --- | --- |
| `latitude` | `-23.4628` |
| `longitude` | `-46.5333` |
| `current` | `temperature_2m,weather_code` |
| `daily` | `weather_code,temperature_2m_min,temperature_2m_max,precipitation_probability_max,precipitation_sum` |
| `hourly` | `precipitation_probability,precipitation,weather_code` |
| `forecast_days` | `15` |
| `timezone` | `America/Sao_Paulo` |
| `temperature_unit` | `celsius` |
| `precipitation_unit` | `mm` |

O cliente usa somente Fetch API e solicita os campos necessários ao resumo diário e horário.

## Modelos de entrada e saída

A resposta bruta da Open-Meteo mantém os nomes e arrays paralelos da API em `OpenMeteoForecastResponse`. O validador verifica `current`, `daily` e `hourly`, todos os arrays necessários, comprimentos diários e horários consistentes e não vazios, datas/horários válidos e valores numéricos finitos. Códigos meteorológicos devem ser inteiros, probabilidades devem estar entre 0 e 100 e volumes não podem ser negativos.

Após a validação, `normalizeForecast` associa cada hora à data local indicada pelo prefixo `YYYY-MM-DD` do timestamp horário e converte os dados para os modelos de domínio. O formato de saída é:

```ts
interface WeatherForecast {
  location: {
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  current: {
    temperature: number;
    weatherCode: number;
  };
  dailyForecasts: DailyForecast[];
}

interface DailyForecast {
  date: string;
  weatherCode: number;
  minimumTemperature: number;
  maximumTemperature: number;
  precipitationProbability: number;
  precipitationAmount: number;
  hourlyForecast: HourlyForecast[];
}

interface HourlyForecast {
  time: string;
  precipitationProbability: number;
  precipitationAmount: number;
  weatherCode: number;
}
```

Temperaturas estão em °C; volumes, em mm; probabilidades, em porcentagem. Os tipos efetivos são `Location`, `CurrentWeather`, `DailyForecast`, `HourlyForecast` e `WeatherForecast` em `src/features/weather/model/`.

A Fase 2 apenas preserva dados horários associados a cada dia. A seleção de horário ou intervalo de chuva pertence às regras de domínio da Fase 3 e ainda não está implementada.

## Timeout, cancelamento e erros

Cada solicitação tem timeout de 10 segundos implementado com `AbortController`. `fetchWeatherForecast({ signal })` aceita um `AbortSignal` do chamador, o propaga à solicitação e remove o listener e o timeout ao final. Cancelamentos do chamador e timeout são distinguidos.

`WeatherApiError` expõe:

- `kind`: `network`, `http`, `invalid_response`, `timeout` ou `aborted`;
- `technicalMessage`: detalhe para logging e diagnóstico;
- `userMessage`: texto amigável destinado a uma futura interface;
- `statusCode`: status HTTP quando disponível.

Falhas de rede são encapsuladas como `network`; status HTTP não bem-sucedidos como `http`; JSON inválido, campos ausentes, arrays inconsistentes ou valores inválidos como `invalid_response`. Timeout usa `timeout` e cancelamento externo usa `aborted`. A futura interface deve apresentar somente `userMessage`, nunca stack trace ou detalhes técnicos.

## Atribuição

A futura interface deverá atribuir os dados meteorológicos à Open-Meteo e incluir um link apropriado para a fonte, conforme os requisitos de atribuição aplicáveis no momento da integração visual.

## Limites desta fase

O serviço está disponível para consumo por fases futuras, mas não é chamado pela tela inicial. Não há algoritmo de intervalo de chuva, interface final, fallback com dados simulados ou requisição real nos testes. Os testes usam fixtures locais e `fetch` simulado.
