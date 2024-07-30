import { openDialogListener } from './dialog';
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

    let mainContentTitle = document.createElement("h1");
    mainContentTitle.className = "main-content-title";
    mainContentTitle.textContent = document.querySelector(`.${currentPage}`).textContent;
    mainContentDiv.appendChild(mainContentTitle);

    let toDosContainer = document.createElement("div");
    toDosContainer.className = "to-dos-container";
    mainContentDiv.appendChild(toDosContainer);

    for (let toDo of TO_DO_CONTAINER) {
        let title = document.createElement("p");
        title.className = "title";
        title.textContent = toDo.title;

        let description = document.createElement("p");
        description.className = "description";
        description.textContent = toDo.description;

        let dueDate = document.createElement("p");
        dueDate.className = "due-date";
        dueDate.textContent = toDo.dueDate;

        let priority = document.createElement("p");
        priority.className = "priority";
        priority.textContent = toDo.priority;    

        let project = document.createElement("p");
        project.className = "project";
        project.textContent = toDo.project;       

        // Define the SVG namespace
        const svgNS = "http://www.w3.org/2000/svg";

        // Create the main SVG element
        const deleteButton = document.createElementNS(svgNS, "svg");
        deleteButton.setAttribute("class", "delete-icon");
        deleteButton.setAttribute("xmlns", svgNS);
        deleteButton.setAttribute("viewBox", "0 0 24 24");

        // Create the title element
        const deleteButtonTitle = document.createElementNS(svgNS, "title");
        deleteButtonTitle.textContent = "Delete task";
        deleteButton.appendChild(deleteButtonTitle);

        // Create the path element
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z");
        deleteButton.appendChild(path);

        let toDoContainer = document.createElement("div");
        toDoContainer.className = "to-do";

        toDoContainer.appendChild(title);
        toDoContainer.appendChild(description);
        toDoContainer.appendChild(dueDate);
        toDoContainer.appendChild(priority);
        toDoContainer.appendChild(project);
        toDoContainer.appendChild(deleteButton);
        toDosContainer.appendChild(toDoContainer);

        deleteButton.addEventListener('click', () => {
            addDeleteButtonListener(TO_DO_CONTAINER, toDo);
        });
    }
}

function changePage(pageClass) {
    currentPage = pageClass;
    console.log(currentPage);
}

const TO_DO_CONTAINER = [];
const PROJECTS_LIST  = [];
let currentPage = 'all-task';

const pages = document.querySelectorAll(".page");
pages.forEach((page) => {
    page.addEventListener('click', () => {
        let pageClass = page.classList[0];
        changePage(pageClass);
    })
})

addToDoToContainer('Eat mango', 'with rice and fish maybe', '2024-08-30', 'high', 'Sports');
addToDoToContainer('Take a shower', 'Also brush your teeth', '2024-09-01', 'medium', 'Groceries');
addToDoToContainer('Sleep', 'for 8 hours', '2024-09-12', 'medium', 'Arts');
addToDoToContainer('Eat mango', 'with rice and fish maybe', '2024-08-30', 'high', 'Sports');
addToDoToContainer('Take a shower', 'Also brush your teeth', '2024-09-01', 'medium', 'Groceries');
addToDoToContainer('Sleep', 'for 8 hours', '2024-09-12', 'medium', 'Arts');
addToDoToContainer('Eat mango', 'with rice and fish maybe', '2024-08-30', 'high', 'Sports');
addToDoToContainer('Take a shower', 'Also brush your teeth', '2024-09-01', 'medium', 'Groceries');
addToDoToContainer('Sleep', 'for 8 hours', '2024-09-12', 'medium', 'Arts');


listAllProjects(TO_DO_CONTAINER, PROJECTS_LIST);
console.log(PROJECTS_LIST);

openDialogListener();

refreshMainContent(TO_DO_CONTAINER);

export {
    addToDoToContainer,
    refreshMainContent
}