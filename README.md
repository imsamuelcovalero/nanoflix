# Bem-vindo ao Nanoflix 🎥 📸

O __Nanoflix__ é uma aplicação fullstack para gerenciamento e visualização de filmes, desenvolvida com __Next.js (frontend)__, __Node.js + Express (backend)__ e __MySQL__ como banco de dados.

O projeto foi criado como parte de um teste técnico com foco em boas práticas de desenvolvimento, autenticação JWT, upload de imagens, controle de acesso baseado em papéis (admin/usuário), e uma experiência visual agradável e funcional tanto para administradores quanto usuários comuns.

## Sumário

- [Bem-vindo ao Nanoflix 🎥 📸](#bem-vindo-ao-nanoflix--)
  - [Sumário](#sumário)
  - [Visualização](#visualização)
  - [Contexto](#contexto)
    - [Visão Geral de Funcionalidades](#visão-geral-de-funcionalidades)
  - [Como rodar a aplicação e detalhes do funcionamento](#como-rodar-a-aplicação-e-detalhes-do-funcionamento)
    - [Início Rápido](#início-rápido)
    - [READMEs](#readmes)
      - [Backend](#backend)
      - [Frontend](#frontend)
  - [🔐 Contas de Teste](#-contas-de-teste)
    - [Conta Admin](#conta-admin)
    - [Conta Usuário](#conta-usuário)
  - [Notas](#notas)
    - [Git, GitHub e Histórico de Commits](#git-github-e-histórico-de-commits)

## Visualização

<div align="center">

<!-- Adicione a URL da imagem aqui -->

![Nanoflix Preview]([https://github.com/user-attachments/assets/90d3b175-5a37-4af5-bf68-094aef9d8e82])

</div>

## Contexto

O __Nanoflix__ é uma plataforma de exibição e gerenciamento de filmes, desenvolvida para demonstrar competências técnicas em projetos fullstack. Com uma interface moderna, navegação fluida e autenticação baseada em token JWT, o sistema atende tanto usuários comuns quanto administradores, com diferentes permissões e experiências.

### Visão Geral de Funcionalidades

O __Nanoflix__ oferece um conjunto sólido de recursos para explorar, cadastrar e interagir com conteúdos de filmes:

- __Criação e Autenticação de Usuários:__ Possibilidade de registro e login via email ou username.

- __Controle de Acesso (RBAC):__ Usuários com papel de `admin` podem cadastrar novos filmes. Usuários comuns têm acesso apenas à visualização.

- __Listagem de Filmes:__ Qualquer usuário autenticado pode visualizar os filmes cadastrados.

- __Cadastro de Filmes com Imagem:__ Administradores podem cadastrar novos filmes, com upload de imagem via formulário.

- __Persistência de Sessão:__ Utiliza JWT para manter o usuário autenticado mesmo após recarregamento da página.

- __Validação de Acesso por Rota:__ Middleware personalizado para restringir o acesso a páginas administrativas.

## Como rodar a aplicação e detalhes do funcionamento

### Início Rápido

<details>
<summary><strong>Detalhes</strong></summary>

Para começar, clone o repositório em sua máquina local.

```bash
git clone git@github.com:imsamuelcovalero/nanoflix.git
```

1. Navegue até o diretório raiz do projeto no terminal usando: cd nanoflix

2. Acesse o diretório `backend` e execute `npm install` para instalar as dependências.

3. Configure o arquivo `.env` com base no `.env.example`.

4. Execute `npm run db:init` para criar e migrar o banco de dados.

5. (Opcional) Execute `npm run db:seed` para popular o banco com dados iniciais.

6. Inicie o servidor com `npm run dev`.

7. A API estará disponível em `http://localhost:3001`.

8. Agora, acesse o diretório `frontend` e execute `npm install` para instalar as dependências.

9. Configure o `.env` com a URL do backend (`NEXT_PUBLIC_API_URL`).

10. Execute `npm run dev` para iniciar o frontend.

11. A aplicação estará disponível em `http://<seu_ip_local>:3000`.

> __Observação:__ Caso você não possua o MySQL instalado localmente, você pode optar por utilizar o serviço de banco de dados fornecido no `docker-compose.yml`. Basta rodar `docker compose up -d db` a partir da raiz do projeto.

> __Importante:__ Certifique-se de configurar os arquivos `.env` no `backend` e `frontend` conforme os exemplos fornecidos. Variáveis como `DATABASE_URL`, `NEXT_PUBLIC_API_URL` e credenciais de acesso devem estar definidas corretamente.

__Informações detalhadas sobre o funcionamento da aplicação podem ser encontradas nos `README` do [frontend](frontend/README.md) e do [backend](backend/README.md).__

</details>

### READMEs

Recomendo iniciar a configuração e familiarização do projeto pelo `README` do `backend`, seguido pelo `frontend`. Isso se deve ao fato de que a configuração do `frontend` depende do `backend`.

#### Backend

O `README` do __backend__ fornece informações detalhadas sobre a configuração e os recursos do lado do servidor. Acesse-o [aqui](backend/README.md).

#### Frontend

Após configurar o `backend`, você pode prosseguir com o `README` do __frontend__. Acesse-o [aqui](frontend/README.md).

---

## 🔐 Contas de Teste

Você pode usar as credenciais abaixo para testar as permissões de cada tipo de usuário no sistema:

### Conta Admin

```bash
Usuário: admin@nanoflix.com  
Senha: Admin@123
```

### Conta Usuário

```bash
Usuário: teste@nanoflix.com 
Senha: Teste@123
```

---

## Notas

### Git, GitHub e Histórico de Commits

Este projeto utiliza a [Especificação de Commits Convencionais](https://www.conventionalcommits.org/en/v1.0.0/), com alguns tipos da [convenção Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines). Além disso, foi utilizado o pacote [conventional-commit-cli](https://www.npmjs.com/package/conventional-commit-cli)

Durante o desenvolvimento da aplicação, utilizei o `Git` como ferramenta de controle de versão e o `GitHub` como plataforma de hospedagem. A `branch develop` foi o principal local de desenvolvimento, e suas mudanças foram periodicamente mescladas à `branch main`.

[⬆ Voltar ao topo](#sumário)
