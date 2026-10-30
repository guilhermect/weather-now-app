# Produto — Weather Now App

## Status

Este documento define o produto planejado. Nas Fases 1 e 2 foram implementadas a estrutura técnica e a camada de integração/normalização da previsão; a interface ainda é neutra e não carrega nem exibe dados.

## Problema

Consultar várias informações meteorológicas pode dificultar a resposta rápida a perguntas práticas sobre o dia e os próximos dias. O aplicativo pretende resumir previsão e chuva em uma tela clara, sem excesso de informação.

## Público-alvo

Pessoas que vivem, trabalham ou planejam atividades em Guarulhos, São Paulo, e precisam consultar rapidamente as condições previstas.

## Perguntas que a tela deve responder

- Vai fazer frio ou calor?
- É provável que chova?
- Em qual horário a chuva é mais provável?

## Requisitos funcionais planejados

1. Usar Guarulhos, São Paulo, como localização fixa.
2. Consultar a previsão da Open-Meteo para hoje e até os próximos 14 dias.
3. Exibir uma seleção de 5, 7, 10 ou 15 dias, contando hoje no total.
4. Destacar hoje com temperatura atual e condição meteorológica resumida.
5. Exibir, para cada dia, temperatura mínima e máxima e condição resumida.
6. Exibir a probabilidade máxima diária de precipitação e o horário ou intervalo com maior probabilidade.
7. Exibir o volume estimado de precipitação como informação secundária, sem confundi-lo com a probabilidade.
8. Apresentar estados de carregamento, sucesso e erro; considerar estado vazio quando aplicável.
9. Exibir toda a interface em português do Brasil.

## Requisitos não funcionais planejados

- Aplicação single-page e mobile-first, utilizável a partir de 320px.
- Layout responsivo, com largura máxima centralizada em telas grandes.
- Tema predominantemente escuro e interface simples.
- Acessibilidade básica, incluindo estrutura semântica, contraste adequado e controles operáveis.
- Não inventar ou substituir por dados simulados informações meteorológicas em produção.
- Sem backend, banco de dados, autenticação ou estado global no MVP.

## Regras de exibição planejadas

- Hoje é o destaque principal; os demais dias aparecem em uma lista compacta.
- O número escolhido no filtro é o total de dias exibidos e inclui hoje.
- Temperatura mínima e máxima devem ser apresentadas separadamente da temperatura atual.
- Probabilidade de precipitação representa chance, não garantia de chuva.
- Volume de precipitação representa quantidade estimada e não deve ser apresentado como probabilidade.
- O período de maior probabilidade deve ser calculado a partir dos dados horários disponíveis. Empates e intervalos serão tratados pelas regras de domínio definidas na Fase 3.
- Os limites para classificar chance baixa ou relevante são decisões de produto, não classificações meteorológicas oficiais. Os valores concretos serão definidos e documentados antes de implementar essa classificação.

## Limites do MVP

Não fazem parte do MVP: geolocalização, busca ou seleção de cidades, favoritos, notificações, qualidade do ar, PWA, gráficos, mapas, carrosséis, dashboards, backend, banco de dados e autenticação.

## Critérios de aceite do produto

- A localização exibida é Guarulhos, São Paulo.
- É possível selecionar 5, 7, 10 ou 15 dias, sempre contando hoje.
- O dia atual tem destaque visual e inclui temperatura atual e condição resumida.
- Cada dia exibido apresenta mínima, máxima e condição resumida.
- A informação de chuva inclui probabilidade máxima diária e período horário mais provável; volume aparece como dado secundário quando disponível.
- A interface deixa clara a diferença entre probabilidade e volume e não promete que choverá.
- A experiência permanece simples e legível a partir de 320px e em desktop.
- Falhas de carregamento não são apresentadas como previsão válida.

## Planejado versus implementado

Os requisitos, regras e critérios de interface deste documento continuam planejados. A Fase 1 criou uma tela neutra e a Fase 2 implementou o serviço para consultar e normalizar a previsão; a interface ainda não chama esse serviço e não exibe dados meteorológicos.
