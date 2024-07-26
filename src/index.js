import { closeDialogListener, openDialogListener } from './dialog';
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
    TO_DO_CONTAINER.splice(index, 1);
}

function addToDoToContainer(title, description, dueDate, priority) {
    TO_DO_CONTAINER.push(new ToDo(title, description, dueDate, priority));
}

function submitDialogListener(container) {
    let addToDoForm = document.querySelector(".add-to-do-form");
    let addToDoDialog = document.querySelector(".add-to-do-dialog");
    addToDoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let title = document.querySelector("#task-name").value;
        let description = document.querySelector("#description").value;
        let dueDate = document.querySelector("#due-date").value;
        let priority = document.querySelector("input[name=priority]:checked").value;
        addToDoToContainer(title, description, dueDate, priority);
        refreshMainContent(container);
        addToDoDialog.close();
    })
}

const TO_DO_CONTAINER = [];
addToDoToContainer('Eat mango', 'with rice maybe', '2024/08/30', 'High');
addToDoToContainer('Take a shower', 'Also brush your teeth', '2024/08/30', 'Medium');

openDialogListener();
closeDialogListener();
submitDialogListener(TO_DO_CONTAINER);


refreshMainContent(TO_DO_CONTAINER);