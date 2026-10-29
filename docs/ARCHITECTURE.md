# Arquitetura — Weather Now App

## Status

Arquitetura planejada; a aplicação ainda não possui código.

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

## Estrutura de diretórios planejada

```text
src/
  app/
  features/
    forecast/
      api/
      components/
      domain/
      hooks/
      styles/
      types/
  shared/
    styles/
```

Esta estrutura é uma referência para a Fase 1, não diretórios já existentes.

## Decisões para evitar complexidade desnecessária

- Usar CSS nativo e CSS variables, sem biblioteca visual.
- Usar estado local e hooks, sem biblioteca global.
- Usar Fetch API e `Intl.DateTimeFormat`, sem bibliotecas de rede ou datas sem necessidade comprovada.
- Não adicionar backend apenas para intermediar a Open-Meteo.
- Separar tipos externos e de domínio, sem expor o contrato bruto aos componentes.

## Planejado versus implementado

Todo o conteúdo deste documento descreve a arquitetura futura. Nenhuma estrutura de aplicação, camada, fluxo ou dependência foi implementada na Fase 0.
