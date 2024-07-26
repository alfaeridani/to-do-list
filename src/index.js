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

const toDoContainer = [];
toDoContainer.push(new ToDo('Eat mango', 'with rice maybe', '2024/08/30', 'High'));
toDoContainer.push(new ToDo('Take a shower', 'Also brush your teeth', '2024/08/30', 'Medium'));
console.log(toDoContainer);

let addToDoButton = document.querySelector("#add-to-do-button");
let closeButton = document.querySelector("#close-button");
addToDoButton.addEventListener('click', openDialog);
closeButton.addEventListener('click', closeDialog);

refreshMainContent(toDoContainer);