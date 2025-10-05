// =================== SELETORES GLOBAIS ===================
const listaDeTarefas = document.getElementById('lista-de-tarefas');
const formNovaTarefa = document.getElementById('form-nova-tarefa');
const inputNovaTarefa = document.getElementById('input-nova-tarefa');
const apiUrl = 'http://localhost:3000/tarefas';

// =================== FUNÇÕES DE RENDERIZAÇÃO E API ===================

function renderizarTarefas(tarefas) {
    listaDeTarefas.innerHTML = '';
    tarefas.forEach(tarefa => {
        const itemDaLista = document.createElement('li');
        itemDaLista.dataset.id = tarefa.id;
        itemDaLista.classList.add('item-tarefa');
        if (tarefa.concluida) {
            itemDaLista.classList.add('concluida');
        }
        itemDaLista.innerHTML = `
            <span class="titulo-tarefa">${tarefa.titulo}</span>
            <button class="btn-delete" data-id="${tarefa.id}">Excluir</button>
        `;
        listaDeTarefas.appendChild(itemDaLista);
    });
}

async function buscarTarefas() {
    try {
        const response = await fetch(apiUrl);
        const tarefas = await response.json();
        renderizarTarefas(tarefas);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
    }
}

async function adicionarTarefa(titulo) {
    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: titulo }),
        });
        buscarTarefas();
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
    }
}

async function deletarTarefa(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        buscarTarefas();
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
    }
}

async function atualizarTarefa(id, status) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ concluida: status }),
        });
        buscarTarefas();
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
    }
}

// =================== EVENT LISTENERS ===================

formNovaTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tituloDaTarefa = inputNovaTarefa.value;
    if (tituloDaTarefa) {
        adicionarTarefa(tituloDaTarefa);
        inputNovaTarefa.value = '';
        inputNovaTarefa.focus();
    }
});

listaDeTarefas.addEventListener('click', (evento) => {
    const elementoClicado = evento.target;
    
    if (elementoClicado.classList.contains('btn-delete')) {
        const idDaTarefa = elementoClicado.dataset.id;
        deletarTarefa(idDaTarefa);
    }

    if (elementoClicado.classList.contains('titulo-tarefa')) {
        const itemDaLista = elementoClicado.parentElement;
        const idDaTarefa = itemDaLista.dataset.id;
        const estaConcluida = itemDaLista.classList.contains('concluida');
        atualizarTarefa(idDaTarefa, !estaConcluida);
    }
});

// =================== INICIALIZAÇÃO ===================
buscarTarefas();