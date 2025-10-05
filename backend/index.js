// Importar express
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// middleware para interpretar JSON 
app.use(cors());
app.use(express.json());

// Base de Dados Simulada (em memória)
let tarefas = [
    { id: 1, titulo: "Aprender Node.js", concluida: true },
    { id: 2, titulo: "Criar a primeira rota da API", concluida: true },
    { id: 3, titulo: "Entender o que é o JSON", concluida: false },
    { id: 4, titulo: "Testar o endpoint no navegador", concluida: false }
];


// ============================ NOSSAS ROTAS ============================

// Rota para BUSCAR (GET) todas as tarefas
// Caminho: /tarefas

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

// Rota para CRIAR (POST) uma nova tarefa
app.post('/tarefas', (req, res) => {
  // 1. Pega o título da nova tarefa do corpo (body) da requisição
  const novoTitulo = req.body.titulo;

  // Validação simples: se não enviaram um título, retorna um erro.
  if (!novoTitulo) {
    return res.status(400).json({ mensagem: "O campo 'titulo' é obrigatório" });
  }

  // 2. Cria o objeto da nova tarefa
  const novaTarefa = {
    // Pega o ID da última tarefa e soma 1. 
    // Se a lista estiver vazia, o ID será 1.
    id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
    titulo: novoTitulo,
    concluida: false // Toda nova tarefa começa como "não concluída"
  };

  // 3. Adiciona a nova tarefa ao nosso array de tarefas
  tarefas.push(novaTarefa);

  // 4. Retorna a tarefa recém-criada com o status 201 (Created)
  res.status(201).json(novaTarefa);
});

// Rota para ATUALIZAR (PUT) uma tarefa existente
// O ':id' é um parâmetro de rota. Ele captura o valor naquela posição na URL.

app.put('/tarefas/:id', (req, res) => {

  // 1. Pega o ID da tarefa dos parâmetros da rota
  const tarefaId = parseInt(req.params.id);

  // 2. Pega os novos dados da tarefa do corpo (body) da requisição
  const { titulo, concluida } = req.body;

  // 3. Encontra a tarefa na "base de dados"
  const tarefa = tarefas.find(t => t.id === tarefaId);

  // 4. Se a tarefa não existir, retorna um erro 404
  if (!tarefa) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  // 5. Atualiza os campos da tarefa, se foram fornecidos
  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = concluida;

  // 6. Retorna a tarefa atualizada
  res.json(tarefa);

});

// Rota para DELETAR (DELETE) uma tarefa existente
app.delete('/tarefas/:id', (req, res) => {
  // 1. Pega o ID da URL
  const idDaTarefa = parseInt(req.params.id);

  // 2. Encontra o ÍNDICE da tarefa no array
  const indiceDaTarefa = tarefas.findIndex(t => t.id === idDaTarefa);

  // 3. Se não encontrou a tarefa (findIndex retorna -1), manda erro 404
  if (indiceDaTarefa === -1) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  // 4. Remove a tarefa do array usando seu índice
  tarefas.splice(indiceDaTarefa, 1);

  // 5. Retorna uma resposta de sucesso, sem conteúdo
  res.status(204).send();
});

// Rota raiz para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('API de Tarefas no ar!');
});

// =============================================================


app.listen(PORT, () => {
  console.log(`🚀Servidor rodando na porta ${PORT}`);
});