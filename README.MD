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

E para popular as tabelas com alguns dados execute:

`./node_modules/sequelize-cli/lib/sequelize db:seed:all`

###

Caso queira instalar o sequelize-cli globalmente execute:

`npm run sequelize-cli -g`

Com o sequelize-cli instalado globalmente basta executar os mesmos comando executados anteriormente, porém sem a necessidade de acessar o diretório do node_modules, ficando assim:

`sequelize db:migrate`
`sequelize db:seed:all`
