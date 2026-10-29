# API — Weather Now App

## Status

A integração ainda não está implementada. As definições abaixo são requisitos planejados para a futura camada de API.

## Fonte e localização

- Fonte planejada: API de previsão da Open-Meteo.
- Localização fixa planejada: Guarulhos, São Paulo.
- A integração deverá solicitar os dados necessários para hoje e até 14 dias adicionais, respeitando a disponibilidade oferecida pela API.
- Endpoint, parâmetros e coordenadas exatos deverão ser confirmados e registrados antes ou durante a Fase 2.

## Dados necessários

- Temperatura atual.
- Código meteorológico.
- Temperatura mínima e máxima por dia.
- Probabilidade máxima diária de precipitação.
- Volume diário estimado de precipitação.
- Probabilidade horária de precipitação.
- Volume horário estimado de precipitação.

## Timeout

Política planejada: limitar cada solicitação a 10 segundos e cancelar a solicitação que exceder esse prazo. O valor será validado na implementação da camada de API.

## Tratamento de erros

- Verificar erros HTTP e falhas de rede.
- Distinguir falha ou timeout de uma previsão válida sem precipitação.
- Não apresentar dados simulados nem valores padrão como se fossem meteorológicos.
- Propagar um erro tipado até a interface para que ela apresente um estado de erro e permita nova tentativa quando aplicável.
- Tratar campos ausentes ou resposta incompatível sem fabricar dados; a política de validação do contrato será definida na Fase 2.

## Atribuição

A interface deverá atribuir os dados meteorológicos à Open-Meteo e incluir um link apropriado para a fonte, conforme os requisitos de atribuição aplicáveis no momento da integração.

## Planejado versus implementado

Não existem chamadas, endpoints, parâmetros ou tipos de API implementados nesta fase. Os detalhes pendentes serão definidos antes de concluir a Fase 2.
