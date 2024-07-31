import { openDialogListener } from './dialog';
import './style.css';

class ToDo {
    constructor(title, description, dueDate, priority, project) {
        this.id = Date.now(); // Unique ID based on the current timestamp
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

const TO_DO_CONTAINER = loadFromLocalStorage() || [];
let currentPage = 'all-task';

function saveToLocalStorage(toDoContainer) {
    localStorage.setItem('toDoList', JSON.stringify(toDoContainer));
}

function loadFromLocalStorage() {
    const toDoList = localStorage.getItem('toDoList');
    return toDoList ? JSON.parse(toDoList) : null;
}

function addToDoToContainer(title, description, dueDate, priority, project) {
    TO_DO_CONTAINER.push(new ToDo(title, description, dueDate, priority, project));
    saveToLocalStorage(TO_DO_CONTAINER);
}

function listAllProjects(toDoContainer) {
    const projects = new Set(toDoContainer.map(toDo => toDo.project).filter(project => project !== ''));
    return Array.from(projects);
}

function removeMainContent() {
    const content = document.querySelector(".main-content");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

function addDeleteButtonListener(toDoId) {
    const index = TO_DO_CONTAINER.findIndex(toDo => toDo.id === toDoId);
    if (index > -1) {
        TO_DO_CONTAINER.splice(index, 1);
        saveToLocalStorage(TO_DO_CONTAINER);
        refreshMainContent();
    }
}

function createToDoElement(toDo) {
    const toDoContainer = document.createElement("div");
    toDoContainer.classList.add("to-do", toDo.priority);

    const title = document.createElement("p");
    title.className = "title";
    title.textContent = toDo.title;

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = toDo.description;

    const dueDate = document.createElement("p");
    dueDate.className = "due-date";
    dueDate.textContent = toDo.dueDate;

    const priority = document.createElement("p");
    priority.className = "priority";
    priority.textContent = toDo.priority;

    const project = document.createElement("p");
    project.className = "project";
    project.textContent = toDo.project;

    const deleteButton = createDeleteButton(toDo.id);

    toDoContainer.append(title, description, dueDate, priority, project, deleteButton);

    return toDoContainer;
}

function createDeleteButton(toDoId) {
    const svgNS = "http://www.w3.org/2000/svg";
    const deleteButton = document.createElementNS(svgNS, "svg");
    deleteButton.setAttribute("class", "delete-icon");
    deleteButton.setAttribute("viewBox", "0 0 24 24");

    const deleteButtonTitle = document.createElementNS(svgNS, "title");
    deleteButtonTitle.textContent = "Delete task";
    deleteButton.appendChild(deleteButtonTitle);

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z");
    deleteButton.appendChild(path);

    deleteButton.addEventListener('click', () => {
        addDeleteButtonListener(toDoId);
    });

    return deleteButton;
}

function refreshMainContent() {
    removeMainContent();

    const mainContentDiv = document.querySelector(".main-content");

    const mainContentTitle = document.createElement("h1");
    mainContentTitle.className = "main-content-title";
    mainContentTitle.textContent = document.querySelector(`.${currentPage}`).textContent;
    mainContentDiv.appendChild(mainContentTitle);

    const toDosContainer = document.createElement("div");
    toDosContainer.className = "to-dos-container";
    mainContentDiv.appendChild(toDosContainer);

    const toDosToDisplay = currentPage === 'all-task' ? TO_DO_CONTAINER : filterToDos(currentPage);

    const sortedToDos = sortToDosByDates(toDosToDisplay);

    sortedToDos.forEach(toDo => {
        const toDoElement = createToDoElement(toDo);
        toDosContainer.appendChild(toDoElement);
    });
}

function changePage(pageClass) {
    currentPage = pageClass;
    refreshMainContent();
}

function addPageEventListener() {
    const pages = document.querySelectorAll(".page");
    pages.forEach(page => {
        page.addEventListener('click', () => {
            changePage(page.classList[0]);
        });
    });
}

function filterToDos(pageClass) {
    const filteredToDos = TO_DO_CONTAINER.filter(toDo => {
        if (pageClass === 'today-task') {
            return isDueToday(toDo.dueDate);
        } else if (pageClass === 'upcoming-task') {
            return isUpcomingDueDate(toDo.dueDate);
        } else if (pageClass === 'overdue-task') {
            return isOverdue(toDo.dueDate);
        } else {
            return toDo.project === pageClass;
        }
    });
    return filteredToDos;
}

function isDueToday(dueDate) {
    const today = new Date().toISOString().split('T')[0];
    return dueDate === today;
}

function isUpcomingDueDate(dueDate) {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    return dueDateObj > today;
}

function isOverdue(dueDate) {
    const today = new Date().toISOString().split('T')[0];
    const dueDateObj = new Date(dueDate).toISOString().split('T')[0];
    return dueDateObj < today;
}

function sortToDosByDates(toDos) {
    return toDos.slice().sort((a, b) => {
        // Convert due dates to Date objects for comparison
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        
        // Compare dates; earlier dates come first
        return dateA - dateB;
    });
}

function initializeApp() {
    // Sample ToDo items
    if (!TO_DO_CONTAINER.length) {   
        addToDoToContainer('Workout', 'Leg day', '2024-07-18', 'high', 'Sports');
        addToDoToContainer('Eat mango', 'Before it rots.', '2024-08-30', 'low', 'None');
        addToDoToContainer('Buy vegetables', 'Carrots, celeries, green things...', '2024-09-01', 'high', 'Groceries');
        addToDoToContainer('Create vase', 'Decorate it with colorful pattern!', '2024-09-12', 'medium', 'Arts');
        addToDoToContainer('Meeting with clients', 'Prepare for the presentation...', '2024-07-31', 'high', 'Appointments');
    }

    openDialogListener();
    addPageEventListener();
    refreshMainContent();
}

initializeApp();

export {
    addToDoToContainer,
    refreshMainContent
}
