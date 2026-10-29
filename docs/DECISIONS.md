# Registro de decisões

Registro cronológico de decisões técnicas e de produto. As decisões registradas abaixo orientam o planejamento; as escolhas ainda não implementadas não devem ser interpretadas como código existente.

## 2026-10-29 — Nome do produto

- **Contexto:** definir o nome usado na documentação do projeto.
- **Decisão:** adotar Weather Now App como nome do aplicativo.
- **Motivo:** refletir o nome escolhido para o produto.
- **Consequências:** usar Weather Now App na documentação; Guarulhos continua sendo a localização fixa do MVP.

## 2026-10-29 — React, TypeScript e Vite

- **Contexto:** definir a stack de interface para o MVP.
- **Decisão:** planejar React, TypeScript e Vite.
- **Motivo:** atender à aplicação web single-page com tipagem e fluxo de desenvolvimento simples.
- **Consequências:** configurar a estrutura técnica na Fase 1; nenhuma dessas ferramentas foi instalada ou configurada na Fase 0.

## 2026-10-29 — Sem backend no MVP

- **Contexto:** reduzir o escopo operacional inicial.
- **Decisão:** consumir a fonte meteorológica diretamente do frontend; não criar backend, banco de dados ou autenticação.
- **Motivo:** o MVP tem uma localização fixa e não requer persistência ou contas de usuário.
- **Consequências:** a integração e seu tratamento de erros ficam no cliente; qualquer necessidade futura deverá ser avaliada como mudança de escopo.

## 2026-10-29 — CSS nativo

- **Contexto:** escolher a abordagem de estilos.
- **Decisão:** usar CSS nativo organizado por arquivos e CSS variables.
- **Motivo:** manter a interface leve e evitar dependência visual desnecessária.
- **Consequências:** tokens visuais e responsividade serão implementados em estilos próprios.

## 2026-10-29 — Sem biblioteca de estado global

- **Contexto:** escolher como coordenar o estado da aplicação.
- **Decisão:** usar estado local e hooks.
- **Motivo:** o escopo single-page não justifica estado global no MVP.
- **Consequências:** componentes e hooks da funcionalidade de previsão serão responsáveis pelo estado necessário.

## 2026-10-29 — Open-Meteo como fonte meteorológica

- **Contexto:** selecionar a fonte planejada de previsão.
- **Decisão:** usar a Open-Meteo.
- **Motivo:** atender à fonte solicitada para dados diários e horários.
- **Consequências:** documentar contrato, erros e atribuição antes de concluir a integração na Fase 2.

## 2026-10-29 — Interface single-page

- **Contexto:** definir a navegação do MVP.
- **Decisão:** construir uma única página dedicada à previsão.
- **Motivo:** o produto tem uma tarefa principal e não requer navegação entre seções ou rotas.
- **Consequências:** manter o foco em resumo de hoje e lista dos dias seguintes.

## 2026-10-29 — Guarulhos como localização fixa

- **Contexto:** limitar a seleção de localidade do MVP.
- **Decisão:** usar Guarulhos, São Paulo, sem geolocalização ou busca de cidades.
- **Motivo:** manter o primeiro escopo previsível e simples.
- **Consequências:** a localização será configurada na integração; não haverá controles de localidade no MVP.

## 2026-10-29 — Análise de horário de chuva no cliente

- **Contexto:** decidir onde resumir as probabilidades horárias.
- **Decisão:** analisar os dados horários localmente em funções puras de domínio.
- **Motivo:** não há backend no MVP e a análise é uma transformação determinística dos dados recebidos.
- **Consequências:** regras para máximos, empates e intervalos devem ser testáveis e documentadas na Fase 3.

## 2026-10-29 — Documentação como parte da definição de pronto

- **Contexto:** manter o planejamento e o comportamento implementado consistentes.
- **Decisão:** tratar documentação atualizada como requisito de conclusão de cada tarefa.
- **Motivo:** diferenciar com clareza funcionalidades planejadas de funcionalidades existentes.
- **Consequências:** atualizar os documentos afetados na mesma alteração e manter o roadmap sincronizado.
