## Sumário

- [Sumário](#sumário)
- [Contexto](#contexto)
- [Gerenciamento de Token](#gerenciamento-de-token)
- [Regras de Negócio](#regras-de-negócio)
  - [📌 Funcionalidades Validadas](#-funcionalidades-validadas)
  - [🔒 Controle de Acesso](#-controle-de-acesso)
  - [Banco de Dados](#banco-de-dados)
  - [Estrutura das Tabelas](#estrutura-das-tabelas)
    - [📄 users](#-users)
    - [🎬 movies](#-movies)
    - [⭐ reviews](#-reviews)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
  - [📥 Download do Projeto](#-download-do-projeto)
  - [📦 Instalação de Dependências](#-instalação-de-dependências)
  - [⚙️ Configuração de Variáveis de Ambiente](#️-configuração-de-variáveis-de-ambiente)
    - [📌 Passos para configuração:](#-passos-para-configuração)
  - [🗃️ Configuração do Banco de Dados (MySQL + Sequelize)](#️-configuração-do-banco-de-dados-mysql--sequelize)
    - [Passos para configurar o banco:](#passos-para-configurar-o-banco)
  - [▶️ Execução](#️-execução)
  - [🧹 Lint](#-lint)

## Contexto

O **Backend** do projeto **Nanoflix** é o núcleo responsável por lidar com regras de negócio, persistência de dados e validação de requisições. Ele foi desenvolvido utilizando **Node.js com Express**, em conjunto com o **Sequelize** para integração com banco de dados **MySQL**.

Entre suas principais responsabilidades, destacam-se:

- **Autenticação de Usuário via JWT**: Realiza a autenticação e autorização de usuários através de tokens JWT. Contempla perfis distintos, como `admin` e `usuário`, permitindo diferentes níveis de acesso às rotas.

- **Validação de Dados e Controle de Erros**: Utiliza a biblioteca `Joi` para validar os dados recebidos do frontend. Em caso de erro, são retornadas mensagens padronizadas, otimizando o tratamento no cliente.

- **Gerenciamento de Filmes**: Possibilita a criação, listagem e visualização de detalhes de filmes, com controle de acesso para criação (exclusivo para administradores).

- **Upload de Imagens**: Utiliza `Multer` para lidar com o envio de arquivos, armazenando localmente as imagens de filmes no diretório `/uploads`, e gerando a URL apropriada para acesso via frontend.

- **Sistema de Reviews (Avaliações)**: Permite que usuários logados publiquem reviews com comentários e notas de 1 a 5 estrelas para os filmes disponíveis.

- **Retorno de Respostas Formatadas**: Garante que todas as requisições sejam respondidas com status apropriado e mensagens claras, facilitando o consumo pela interface frontend.

---

> 💡 Caso não possua MySQL instalado localmente, é possível utilizar o serviço `db` do `docker-compose`, que já vem pré-configurado para facilitar o uso durante o desenvolvimento.

Nas seções a seguir, você encontrará instruções detalhadas para instalação, configuração e execução do backend.

## Gerenciamento de Token

Após o login bem-sucedido, o token JWT de autenticação é armazenado no `localStorage` do navegador. Esse token é utilizado para autenticar requisições ao backend, sendo incluído no cabeçalho `Authorization` como `Bearer <token>`.

Embora esta abordagem seja prática para desenvolvimento e testes, recomenda-se que aplicações em produção utilizem alternativas mais seguras, como cookies `httpOnly`, para proteger contra ataques de `XSS` e melhorar a segurança geral.

## Regras de Negócio

O backend do Nanoflix aplica validações e regras de negócio utilizando a biblioteca **Joi**, garantindo que os dados recebidos estejam no formato correto antes de interagir com o banco de dados. Essas validações ajudam a manter a integridade da aplicação e a oferecer uma experiência segura ao usuário.

### 📌 Funcionalidades Validadas

- **Autenticação e Registro**  
  Validações básicas de login com `email ou username` e `senha`, garantindo campos obrigatórios e formatos mínimos esperados.

- **Criação de Filmes (Apenas Admin)**  
  Apenas usuários autenticados com o papel de `admin` podem criar novos filmes. As validações envolvem:
  - Título (obrigatório)
  - Descrição (obrigatória)
  - Gênero (obrigatório)
  - Ano de lançamento (mínimo: 1888)
  - Imagem (arquivo obrigatório)

- **Criação de Reviews (Usuários autenticados)**  
  Validações para envio de comentários e notas:
  - Comentário (obrigatório)
  - Nota (de 1 a 5)

### 🔒 Controle de Acesso

- Usuários não autenticados não podem acessar rotas protegidas.
- Apenas administradores conseguem acessar `/movies/new` e criar novos filmes.
- Todas as validações são centralizadas nos middlewares de validação (`validators.js`) e executadas antes do controller.

Essas regras garantem que o backend processe apenas dados válidos, mantendo o sistema seguro, organizado e confiável.

### Banco de Dados

O projeto Nanoflix utiliza **MySQL** como sistema de gerenciamento de banco de dados, com a ORM **Sequelize** para facilitar as interações com a base de dados de forma estruturada e segura.

A estrutura básica do banco envolve tabelas como:

- **users**: Armazena os dados dos usuários cadastrados, incluindo e-mail, nome, senha (criptografada) e o papel (admin ou usuário).
- **movies**: Contém os dados dos filmes cadastrados, como título, descrição, gênero, ano de lançamento e caminho da imagem.
- **reviews**: Relacionada aos filmes e usuários, armazena comentários e notas (de 1 a 5).

A criação das tabelas e associações é feita por meio das migrations do Sequelize, e todas as validações necessárias são aplicadas antes da persistência dos dados.

### Estrutura das Tabelas

#### 📄 users

| Campo         | Tipo         | Descrição                        |
|---------------|--------------|----------------------------------|
| id            | INTEGER      | Chave primária (auto incremento)|
| name          | STRING       | Nome completo do usuário         |
| email         | STRING       | E-mail único do usuário          |
| password      | STRING       | Senha criptografada              |
| role          | STRING       | Papel do usuário (`admin` ou `user`) |
| created_at    | DATE         | Timestamp de criação             |
| updated_at    | DATE         | Timestamp de atualização         |

---

#### 🎬 movies

| Campo         | Tipo         | Descrição                        |
|---------------|--------------|----------------------------------|
| id            | INTEGER      | Chave primária                   |
| title         | STRING       | Título do filme                  |
| description   | TEXT         | Descrição do filme               |
| release_year  | INTEGER      | Ano de lançamento                |
| genre         | STRING       | Gênero do filme                  |
| url_image     | STRING       | Caminho ou URL da imagem         |
| created_at    | DATE         | Timestamp de criação             |
| updated_at    | DATE         | Timestamp de atualização         |

---

#### ⭐ reviews

| Campo         | Tipo         | Descrição                        |
|---------------|--------------|----------------------------------|
| id            | INTEGER      | Chave primária                   |
| comment       | TEXT         | Texto do review                  |
| rating        | INTEGER      | Nota (1 a 5)                     |
| movie_id      | INTEGER      | FK referenciando `movies.id`     |
| user_id       | INTEGER      | FK referenciando `users.id`      |
| created_at    | DATE         | Timestamp de criação             |
| updated_at    | DATE         | Timestamp de atualização         |

---

Essas tabelas estão associadas entre si da seguinte forma:

- Um **usuário** pode fazer múltiplos **reviews**
- Um **filme** pode receber múltiplos **reviews**

## Tecnologias e Ferramentas Utilizadas

As tecnologias do **Backend** foram escolhidas com foco em produtividade, clareza na validação de dados, segurança e integração eficiente com banco de dados e outras camadas da aplicação.

- [Node.js](https://nodejs.org/en): Plataforma utilizada para desenvolvimento do backend. Oferece alta performance, ampla comunidade e perfeita integração com bibliotecas JavaScript modernas.

- [Express](https://expressjs.com/): Framework minimalista e flexível, utilizado para gerenciar rotas, middlewares e requisições HTTP de forma clara e performática.

- [Sequelize](https://sequelize.org/): ORM que facilita a manipulação de dados com MySQL, trazendo robustez na criação de queries, migrações e modelagem de tabelas com suporte a associações.

- [MySQL](https://www.mysql.com/): Sistema gerenciador de banco de dados relacional utilizado para persistência das informações da aplicação.

- [Joi](https://github.com/sideway/joi): Biblioteca de validação de dados utilizada em conjunto com middlewares, garantindo a integridade das requisições recebidas pelo backend.

- [@hapi/boom](https://github.com/hapijs/boom): Auxilia na criação de erros HTTP com mensagens padronizadas, facilitando o tratamento e a resposta de erros ao frontend.

- [CORS](https://www.npmjs.com/package/cors): Middleware para configuração de permissões de acesso cruzado, necessário para comunicação segura entre frontend e backend.

- [bcrypt](https://www.npmjs.com/package/bcrypt): Utilizado para criptografia de senhas dos usuários, adicionando uma camada importante de segurança.

- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): Responsável por geração e verificação de tokens JWT utilizados no controle de sessões e autenticação de usuários.

- [Multer](https://github.com/expressjs/multer): Middleware para lidar com upload de arquivos. Utilizado no envio das imagens dos filmes para o servidor.

- [Winston](https://github.com/winstonjs/winston): Biblioteca de log utilizada para registrar informações, avisos e erros do backend de forma padronizada e persistente.

Essas ferramentas, combinadas, tornam o backend do Nanoflix robusto, seguro e de fácil manutenção.

## Instalação e Execução

### 📥 Download do Projeto

Primeiro, você precisa clonar o repositório do projeto em sua máquina local. Use o comando abaixo:

```bash
git clone git@github.com:imsamuelcovalero/nanoflix.git
```

### 📦 Instalação de Dependências

Após clonar o projeto, navegue até o diretório `backend` e instale as dependências necessárias:

```bash
cd nanoflix
cd backend
npm install
```

Esses comandos instalarão todas as dependências listadas no arquivo `package.json`, necessárias para executar o backend da aplicação.

### ⚙️ Configuração de Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para armazenar informações sensíveis e configurações específicas, como credenciais de banco de dados e chaves secretas.

No diretório do `backend`, você encontrará o arquivo `.env.example`, que contém todos os exemplos de variáveis que o projeto espera.

#### 📌 Passos para configuração:

1. Renomeie o arquivo `.env.example` para `.env`.
2. Substitua os valores conforme necessário:

- `PORT`: Porta que o backend será iniciado.
- `JWT_SECRET`: Chave secreta utilizada para geração e validação de tokens JWT.
- `FRONTEND_URL`: URL do frontend, usada para configuração do CORS.
- `MYSQL_*`: Credenciais de acesso ao banco de dados MySQL.

Exemplo:

```bash
PORT=3001  
JWT_SECRET=seu_segredo_super_secreto  
FRONTEND_URL=http://localhost:3000  

MYSQL_HOST=localhost  
MYSQL_USER=root  
MYSQL_PASSWORD=sua_senha  
MYSQL_ROOT_PASSWORD=sua_senha_root  
MYSQL_DB=nanoflix  
MYSQL_PORT=3306  
```

### 🗃️ Configuração do Banco de Dados (MySQL + Sequelize)

Antes de iniciar o backend, é necessário preparar o banco de dados utilizando as ferramentas do Sequelize, que já estão configuradas no projeto.

#### Passos para configurar o banco:

1. Criar e migrar o banco de dados:

```bash
npm run db:init
```

Este comando executa a criação do banco de dados (`db:create`) e aplica todas as migrações (`db:migrate`).

2. (Opcional) Popular o banco com dados iniciais (seed):

```bash
npm run db:seed
```

Este comando insere dados iniciais nas tabelas para facilitar testes e desenvolvimento.

💡 Caso queira resetar completamente o banco de dados (dropar, criar novamente, migrar e aplicar seed), utilize:

```bash
npm run db:reset && npm run db:seed
```

Essa configuração garante que todas as tabelas e dados estejam corretamente definidos antes de iniciar o servidor.

### ▶️ Execução

Após instalar as dependências e configurar o `.env`, você pode iniciar a aplicação com:

```bash
npm run dev
```

O servidor será iniciado na porta definida na variável `PORT` do arquivo `.env`. Caso não esteja definida, o padrão será `3001`. A API ficará acessível em:

```bash
http://localhost:3001
```

### 🧹 Lint

Para verificar e padronizar seu código, utilize:

```bash
npm run lint
```

O `backend` segue boas práticas de desenvolvimento utilizando [ESLint](https://eslint.org/) com a configuração `trybe-backend`, além de regras personalizadas para promover um código limpo, legível e consistente.

---

💡 **Dicas úteis**:

- Em caso de erros, verifique as mensagens no terminal — geralmente elas apontam o caminho para resolução.
- Certifique-se de que suas dependências estão atualizadas.
- Verifique se o ambiente (Node, MySQL, variáveis) está corretamente configurado.
- Consulte a [documentação oficial](https://expressjs.com/) das ferramentas utilizadas, se necessário.

🚨 Está com dúvidas ou encontrou um problema?

Abra uma [issue](https://github.com/imsamuelcovalero/nanoflix/issues) ou me contate diretamente. Ficarei feliz em ajudar.

---

Para que tudo funcione corretamente, não se esqueça de verificar o `README` do [frontend](../frontend/README.md) e configurar suas variáveis de ambiente.

[⬆ Voltar ao topo](#sumário)  
[⬅ Voltar para a página anterior](../README.md)