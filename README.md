# Weather Now App

## Objetivo

O Weather Now App será uma aplicação web simples para consultar a previsão do tempo de Guarulhos, São Paulo, com destaque para temperaturas e possibilidade de chuva.

## Status atual

**Fase 0 concluída — instruções e documentação inicial.** A aplicação ainda não está implementada; este repositório contém somente instruções e documentação de planejamento. Não há gerenciador de pacotes configurado.

## Escopo resumido do MVP

O MVP planejado é uma aplicação single-page, mobile-first, em português do Brasil, com localização fixa em Guarulhos e dados da Open-Meteo, sem backend. Deve destacar a condição e a temperatura atual, mostrar mínimas e máximas diárias e resumir a probabilidade e o horário mais provável de chuva. A previsão terá até 15 dias, incluindo hoje, com opções para exibir 5, 7, 10 ou 15 dias.

## Stack planejada

- React, TypeScript e Vite
- CSS nativo organizado por arquivos e CSS variables
- Vitest e React Testing Library
- ESLint
- Fetch API nativa e `Intl.DateTimeFormat`

Esta stack está planejada e ainda não foi configurada.

## Funcionalidades planejadas

- Card de destaque para hoje com temperatura atual e condição meteorológica.
- Lista compacta dos dias seguintes, com temperatura mínima e máxima.
- Probabilidade máxima diária de chuva, horário ou intervalo de maior probabilidade e volume estimado como informação secundária.
- Filtro de 5, 7, 10 ou 15 dias; o total selecionado inclui hoje.
- Estados de carregamento e de erro tratados na interface.

## Funcionalidades fora do MVP

Geolocalização, busca de cidades, favoritos, notificações, qualidade do ar, backend, banco de dados, autenticação, PWA, gráficos, mapas e bibliotecas de estado ou componentes visuais.

## Documentação

- [docs/PRODUCT.md](docs/PRODUCT.md) — escopo, requisitos e critérios de aceite.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — arquitetura e estrutura planejadas.
- [docs/API.md](docs/API.md) — integração planejada com a Open-Meteo.
- [docs/DECISIONS.md](docs/DECISIONS.md) — registro cronológico de decisões.
- [docs/ROADMAP.md](docs/ROADMAP.md) — fases e status do projeto.
- [CHANGELOG.md](CHANGELOG.md) — alterações relevantes.
- [.github/copilot-instructions.md](.github/copilot-instructions.md) — instruções persistentes para o Copilot.

Todas as funcionalidades descritas como planejadas ainda não estão implementadas. Esta fase não criou aplicação React, componentes, dependências ou integração com API.
