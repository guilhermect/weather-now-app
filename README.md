# Weather Now App

## Objetivo

O Weather Now App será uma aplicação web simples para consultar a previsão do tempo de Guarulhos, São Paulo, com destaque para temperaturas e possibilidade de chuva.

## Status atual

**Fase 1 concluída — estrutura técnica.** O repositório contém a base React/TypeScript/Vite, uma tela inicial neutra e validações automatizadas. A previsão e a integração com a Open-Meteo ainda não foram implementadas.

## Requisitos

- Node.js 20.19+, 22.13+ ou 24+.
- npm 10 ou superior.

## Instalação e execução

Na raiz do repositório:

```bash
npm install
npm run dev
```

## Comandos

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Verifica os projetos TypeScript e gera o build de produção. |
| `npm run preview` | Serve localmente o build de produção. |
| `npm run lint` | Executa o ESLint. |
| `npm test` | Executa o Vitest em modo watch. |
| `npm run test:run` | Executa os testes uma vez. |

## Stack configurada

- React e TypeScript em modo strict.
- Vite para desenvolvimento e build.
- CSS nativo organizado por arquivos e CSS variables.
- Vitest, ambiente jsdom e React Testing Library.
- ESLint com configuração flat.
- Fetch API nativa e `Intl.DateTimeFormat` estão previstos para fases futuras, mas ainda não são usados.

## Funcionalidades planejadas

- Resumo do clima atual e temperaturas mínimas e máximas diárias.
- Probabilidade máxima de chuva e horário ou intervalo mais provável.
- Seleção de 5, 7, 10 ou 15 dias, contando hoje.
- Dados da Open-Meteo para Guarulhos.

## Funcionalidades fora do MVP

Geolocalização, busca de cidades, favoritos, notificações, qualidade do ar, backend, banco de dados, autenticação, PWA, gráficos, mapas e bibliotecas de estado ou componentes visuais.

## Documentação

- [docs/PRODUCT.md](docs/PRODUCT.md) — escopo, requisitos e critérios de aceite.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — arquitetura e estrutura atual e planejada.
- [docs/API.md](docs/API.md) — integração planejada com a Open-Meteo.
- [docs/DECISIONS.md](docs/DECISIONS.md) — registro cronológico de decisões.
- [docs/ROADMAP.md](docs/ROADMAP.md) — fases e status do projeto.
- [CHANGELOG.md](CHANGELOG.md) — alterações relevantes.
- [.github/copilot-instructions.md](.github/copilot-instructions.md) — instruções persistentes para o Copilot.

## Tela inicial

A aplicação exibe somente uma estrutura neutra com o título “Clima Guarulhos” e informa que a previsão será carregada em fases futuras. Nenhuma previsão, dado meteorológico simulado ou chamada de API foi implementada.
