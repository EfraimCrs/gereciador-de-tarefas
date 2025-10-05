Gerenciador de Tarefas (To-Do List) Full Stack
Um projeto simples de lista de tarefas para demonstrar a arquitetura Cliente-Servidor. Foi construído com um backend RESTful em Node.js/Express e um frontend em JavaScript puro (Vanilla JS) que consome a API.

Este projeto foi desenvolvido como parte de um estudo prático sobre os fundamentos do desenvolvimento web Full Stack, cobrindo todas as operações de um CRUD (Create, Read, Update, Delete).

🚀 Funcionalidades
✅ Adicionar novas tarefas.

📝 Listar todas as tarefas existentes.

🔄 Marcar tarefas como concluídas (e desmarcar).

❌ Excluir tarefas da lista.

🛠️ Tecnologias Utilizadas
A aplicação é dividida em duas partes principais:

Backend
Node.js: Ambiente de execução para o JavaScript no servidor.

Express.js: Framework para a criação da API RESTful e gerenciamento das rotas.

Nodemon: Ferramenta para reiniciar o servidor automaticamente durante o desenvolvimento.

Frontend
HTML5: Estrutura da página.

CSS3: Estilização da interface.

JavaScript (Vanilla JS): Manipulação do DOM e lógica da aplicação.

Fetch API: Para realizar as requisições HTTP para o backend.

Ambiente de Desenvolvimento
Live Server: Para servir os arquivos do frontend e habilitar o recarregamento automático (auto-reload) no navegador.

⚙️ Como Executar o Projeto
Para rodar este projeto em sua máquina local, siga os passos abaixo.

Pré-requisitos
Node.js (versão LTS recomendada)

npm (geralmente instalado com o Node.js)

Opcional: Live Server instalado globalmente (npm install -g live-server)

Passos
Clone o repositório:

Bash

git clone https://github.com/EfraimCrs/gereciador-de-tarefas.git
cd gereciador-de-tarefas
Configure e inicie o Backend:

Abra um terminal na pasta backend.

Bash

cd backend
Instale as dependências do projeto:

Bash

npm install
Inicie o servidor em modo de desenvolvimento (com Nodemon):

Bash

npm run dev
O servidor backend estará rodando em http://localhost:3000.

Inicie o Frontend:

Abra um novo terminal e navegue até a pasta frontend.

Bash

cd frontend
Inicie o Live Server para servir os arquivos:

Bash

live-server
O Live Server abrirá automaticamente a aplicação no seu navegador padrão.
