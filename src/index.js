import './style.css';

class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

function deleteToDo(index) {
    toDoContainer.splice(index, 1);
}

function addToDo() {
    let title = prompt("Add title", "Stream music");
    let description = prompt("Add description", "Maybe some rock music");
    let dueDate = prompt("Due date?", "12th August 2025");
    let priority = prompt("Priority", "High");
    toDoContainer.push(new ToDo(title, description, dueDate, priority));
    refreshMainContent();
}

function refreshMainContent() {
    let mainContentDiv = document.querySelector(".main-content");
    for (let toDo of toDoContainer) {
        let title = document.createElement("h2");
        title.textContent = toDo.title;
        mainContentDiv.appendChild(title);
    }
}

const toDoContainer = [];
toDoContainer.push(new ToDo('Eat mango', 'with rice maybe', '2024/08/30', 'High'));
toDoContainer.push(new ToDo('Take a shower', 'Also brush your teeth', '2024/08/30', 'Medium'));
console.log(toDoContainer);