<h1 style="display: flex; gap: 1rem;"> 
  <img src="./docs/logo.png" width="30" alt="Logo" />
  Fiaposts 
</h1>

<a href="https://www.fiap.com.br/">
<img alt="Stargazers" src="https://img.shields.io/badge/Fiap-%c1?style=flat&logo=fortran&color=ed145b">
</a>

No cenário educacional contemporâneo, a integração da tecnologia desempenha um papel fundamental na facilitação do aprendizado e no acesso à informação. Nesse contexto, plataformas online têm emergido como ferramentas essenciais para promover a interação entre educadores e estudantes, estimulando o compartilhamento de conhecimento de forma dinâmica e colaborativa.

Com o objetivo de promover o compartilhamento de conhecimento, foi criada a plataforma FIAPOSTS, uma plataforma da faculdade FIAP, que disponibiliza uma interface para criação e manipulação de posts educacionais. Desta forma os professores poderão transmitir conhecimento para seus alunos, através de posts.

## 💻 Páginas

### Login

<img src="docs/login.png" width="600">

Nessa página é possível realizar o login na aplicação, tendo que informar o email e senha, e clicar no botão "Acessar". Caso o usuário não queira entrar como Professor, então ele pode clicar em "Acessar como visitante". Além disso é possível clicar em "Não tem cadastro?" para ser redirecionado para a tela de cadastro de professor.

### Posts (página principal)

<img src="docs/tela-principal.png" width="600">

Nessa página é possível visualizar todos os posts criados (por todos), com paginação e filtro por título.

### Visualização de um Post

<img src="docs/post.png" width="600">

Nessa página é possível visualizar os detalhes de um post, tal como o título, categorias, foto principal, professor autor, data de criação, data de última atualização e conteúdo.

### Cadastro / Edição de um Post

<img src="docs/salvar-post.png" width="600">

Nessa página é possível criar/editar um post, tendo que informar o título, a imagem (como url), o conteúdo (em formato markdown) e as categorias (pelo menos 1 categoria). Nessa tela também é possível pré-visualizar como o post ficará quando for publicado, desta forma é possível visualizar o markdown renderizado antes mesmo de publicar.

### Meus Posts (página adminitrativa)

<img src="docs/meus-posts.png" width="600">

Nessa página é visualizar todos os posts criados pelo usuário logado. Sendo possivel alterar ou excluir eles.

## 🛠️ Tecnologias

As seguintes tecnologias foram usadas na construção do projeto:

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [TanStack query](https://tanstack.com/query/latest)
- [Tailwind](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Docker](https://www.docker.com/)

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End e o Banco de Dados (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/LucasCancio/fiaposts-api>

# Acesse a pasta do projeto no terminal/cmd
$ cd fiaposts-api

# Monte o container
$ docker-compose up

# O servidor inciará na porta:3010
```

## 🔧 Instalação

```bash
# Clone este repositório
$ git clone <https://github.com/LucasCancio/fiaposts-web>

# Acesse a pasta do projeto no terminal/cmd
$ cd fiaposts-web

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:5173 - acesse <http://localhost:5173>
```

## 📝 Licença

Este projeto esta sobe a licença MIT.

Feito com ❤️ por Lucas Cancio
