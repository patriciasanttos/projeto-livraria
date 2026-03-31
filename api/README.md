# Projeto livraria API

## Visão Geral
Esta API gerencia o sistema de produtos e vendas para um comércio. Ela permite o cadastro e manutenção de produtos, categorias, imagens, relatórios de estimativas de vendas e pesquisas, além de controle de contas administrativas. Desenvolvida com tecnologias modernas, oferece um conjunto robusto de funcionalidades para gerenciar todas as operações digitais da empresa.

## Documentação Técnica
A documentação técnica completa, incluindo todos os endpoints, parâmetros, modelos de dados e exemplos de requisições/respostas está disponível através do Swagger:

 - URL do Swagger: http://localhost:3000/api
 - Versão atual: 1.0

## Stack Tecnológica
Esta API foi desenvolvida utilizando as seguintes tecnologias:

- Linguagem: TypeScript
- Framework: NestJS
- ORM: Prisma
- Banco de Dados: SQLite
- Autenticação: JWT
- Criptografia: bcrypt
- Processamento de imagens: Sharp
- Armazenamento de imagens: Supabase Storage

## Primeiros Passos

### Requisitos
- Node.js (versão recomendada: 16.x ou superior)
- NPM ou Yarn
- Credenciais de acesso ao Supabase

### Autenticação
A API utiliza autenticação baseada em JWT (JSON Web Tokens). Para acessar endpoints protegidos:

Faça login usando o endpoint de autenticação, o token será armazenado como cookie http-only para ser usado na aplicação.

### Instalação:

1. Clone o repositório:

```bash
git clone https://github.com/patriciasanttos/projeto-livraria.git
```

2. Abra o resisitório, e a pasta da api:

```bash
cd projeto-livraria/api
```

3. Instale as dependências:

```bash
Usando npm:
npm install

Usando yarn:
yarn install
```

4. Configure as variáveis de ambiente conforme o arquivo `.env.example`

5. Inicie o banco de dados:

```bash
Usando npm:
npm run db:setup

Usando yarn:
yarn db:setup
```

6. Inicie a aplicação:

```bash
Usando npm:
npm run start

Usando yarn:
yarn start
```
