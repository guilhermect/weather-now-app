# Registro de decisões

Registro cronológico de decisões técnicas e de produto. As decisões registradas abaixo orientam o planejamento; as escolhas ainda não implementadas não devem ser interpretadas como código existente.

## 2026-10-29 — Nome do produto

- **Contexto:** definir o nome usado na documentação do projeto.
- **Decisão:** adotar Weather Now App como nome do aplicativo.
- **Motivo:** refletir o nome escolhido para o produto.
- **Consequências:** usar Weather Now App na documentação; Guarulhos continua sendo a localização fixa do MVP.

## 2026-10-29 — Estrutura técnica da Fase 1

- **Contexto:** iniciar a aplicação sem antecipar integração e regras do MVP.
- **Decisão:** configurar React, TypeScript strict e Vite na raiz; ESLint flat config; Vitest com jsdom e React Testing Library; CSS nativo; npm como gerenciador por não existir um configurado.
- **Motivo:** atender à stack solicitada com ferramentas leves e verificações locais.
- **Consequências:** usar Node.js `^20.19`, `^22.13` ou `>=24` e npm 10+; não adicionar bibliotecas de roteamento, estado, datas, ícones ou componentes.

## 2026-10-29 — Estrutura incremental por funcionalidade

- **Contexto:** preparar a organização do código sem implementar funcionalidades futuras.
- **Decisão:** criar `app/`, `features/weather/components/`, `styles/` e `test/`; adiar `api/`, `domain/`, `hooks/` e `model/` até serem necessários.
- **Motivo:** manter a estrutura por funcionalidade sem diretórios vazios ou scaffolding prematuro.
- **Consequências:** adicionar as camadas da funcionalidade weather junto com sua implementação nas fases futuras.

## 2026-10-29 — Título da tela inicial

- **Contexto:** definir o texto da estrutura neutra solicitada para a Fase 1, mantendo o nome do produto registrado.
- **Decisão:** usar “Clima Guarulhos” como título da tela e manter Weather Now App como nome do produto e do documento HTML.
- **Motivo:** atender ao texto solicitado para a tela sem alterar a decisão anterior sobre o nome do app.
- **Consequências:** o título inicial identifica a localização fixa; não representa a previsão nem altera o nome do produto.

## 2026-10-29 — React, TypeScript e Vite

- **Contexto:** definir a stack de interface para o MVP.
- **Decisão:** usar React, TypeScript e Vite.
- **Motivo:** atender à aplicação web single-page com tipagem e fluxo de desenvolvimento simples.
- **Consequências:** ferramentas configuradas na Fase 1; a aplicação ainda não consulta nem exibe previsão.

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

## 2026-10-30 — Integração e normalização da Open-Meteo

- **Contexto:** implementar a camada de dados meteorológicos da Fase 2 sem iniciar a interface de previsão ou as regras definitivas de chuva.
- **Decisão:** consultar `https://api.open-meteo.com/v1/forecast` com Fetch API e `URLSearchParams`; usar Guarulhos (`-23.4628`, `-46.5333`), fuso `America/Sao_Paulo`, 15 dias, Celsius e milímetros. Separar tipos externos, domínio, construção da URL, cliente, validação, normalização e erros; aplicar timeout de 10 segundos e aceitar `AbortSignal`.
- **Motivo:** manter a integração externa isolada, detectar respostas inválidas e entregar objetos de domínio sem arrays paralelos.
- **Consequências:** não há backend, chave ou variável de ambiente; a tela ainda não chama o serviço. Testes usam fixtures locais e mocks de `fetch`; algoritmo de intervalos, conexão com a interface e atribuição visível permanecem em fases futuras.

## 2026-10-29 — Open-Meteo como fonte meteorológica

- **Contexto:** selecionar a fonte planejada de previsão.
- **Decisão:** usar a Open-Meteo.
- **Motivo:** atender à fonte solicitada para dados diários e horários.
- **Consequências:** contrato e erros documentados na Fase 2; atribuição visível permanece necessária na implementação da interface.

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
