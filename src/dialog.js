import { addToDoToContainer, refreshMainContent } from ".";

function openDialogListener() {
    const addToDoButton = document.querySelector("#add-to-do-button");
    const addToDoDialog = document.querySelector(".add-to-do-dialog");

    addToDoButton.addEventListener('click', () => {
        if (!document.querySelector('.add-to-do-form')) {
            createDialog();
        }
        addToDoDialog.showModal();
    });
}

function createDialog() {
    const addToDoDialog = document.querySelector('.add-to-do-dialog');

    const form = document.createElement('form');
    form.className = 'add-to-do-form';

    const closeButton = document.createElement('button');
    closeButton.id = 'close-button';
    closeButton.type = 'button';  // Change type to 'button' to prevent form submission
    closeButton.textContent = 'Close';

    const heading = document.createElement('h1');
    heading.className = 'form-heading';
    heading.textContent = 'Add New To-Do';

    const taskNameDiv = createInputDiv('Task name:', 'task-name', 'Enter your task here...', 'text', true);
    const descriptionDiv = createInputDiv('Description:', 'description', 'Add some description here...', 'textarea', false);
    const dueDateDiv = createInputDiv('Due date:', 'due-date', '', 'date', true);
    const projectDiv = createProjectSelect();

    const priorityFieldset = createPriorityFieldset();

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'submit-button';
    submitButton.textContent = 'Submit';

    form.append(closeButton, heading, taskNameDiv, descriptionDiv, dueDateDiv, priorityFieldset, projectDiv, submitButton);
    addToDoDialog.appendChild(form);

    closeButton.addEventListener('click', closeDialogListener);
    form.addEventListener('submit', submitDialogListener);
}

function createInputDiv(labelText, id, placeholder, type, required) {
    const div = document.createElement('div');
    div.className = 'input';

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = labelText;

    let input;
    if (type === 'textarea') {
        input = document.createElement('textarea');
    } else {
        input = document.createElement('input');
        input.type = type;
    }
    input.id = id;
    input.name = id;
    input.placeholder = placeholder;
    if (required) input.required = true;

    div.appendChild(label);
    div.appendChild(input);

    return div;
}

function createProjectSelect() {
    const div = document.createElement('div');
    div.className = 'input';

    const label = document.createElement('label');
    label.setAttribute('for', 'project');
    label.textContent = 'Project';

    const select = document.createElement('select');
    select.id = 'project';
    select.name = 'project';

    const projects = ['Sports', 'Groceries', 'Appointments', 'Arts'];
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project;
        option.textContent = project;
        select.appendChild(option);
    });

    div.appendChild(label);
    div.appendChild(select);

    return div;
}

function createPriorityFieldset() {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = 'Priority';

    const priorities = [
        { id: 'low', value: 'low', label: 'Low', checked: true },
        { id: 'medium', value: 'medium', label: 'Medium', checked: false },
        { id: 'high', value: 'high', label: 'High', checked: false }
    ];

    priorities.forEach(priority => {
        const div = document.createElement('div');

        const input = document.createElement('input');
        input.type = 'radio';
        input.id = priority.id;
        input.name = 'priority';
        input.value = priority.value;
        input.checked = priority.checked;

        const label = document.createElement('label');
        label.setAttribute('for', priority.id);
        label.textContent = priority.label;

        div.appendChild(input);
        div.appendChild(label);
        fieldset.appendChild(div);
    });

    fieldset.appendChild(legend);

    return fieldset;
}

function closeDialogListener() {
    const addToDoDialog = document.querySelector(".add-to-do-dialog");
    const addToDoForm = document.querySelector(".add-to-do-form");
    if (addToDoForm) {
        addToDoForm.reset();
        addToDoForm.remove();
    }
    addToDoDialog.close();
}

function submitDialogListener(event) {
    event.preventDefault();

    const addToDoDialog = document.querySelector(".add-to-do-dialog");

    const title = document.querySelector("#task-name").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector("input[name=priority]:checked").value;
    const project = document.querySelector("#project").value;

    addToDoToContainer(title, description, dueDate, priority, project);
    refreshMainContent();
    closeDialogListener();
}

export {
    openDialogListener,
}
