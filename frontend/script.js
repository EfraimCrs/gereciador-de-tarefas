// Seleciona os elementos do HTML com os quais vamos interagir
const listaDeTarefas = document.getElementById('lista-de-tarefas');
const formulario = document.getElementById('form-nova-tarefa');
const inputNovaTarefa = document.getElementById('input-nova-tarefa');

// Define a URL da nossa API (deve ser a mesma do backend)
const apiUrl = 'http://localhost:3000/tarefas';

// Função que renderiza a lista de tarefas na tela
function renderizarTarefas(tarefas) {
    // Limpa a lista antes de renderizar
    listaDeTarefas.innerHTML = '';

    // Itera sobre cada tarefa da API
    tarefas.forEach(tarefa => {

        // Cria um item de lista (li) para cada tarefa
        const itemDaLista = document.createElement('li');

        // Adiciona a classe 'item-tare' ao li
        itemDaLista.classList.add('item-tarefa');

        // Se a tarefa estiver concluída, adiciona a classe 'concluida'
        if (tarefa.concluida) {
            itemDaLista.classList.add('concluida');
        }

        // Definir o conteúdo do item da lista
        itemDaLista.innerHTML = `
            <span class="titulo-tarefa">${tarefa.titulo}</span>
            <button class="btn-concluir">${tarefa.concluida ? 'Desfazer' : 'Concluir'}</button>
            <button class="btn-excluir">Excluir</button>
        `;

        // Adiciona o li recém-criado à ul na pagina
        listaDeTarefas.appendChild(itemDaLista);
    });
}
// Função para buscar as tarefas da API
async function buscarTarefas() {
    try {
        // Faz uma requisição GET para a API
        const response = await fetch(apiUrl);
        
        // Converte a resposta em JSON
        const tarefas = await response.json();

        // Renderiza as tarefas na tela
        renderizarTarefas(tarefas);

    } catch (error) {
        // Em caso de erro, exibe no console
        console.error('Erro ao buscar tarefas:', error);
    }
}
// =================== INICIALIZAÇÃO ===================
// Chama a função para buscar as tarefas assim que a página carrega
buscarTarefas();