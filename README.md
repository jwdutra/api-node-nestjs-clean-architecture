# API em Nodejs com Nestjs aplicando boas práticas com Clean Architecture e princípios SOLID.

![node](https://github.com/user-attachments/assets/81cfd103-ce6a-4228-8258-bfabe85814be)

## Introdução

Projeto criado para referência e implementação de APIs utilizando Node.js e boas práticas aplicando Clean Architecture e princípios SOLID. Nele iremos abordar os seguintes recursos:

- CRUD de tarefas 
- Validação de DTO com class-validator
- Variáveis de ambiente com ConfigService
- Autenticação (JwtService, App guard)
- Password hash
- Banco de dados - PostgreSQL
- Clean Architecture
- SOLID
- Docker Compose para inicialização do banco de dados

## Clean Architecture

A Clean Architecture é uma abordagem de design de software que visa criar sistemas mais modulares, testáveis e de fácil manutenção. Ao aplicá-la em um projeto Node.js com NestJS, os benefícios são amplamente evidentes devido à estrutura já modular e bem organizada do NestJS, que facilita a implementação de princípios da Clean Architecture. Aqui estão os principais benefícios:

- Desacoplamento de frameworks
- Manutenção Facilitada
- Testabilidade
- Evolução Gradual
- Reutilização de Código
- Claridade e Consistência
- Escalabilidade

A Clean Architecture em um projeto Node.js com NestJS melhora a manutenibilidade, testabilidade e flexibilidade do sistema, permitindo que o código seja mais fácil de evoluir, adaptar e escalar. Essa abordagem não só promove uma organização modular, mas também reduz o risco de acoplamento excessivo, facilitando a vida do time de desenvolvimento ao longo do ciclo de vida do projeto.

## SOLID

Os princípios SOLID são fundamentais para a criação de software modular e bem estruturado, e sua aplicação em um projeto utilizando Clean Architecture e NestJS traz inúmeros benefícios. Cada um dos princípios SOLID contribui diretamente para a organização e manutenibilidade do código, especialmente quando usado em um framework como NestJS, que já incentiva boas práticas de design de software.

A aplicação dos princípios SOLID em um projeto de Clean Architecture com NestJS resulta em um sistema mais modular, flexível, e preparado para mudanças. NestJS já oferece suporte nativo a várias práticas recomendadas, como injeção de dependências e organização modular, que, quando combinadas com a Clean Architecture e SOLID, permitem a criação de software escalável, fácil de manter e altamente testável. A separação clara entre responsabilidades, a criação de abstrações e o desacoplamento entre camadas garantem que o código seja sustentável a longo prazo, mantendo sua integridade mesmo com a adição de novas funcionalidades ou mudanças estruturais.


## Instalação

### Pré-requisitos

Versão Node:

[Node v18.12.0 LTS](https://nodejs.org/en/blog/release/v18.12.0)

## Configuração

- Crie copie o arquivo .env.example e renomeie para .env, preenchendo todas a variáveis.
- Inicialize o container do banco de dados com: 
```
  docker-compose up -d
```
- Execute as migrations com:
```
npm run migration:run
```  

## Migrations

Criar uma migration:
```
npm run migration:create -name=nome-da-migration
```

Executar as migrations:
```
  npm run migration:run
```

Reverter as migrations:
```
  npm run migration:revert
```  

## Uso

O projeto expõe um endpoint para cadastro, atualização, busca e exclusão de tarefas. também foi desenvolvido um endpoint para criação de usuários e um endpoint de autenticação, onde é possível realizar o login passando um usuário e senha.

### Curls

Copie os Curls abaixo e cole no seu testador de apis favorito, como [Insomnia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/).

#### Usuários
```
curl --request POST \
  --url http://localhost:3000/users \
  --header 'Content-Type: application/json' \
  --data ' {
	 "username": "username",
	 "password": "password"
 }'
```

#### Autenticação
```
curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'Content-Type: application/json' \
  --data ' {
	 "username": "username",
	 "password": "password"
 }'
```

#### Tarefas

##### Criar
```
curl --request POST \
  --url http://localhost:3000/task \
  --header 'Authorization: Bearer token' \
  --header 'Content-Type: application/json' \
  --data ' {
    "title":"title",
    "description": "description",
    "expirationDate": "2024-01-01"
 }'
```

##### Atualizar
```
curl --request PUT \
  --url http://localhost:3000/task \
  --header 'Authorization: Bearer token' \
  --header 'Content-Type: application/json' \
  --data ' {
	 "id": "uuid here",
    "title":"updated title",
    "description": "updated description",
    "status": "IN_PROGRESS",
    "expirationDate": "2024-01-04"
 }'
 ```

##### Encontrar por id
```
curl --request GET \
  --url http://localhost:3000/task/1 \
  --header 'Authorization: Bearer token'
 ```

##### Buscar com filtros
```
 curl --request GET \
  --url 'http://localhost:3000/task?title=task%203&status=IN_PROGRESS' \
  --header 'Authorization: Bearer token'
```

##### Excluir
```
curl --request DELETE \
  --url http://localhost:3000/task/uuid-here \
  --header 'Authorization: Bearer token'
```


Este projeto teve como referência inicial uma implementação de Task Management API de deyvissonbrenoveras. 
Você pode encontrar esta implementação em https://github.com/deyvissonbrenoveras/task-management-api
