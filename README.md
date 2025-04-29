
# 🧱 **Desenvolvimento de Plataforma Web para Papelaria e Livraria com Integração via WhatsApp**

## 🌐 **Resumo**

Este projeto tem como objetivo o desenvolvimento de uma plataforma web moderna para uma loja de papelaria e livraria. A proposta busca otimizar o atendimento ao cliente, oferecendo uma navegação intuitiva por categorias de produtos, permitindo a seleção de itens e a finalização da compra via WhatsApp com um atendente. A plataforma também conta com um painel administrativo completo para a gestão de produtos, categorias e promoções.


---

## 🗺️ **Visão Geral**

O site foi desenvolvido utilizando tecnologias atuais amplamente utilizadas no mercado, como React, HTML, SCSS e diversas bibliotecas do ecossistema JavaScript. A proposta valoriza a experiência do usuário, proporcionando uma navegação fluida, responsiva e integrada com canais diretos de atendimento.

---

## 🎯 **Objetivo**

Melhorar a experiência de compra do cliente ao oferecer:

- Uma vitrine online com categorias organizadas (ex: Mais vendidos, Promoções);
- Um carrinho de compras funcional para selecionar múltiplos produtos;
- Um fluxo simplificado de finalização de compra via WhatsApp;
- Um painel administrativo para gerenciar o conteúdo do site com facilidade.

---

## 🖥️ **Funcionalidades da Plataforma**

### 👤 Usuário Final

- Navegação por categorias e destaques;
- Adição de produtos ao carrinho;
- Integração com WhatsApp para finalização da compra;
- Interface responsiva para dispositivos móveis.

### 👩‍💼 Administrador

- Cadastro, atualização e exclusão de produtos;
- Gestão de categorias e promoções;
- Interface de fácil uso para gerenciamento dos dados.

---

## 💬 **Atendimento**

O atendimento é iniciado após o usuário finalizar a seleção de produtos no carrinho. Ao clicar no botão de compra, ele será redirecionado automaticamente para o WhatsApp, onde poderá concluir a transação com um atendente da loja.

---

## 🛠️ **Principais Tecnologias Utilizadas**

### ***Front-end***
- **HTML**: Estruturação do conteúdo da aplicação.
- **SCSS**: Estilização com pré-processamento CSS, facilitando manutenção e escalabilidade.
- **JavaScript**: Interatividade e funcionalidades da aplicação.
- **React**: Criação de componentes reutilizáveis e reativos.
- **Axios**: Realização de requisições HTTP de forma simples e eficiente.
- **React Query**: Gerenciamento de estado assíncrono e cache de dados.
- **React Router DOM**: Gerenciamento de rotas e navegação entre páginas.
- **Material UI**: Componentes visuais baseados em Material Design.
- **Toastify**: Notificações amigáveis para o usuário.
- **Chart.js**: Gráfico para exibição de relatórios.
- **React window**: Para melhor performance em exibição de grande quantidade de dados.

### ***Back-end***
- **TypeScript**: Linguagem de desenvolvimento da API.
- **NestJS**: Framework web utilizado.
- **Swagger**: Utilizado para documentar endpoints, corpos de requisições, etc.
- **SQLite**: Banco de dados utilizado.
- **Prisma**: ORM utilizada para tratar do banco de dados.
- **Supabase**: Salvamento de imagens.
- **Sharp**: Compressão de imagens.
- **JSON Web Token**: Geração de tokens de autenticação.
- **Bcrypt**: Criptografica de senhas.

---

## 📦 **Dependências**

### Requisitos:

- Node.js (recomendado: versão 16.x ou superior)
- NPM ou Yarn

---

## 🚀 **Instalação e Execução - Frontend**

1. Clone o repositório:
   ```bash
   git clone https://github.com/patriciasanttos/projeto-livraria.git
   ```
2. Acesse a pasta do frontend:
   ```bash
   cd projeto-livraria/web
   ```
3. Instale as dependências:
   ```bash
   # Usando npm
   npm install

   # Ou usando yarn
   yarn install
   ```
4. Configure as variáveis de ambiente com base no arquivo `.env.example`
5. Inicie a aplicação:
   ```bash
   # Usando npm
   npm run dev

   # Ou usando yarn
   yarn dev
   ```

📎 Mais informações: [web/README.md](https://github.com/patriciasanttos/projeto-livraria/blob/develop/web/README.md)

---

## 🔧 **Instalação e Execução - API (Backend)**

1. Clone o repositório:
   ```bash
   git clone https://github.com/patriciasanttos/projeto-livraria.git
   ```
2. Acesse a pasta da API:
   ```bash
   cd projeto-livraria/api
   ```
3. Instale as dependências:
   ```bash
   # Usando npm
   npm install

   # Ou usando yarn
   yarn install
   ```
4. Configure as variáveis de ambiente com base no arquivo `.env.example`
5. Inicialize o banco de dados:
   ```bash
   # Usando npm
   npm run db:setup

   # Ou usando yarn
   yarn db:setup
   ```
6. Inicie a aplicação:
   ```bash
   # Usando npm
   npm run start

   # Ou usando yarn
   yarn start
   ```

📎 Mais informações: [api/README.md](https://github.com/patriciasanttos/projeto-livraria/blob/develop/api/README.md)

---

## ✅ **Conclusão**

Esta documentação apresenta uma visão geral do projeto e os principais passos para execução local do frontend e backend. Para detalhes técnicos sobre cada parte da aplicação, acesse os links abaixo:

- 🔗 [Documentação do Front-end](https://github.com/patriciasanttos/projeto-livraria/blob/develop/web/README.md)
- 🔗 [Documentação do Back-end](https://github.com/patriciasanttos/projeto-livraria/blob/develop/api/README.md)
