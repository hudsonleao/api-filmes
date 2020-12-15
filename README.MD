# API FILMES:

## Executar o projeto

### Instalar as dependências do projeto:

`npm i`

### Iniciar a api:

`npm run dev`

### A aplicação estará acessível na porta 3000:

`http://localhost:3000`


## Base de dados

### Essa API utiliza o banco MYSQL e o ORM Sequelize.

Para criar as tabelas execute:

`./node_modules/sequelize-cli/lib/sequelize db:migrate`

E para popular as tabelas com alguns dados:

`./node_modules/sequelize-cli/lib/sequelize db:seed:all`

Caso queira instalar o sequelize-cli globalmente execute o comando:

`npm run sequelize-cli -g`

Com o sequelize-cli instalado globalmente basta executar os mesmos comando executados anteriormente, porém sem a necessidade de acessar o diretório do node_modules, ficando assim:

`sequelize db:migrate`
`sequelize db:seed:all`

**Obs: Caso haja algum problema para executar as migrations, há na pasta db um sql para criação as tabelas e os dados.

## Executar os testes

Os testes foram desenvolvidos com o mocha, chai e foi utilizada a biblioteca supertest para iniciar o servidor e realizar os testes nos endpoints. Para identificar a cobertura de testes houve a utilização do nyc.

### Para executar os testes automatizados rode o comando:

`npm run test`

### Para verificar a cobertura dos testes:

`npm run coverage`

## ESLint

### Para examinar o código com o ESLint e realizar algumas correções, execute o comando:

`npm run lint-fix`

## Testar as rotas da API no Postman

### Há uma collection no diretório postman com alguns testes.

## Endpoints:

### Obter token:

>  ROUTE: /api/v1/auth/token <br />
>  METHOD: GET <br />
<<<<<<< HEAD
>  HEADERS: { <br />
>  authorization: Bearer token <br />
>  } <br />
=======
>>>>>>> b25e61ee0df0ec63b1c1c578c894d3e6e4ae3bf0
>  BODY: { <br />
>   usuario: "texto" <br />
>   senha: "texto" <br />
>  } <br />

**Obs: usuário e senha são obrigatórios

### Filmes

#### Lista de filmes:

>  ROUTE: /api/v1/filmes <br />
>  METHOD: GET <br />
<<<<<<< HEAD
>  HEADERS: { <br />
>  authorization: Bearer token <br />
>  } <br />
=======
>>>>>>> b25e61ee0df0ec63b1c1c578c894d3e6e4ae3bf0
>  QUERY: ?pagina=numero&limite=numero

#### Lista de filmes com filtro por nome, diretor, genero e ator:

>  ROUTE:/api/v1/filmes/filtro <br />
>  METHOD: GET <br />
<<<<<<< HEAD
>  HEADERS: { <br />
>  authorization: Bearer token <br />
>  } <br />
=======
>>>>>>> b25e61ee0df0ec63b1c1c578c894d3e6e4ae3bf0
>  QUERY: ?nome=texto&diretor=texto&genero=texto&ator=texto&pagina=numero&limite=numero

#### Cadastrar filme:

>  ROUTE: /api/v1/filmes <br />
>  METHOD: POST <br />
<<<<<<< HEAD
>  HEADERS: { <br />
>  authorization: Bearer token <br />
>  } <br />
=======
>>>>>>> b25e61ee0df0ec63b1c1c578c894d3e6e4ae3bf0
>  BODY: { <br />
>   nome: "texto", <br />
>   diretores: [array], <br />
>   generos: [array], <br />
>   atores: [array], <br />
>   resumo: "texto" <br />
>  }

**Obs: nome, diretores, generos, atores e resumo são obrigatórios.

### Admin

#### Cadastrar usuário:

<<<<<<< HEAD
>  ROUTE: /api/v1/admin/usuarios <br />
>  METHOD: POST <br />
>  HEADERS: { <br />
>  authorization: Bearer token <br />
>  } <br />
=======
>  ROUTE: /api/v1/admin/cadastrar <br />
>  METHOD: POST <br />
>>>>>>> b25e61ee0df0ec63b1c1c578c894d3e6e4ae3bf0
>  BODY: { <br />
>   usuario: "texto", <br />
>   senha: "texto", <br />
>  }

**Obs: usuário e senha são obrigatórios

#### Editar usuário:

<<<<<<< HEAD
>  ROUTE: /admin/usuarios/:usuario <br />
>  METHOD: PUT <br />
>  HEADERS: { <br />
>  authorization: Bearer token <br />
>  } <br />
=======
>  ROUTE: /admin/alterar/:usuario <br />
>  METHOD: PUT <br />
>>>>>>> b25e61ee0df0ec63b1c1c578c894d3e6e4ae3bf0
>  PARAMS: :usuario = "texto" <br />
>  BODY: { <br />
>   usuario: "texto", <br />
>   senha: "texto", <br />
>   ativo: 1
>  }

**Obs: ativo deve ser igual a 1, caso queira ativar o usuário.

<<<<<<< HEAD
#### Remover usuário:

>  ROUTE: /admin/usuarios/:usuario <br />
>  METHOD: DELETE <br />
>  HEADERS: { <br />
>  authorization: Bearer token <br />
>  } <br />
>  PARAMS: :usuario = "texto" <br />

### Usuarios

#### Cadastrar usuário:

>  ROUTE: /api/v1/usuarios <br />
>  METHOD: POST <br />
>  HEADERS: { <br />
>  authorization: Bearer token <br />
>  } <br />
>  BODY: { <br />
>   usuario: "texto", <br />
>   senha: "texto", <br />
>  }

**Obs: usuário e senha são obrigatórios

#### Editar usuário:

>  ROUTE: /usuarios/:usuario <br />
>  METHOD: PUT <br />
>  HEADERS: { <br />
>  authorization: Bearer token <br />
>  } <br />
>  PARAMS: :usuario = "texto" <br />
>  BODY: { <br />
>   usuario: "texto", <br />
>   senha: "texto", <br />
>   ativo: 1
>  }

**Obs: ativo deve ser igual a 1, caso queira ativar o usuário.

#### Remover usuário:

>  ROUTE: /usuarios/:usuario <br />
>  METHOD: DELETE <br />
>  HEADERS: { <br />
>  authorization: Bearer token <br />
>  } <br />
>  PARAMS: :usuario = "texto" <br />
=======

>>>>>>> b25e61ee0df0ec63b1c1c578c894d3e6e4ae3bf0
