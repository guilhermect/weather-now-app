# Roadmap

As fases representam trabalho planejado. Somente a Fase 0 foi concluída; as demais ainda não foram iniciadas.

## Fase 0 — instruções e documentação

**Status: Concluída.**

Criar instruções persistentes do Copilot, definição inicial do produto, arquitetura planejada, documentação da integração, registro de decisões, roadmap e changelog. Não implementar a aplicação.

## Fase 1 — estrutura técnica

**Status: Planejada.**

Configurar React, TypeScript, Vite, CSS base, Vitest, React Testing Library e ESLint; estabelecer a estrutura inicial e validar scripts de lint, teste e build.

## Fase 2 — integração com API

**Status: Planejada.**

Implementar a camada Open-Meteo para Guarulhos, tipos externos, timeout, tratamento de erro, validação e normalização para domínio; documentar o contrato e a atribuição.

## Fase 3 — regras de análise de chuva

**Status: Planejada.**

Definir e testar funções puras para probabilidade máxima, horário ou intervalo mais provável, empates e apresentação secundária de volume. Registrar os limites de classificação como decisões de produto, não como classificação meteorológica oficial.

## Fase 4 — interface e integração

**Status: Planejada.**

Implementar a interface mobile-first em português, destaque para hoje, lista compacta, seleção de 5/7/10/15 dias contando hoje e estados de carregamento, sucesso e erro.

## Fase 5 — testes e endurecimento

**Status: Planejada.**

Ampliar testes relevantes, revisar acessibilidade e comportamento responsivo a partir de 320px, e corrigir problemas identificados sem ampliar o escopo do MVP.

## Fase 6 — integração contínua e aceite final

**Status: Planejada.**

Configurar validações automatizadas de lint, testes e build na integração contínua; executar os critérios de aceite e atualizar a documentação final.

## Fase 7 — publicação (opcional)

**Status: Planejada — opcional.**

Avaliar e executar a publicação somente após o aceite final e a definição do destino de hospedagem.
