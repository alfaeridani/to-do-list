import { closeDialog, openDialog } from './dialog';
import { refreshMainContent } from './mainContentDiv';
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

function addToDoToContainer(title, description, dueDate, priority) {
    toDoContainer.push(new ToDo(title, description, dueDate, priority));
}

const toDoContainer = [];
addToDoToContainer('Eat mango', 'with rice maybe', '2024/08/30', 'High');
addToDoToContainer('Take a shower', 'Also brush your teeth', '2024/08/30', 'Medium');
console.log(toDoContainer);

let addToDoButton = document.querySelector("#add-to-do-button");
let closeButton = document.querySelector("#close-button");
let addToDoForm = document.querySelector(".add-to-do-form");
addToDoButton.addEventListener('click', openDialog);
closeButton.addEventListener('click', closeDialog);
addToDoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let title = document.querySelector("#task-name").value;
    let description = document.querySelector("#description").value;
    let dueDate = document.querySelector("#due-date").value;
    let priority = document.querySelector("input[name=priority]:checked").value;
    addToDoToContainer(title, description, dueDate, priority);
    refreshMainContent(toDoContainer);
    closeDialog();
})

refreshMainContent(toDoContainer);