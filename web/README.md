# Projeto Livraria

## Sumário

- [Descrição do Projeto](#descrição-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Primeiros passos](#primeiros-passos)

## Descrição do Projeto

Este projeto é uma Aplicação Web para uma papelaria que precisava de um site para expor seus produtos de papelaria e acessórios ligados a papelaria. A empresa queria que o site tivesse cores claras e que fossem atrativo para as crianças, bem como para seus pais que são os que realmente compram os produtos. O site deveria permitir que o cliente pudesse escolher os produtos por categorias, pudesse fazer pesquisas. O Sponsor queria que as vendas fosse concluídas pelo WhatsApp dos seus vendedores. Ele também queria que suas redes sociais ficassem disponíveis para que os clientes pudessem ter acesso. Como um plus o cliente queria que tivesse uma parte no site onde ele pudesse gerenciar, ou seja, adicionar novos produtos, novas categorias de produtos com seus respectivos preços, quantidades, fotos entre outras características.
O site foi desenvolvido em JavaScript utilizando React.js, SCSS, entre outras bibliotecas e frameworks que serão descritas ao longo deste documento.

## Tecnologias Utilizadas

- **HTML**: Linguagem de marcação utilizada para estruturar o conteúdo da aplicação.
- **SCSS**: É uma linguagem de estilo que é uma extensão do CSS3. Criada para tornar o CSS mais fácil de escrever e manter. Ela é uma linguagem de pré-processamento, que significa que ela é convertida em CSS antes de ser interpretada.
- **JavaScript**: Linguagem de programação utilizada para adicionar interatividade e funcionalidades à aplicação.
- **React**: Biblioteca JavaScript utilizada para construir a interface do usuário e permite criar componentes reutilizáveis.
- **Axios**: O Axios é uma biblioteca de JavaScript utilizadas para fazer requisições HTTP. Ele é uma alternativa popular ao fetch API e é amplamente utilizado em aplicaçoes web para fazer requisições a APIs.
- **React Query**: É uma biblioteca de JavaScript utilizada para gerenciar o estado de dados em aplicações React. Foi projetado para ajudar a gerenciar o estado de dados em aplicações complexas e é amplamente utilizado em conjunto com o Axios.
- **React Router Dom**: É uma biblioteca de JavaScript utilizada para gerenciar as rotas em aplicações React. Ele é uma ferramenta popular para criar aplicações web com múltiplas páginas e rotas.
- **Material UI**: É uma biblioteca de componentes de interface do usuário (UI) para React, desenvolvida pelo Google. Ele é baseado no design Material Design, que é uma linguagem de design visual criada pelo Google para fornecer uma experiência de usuário consistente e intuitiva em todas as plataformas.
- **Toastify**: É uma biblioteca de JavaScript para criar notificações de toast em aplicações web. As notificações toast são mensagens curtas que aparecem na tela do usuário por um período de tempo determinado, geralmente para informar que uma ação ou evento está acontecendo ou aconteceu.

## Funcionalidades

- **Navegação**: A aplicação possui uma navegação simples que permite ao usuário acessar as diferentes seções da aplicação utilizando links clicáveis e sem recarregamentos desnecessários da página.
- **Conteúdo Dinâmico**: A aplicação carrega conteúdo dinâmico através de requisições do tipo GET, POST, DELETE, PUT utilizando para isso a ferramenta Axios e o React Query. O Axios permite que se faça requisições http/https para obter dados atualizados de uma API ou servidor. Já o React Query é uma ferramenta que permite gerenciar o estado de dados, ou seja, mantém os dados atualizados e consistentes em sua aplicação React.
- **Autenticação e Autorização**: A aplicação permite apenas a conta do administrador ou então a conta de um colaborador deste Administrador. Esta conta é baseada no cadastro de um e-mail e uma senha que são criptografados e são aceitos apenas se o administrador digitar o e-mail e senhas válidos.
- **Gerenciamento de dados**: A aplicação possui na HomePage um campo que permite ao usuário da aplicação fazer pesquisas em busca de algum produto que ele deseja encontrar. Esta pesquisa é feita em uma API que contém os dados referentes a esta aplicação Font-End.
- **Visualização de dados**: A aplicação possui algumas páginas, como a HomePage, onde é possível o usuário visualizar os produtos por meio de imagens, textos explicativos. A página do Carrinho de produtos possui uma interface amigável e intuitiva. Na página de Administrador possui tabelas onde são listados os produtos, as categorias de forma a facilitar a visualização dos dados apresentados.
- **Segurança**: Como os dados são buscados e também enviados para uma API, esta por sua vez busca os dados em um banco de dados, tornando desta forma os dados mais seguros, pois somente quem possui permissão para acessar a API pode ter acesso aos dados.
- **Acessibilidade**: Embora a aplicação não esteja focada em acessibilidade, o código foi elaborado para que seja utilizado o html semântico o que facilita a leitura pelos motores de busca como o do google ou de softwares especializados que leem as páginas web.
- **Responsividade**: A aplicação utiliza o recurso de Media Queries do scss visando atender os mais diversos dispositivos Desktop, Smartphones, Tablets entre outros.

## Primeiros Passos

### Requisitos

- Node.js (versão recomendada: 16.x ou superior)
- NPM ou Yarn

### Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/patriciasanttos/projeto-livraria.git
```

2. Abra o resisitório, e a pasta do frontend:

```bash
cd projeto-livraria/web
```

3. Instale as dependências:

```bash
Usando npm:
npm install

Usando yarn:
yarn install
```

4. Caso necessário, mude a URL da api no arquivo `.env`

5. Inicie a aplicação:

```bash
Usando npm:
npm run dev

Usando yarn:
yarn dev
```
