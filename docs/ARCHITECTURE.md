# Arquitetura — Weather Now App

## Status

A estrutura técnica da Fase 1 está implementada. A integração e as regras de domínio seguem planejadas para fases futuras.

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

As pastas `api/`, `domain/`, `hooks/` e `model/` da funcionalidade weather ainda não foram criadas. Serão adicionadas nas fases que implementarem essas responsabilidades, evitando diretórios vazios e scaffolding sem comportamento.

## Arquitetura planejada

Aplicação single-page React com TypeScript, sem backend no MVP. A interface consome dados por uma camada de API isolada, normaliza a resposta em modelos de domínio e usa funções de domínio para analisar a chuva antes de apresentar dados aos componentes.

## Responsabilidades das camadas

- **API:** montar a solicitação à Open-Meteo, aplicar timeout, verificar erros HTTP e tipar a resposta externa.
- **Normalização:** converter o formato externo para os tipos de domínio usados pela aplicação.
- **Domínio:** aplicar funções puras para resumir condições e analisar probabilidades horárias de chuva.
- **Hooks/estado local:** coordenar carregamento, sucesso e erro sem introduzir estado global.
- **Componentes e estilos:** renderizar os modelos de domínio e oferecer a experiência responsiva; componentes visuais não conhecem o formato bruto da API.

## Fluxo futuro de dados

Open-Meteo -> camada de API -> normalização -> regras de domínio -> hook -> componentes.

## Estrutura de diretórios futura

```text
src/
  features/
    weather/
      api/
      components/
      domain/
      hooks/
      model/
```

Somente `components/` da funcionalidade weather existe nesta fase. Os demais diretórios representam a organização prevista quando a funcionalidade correspondente for implementada.

## Decisões para evitar complexidade desnecessária

- Usar CSS nativo e CSS variables, sem biblioteca visual.
- Usar estado local e hooks, sem biblioteca global.
- Usar Fetch API e `Intl.DateTimeFormat`, sem bibliotecas de rede ou datas sem necessidade comprovada.
- Não adicionar backend apenas para intermediar a Open-Meteo.
- Separar tipos externos e de domínio, sem expor o contrato bruto aos componentes.

## Planejado versus implementado

A aplicação React, o entry point, os estilos globais e os testes básicos foram implementados na Fase 1. O fluxo Open-Meteo -> API -> normalização -> domínio -> hook -> componentes continua planejado; não há chamadas de API, análise meteorológica ou interface de previsão implementadas.
