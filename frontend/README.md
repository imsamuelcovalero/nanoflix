## Sumário

- [Sumário](#sumário)
- [Contexto](#contexto)
- [Regras de Negócio e Validações](#regras-de-negócio-e-validações)
- [LocalStorage](#localstorage)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
  - [Download do projeto](#download-do-projeto)
  - [Instalação de Dependências](#instalação-de-dependências)
  - [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
  - [Execução](#execução)

## Contexto

O **Frontend** do `Nanoflix` é a principal interface visual da aplicação, construída com [Next.js](https://nextjs.org/). Ele oferece aos usuários uma experiência fluida e moderna para visualização e gerenciamento de filmes. Entre suas responsabilidades estão:

- **Autenticação e Criação de Conta**: Usuários podem se registrar e fazer login com credenciais válidas. O frontend envia os dados para o backend, que gera um token `JWT`, validando a autenticação. Rotas específicas são protegidas conforme o papel do usuário (`admin` ou `usuário comum`).

- **Interface Intuitiva**: A `UI` foi construída utilizando componentes com o design system do [shadcn/ui](https://ui.shadcn.com/), que proporciona uma aparência moderna e consistente em toda a aplicação.

- **Cadastro de Filmes (Admin)**: Usuários com papel `admin` têm acesso a uma rota exclusiva onde é possível cadastrar novos filmes com título, descrição, imagem, gênero e ano de lançamento. Também é possível fazer upload de imagem diretamente da interface.

- **Listagem e Visualização de Filmes**: Todos os usuários autenticados podem visualizar a lista de filmes, acessar detalhes individuais e interagir com o conteúdo.

- **Logout Seguro**: Através do botão `Sair`, os usuários encerram a sessão, e os dados locais (token e sessão) são limpos automaticamente.

- **Adaptação Responsiva**: O layout foi desenvolvido para funcionar perfeitamente em diferentes tamanhos de tela (desktop, tablets e smartphones), com uma navegação fluida e responsiva.

Com essas funcionalidades, o `frontend` do `Nanoflix` proporciona uma experiência imersiva e simples tanto para administradores quanto para usuários comuns, sempre com foco em usabilidade, segurança e estética.

## Regras de Negócio e Validações

A lógica de negócio e validação de dados foi centralizada no **backend**, utilizando a biblioteca [Joi](https://joi.dev/) para garantir consistência, segurança e manutenção mais simples.

No **frontend**, as validações são mantidas leves, limitando-se a regras básicas de preenchimento obrigatório e estrutura mínima (ex: todos os campos obrigatórios em formulários estão marcados com `required`).

Quando ocorrem erros de validação ou regras de negócio (como tentativas de criar um filme já existente), o backend retorna uma mensagem clara, que é capturada e exibida ao usuário através do frontend.

Esse modelo garante que todas as validações críticas e regras estejam centralizadas no backend, evitando duplicação de lógica e aumentando a segurança da aplicação.

## LocalStorage

No **Nanoflix**, o `localStorage` é utilizado de forma estratégica para garantir uma melhor experiência do usuário em situações específicas:

- **Persistência de Sessão**  
  Após o login bem-sucedido, o token de autenticação (`nanoflix-token`) é armazenado para manter o usuário autenticado mesmo após recarregamentos de página ou trocas de rota.

- **Redirecionamento após Login**  
  Quando um usuário tenta acessar uma rota protegida (ex: enviar uma review) sem estar autenticado, o caminho original (`/movies/:id`) é armazenado na chave `redirectAfterLogin`. Assim, após o login, ele é automaticamente redirecionado de volta para o local exato onde estava.

- **Envio de Review após Login**  
  Se o usuário tenta enviar uma avaliação sem estar logado, os dados da review (`pendingReview` e `pendingRating`) também são temporariamente salvos. Assim que o login for realizado, esses dados podem ser recuperados e enviados automaticamente, evitando perda de informação e melhorando a usabilidade.

> ⚠️ Nenhuma informação sensível é armazenada. Os dados mantidos no `localStorage` são utilizados exclusivamente para controle de fluxo e melhoria da experiência do usuário.

## Tecnologias e Ferramentas Utilizadas

O **Frontend** do Nanoflix foi desenvolvido com as seguintes tecnologias e bibliotecas:

- [Next.js](https://nextjs.org/): Framework React moderno com suporte a SSR, CSR, e otimizações nativas. Usado como base da aplicação.

- [React](https://reactjs.org/): Biblioteca JavaScript para criação da interface do usuário por meio de componentes reutilizáveis.

- [Tailwind CSS](https://tailwindcss.com/): Framework de CSS utilitário que permite estilização rápida e responsiva com consistência.

- [Shadcn UI](https://ui.shadcn.dev/): Biblioteca de componentes acessíveis e personalizáveis, integrada ao Tailwind CSS. Usada para criar botões, inputs, cards, etc.

- [Zustand](https://github.com/pmndrs/zustand): Biblioteca de gerenciamento de estado leve e reativa, utilizada no controle de autenticação e sessão do usuário.

- [Axios](https://axios-http.com/): Cliente HTTP usado para comunicação com o backend, com suporte a interceptadores e tratamento de erros.

- [@tanstack/react-query](https://tanstack.com/query): Utilizada para gerenciamento e cache de requisições assíncronas, garantindo uma experiência de usuário otimizada e reativa.

- [Lucide React](https://lucide.dev/): Conjunto de ícones moderno usado para aprimorar a interface visual da aplicação.

- [clsx](https://github.com/lukeed/clsx) + [class-variance-authority (CVA)](https://cva.style/): Utilizadas em conjunto para compor dinamicamente classes CSS com Tailwind, promovendo reutilização e organização de estilos.

- [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) + [tw-animate-css](https://www.npmjs.com/package/tw-animate-css): Plugins utilizados para animações leves com Tailwind, garantindo fluidez nas transições da interface.

Essas ferramentas foram escolhidas visando produtividade, escalabilidade e uma experiência moderna, responsiva e acessível ao usuário final.

## Instalação e Execução

### Download do projeto

Primeiro, você precisa fazer o clone do repositório do projeto. Para isso, use o comando:

```bash
git clone git@github.com:imsamuelcovalero/nanoflix.git
```

### Instalação de Dependências

Após clonar o projeto, navegue até o diretório `frontend` e instale as dependências necessárias com os seguintes comandos:

```bash
cd nanoflix

cd frontend
npm install
```

Esses comandos instalam todas as dependências listadas no arquivo `package.json`, que são necessárias para a execução do projeto.

### Configuração de Variáveis de Ambiente

O projeto requer a configuração de variáveis de ambiente para definir a URL da API do backend.

Dentro do diretório do `frontend`, há um arquivo chamado `.env.example`, que contém a estrutura esperada para essa configuração. Para configurar:

1. Renomeie o arquivo `.env.example` para `.env`.
2. Substitua o valor pela URL real do seu backend. Exemplo:

```bash
NEXT_PUBLIC_API_URL=https://minhaapi.com # Substitua pela URL real da sua API backend
```

Essa variável será usada pelo frontend para realizar requisições corretamente à API.

### Execução

Após a instalação das dependências e a configuração das variáveis de ambiente, você pode iniciar a aplicação com o comando:

npm start

Este comando iniciará o servidor do Next.js em ambiente de desenvolvimento. Por padrão, a aplicação estará disponível em:

```bash
- Local: http://localhost:3000  
- Network: http://<seu_ip_local>:3000
```

O ambiente será carregado a partir do arquivo `.env`.

É importante lembrar que, ao encontrar problemas durante a instalação ou execução, é uma boa prática verificar as mensagens de erro que aparecem no terminal, pois geralmente fornecem pistas valiosas sobre o que pode estar errado. Também é recomendável manter as dependências atualizadas e garantir que o ambiente de desenvolvimento esteja configurado corretamente.

Além disso, consultar a documentação oficial das bibliotecas e frameworks utilizados pode esclarecer dúvidas ou comportamentos inesperados.

Caso precise de ajuda adicional, sinta-se à vontade para abrir uma [issue](https://github.com/imsamuelcovalero/nanoflix/issues) no GitHub. Também estou disponível para contato direto em caso de dúvidas específicas.

Espero que estas instruções tenham sido úteis para a instalação e execução do projeto. Não se esqueça de conferir o `README` do [backend](../backend/README.md) e realizar todas as configurações necessárias para garantir o correto funcionamento da aplicação.

[⬆ Voltar ao topo](#sumário)<br>
[⬅ Voltar para a página anterior](../README.md)