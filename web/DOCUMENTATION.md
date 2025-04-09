# Projeto M&C BOOKS - Front-End

## Sumário

* [Descrição do Projeto](#descrição-do-projeto)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Funcionalidades](#funcionalidades)
* [Instalação e Execução](#instalação-e-execução)
* [Conclusão](#conclusão)
* [Notas](#notas)

## Descrição do Projeto

Este projeto é uma Aplicação Web Front-End para a empresa M&C BOOKS que precisava de um site para expor seus produtos de papelaria e acessórios ligados a papelaria. A empresa queria que o site tivesse cores claras e que fossem atrativo para as crianças, bem como para seus pais que são os que realmente compram os produtos. O site deveria permitir que o cliente pudesse escolher os produtos por categorias, pudesse fazer pesquisas. O Sponsor queria que as vendas fosse concluídas pelo WhatsApp dos seus vendedores. Ele também queria que suas redes sociais ficassem disponíveis para que os clientes pudessem ter acesso. Como um plus o cliente queria que tivesse uma parte no site onde ele pudesse gerenciar, ou seja, adicionar novos produtos, novas categorias de produtos com seus respectivos preços, quantidades, fotos entre outras características.
O site foi desenvolvido utilizando HTML, SCSS, JavaScript, a biblioteca React e a ferramenta Vite entre outras bibliotecas e frameworks que serão descritas ao longo deste documento.

## Tecnologias Utilizadas

* **Html5**: Linguagem de marcação utilizada para estruturar o conteúdo da aplicação.
* **scss**: É uma linguagem de estilo que é uma extensão do CSS3. Criada para tornar o CSS mais fácil de escrever e manter. Ela é uma linguagem de pré-processamento, que significa que ela é convertida em CSS antes de ser interpretada.
* **JavaScript**: Linguagem de programação utilizada para adicionar interatividade e funcionalidades à aplicação.
* **React**: Biblioteca JavaScript utilizada para construir a interface do usuário e permite criar componentes reutilizáveis.
* **Vite**: É uma ferramenta de desenvolvimento de Front-End que fornece uma forma rápida e eficiente de criar e desenvolver aplicações web. Trabalha normalmente em conjunto com o React, pois permite recarga automática de página, atualização em tempo real, Build otimizado e suporte a TypeScript.
* **Axios**: O Axios é uma biblioteca de JavaScript utilizadas para fazer requisições HTTP. Ele é uma alternativa popular ao fetch API e é amplamente utilizado em aplicaçoes web para fazer requisições a APIs.
* **React Query**: É uma biblioteca de JavaScript utilizada para gerenciar o estado de dados em aplicações React. Foi projetado para ajudar a gerenciar o estado de dados em aplicações complexas e é amplamente utilizado em conjunto com o Axios.
* **React Router Dom**: É uma biblioteca de JavaScript utilizada para gerenciar as rotas em aplicações React. Ele é uma ferramenta popular para criar aplicações web com múltiplas páginas e rotas.
* **Material UI**: É uma biblioteca de componentes de interface do usuário (UI) para React, desenvolvida pelo Google. Ele é baseado no design Material Design, que é uma linguagem de design visual criada pelo Google para fornecer uma experiência de usuário consistente e intuitiva em todas as plataformas.
* **Toastify**: É uma biblioteca de JavaScript para criar notificações de toast em aplicações web. As notificações toast são mensagens curtas que aparecem na tela do usuário por um período de tempo determinado, geralmente para informar que uma ação ou evento está acontecendo ou aconteceu. 
* **git/github**: Git ferramenta de gerenciamento e versionamento de código local. Github ferramenta de gerenciamento e versionamento remota.
* **Figma**: É uma ferramenta de Design muito poderosa que permite a criação de layouts para seus projetos profissionais para vários tipos de dispositivos, incluindo Smartphones, Tablets, Desktops, ou seja, atende praticamente todos os tipos de dispositivos. Além é claro de permitir apresentação do Design construído.
* **Clickup**: Ferramenta de gestão de projetos e tarefas.
* **WhatsApp**: Software utilizado para conversas rápidas que dispensa comentários.
* **Discord**: Software que permite reunião com múltiplas pessoas, permite compartilhamento de telas entre outras funcionalidades. Foi utilizado para reuniões mais demoradas e com compartilhamento de telas entre membros da equipe.
* **ChatGpt**: Ferramenta de Inteligência Artificial da empresa Open IA.
* **Meta IA**: Ferramenta de Inteligência Artificial da Meta que funciona no WhatsApp.

## Estrutura do Projeto

* `web/`: Diretório raiz da aplicação.
* `src/`: Diretório que contém os arquivos fonte da aplicação.
* `assets/`: Diretório que contém imagens e ícones da aplicação.
* `Components/`: Diretório que contém os componentes React da aplicação.
* `hooks/`: Diretório que contém os hooks personalizados e utilizados na aplicação.
* `mocks/`: Diretório que contém os arquivos que funcionam como um pseudo banco de dados usado para testes.
* `Pages/`: Diretório que contém as páginas da aplicação, sendo elas publicas ou privadas.
* `public/`: Diretório que contém os arquivos públicos da aplicação.
* `private/`: Diretório que contém os arquivos privados ou protegidos da aplicação.
* `tamplates/`: Diretório que contém arquivos usados como modelo para criação de componentes e páginas do projeto.
* `App.jsx`: É o componente de entrada, pois é responsável por renderizar todos os outros componentes da aplicação.
* `index.scss`: Arquivo que contém os estilos globais da aplicação, como variáveis para as cores.
* `main.jsx`: Arquivo responsável por renderizar o App.jsx no DOM da sua aplicação no navegador web.
* `routes.jsx`: Arquivo que contém todas as rotas da aplicação, por exemplo, para a HomePage.
* `.gitignore`: Contempla os arquivos que não devem sofrer commits, portanto não serão enviados para o github.
* `eslint.config.js`: Arquivo de configuração do ESLINT, uma ferramenta de análise de código, para configurar as regras e opções de análise de código.
* `index.html`: Arquivo que contém o código html principal da aplicação.
* `package-lock.json`: Usado para garantir que as dependências sejam instaladas de forma consistente e previsível. É gerado automaticamente quando você digita o npm install ou npm update.
* `package.json`: São arquivos que contém informações sobre o projeto como Nome do projeto, Versão do projeto, Scripts de execução. Usado para definir as dependências do projeto de forma mais flexível.
* `README.md`: Arquivo que contém informações sobre o projeto, incluindo a descrição do projeto, instruções de como instalar e executar o projeto, informações sobre dependências, licença do projeto.
* `vite.config.js`: Arquivo que contém informações de configuração que são usados pelo vite no projeto. Você pode configurar a porta de desenvolvimento, configurações de otimização de código.
* `yarn.lock`: Arquivo que é gerado pelo Yarn (gerenciador de pacotes) quando você digita yarn install ou yard add.

## Funcionalidades

* **Navegação**: A aplicação possui uma navegação simples que permite ao usuário acessar as diferentes seções da aplicação utilizando links clicáveis e sem recarregamentos desnecessários da página.
* **Conteúdo Dinâmico**: A aplicação carrega conteúdo dinâmico através de requisições do tipo GET, POST, DELETE, PUT utilizando para isso a ferramenta Axios e o React Query. O Axios permite que se faça requisições http/https para obter dados atualizados de uma API ou servidor. Já o React Query é uma ferramenta que permite gerenciar o estado de dados, ou seja, mantém os dados atualizados e consistentes em sua aplicação React.
* **Autenticação e Autorização**: A aplicação permite apenas a conta do administrador ou então a conta de um colaborador deste Administrador. Esta conta é baseada no cadastro de um e-mail e uma senha que são criptografados e são aceitos apenas se o administrador digitar o e-mail e senhas válidos.
* **Gerenciamento de dados**: A aplicação possui na HomePage um campo que permite ao usuário da aplicação fazer pesquisas em busca de algum produto que ele deseja encontrar. Esta pesquisa é feita em uma API que contém os dados referentes a esta aplicação Font-End.
* **Visualização de dados**: A aplicação possui algumas páginas, como a HomePage, onde é possível o usuário visualizar os produtos por meio de imagens, textos explicativos. A página do Carrinho de produtos possui uma interface amigável e intuitiva. Na página de Administrador possui tabelas onde são listados os produtos, as categorias de forma a facilitar a visualização dos dados apresentados.
* **Segurança**: Como os dados são buscados e também enviados para uma API, esta por sua vez busca os dados em um banco de dados, tornando desta forma os dados mais seguros, pois somente quem possui permissão para acessar a API pode ter acesso aos dados.
* **Acessibilidade**: Embora a aplicação não esteja focada em acessibilidade, o código foi elaborado para que seja utilizado o html semântico o que facilita a leitura pelos motores de busca como o do google ou de softwares especializados que leem as páginas web.
* **Responsividade**: A aplicação utiliza o recurso de Media Queries do scss visando atender os mais diversos dispositivos Desktop, Smartphones, Tablets entre outros.

## Instalação e Execução

1. Clone o repositório do projeto utilizando o comando `git clone nome-do-repositório`.
2. Estando na pasta web, instale as dependências do projeto, comando `npm install`.
3. De dentro da pasta dev, execute a aplicação utilizando o comando `npm run dev`.
4. Acesse a aplicação através do endereço `http://localhost:5173`.

## Conclusão

> O projeto em questão foi o desenvolvimento de um site para uma papelaria denominada M&C BOOKS que precisava de um site para expor seus produtos, permitir a pesquisa destes produtos utilizando algum campo para isso. O Sponsor queria que a compra fosse finalizada pelo WhatsApp de seus vendedores. Ele queria que os clientes tivessem acesso as redes sociais deles e que soubessem o horário de funcionamento da loja. O Sponsor solicitou  o desenvolvimento de uma nova logomarca para a loja dele. Queria que usássemos cores claras, com toque infantil, como verde água.
O planejamento começou após reunião com o Sponsor e posteriomente pelo desenvolvimento do Design Gráfico utilizando o Software Figma. Para a gestão das tarefas do projeto utilizou-se o Software Clickup que atendeu muito bem a equipe. A comunicação entre os membros da equipe foi realizada basicamente utilizando o WhatsApp para conversas rápidas, o Discord para reuniões mais demoradas. Como a equipe foi formada por integrantes com diversos tipos e níveis de conhecimento, procurou-se adaptar as tarefas de acordo com estas necessidades e havendo modificações ao longo do processo de desenvolvimento do projeto. 
Como houve momentos que determinada tarefa precisava de conhecimentos que não tínhamos no momento foi preciso partir para pesquisas na internet, fazendo uso muitas vezes da inteligência artificial do ChatGpt e da Meta IA para esclarecer algumas dúvidas, já as respostas dadas pela IA nem sempre atendiam as nossas expectativas. 
Uma recomendação para os próximos projetos é que desde o início do projeto deve-se optar por criar os designs baseados em algum Framework de estilização css, como é o caso do Bootstrap ou outro que possua recursos parecidos, já que isso agiliza muito o processo de deixar o site responsivo, porque para atender o Design do projeto nem sempre é tão fácil assim, portanto, fazendo uso dos modelos de código pronto do Bootstrap sua aplicação certamente ficará responsiva e com maior facilidade de implementação.
Outra coisa muito importante é cuidar da parte de comunicação e gerenciamento das atividades da equipe. Estas duas devem ser vigiadas com lupa, pois se não cuidar destas coisas, certamente vão aparecer problemas que podem inviabilizar todo o projeto.

## Notas

> Certifique-se de ter  VsCode, o Node.js e o npm instalados em sua máquina. Caso encontre algum problema durante a instalação ou execução, consulte o arquivo `README.md` para mais informações.