// Constante para armazenar a chave usada para acessar o armazenamento local
const chave_armazenamento_local = 'to-do-list-gn'

// Classe para manipular a lista de tarefas
class TaskList {
    constructor() {
        // Inicialização do objeto com os valores armazenados localmente ou um array vazio
        this.values = JSON.parse(localStorage.getItem(chave_armazenamento_local) || "[]")
    }

    // Método para validar se uma tarefa já existe na lista
    valida_se_tarefa_ja_existe(){     
        let input_valor = document.getElementById("input-new-task").value
        // Verifica se já existe uma tarefa com o mesmo nome
        let existe      = this.values.find(x => x.name == input_valor)
        return !existe ? false : true
    }

    // Método para adicionar uma nova tarefa à lista
    nova_tarefa(){
        let input = document.getElementById("input-new-task")
        input.style.border = ""

        // Validação do campo de entrada
        if(!input.value){
            input.style.border = "1px solid red"
            alert("Digite algo para inserir em sua lista")
        } else if(this.valida_se_tarefa_ja_existe()){
            input.style.border = "1px solid red"
            alert("Já existe uma tarefa com essa descrição")
        }
        else{
            // Adiciona a nova tarefa à lista
            this.values.push({
                name: input.value
            })
            // Atualiza o armazenamento local com a lista atualizada
            localStorage.setItem(chave_armazenamento_local,JSON.stringify(this.values))
            this.mostrar_valores()
        }
        // Limpa o campo de entrada após adicionar a tarefa
        input.value = ""
    }

    // Método para exibir os valores da lista na interface
    mostrar_valores(){
        let lista = document.getElementById('to-do-list')
        lista.innerHTML = ''
        // Itera sobre os valores da lista e os exibe na interface
        for(let i = 0; i < this.values.length; i++){
            lista.innerHTML += `<li>${this.values[i]['name']} <button id='btn-ok' onclick='tarefas.remove_item("${this.values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
        </svg></button></li>`
        }
    }

    // Método para remover um item da lista
    remove_item(item){
        // Encontra o índice do item na lista
        let index = this.values.findIndex(x => x.name == item)
        // Remove o item da lista
        this.values.splice(index, 1)
        // Atualiza o armazenamento local com a lista atualizada
        localStorage.setItem(chave_armazenamento_local,JSON.stringify(this.values))
        this.mostrar_valores()
    }
}

// Instância da classe TaskList
let tarefas = new TaskList();
// Exibe os valores da lista na inicialização
tarefas.mostrar_valores();

