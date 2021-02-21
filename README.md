# Melhor Envio - Avaliação para Engenheiro DevOps
---

Em primeiro lugar, muito obrigado por participar do nosso processo seletivo, esperamos que tenha ocorrido tudo de acordo. 

### Nossos contatos

1. Para dúvidas sobre as funcionalidades ou escopo do teste: **luan.einhardt@melhorenvio.com** ou **jonas.moura@melhorenvio.com**
2. Para dúvidas sobre a empresa, prazos: **vanessa.santos@melhorenvio.com**

---

### Sobre prazos de execução

Lhe será dado um período de 7 dias para a execução do teste contanto a partir do dia do recebimento do mesmo. Qualquer discrepância ou dúvida quanto a isto pode ser tratada diretamente conosco.

---

### Sobre o teste

Será considerado e avaliado principalmente quesitos como organização de projeto, performance e segurança. Portanto foque em executar tudo que conseguir, da melhor forma possível, caso não consiga entregar algo, tudo bem, foque em terminar o que conseguir, da melhor forma.

Outro ponto é que o projeto recebido não contém uma arquitetura de infraestrutura desenhada, caso opte por realizar a etapa 3 concorrendo a vaga de sênior ou demonstre interesse em mostrar seus conhecimentos, esperamos que construa uma infraestrutura que atenda a requisitos básicos de segurança e possa ser escalável tanto de modo vertical como horizontal.

### Tecnologias

Este serviço utiliza uma arquitetura de microserviços empregando em seu back-end Typescript e Node.js, para execução das atividades do teste sugerimos utilizar algumas das ferramentas e tecnologias listadas abaixo: 

- Docker
- Docker Compose
- Shell Script (bash, python, entre outros)
- CI/CD (GitHub/GitLab/Bitbucket)
- IaC (Cloudformation ou Terraform)
- AWS
- Kubernetes
- Ansible, Puppet ou Chef

---

### Descritivo funcional

Este teste consiste de um serviço de cálculo de frete em uma arquitetura de microserviços.

Sobre o serviço:

- O serviço contém 4 microserviços.
- Cada microserviço possui uma responsabilidade bem definida.
- Os microserviços obtêm entradas via parâmetros (querystring) e retornam seus resultados em formato JSON em caso de sucesso.
- Os microserviços não são estáveis e podem parar de responder às requisições.

Serviços:
- `service-hub` realiza a intermediação do cálculo de frete agrupando todos os resultados e retornando o identificador da oferta de frete.
```bash
curl http://127.0.0.1:3000/v1/calculate?weight=1&markup=1.5
{
    "data": {
        "id": 1,
        "query": {
            "weight": "1",
            "markup": "1.5"
        },
        "quotations": [
            {
                "company": "Correios",
                "service": "PAC",
                "cost": 47.06,
                "price": 70.59,
                "delivery_time": 7
            },
            {
                "company": "Correios",
                "service": "SEDEX",
                "cost": 70.59,
                "price": 105.89,
                "delivery_time": 3
            },
            {
                "company": "Jadlog",
                "service": ".Package",
                "cost": 47.89,
                "price": 71.84,
                "delivery_time": 1
            },
            {
                "company": "Jadlog",
                "service": ".Com",
                "cost": 71.84,
                "price": 107.76,
                "delivery_time": 3
            },
            {
                "company": "Azul Cargo",
                "service": "Econômico",
                "cost": 7.24,
                "price": 10.86,
                "delivery_time": 7
            },
            {
                "company": "Azul Cargo",
                "service": "Expresso",
                "cost": 10.86,
                "price": 16.29,
                "delivery_time": 2
            }
        ]
    }
}
```
- `service-correios` realiza os cálculos de frete dos Correios.
```bash
curl http://127.0.0.1:3001/v1/calculate?weight=1&markup=1.5
[
    {
        "company": "Correios",
        "service": "PAC",
        "cost": 47.06,
        "price": 70.59,
        "delivery_time": 7
    },
    {
        "company": "Correios",
        "service": "SEDEX",
        "cost": 70.59,
        "price": 105.89,
        "delivery_time": 3
    }
]
```
- `service-jadlog` realiza os cálculos de frete da Jadlog.
```bash
curl http://127.0.0.1:3002/v1/calculate?weight=1&markup=1.5
[
    {
        "company": "Jadlog",
        "service": ".Package",
        "cost": 47.89,
        "price": 71.84,
        "delivery_time": 1
    },
    {
        "company": "Jadlog",
        "service": ".Com",
        "cost": 71.84,
        "price": 107.76,
        "delivery_time": 3
    }
]
```
- `service-azul-cargo` realiza os cálculos de frete da Azul Cargo.
```bash
curl http://127.0.0.1:3003/v1/calculate?weight=1&markup=1.5
[
    {
        "company": "Azul Cargo",
        "service": "Econômico",
        "cost": 7.24,
        "price": 10.86,
        "delivery_time": 7
    },
    {
        "company": "Azul Cargo",
        "service": "Expresso",
        "cost": 10.86,
        "price": 16.29,
        "delivery_time": 2
    }
]
```

Observações:
- Os serviços `service-correios`, `service-jadlog` e `service-azul-cargo` dependem do mesmo código fonte e podem ser gerados a partir do script `example-generate-services`.

Configurações:

- Microserviços foram codificados em Typescript e Node.js versão 10.23.2
- Você irá precisar do `yarn`:
    - Execute `yarn` para instalar todas as dependências.
    - Execute `yarn build` para gerar o código-fonte para ambiente de produção.
    - Execute `yarn dev` para executar o serviço em modo de desenvolvedor.
    - Execute `yarn start` para executar o serviço em modo de produção.
    - Execute `yarn lint` para garantir que o código fonte está bem escrito de acordo com os padrões do projeto.

---

### Etapas do teste

1. Containerizar a aplicação com Docker.
2. Construir um pipeline com o GitHub, GitLab ou Bitbucket.
3. Construir o código em AWS Cloudformation ou Terraform para provisionar a infraestrutura que executará a aplicação conteinerizada da etapa 1.

---

### Sobre o quê esperamos de você

**Se você se considera júnior**, opte por realizar a etapa 1, tente fazer o máximo que conseguir da melhor forma que conseguir, não gaste seu tempo com as outras etapas se não conseguir concluir a primeira etapa, isto só vai fazer com que você não consiga entregar o básico da melhor forma possível.

**Se você se considera pleno**, tente construir a conteinerização de uma forma organizada, componentizada e funcional. Esperamos que você construa um pipeline que contenha etapas de configuração, build, publicação (podendo utilizar o docker hub para isso) e uma etapa manual (via trigger) de deploy ou simulação da aplicação via curl.

**Se você se considera sênior**, além dos itens anteriormente citados, verificaremos como você criou a arquitetura da sua infraestrutura, como você documentou a mesma, como você organiza em um nível de escalabilidade e preocupação em segurança. Lembre-se que se espera de um profissional sênior a capacidade de gerar conhecimento para os pares, portanto aqui é onde você poderá mostrar o seu nível, tente mostrar seu potencial com uso de técnicas, padrões e features avançadas.

---

### Como entregar seu projeto
Envie um pacote com o projeto para o meu e-mail contendo as instruções necessárias para a sua execução. 

Em caso de dúvidas sobre a funcionalidade, lembre-se que pode nos procurar para explicações através dos e-mails **luan.einhardt@melhorenvio.com** e **jonas.moura@melhorenvio.com**


Agradecemos novamente sua disponibilidade, tenha um bom projeto!
