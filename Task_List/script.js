
// Constant for store the key using to access the local storage
const local_storage_key = 'to-do-list-gn'

// Class to manipulate the task list
class TaskList {
    constructor() {
        // Object initialization with locally stored values or an empty array
        this.values = JSON.parse(localStorage.getItem(local_storage_key) || "[]")
    }

    // Method to validate whether a task exists in the list
    validate_if_task_exist(){     
        let input_value = document.getElementById("input-new-task").value
        // Checks if there is a task with one same name
        let exist      = this.values.find(x => x.name == input_value)
        return !exist ? false : true
    }

    // Method to add a new task to the list
    new_task(){
        let input = document.getElementById("input-new-task")
        input.style.border = ""

        // Input field validation
        if(!input.value){
            input.style.border = "1px solid red"
            alert("Digite algo para inserir em sua lista")
        } else if(this.validate_if_task_exist()){
            input.style.border = "1px solid red"
            alert("Já existe uma tarefa com essa descrição")
        }
        else{
            // Add new task to list
            this.values.push({
                name: input.value
            })
            // Updates local storage with list update
            localStorage.setItem(local_storage_key,JSON.stringify(this.values))
            this.shows_values()
        }
        // Clears the input field after adding the task
        input.value = ""
    }

    // Method to show values of the list in the interface
    shows_values(){
        let list = document.getElementById('to-do-list')
        list.innerHTML = ''
        // Iterates over the values in the list and displays them in the interface
        for(let i = 0; i < this.values.length; i++){
            list.innerHTML += `<li>${this.values[i]['name']} <button id='btn-ok' onclick='task.remove_item("${this.values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
        </svg></button></li>`
        }
    }

    // Method to remove item from list
    remove_item(item){
        // Finds the index of the item in the list
        let index = this.values.findIndex(x => x.name == item)
        // Remove the item from the list
        this.values.splice(index, 1)
        // Updates local storage with the updated list
        localStorage.setItem(local_storage_key,JSON.stringify(this.values))
        this.shows_values()
    }
}

// TaskList class instance
let task = new TaskList();
// Show the values of the list in the initialization
task.shows_values();
