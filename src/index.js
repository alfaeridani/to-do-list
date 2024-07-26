import { closeDialogListener, createDialog, openDialogListener } from './dialog';
import './style.css';

class ToDo {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

function addToDoToContainer(title, description, dueDate, priority, project) {
    TO_DO_CONTAINER.push(new ToDo(title, description, dueDate, priority, project));
}

function listAllProjects(toDoContainer, projectContainer) {
    for (let toDo of toDoContainer) {
        if (toDo['project'] !== '') {
            projectContainer.push(toDo['project']);
        }
    }
}

function removeMainContent() {
    const content = document.querySelector(".main-content");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

function addDeleteButtonListener(container, toDo) {
    let index = container.indexOf(toDo);
    container.splice(index, 1);
    refreshMainContent(container);
}

function refreshMainContent() {
    removeMainContent();
    let mainContentDiv = document.querySelector(".main-content");
    for (let toDo of TO_DO_CONTAINER) {
        let title = document.createElement("h2");
        title.textContent = toDo.title;
        mainContentDiv.appendChild(title);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        mainContentDiv.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            addDeleteButtonListener(TO_DO_CONTAINER, toDo);
        });
    }
}

const TO_DO_CONTAINER = [];
const PROJECTS_LIST  = [];

addToDoToContainer('Eat mango', 'with rice maybe', '2024/08/30', 'High', 'Sports');
addToDoToContainer('Take a shower', 'Also brush your teeth', '2024/08/30', 'Medium', 'Groceries');
addToDoToContainer('Take a shower', 'Also brush your teeth', '2024/08/30', 'Medium', ' ');

listAllProjects(TO_DO_CONTAINER, PROJECTS_LIST);
console.log(PROJECTS_LIST);

openDialogListener();

//submitDialogListener(TO_DO_CONTAINER);

refreshMainContent(TO_DO_CONTAINER);

export {
    addToDoToContainer,
    refreshMainContent
}