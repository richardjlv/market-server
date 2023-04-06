# REST API

Este exemplo implementa uma REST API básica para uma loja virtual, contendo os seguintes recursos:

- `Product` (produtos)
- `Category` (categorias)
- `Images` (imagens)

Para o desenvolvimento da API, foram utilizadas as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/) Ambiente de execução JavaScript server-side
- [Express](https://expressjs.com/) Framework para aplicações web
- [Prisma](https://www.prisma.io/) ORM para Node.js e TypeScript
- [MongoDB](https://www.mongodb.com/) Banco de dados não relacional
- [Jest](https://jestjs.io/) Framework para testes unitários
- [ESLint](https://eslint.org/) Linter para JavaScript/Typescript
- [Prettier](https://prettier.io/) Formatação de código
- [EditorConfig](https://editorconfig.org/) Configurações de editor de código
- [TypeScript](https://www.typescriptlang.org/) Superset de JavaScript que adiciona tipagem estática

## Iniciando

### 1. Clonando o repositório e instalando as dependências

Clone esse repositório:

```
git clone git@github.com:richardjlv/market-server.git
```

Instale as dependências:

```
npm install
```

</details>

### 2. Criando banco de dados

Para criar o banco de dados, é necessário adicionar o arquivo `.env` na raiz do projeto, com as seguintes variáveis:

```
DATABASE_URL="mongodb://localhost:27017/market" // URL do banco de dados MongoDB
```

Em seguida, execute o comando:

```
npx prisma db push
```

Caso queira popular o banco de dados com alguns dados, execute o comando:

```
npm run seed

```

### 3. Iniciando o servidor

Para iniciar o servidor, execute o comando:

```
npm run dev

```

Com isso, o servidor estará disponível em `http://localhost:3333`.

Caso queira executar o servidor em modo de produção, é necessário executar o comando:

```
npm run build

```

E em seguida, executar o comando:

```
npm run start
```

### 4. Utilizando a REST API

Você pode acessar a REST API do servidor utilizando os seguintes endpoints:

#### `GET`

- `/products?search={search}&page={page}&orderBy={orderBy}&category={category}`: Busca todos os produtos
  - Query Parameters
    - `search` (opcional): Este filtra os produtos por `title`
    - `page` (opcional): Este especifica de qual página os objetos devem ser retornados, sendo que cada página contém 10 objetos
    - `orderBy` (opcional): A ordem de classificação para produtos em menor preço, maior preço ou ordem alfabética. O valor pode ser `minPrice`, `maxPrice` ou `title`
    - `category` (opcional): Este filtra os produtos por `category`
- `/products/:id`: Busca um único produto pelo seu `id`
- `/categories`: Busca todas as categorias

#### `POST`

- `/products`: Cria um novo produto
  - Body:
    - `title: String` (obrigatório): O título do produto
    - `description: String` (obrigatório): A descrição do produto
    - `price: Float` (obrigatório): O preço do produto
    - `category: String` (obrigatório): O título da categoria do produto
    - `unitsInStock: Int` (obrigatório): A quantidade de unidades em estoque
    - `images: String[]` (obrigatório): As imagens do produto
- `/categories`: Cria uma nova categoria
  - Body:
    - `name: String` (obrigatório): O título da categoria

#### `PUT`

- `/products/:id`: Atualiza um produto pelo seu `id`
  - Body:
    - `title: String` (opcional): O título do produto
    - `description: String` (opcional): A descrição do produto
    - `price: Float` (opcional): O preço do produto
    - `category: String` (opcional): O título da categoria do produto
    - `unitsInStock: Int` (opcional): A quantidade de unidades em estoque
    - `images: String[]` (opcional): As imagens do produto

#### `DELETE`

- `/products/:id`: Deleta um produto pelo seu `id`
- `/categories/:id`: Deleta uma categoria pelo seu `id`

## Testes

Para executar os testes, execute o comando:

```
npm run test

```
