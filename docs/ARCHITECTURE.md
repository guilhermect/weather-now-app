# Arquitetura — Weather Now App

## Status

A estrutura técnica das Fases 1 e 2 está implementada. As regras de domínio para análise de chuva e a interface final seguem planejadas para fases futuras.

## Estrutura implementada

```text
index.html
src/
  app/
    App.tsx
  features/
    weather/
      components/
        WeatherPage.tsx
      api/
        forecastUrl.ts
        normalizeForecast.ts
        openMeteoClient.ts
        openMeteoTypes.ts
        validateForecastResponse.ts
        weatherApiError.ts
        weatherService.ts
        __tests__/
          fixtures/
            openMeteoForecast.ts
          weatherApi.test.ts
      model/
        location.ts
        weather.ts
  styles/
    global.css
    tokens.css
  test/
    setup.ts
    WeatherPage.test.tsx
  main.tsx
eslint.config.js
vite.config.ts
```

TypeScript está configurado em modo strict. Vite fornece o servidor de desenvolvimento e o build; ESLint, Vitest e React Testing Library estão configurados para as verificações locais.

As camadas `api/` e `model/` foram criadas na Fase 2. `domain/` e `hooks/` serão adicionadas quando suas responsabilidades forem implementadas, evitando diretórios vazios e scaffolding sem comportamento.

## Arquitetura implementada e planejada

Aplicação single-page React com TypeScript, sem backend no MVP. A camada de API consome dados da Open-Meteo, valida a resposta e normaliza os dados em modelos de domínio. A interface ainda não consome o serviço; funções de domínio para analisar a chuva serão implementadas na Fase 3.

## Responsabilidades das camadas

- **API (implementada):** montar a solicitação à Open-Meteo, aplicar timeout/cancelamento, verificar erros HTTP, validar a resposta e tipar os dados externos.
- **Normalização (implementada):** converter arrays paralelos da API para tipos de domínio e agrupar horas pela data local.
- **Domínio (planejado):** aplicar funções puras para analisar probabilidades horárias de chuva na Fase 3.
- **Hooks/estado local:** coordenar carregamento, sucesso e erro sem introduzir estado global.
- **Componentes e estilos:** renderizar os modelos de domínio e oferecer a experiência responsiva; componentes visuais não conhecem o formato bruto da API.

## Fluxo futuro de dados

Open-Meteo -> montagem da URL e cliente HTTP -> validação -> normalização -> `WeatherForecast` de domínio.

A integração está implementada, mas ainda não é chamada pela tela. A conexão do serviço a hooks e componentes pertence à fase da interface.

## Estrutura futura

```text
src/
  features/
    weather/
      domain/
      hooks/
```

`api/`, `components/` e `model/` já existem. `domain/` e `hooks/` representam a organização prevista para fases futuras.

## Decisões para evitar complexidade desnecessária

- Usar CSS nativo e CSS variables, sem biblioteca visual.
- Usar estado local e hooks, sem biblioteca global.
- Usar Fetch API e `Intl.DateTimeFormat`, sem bibliotecas de rede ou datas sem necessidade comprovada.
- Não adicionar backend apenas para intermediar a Open-Meteo.
- Separar tipos externos e de domínio, sem expor o contrato bruto aos componentes.

## Planejado versus implementado

A aplicação React, o entry point, os estilos globais, a camada Open-Meteo, os modelos de domínio, validação, normalização e testes locais foram implementados nas Fases 1 e 2. A tela não chama a API, e não há análise de intervalos de chuva nem interface de previsão.
